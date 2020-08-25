import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { FilledButton } from '../components/FilledButton';
import { TextButton } from '../components/TextButton';
import { Error } from '../components/Error';
import { IconButton } from '../components/IconButton';
import { Loading } from '../components/Loading';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';
import { HeaderIconButton } from '../components/HeaderIconButton';
import { FloatingAction } from "react-native-floating-action";

export function OrdensListScreen({ navigation }) {
  const actions = [
    {
      text: "Accessibility",
      icon: <Ionicons name="md-add" size={30} color='white' />,
      name: "ADD",
      position: 1
    }
  ];

  return (
    <View style={styles.container}>
      <FloatingAction
        actions={actions}
        color={'purple'}
        animated={false}
        overrideWithAction={true}
        onPressItem={() => {
          navigation.navigate('CriarOrdem')}
        }
      />
      <Text>
        Ordens
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
  },
});
