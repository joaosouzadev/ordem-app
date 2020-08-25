import 'react-native-gesture-handler';
import React from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from './screens/LoginScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';
import { SplashScreen } from './screens/SplashScreen';
import { AuthStackNavigator } from './navigators/AuthStackNavigator';
import { MainNavigator } from './navigators/MainNavigator';
import { AuthContext } from './contexts/AuthContext';
import { UserContext } from './contexts/UserContext';
import { useAuth } from './hooks/useAuth';

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();

export default function() {

	const { auth, state } = useAuth();

	function renderScreens() {
		if (state.loading) {
			return <RootStack.Screen name={'SplashScreen'} component={SplashScreen} />;
		}
		return state.user ? (
			<RootStack.Screen name={'MainStack'}>
			{
				() => (
					<UserContext.Provider value={state.user}>
						<MainNavigator/>
					</UserContext.Provider>
				)
			}
			</RootStack.Screen>
		) : (
			<RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
		)
	}

	return (
		<AuthContext.Provider value={auth}>
			<NavigationContainer>
				<RootStack.Navigator
					screenOptions={{
						headerShown: false,
						animationEnabled: false
					}}>
					{renderScreens()}
				</RootStack.Navigator>
			</NavigationContainer>
		</AuthContext.Provider>
	);
}