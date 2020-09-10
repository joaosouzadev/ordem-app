import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Heading } from 'components/Heading';
import { Input } from 'components/Input';
import { FilledButton } from 'components/FilledButton';
import { TextButton } from 'components/TextButton';
import { Error } from 'components/Error';
import { IconButton } from 'components/IconButton';
import { Loading } from 'components/Loading';
import { AuthContext } from 'contexts/AuthContext';
import { UserContext } from 'contexts/UserContext';
import { HeaderIconButton } from 'components/HeaderIconButton';
import { FloatingAction } from "react-native-floating-action";
import { Button, TextInput, Appbar, ToggleButton, Checkbox, Searchbar, Snackbar, FAB } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { LookupModal } from 'react-native-lookup-modal';
import { useGet } from 'hooks/useGet';
import { List as LL } from "react-native-paper";
import { List, ListItem, SearchBar } from "react-native-elements";
import apiConfig from 'hooks/apiConfig';

export function ClienteCadastroScreen({ navigation }) {

  const [loading, setLoading] = React.useState(true);
  const [enviandoForm, setEnviandoForm] = React.useState(false);
  const [error, setError] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [celular, setCelular] = React.useState('');
  const [cep, setCep] = React.useState('');
  const [rua, setRua] = React.useState('');
  const [numero, setNumero] = React.useState('');
  const [complemento, setComplemento] = React.useState('');
  const [bairro, setBairro] = React.useState('');
  const [cidade, setCidade] = React.useState('');

  const actions = [
    {
      text: "Accessibility",
      icon: <Ionicons name="md-checkmark" size={30} color='white' />,
      name: "ADD",
      position: 1
    }
  ];

  const cadastra = async () => {

    setEnviandoForm(true);
    setError(null);

    await apiConfig.post('/clientes',
      {
        'nome': nome,
        'email': email,
        'celular': celular,
        'cep': cep,
        'rua': rua,
        'numero': numero,
        'complemento': complemento,
        'bairro': bairro,
        'cidade': cidade,
      }).then(resp => {
        navigation.navigate('Clientes', { cadastrou: true });
      }).catch(e => {
        console.log(e.response.data.errors);
        let stringErro = '';
        Object.values(e.response.data.errors).forEach(erro => {
          Object.values(erro).forEach(str => {
            stringErro += '\n' + str;
          })
        });
        setError(stringErro);
        setEnviandoForm(false);
      });
  }

  return (
    <ScrollView style={styles.container}>

      <Appbar style={styles.appbar}>
        <Appbar.BackAction onPress={() => { navigation.navigate('Clientes'); }} />
        <Appbar.Content title="Novo Cliente" />
      </Appbar>
      
      <React.Fragment>
        <View style={styles.view}>

          <Error error={error} style={styles.error} />

          <TextInput
            style={styles.inputRow, styles.inputRowLeft}
            label="Nome"
            value={nome}
            onChangeText={setNome}
          />

          <View style={styles.inputWrap}>
              <TextInput
                style={styles.inputRow, styles.inputRowLeft}
                label="Email"
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                style={styles.inputRow, styles.inputRowRight}
                label="Celular"
                value={celular}
                onChangeText={setCelular}
              />
          </View>

          <View style={styles.inputWrap}>
              <TextInput
                style={styles.inputRow, styles.inputRowLeft}
                label="CEP"
                value={cep}
                onChangeText={setCep}
              />

              <TextInput
                style={styles.inputRow, styles.inputRowRight}
                label="Rua"
                value={rua}
                onChangeText={setRua}
              />
          </View>

          <View style={styles.inputWrap}>
              <TextInput
                style={styles.inputRow, styles.inputRowLeft}
                label="Nº"
                value={numero}
                onChangeText={setNumero}
              />

              <TextInput
                style={styles.inputRow, styles.inputRowRight}
                label="Complemento"
                value={complemento}
                onChangeText={setComplemento}
              />
          </View>

          <View style={styles.inputWrap}>
              <TextInput
                style={styles.inputRow, styles.inputRowLeft}
                label="Bairro"
                value={bairro}
                onChangeText={setBairro}
              />

              <TextInput
                style={styles.inputRow, styles.inputRowRight}
                label="Cidade"
                value={cidade}
                onChangeText={setCidade}
              />
          </View>
        </View>

        <View style={styles.fixedView}>
          <FAB
            style={styles.fabAdd}
            icon="check"
            onPress={async () => {
              await cadastra();
            }}
            color='white'
          />
        </View>
      </React.Fragment>
      
      <Loading loading={enviandoForm} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixedView : {
    position: 'relative',
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  fabAdd: {
    position: 'relative',
    bottom: 10,
    right: 15,
    backgroundColor: 'purple',
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  view: {
    padding: 20,
    paddingTop: 0
  },
  error: {
  },
  inputRow: {
    marginVertical: 10,
    flex: 1,
    width: '50%',
  },
  inputRowLeft: {
    marginVertical: 10,
    flex: 1,
    marginRight: 10,
  },
  inputRowRight: {
    marginVertical: 10,
    flex: 1,
    marginLeft: 10,
  },
  inputHidden: {
    display: 'none'
  },
  title: {
    marginLeft: 35,
  },
  loginButton: {
    marginTop: 0,
    marginBottom: 20
  },
  closeIcon: {
    position: 'absolute',
    top: 25,
    left: 20
  },
  appbar: {
  },
});
