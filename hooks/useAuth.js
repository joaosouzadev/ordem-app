import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { createAction } from '../utils/createAction';
import { sleep } from '../utils/sleep';
import * as SecureStore from 'expo-secure-store';
import { jwt_decode } from 'jwt-decode';

export function useAuth() {
	const [state, dispatch] = React.useReducer((state, action) => {
		switch (action.type) {
			case 'SET_USER':
				return {
					...state,
					loading: false,
					user: { ...action.payload },
				};
			case 'REMOVE_USER':
				return {
					...state,
					loading: false,
					user: undefined,
				};
			case 'SET_LOADING':
				return {
					...state,
					loading: action.payload,
				};
			default:
				return state;
		}
	}, {
		user: undefined,
		loading: true
	});

	const auth = React.useMemo(

		() => ({

			login: async (email, password) => {
				const result = await axios.post(`${BASE_URL}/login`, {
					'email': email,
					'password': password
				});
				// console.log(result);
				const user = result.data.token
				SecureStore.setItemAsync('user', JSON.stringify(user));
				dispatch(createAction('SET_USER', user));
			},
			logout: async () => {
				console.log('deslogando');
				SecureStore.deleteItemAsync('user');
				dispatch(createAction('REMOVE_USER'));
			},
			register: async (name, email, password) => {
				await axios.post(`${BASE_URL}/register`, {
					'name': name,
					'email': email,
					'password': password,
					'password_confirmation': password
				});
				console.log('register', email, password);
			},

		}),
		[]
	);

	React.useEffect(() => {
		sleep(1000).then(() => {
			SecureStore.getItemAsync('user').then(user => {
				if (user) {
					console.log('a');
					const jwtdecode = require('jwt-decode');
					try {
						let token = jwtdecode(user);
						console.log(token);
						if (typeof token.exp === 'undefined') {
							console.log('nunca expira');
							dispatch(createAction('SET_USER', user));
						} else {
							var current_time = Date.now().valueOf() / 1000;
							if (token.exp < current_time) {
								console.log('expirado');
								auth.logout();
							} else {
								dispatch(createAction('SET_USER', user));
								console.log('nao expirado');
							}
						}
					} catch (e) {
						console.log(e);
					}
				} else {
					dispatch(createAction('SET_LOADING', false));
				}
			});
		});
	}, []);

	return { auth, state };
}