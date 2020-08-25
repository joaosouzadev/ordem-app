import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Alert } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { OrdensListScreen } from '../screens/OrdensListScreen';
import { OrdensCadastroScreen } from '../screens/OrdensCadastroScreen';
import { ClientsListScreen } from '../screens/ClientsListScreen';
import { CustomDrawerContent } from '../components/CustomDrawerContent';
import { AuthContext } from '../contexts/AuthContext';
import { HeaderIconButton } from '../components/HeaderIconButton';

const navOptionHandler = () => ({
  headerTitle: false
});

const StackOrdens = createStackNavigator()

function OrdensStack({navigation, route}) {
  return (
    <StackOrdens.Navigator initialRouteName="Ordens">
      <StackOrdens.Screen name="Ordens" component={OrdensListScreen} options={navOptionHandler}/>
      <StackOrdens.Screen name="CriarOrdem" component={OrdensCadastroScreen} options={navOptionHandler}/>
    </StackOrdens.Navigator>
  )
}

const Tab = createBottomTabNavigator();

function TabNavigator() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerTitle: 'Menu',
				// headerShown: true
			}}>
			<Tab.Screen name={'Ordens'} component={OrdensStack}/>
			<Tab.Screen name={'ClientsListScreen'} component={ClientsListScreen} options={{ title: 'Clientes' }}/>
		</Tab.Navigator>
	);
}

const Drawer = createDrawerNavigator();

function DrawerNavigator({navigation}) {

  const { logout } = React.useContext(AuthContext);

  React.useEffect(
    () => {
      navigation.setOptions({
        headerRight: () => <HeaderIconButton
          name={'md-exit'} 
          size={32} 
          onPress={
            () => {
              Alert.alert(
                "",
                "Sair do App?",
                [
                  {
                    text: "Não",
                    // onPress: () => console.log("No, continue editing")
                  },
                  {
                    text: "Sim",
                    onPress: () => logout(),
                    style: "cancel"
                  }
                ],
                { cancelable: false }
              );
            }
          }
        />,
        headerLeft: () => <HeaderIconButton
          name={'md-menu'} 
          size={32} 
          onPress={
            () => {
            	navigation.dispatch(DrawerActions.toggleDrawer());
            }
          }
        />,
      });
    },
    [navigation, logout]
  )

  return (
    <Drawer.Navigator initialRouteName="Inicio" 
      drawerContent={() => <CustomDrawerContent navigation={navigation}/>}>
        <Drawer.Screen name="Inicio" component={TabNavigator}/>
        <Drawer.Screen name="CadastrarCliente" component={TabNavigator}/>
    </Drawer.Navigator>
  )
}

const Main = createStackNavigator();

export function MainNavigator({navigation}) {

	return (
		<Main.Navigator initialRouteName="Início">
          <Main.Screen name="Início" component={DrawerNavigator} options={navOptionHandler}/>
          <Main.Screen name="Cadastrar Cliente" component={DrawerNavigator} options={navOptionHandler}/>
        </Main.Navigator>
	);
}