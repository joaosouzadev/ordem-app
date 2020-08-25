import React from 'react'; ''
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

export function ClientsListScreen({ navigation }) {

  const { logout } = React.useContext(AuthContext);
  const user = React.useContext(UserContext);

  React.useEffect(
    () => {
      navigation.setOptions({
        headerRight: () => <HeaderIconButton
          name={'logout'} 
          size={32} 
          onPress={
            () => {
              logout();
            }
          }
        />
      });
    },
    [navigation, logout]
  )

  return (
    <View style={styles.container}>
      <Text>
        Bem vindo
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
