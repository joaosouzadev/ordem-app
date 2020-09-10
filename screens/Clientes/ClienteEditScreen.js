import React from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons';  
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
import * as FileSystem from 'expo-file-system';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import * as IntentLauncher from 'expo-intent-launcher';

export function ClienteEditScreen({ route, navigation }) {

  const actions = [
    {
      text: "Salvar",
      color: 'purple',
      icon: <Ionicons name="md-checkmark" size={20} color='white' />,
      name: "Salvar",
      position: 2
    },
    {
      text: "WhatsApp",
      color: "#25D366",
      icon: <Ionicons name="logo-whatsapp" size={20} color='white' />,
      name: "WhatsApp",
      position: 1
    }
  ];

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
  const [close, setClose] = React.useState(false);

  React.useEffect(() => {
    apiConfig.get(`/clientes/${route.params.id}`)
      .then(({ data }) => {
        console.log(data.data);
        setNome(data.data.nome);
        setEmail(data.data.email);
        setCelular(data.data.celular);
        setCep(data.data.cep);
        setRua(data.data.rua);
        setNumero(data.data.numero);
        setComplemento(data.data.complemento);
        setBairro(data.data.bairro);
        setCidade(data.data.cidade);

        setLoading(false);
      }).catch((error) => console.log(error));
  }, [route, navigation]);

  const edita = async () => {

    setEnviandoForm(true);
    setError(null);

    await apiConfig.put(`/clientes/${route.params.id}`,
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
        setEnviandoForm(false);
        navigation.navigate('Clientes', { editou: true });
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
        <Appbar.Content title="Editar Cliente" />
      </Appbar>
      

      {
        loading ?
        <View><ActivityIndicator /></View>
        :
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
      }

        <FloatingAction
          floatingIcon={close ? 
            <AntDesign name="close" size={24} color="white" />
            :
            <SimpleLineIcons name="options-vertical" size={24} color="white" />
          }
          style={styles.fab}
          actions={actions}
          color={'purple'}
          animated={false}
          overrideWithAction={false}
          onPressItem={(name) => {
            if (name == 'Salvar') {
              edita();
            } else if (name == 'PDF') {
              pdf();
            } else if (name == 'WhatsApp') {
              alert('whats');
            }
          }}
          onOpen={() => setClose(true)}
          onClose={() => setClose(false)}
        />
    
      <Loading loading={enviandoForm} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'yellow'
  },
  view: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 100,
    // backgroundColor: 'red'
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
