import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

class testScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={{ width: '100%', flex: 1, }}>
                    <View style={{ width: '100%' }}>
                        <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', alignItems: 'center', marginTop: 30 }}>
                            <View style={styles.inputItem}>
                                <Icon name="search" size={20} color="#768895" style={{ marginLeft: 10, marginRight: 10 }} />
                                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Search MovieDB" value={this.state.phoneNum} onChangeText={(text) => { this.setState({ phoneNum: text }) }}></TextInput>
                            </View>
                            <TouchableOpacity style={{ width: '20%', marginLeft: '5%', borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5b5bef', height: 40 }}>
                                <Icon name="plus" size={15} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', alignItems: 'center', marginTop: 30 }}>
                            <View style={{ ...styles.inputItem, width: '100%' }}>
                                <TextInput style={{ ...styles.inputTxt, paddingLeft: 20 }} placeholderTextColor="#7a7a7b" placeholder="Search My Movies" value={this.state.phoneNum} onChangeText={(text) => { this.setState({ phoneNum: text }) }}></TextInput>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', alignItems: 'center', marginTop: 30 }}>
                        <View>
                            <View>
                                <Icon name="eye" size={15} color="#fff" />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    inputItem: {
        flexDirection: 'row',
        width: '75%',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#768895',
        height: 50,
        borderRadius: 3
    },
    inputTxt: {
        fontSize: 20
    }
})

export default testScreen;
