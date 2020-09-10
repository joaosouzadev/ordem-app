import axios from 'axios';
import React from 'react';
import * as SecureStore from 'expo-secure-store';
import { createAction } from 'utils/createAction';
import * as AuthContext from 'contexts/AuthContext';
import * as RootNavigation from '../RootNavigation.js';
import * as useAuth from 'hooks/useAuth';
import { CommonActions } from "@react-navigation/native";

// const uri = `http://${manifest.debuggerHost.split(':').shift()}:8000/api`;

const apiConfig = axios.create({
	// baseURL: 'http://192.168.25.227:8000/api',
	baseURL: 'http://10.0.2.2:8000/api',
	// baseURL: 'http://6c8a17419a6c.ngrok.io/api'
	// baseURL: 'http://134.122.23.193/api'
});

// antes de ser enviada, monta header com token
apiConfig.interceptors.request.use(async (config) => {

	const token = await SecureStore.getItemAsync('user').then(user => {
		let a = JSON.parse(user);
		console.log(a);
		return a.token;
	});	

	try {
		// console.log('------');
		// console.warn(token);
		// console.log('------');
		config.headers.Authorization = `Bearer ${token}`;
		config.headers.Accept = 'application/json';
		config.headers.ContentType = 'application/json';
		console.log(config);
		return config;
	} catch (error) {
		console.warn(error);
	}
});

apiConfig.interceptors.response.use(response => { return response }, error => {

	console.log(error);
	console.log(error.response.status);

    if (error.response.status === 401) {
    	SecureStore.deleteItemAsync('user');
	    RootNavigation.navigate('Exit');
    } else {
    	return Promise.reject(error);
    }
});

export default apiConfig;