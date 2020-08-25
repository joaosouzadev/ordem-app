import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { IconButton } from './IconButton'; 

export function HeaderIconButton({name, size, onPress}) {
  return (
  	<IconButton name={name} size={size} style={styles.container} onPress={onPress} />
  );
}

const styles = StyleSheet.create({
  container: {
  	marginRight: 14
  }
});
