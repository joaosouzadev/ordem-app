import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function Error({error}) {
  return (
    <View style={styles.container}>
  	  <Text style={styles.text}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 8
  },
  text: {
  	color: 'red',
  	fontSize: 14
  }
});
