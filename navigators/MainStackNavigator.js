import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ClientsListScreen } from '../screens/ClientsListScreen';

const MainStack = createStackNavigator();

export function MainStackNavigator() {
	return (
		<MainStack.Navigator
			screenOptions={{
				headerTitle: 'Clientes'
				// headerShown: false
			}}>
			<MainStack.Screen name={'ClientsListScreen'} component={ClientsListScreen} />
		</MainStack.Navigator>
	);
}