import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Alert } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ExitScreen } from 'screens/ExitScreen';
import { OrdensEditScreen } from 'screens/Ordens/OrdensEditScreen';
import { OrdensListScreen } from 'screens/Ordens/OrdensListScreen';
import { OrdensCadastroScreen } from 'screens/Ordens/OrdensCadastroScreen';

import { ClienteListScreen } from 'screens/Clientes/ClienteListScreen';
import { ClienteCadastroScreen } from 'screens/Clientes/ClienteCadastroScreen';
import { ClienteEditScreen } from 'screens/Clientes/ClienteEditScreen';

import { CustomDrawerContent } from 'components/CustomDrawerContent';
import { AuthContext } from 'contexts/AuthContext';
import { HeaderIconButton } from 'components/HeaderIconButton';

import { AntDesign } from '@expo/vector-icons'; 

const navOptionHandler = () => ({
  headerTitle: false
});

// const StackCliente = createStackNavigator()

// function ClienteStack({navigation, route}) {
//   return (
//     <StackOrdens.Navigator initialRouteName="Clientes">
//       <StackOrdens.Screen name="Clientes" component={ClienteListScreen} options={navOptionHandler}/>
//     </StackOrdens.Navigator>
//   )
// }

// const StackOrdens = createStackNavigator()

// function OrdensStack({navigation, route}) {
//   return (
//     <StackOrdens.Navigator initialRouteName="Ordens">
//       <StackOrdens.Screen name="Ordens" component={OrdensListScreen} options={navOptionHandler}/>
//       <StackOrdens.Screen name="CriarOrdem" component={OrdensCadastroScreen} options={navOptionHandler}/>
//       <StackOrdens.Screen name="EditarOrdem" component={OrdensEditScreen} options={navOptionHandler}/>
//     </StackOrdens.Navigator>
//   )
// }

const Tab = createBottomTabNavigator();

function TabNavigator({navigation, route}) {

  // console.warn(route);
  // console.warn(route.state);
  // console.warn(route.state?.index);

	return (
		<Tab.Navigator
			screenOptions={{
				headerTitle: 'Menu',
				// headerShown: true
			}}
      tabBarOptions={{
        // activeTintColor: 'purple',
        labelStyle: {
          fontSize: 12
        },
        tabStyle: {
          // maxWidth: 50,
        },
        style: {
          // backgroundColor: "black",
        },
      }}
      >
      
			<Tab.Screen name={'Ordens'} component={OrdensListScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="filetext1" size={size} color={color} />
        ),
      }}
      />

			<Tab.Screen name={'Clientes'} component={ClienteListScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="user" size={size} color={color} />
        ),
      }}
      />

      <Tab.Screen name={'Exit'} component={ExitScreen} options={{
        tabBarButton: () => null,
      }}/>

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
    <Drawer.Navigator initialRouteName="Inicio" unmountInactiveRoutes={true} drawerContent={() => <CustomDrawerContent navigation={navigation}/> }>
        <Drawer.Screen name="Inicio" component={TabNavigator}/>
        <Drawer.Screen name="CriarOrdem" component={OrdensCadastroScreen} options={navOptionHandler}/>
        <Drawer.Screen name="EditarOrdem" component={OrdensEditScreen} options={navOptionHandler}/>
        <Drawer.Screen name="CadastrarCliente" component={ClienteCadastroScreen} options={navOptionHandler}/>
        <Drawer.Screen name="EditarCliente" component={ClienteEditScreen} options={navOptionHandler}/>
    </Drawer.Navigator>
  )
}

const Main = createStackNavigator();

export function MainNavigator({navigation}) {

	return (
		<Main.Navigator initialRouteName="Início">
      <Main.Screen name="Início" component={DrawerNavigator} options={navOptionHandler}/>
    </Main.Navigator>
	);
}