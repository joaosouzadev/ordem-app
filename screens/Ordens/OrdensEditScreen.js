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

export function OrdensEditScreen({ route, navigation }) {

  // console.log('asdasd' + route.params.id);

  const actions = [
    {
      text: "Salvar",
      color: 'purple',
      icon: <Ionicons name="md-checkmark" size={20} color='white' />,
      name: "Salvar",
      position: 3
    },
    {
      text: "PDF",
      color: "#d9534a",
      icon: <Ionicons name="md-document" size={20} color='white' />,
      name: "PDF",
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

  const [opcoes, setOpcoes] = React.useState([]);

  const [close, setClose] = React.useState(false);

  const [loading, setLoading] = React.useState(true);
  const [enviandoForm, setEnviandoForm] = React.useState(false);
  const [servicos, setServicos] = React.useState([]);
  const [clientes, setClientes] = React.useState([]);
  const [clientesMemory, setClientesMemory] = React.useState([]);

  const [situacao, setSituacao] = React.useState('Orçamento');
  const [cliente, setCliente] = React.useState('');
  const [clienteNome, setClienteNome] = React.useState('');
  const [dataEntrada, setDataEntrada] = React.useState('');
  const [equipamento, setEquipamento] = React.useState('');
  const [error, setError] = React.useState('');

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {

    let checkboxes = [
        { 'id': 1, 'value': 'Formatar', 'checked': 'unchecked' },
        { 'id': 2, 'value': 'Adicionar RAM', 'checked': 'unchecked' },
        { 'id': 3, 'value': 'Trocar Bateria', 'checked': 'unchecked' }
      ];

    setOpcoes(checkboxes);

    apiConfig.get(`/ordens/${route.params.id}`)
      .then(({ data }) => {
        console.log(data);
        console.log(data.data.cliente.id);
        setCliente(data.data.cliente.id.toString());
        setClienteNome(data.data.cliente.nome);
        setDataEntrada(data.data.data_entrada);
        setEquipamento(data.data.equipamento);

        let srvcs = JSON.parse(data.data.servicos);
        srvcs.forEach(servico => {
          console.log(servico);
          checkboxes.find(obj => obj.value === servico).checked = 'checked';
          servicos.push(servico);
        });
        console.log(servicos);

        setLoading(false);
      }).catch((error) => console.log(error));

    apiConfig.get('/clientes')
      .then(({ data }) => {
        setClientes(data.data);
        setClientesMemory(data.data);
        // setLoading(false);
      }).catch((error) => console.log(error));

  }, [route, navigation]);

  const onChange = (event, selectedDate) => {
    console.log(selectedDate);
    // if (selectedDate) {}
    if (event.type == 'set') {
      var mes = selectedDate.getMonth() + 1;
      if (mes < 10) {
        mes = '0' + mes;
      }
      var formattedDate = selectedDate.getDate() + "-" + mes + "-" + selectedDate.getFullYear();
      setShow(Platform.OS === 'ios'); // first state update hides datetimepicker
      setDataEntrada(formattedDate); // 30-Dec-2011());
      console.log(formattedDate);
    } else {
      setShow(Platform.OS === 'ios'); // first state update hides datetimepicker
      setDataEntrada('');
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onChangeSearch = (value) => {
    console.log(value);
    const filteredClientes = clientesMemory.filter(
      cliente => {
        let clienteLowercase = cliente.nome.toLowerCase();
        let searchLowercase = value.toLowerCase();
        return clienteLowercase.indexOf(searchLowercase) > -1;
      });
    setClientes(filteredClientes);
    setSearchQuery(value);
  };

  const toggleCheckbox = (item) => {
    console.log(item);
    if (item.checked == 'checked') {
      item.checked = 'unchecked';
    } else {
      item.checked = 'checked';
    }
    // if (servicos[index].checked === value) return;

    // const opcoesVetor = opcoes.map((item, idx) => {
    //   return { ...item };
    // });
    // setOpcoes(opcoesVetor);

    console.log(opcoes);
    let vetor = [];
    opcoes.forEach(opcao => {
      if (opcao.checked == 'checked') {
        vetor.push(opcao.value);
      }
    });
    setServicos(vetor);
    console.log(vetor);
  };

  const edita = async () => {

    setEnviandoForm(true);
    setError(null);

    await apiConfig.put(`/ordens/${route.params.id}`,
      {
        'situacao': situacao,
        'cliente': cliente,
        'descricao': 'ATUALIZANDO',
        'data_entrada': dataEntrada,
        'equipamento': equipamento,
        'valor': 11.11,
        'servicos': servicos
      }).then(resp => {
        setEnviandoForm(false);
        navigation.navigate('Ordens', { editou: true });
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

  const pdf = async () => {

    setEnviandoForm(true);
    setError(null);
    
    const { uri: localUri } = await FileSystem.downloadAsync(`http://10.0.2.2:8000/api/ordens/${route.params.id}/pdf`, FileSystem.documentDirectory + 'name.ext');

    console.log(localUri);
    // FileSystem.getContentUriAsync(localUri).then(cUri => {
    //   IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
    //       data: cUri.uri,
    //       flags: 1,
    //       type: 'application/pdf'
    //    });
    // });

    // Linking.openURL(localUri);
    WebBrowser.openBrowserAsync(localUri);

    // await apiConfig.get(`/ordens/${route.params.id}/pdf`, {responseType: 'arraybuffer'})
    //   .then(resp => {
    //     console.log('------');
    //     console.log(resp);
    //     console.log('-----');
    //     const file = new Blob([resp.data], {type: 'application/pdf'});
    //     const fileURL = URL.createObjectURL(file);
    //     window.open(fileURL);
    //     // const { uri: localUri } = await FileSystem.downloadAsync(remoteUri, FileSystem.documentDirectory + 'name.ext');
    //     // navigation.navigate('Ordens', { editou: true });
    //   }).catch(e => {
    //     console.log(e);
    //     // let stringErro = '';
    //     // Object.values(e.response.data.errors).forEach(erro => {
    //     //   Object.values(erro).forEach(str => {
    //     //     stringErro += '\n' + str;
    //     //   })
    //     // });
    //     // setError(stringErro);
    //     setEnviandoForm(false);
    //   });
  }

  return (
    <ScrollView style={styles.container}>

      <Appbar style={styles.appbar}>
        <Appbar.BackAction onPress={() => { navigation.navigate('Ordens'); }} />
        <Appbar.Content title="Detalhes da Ordem" />
      </Appbar>

      {
        loading ?
          <View><ActivityIndicator /></View>
          :
            clienteNome ?
              <React.Fragment>
                <View style={styles.view}>

                  <Error error={error} style={styles.error} />

                  <DropDownPicker
                    items={[
                      { label: 'Orçamento', value: 'Orçamento', selected: true},
                      { label: 'Em Andamento', value: 'Em Andamento' },
                    ]}
                    defaultValue={'Orçamento'}
                    containerStyle={{ height: 50 }}
                    style={styles.dropdown}
                    itemStyle={{
                      justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => setSituacao(item.value)}
                  />

                  <TextInput
                    style={styles.inputRow, styles.inputRowLeft, styles.inputHidden}
                    label="Cliente"
                    value={cliente}
                    onChangeText={setCliente}
                    disabled={true}
                  />

                  <View style={styles.inputWrap}>
                    <TouchableOpacity style={styles.inputRowLeft} onPress={() => setClienteNome(null)}>
                      <TextInput
                        style={styles.inputRow, styles.inputRowLeft}
                        label="Cliente"
                        value={clienteNome}
                        onChangeText={setClienteNome}
                        disabled={true}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.inputRowRight} onPress={() => showDatepicker()}>
                      <TextInput
                        style={styles.inputRow, styles.inputRowRight}
                        label="Data"
                        value={dataEntrada}
                        showSoftInputOnFocus={false}
                        disabled={true}
                        onChangeText={setDataEntrada}
                      />
                    </TouchableOpacity>
                  </View>

                  <TextInput
                    style={styles.input}
                    label="Equipamento"
                    value={equipamento}
                    onChangeText={setEquipamento}
                  />

                  {
                    opcoes.map((item, idx) => {
                      return (
                        <Checkbox.Item label={item.value} value={item.value} key={idx} status={item.checked} color='purple' onPress={() => toggleCheckbox(item)} />
                      );
                    })
                  }

                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                    />
                  )}

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

                </View>
              </React.Fragment>
            :
              <React.Fragment>
                <Searchbar
                  placeholder="Procurar Cliente"
                  onChangeText={onChangeSearch}
                  value={searchQuery}
                />
                <FlatList
                  data={clientes}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {
                      setClienteNome(item.nome);
                      setCliente(item.id.toString())
                    }}>
                      <LL.Item
                        title={item.nome}
                        description={`${item.email}`}
                        style={{ backgroundColor: 'white', borderBottomWidth: 0.5 }}
                        right={props => <LL.Icon {...props} icon="arrow-right" />}
                      />
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={() => (
                    <View><Text>Não há clientes registrados</Text></View>
                  )}
                />
              </React.Fragment>
      }

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
