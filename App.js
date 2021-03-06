import 'react-native-gesture-handler';
import React from 'react';
import axios from 'axios';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from './screens/LoginScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';
import { SplashScreen } from './screens/SplashScreen';
import { AuthStackNavigator } from './navigators/AuthStackNavigator';
import { MainNavigator } from './navigators/MainNavigator';
import { AuthContext } from './contexts/AuthContext';
import { UserContext } from './contexts/UserContext';
import { useAuth } from 'hooks/useAuth';
import { navigationRef, isReadyRef } from './RootNavigation';

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();

export default function() {

	React.useEffect(() => {
		return () => {
			isReadyRef.current = false
		};
	}, []);

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
							<MainNavigator />
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
			<PaperProvider>
				<NavigationContainer ref={navigationRef}
					onReady={() => {
						isReadyRef.current = true;
					}}>
					<RootStack.Navigator
						screenOptions={{
							headerShown: false,
							animationEnabled: false
						}}>
						{renderScreens()}
					</RootStack.Navigator>
				</NavigationContainer>
			</PaperProvider>
		</AuthContext.Provider>
	);
}