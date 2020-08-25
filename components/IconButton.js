import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function IconButton({name, size, style, onPress}) {
  return (
  	<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
  		<Ionicons name={name} color={'purple'} size={size}/>
  	</TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {

  }
});
