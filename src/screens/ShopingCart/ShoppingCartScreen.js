import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import Modal from 'react-native-modalbox';

import {styles} from '../../components/styles'

const height = Dimensions.get('screen').height;

export default class ShoppingCartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalVisible: false,
        isEmpty:false
    };
  }

  GoBack = () =>{
    this.props.navigation.navigate("ProductDetailScreen")
  }

  render() {
    return (
        <View style={{...styles.container, justifyContent:'center'}}>
          {
            this.state.isEmpty?
            <View style={{alignItems:'center'}}>
              <Text style={styles.CartTitle}>Cart</Text>
              <Image source={require('../../assets/iamges/plusImage.png')} resizeMode='stretch' style={styles.plusImage} />
              <Text style={{...styles.AddShopiingTxt, color:'#414041'}}>Shopping Cart Empty</Text>
            </View>
            :
            <ScrollView style={{width:'100%', flex:1}}>
                <View style={{...styles.container, flex:1}}>
                  <View style={{width:'100%', alignItems:'center', marginTop:55}}>
                    <TouchableOpacity style={styles.backBtn} onPress={()=>{this.GoBack()}}>
                      <Image source={require('../../assets/iamges/backImage.png')} resizeMode='stretch' style={styles.backImage} />
                    </TouchableOpacity>
                    <Text style={{...styles.DetailTitle, marginTop:7}}>Cart</Text>
                    <View style={styles.cartItemArea}>
                      <View style={styles.cartImage}>
                        <Image source={require('../../assets/iamges/product3.png')} resizeMode='stretch' style={styles.productCartImage} />
                      </View>
                      <View>
                        <Text style={styles.productDescription}>Just CBD Gummies</Text>
                        <Text style={{...styles.productDescription, color:"#61D273"}}>$ 24.99</Text>
                        <View style={styles.countItem}>
                          <TouchableOpacity style={styles.cartAccountArea}>
                            <Text style={styles.cartAddBtn}>+</Text>
                          </TouchableOpacity>
                          <View style={styles.cartAccountArea}>
                            <Text style={styles.cartAddBtn}>2</Text>
                          </View>
                          <TouchableOpacity style={styles.cartAccountArea}>
                            <Text style={styles.cartAddBtn}>-</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View style={styles.cartItemArea}>
                      <View style={styles.cartImage}>
                        <Image source={require('../../assets/iamges/product1.png')} resizeMode='stretch' style={styles.productCartImage} />
                      </View>
                      <View>
                        <Text style={styles.productDescription}>CBD Wax 10 ML</Text>
                        <Text style={{...styles.productDescription, color:"#61D273"}}>$ 15</Text>
                        <View style={styles.countItem}>
                          <TouchableOpacity style={styles.cartAccountArea}>
                            <Text style={styles.cartAddBtn}>+</Text>
                          </TouchableOpacity>
                          <View style={styles.cartAccountArea}>
                            <Text style={styles.cartAddBtn}>1</Text>
                          </View>
                          <TouchableOpacity style={styles.cartAccountArea}>
                            <Text style={styles.cartAddBtn}>-</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity style={{...styles.AddCartBtn}} onPress={()=>{this.props.navigation.navigate("CheckOutScreen")}}>
                        <Text style={styles.signinTxt1}>Next</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </ScrollView>
          }
            
        </View>
    );
  }
}
