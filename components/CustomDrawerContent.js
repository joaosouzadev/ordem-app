import React, {Component} from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';

export class CustomDrawerContent extends Component {

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{marginLeft: 15}}>
                    <TouchableOpacity
                        style={{marginTop: 20}}
                        onPress={() => this.props.navigation.navigate('Inicio')}
                    >
                        <Text>Início</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{marginTop: 20}}
                        onPress={() => this.props.navigation.navigate('OutraCoisa')}
                    >
                        <Text>Outra Coisa</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
    }
}