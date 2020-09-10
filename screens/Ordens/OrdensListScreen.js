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
import { useGet } from 'hooks/useGet';
import { List as LL } from "react-native-paper";
import { Button, TextInput, Appbar, ToggleButton, Checkbox, Searchbar, Snackbar } from 'react-native-paper';
import { List, ListItem, SearchBar } from "react-native-elements";
import { useIsFocused } from '@react-navigation/native';
import apiConfig from 'hooks/apiConfig';

export function OrdensListScreen({ route, navigation }) {

  const { token } = React.useContext(UserContext);

  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const [ordens, setOrdens] = React.useState([]);
  React.useEffect(() => {
    if (route.params?.cadastrou || route.params?.editou) {
      setVisible(true);
      setLoading(true);
      route.params.cadastrou = false;
      route.params.editou = false;
    }

    console.log(route.params);

    apiConfig.get(`/ordens`)
      .then(({ data }) => {
        console.log(data);
        setOrdens(data.data);
        setLoading(false);
      }).catch((error) => {
        console.log(error);
      })
  }, [token, route]);

  console.log(ordens.length);

  const actions = [
    {
      text: "Accessibility",
      icon: <Ionicons name="md-add" size={30} color='white' />,
      name: "ADD",
      position: 1
    }
  ];

  const editar = (id) => {
    navigation.navigate('EditarOrdem', { id: id });
  }

  const cadastrarCliente = () => {
    navigation.navigate('CadastrarCliente');
  }

  return (
    <View style={styles.container}>
      <Appbar style={styles.appbar}>
        <Appbar.Content title="Ordens" />
      </Appbar>

      <Snackbar
        duration={2000}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          onPress: () => {
            // Do something
          },
        }}>
        {
          route.params ?
            route.params.cadastrou ?
              <Text>Ordem cadastrada!</Text>
              :
              <Text>Ordem editada!</Text>
            :
            <Text></Text>
        }
      </Snackbar>

      {
        loading ?
          <View><ActivityIndicator /></View>
          :
          <FlatList
            extraData={refresh}
            data={ordens}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => editar(item.id)}>
                <LL.Item
                  title={item.equipamento}
                  description={`${item.cliente.nome}`}
                  style={{ backgroundColor: 'white', borderBottomWidth: 0.5 }}
                  left={props => <Text style={{ textAlignVertical: 'center', width: '20%', borderRightWidth: 0.5 }}>{item.situacao}</Text>}
                  right={props => <Text style={{ textAlignVertical: 'center', }}>R$ {item.valor.replace('.', ',') || 0}</Text>}
                />
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <View style={{flex: 1, alignItems: 'center', marginTop: 100, padding: 20}}>
                  <Text>Suas Ordens de Serviço aparecerão aqui.</Text>
                  <Text style={{marginTop: 20}}>
                    <Text>Para começarmos, </Text><Text style={{textDecorationLine: 'underline'}} onPress={cadastrarCliente()}>cadastre seu primeiro cliente.</Text>
                </Text>
                  <Text style={{marginTop: 20}}>
                    <Text>Depois, clique aqui para cadastrar sua primeira Ordem.</Text>
                </Text>
              </View>
            )}
          />
      }

      <FloatingAction
        actions={actions}
        color={'purple'}
        animated={false}
        overrideWithAction={true}
        onPressItem={() => {
          navigation.navigate('CriarOrdem')
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
});
