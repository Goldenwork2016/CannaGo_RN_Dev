import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modalbox';

import {styles} from '../../components/styles'

export default class ShoppingCartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalVisible: false,
    };
  }

  render() {
    return (
        <View style={{...styles.container, justifyContent:'center'}}>
            <Text style={styles.CartTitle}>Cart</Text>
            <Image source={require('../../assets/iamges/plusImage.png')} resizeMode='stretch' style={styles.plusImage} />
            <Text style={{...styles.AddShopiingTxt, color:'#414041'}}>Shopping Cart Empty</Text>
        </View>
    );
  }
}
