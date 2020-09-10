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

export function OrdensCadastroScreen({ navigation }) {

  const { token } = React.useContext(UserContext);

  const [opcoes, setOpcoes] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  const [enviandoForm, setEnviandoForm] = React.useState(false);
  const [servicos, setServicos] = React.useState([]);
  const [clientes, setClientes] = React.useState([]);
  const [clientesMemory, setClientesMemory] = React.useState([]);

  navigation.setOptions({ tabBarVisible: false });

  React.useEffect(() => {

    let checkboxes = [
        { 'id': 1, 'value': 'Formatar', 'checked': 'unchecked' },
        { 'id': 2, 'value': 'Adicionar RAM', 'checked': 'unchecked' },
        { 'id': 3, 'value': 'Trocar Bateria', 'checked': 'unchecked' }
      ];

    setOpcoes(checkboxes);

    apiConfig.get('/clientes')
      .then(({ data }) => {
        setClientes(data.data);
        setClientesMemory(data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [token]);

  const [situacao, setSituacao] = React.useState('Orçamento');
  const [cliente, setCliente] = React.useState('');
  const [clienteNome, setClienteNome] = React.useState('');
  const [dataEntrada, setDataEntrada] = React.useState('');
  const [equipamento, setEquipamento] = React.useState('');
  const [error, setError] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [searchQuery, setSearchQuery] = React.useState('');

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

  const actions = [
    {
      text: "Accessibility",
      icon: <Ionicons name="md-checkmark" size={30} color='white' />,
      name: "ADD",
      position: 1
    }
  ];

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

  const cadastra = async () => {

    setEnviandoForm(true);
    setError(null);

    await apiConfig.post('/ordens',
      {
        'situacao': situacao,
        'cliente_id': cliente,
        'descricao': 'teste, remover campo descricao dps',
        'data_entrada': dataEntrada,
        'equipamento': equipamento,
        'valor': 99.99,
        'servicos': servicos
      }).then(resp => {
        navigation.navigate('Ordens', { cadastrou: true });
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
        <Appbar.BackAction onPress={() => { navigation.navigate('Ordens'); }} />
        <Appbar.Content title="Nova Ordem" />
      </Appbar>

      {
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
          :
          loading ?
            <View><ActivityIndicator /></View>
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
                  <View style={{flex: 1, alignItems: 'center', marginTop: 100}}>
                    <Text>Não há clientes registrados</Text>
                  </View>
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
