import React from 'react';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
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
import { BASE_URL } from '../config';
import { useGet } from '../hooks/useGet';
import { List as LL } from "react-native-paper";
import { List, ListItem, SearchBar } from "react-native-elements";

export function OrdensListScreen({ navigation }) {

  const ordens = useGet('/ordens');
  // console.log(Object.values(ordens));

  const actions = [
    {
      text: "Accessibility",
      icon: <Ionicons name="md-add" size={30} color='white' />,
      name: "ADD",
      position: 1
    }
  ];

  function renderList({ item: ordem }) {
    return <Text ordem={ordem}></Text>;
  }

  const editar = (id) => {
    console.log(id)
  }

  return (
    <View style={styles.container}>

      <FlatList
        data={ordens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => editar(item.id)}>
            <LL.Item
              title={item.cliente.nome}
              description={`${item.equipamento}`}
              style={{ backgroundColor: 'white', borderBottomWidth: 0.5 }}
              left={props => <Text style={{textAlignVertical: 'center', width: '20%', borderRightWidth: 0.5}}>{item.situacao}</Text>}
              right={props => <Text style={{textAlignVertical: 'center', }}>R$ {item.valor.replace('.', ',')}</Text>}
            />
          </TouchableOpacity>
        )}
      />

      <FloatingAction
        actions={actions}
        color={'purple'}
        animated={false}
        overrideWithAction={true}
        onPressItem={() => {
          navigation.navigate('CriarOrdem')
        }
        }
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
