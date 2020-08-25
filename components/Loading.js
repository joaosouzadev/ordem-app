import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

export function Loading({loading}) {
  
	if (!loading) {
		return <View />;
	}

  	return (
	  	<View style={[styles.overlay]}>
	  		<View style={[styles.container]}>
	  			<ActivityIndicator style={[styles.icon]}/>
	  			<Text style={[styles.text]}>Carregando..</Text>
	  		</View>
	  	</View>
  	);
}

const styles = StyleSheet.create({
  overlay: {
  	...StyleSheet.absoluteFill,
  	position: 'absolute',
  	backgroundColor: 'rgba(0,0,0, 0.5)',
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  container: {
  	backgroundColor: 'white',
  	flexDirection: 'row',
  	padding: 30,
  	borderRadius:8
  },
  text: {
  	marginLeft: 12,
  	fontSize: 18
  }
});
