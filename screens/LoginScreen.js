import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { FilledButton } from '../components/FilledButton';
import { TextButton } from '../components/TextButton';
import { Error } from '../components/Error';
import { Loading } from '../components/Loading';
import { AuthContext } from '../contexts/AuthContext';

export function LoginScreen({ navigation }) {

  const { login } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('jvms3d@gmail.com');
  const [password, setPassword] = React.useState('asdasdasd');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  return (
    <View style={styles.container}>
      <Heading style={styles.title}>LOGIN</Heading>
      <Error error={error} />
      <Input
        style={styles.input}
        placeholder={'Email'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        style={styles.input}
        placeholder={'Senha'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <FilledButton
        title={'Entrar'}
        style={styles.loginButton}
        onPress={
          async () => {
            try {
              setLoading(true);
              await login(email, password);
            } catch (e) {
              setError(e.message);
              setLoading(false);
              console.log(e);
            }
          }
        }
      />
      <TextButton
        title={'Não possui uma conta?'}
        onPress={() => {
          navigation.navigate('Registration');
        }}
      />
      <Loading loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    padding: 20
  },
  input: {
    marginVertical: 10
  },
  title: {
    marginBottom: 20
  },
  loginButton: {
    marginTop: 20,
    marginBottom: 20
  }
});
