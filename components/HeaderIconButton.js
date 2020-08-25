import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { IconButton } from './IconButton'; 

export function HeaderIconButton({name, size, onPress}) {
  return (
  	<IconButton name={name} size={size} style={styles.container} onPress={onPress} />
  );
}

const styles = StyleSheet.create({
  container: {
  	padding: 14
  }
});
