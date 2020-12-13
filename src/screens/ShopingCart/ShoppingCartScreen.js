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
        isEmpty:true,
        itemNum1: 2,
        itemNum2: 1,
    };
  }

  GoBack = () =>{
    this.props.navigation.navigate("ProductDetailScreen")
  }

  Addcart = () => {
    this.setState({itemNum1:this.state.itemNum1 + 1})
  }

  Minuscart = async() => {
    await this.setState({itemNum1:this.state.itemNum1 - 1})
    if(this.state.itemNum1 <= 0){
      this.setState({itemNum1:0})
    }
  }

  Addcart1 = () => {
    this.setState({itemNum2:this.state.itemNum2 + 1})
  }

  Minuscart1 = async() => {
    await this.setState({itemNum2:this.state.itemNum2 - 1})
    if(this.state.itemNum2 <= 0){
      this.setState({itemNum2:0})
    }
  }

  chageState = async() => {
    await this.setState({isEmpty:false})
  }

  render() {
    return (
        <View style={{...styles.container, justifyContent:'center'}}>
          {
            this.state.isEmpty?
            <View style={{alignItems:'center', height:'100%', justifyContent:'center'}}>
              <Text style={styles.CartTitle}>Cart</Text>
              <TouchableOpacity onPress={()=>{this.chageState()}}>
                <Image source={require('../../assets/iamges/plusImage.png')} resizeMode='stretch' style={styles.plusImage} />
              </TouchableOpacity>
              <Text style={{...styles.AddShopiingTxt, color:'#414041'}}>Shopping Cart Empty</Text>
            </View>
            :
            <View style={{width:'100%', flex:1, alignItems:'center'}}>
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
                          <TouchableOpacity style={styles.cartAccountArea} onPress={()=>{this.Addcart()}}>
                            <Text style={styles.cartAddBtn}>+</Text>
                          </TouchableOpacity>
                          <View style={styles.cartAccountArea}>
                            <Text style={styles.cartAddBtn}>{this.state.itemNum1}</Text>
                          </View>
                          <TouchableOpacity style={styles.cartAccountArea} onPress={()=>{this.Minuscart()}}>
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
                          <TouchableOpacity style={styles.cartAccountArea} onPress={()=>{this.Addcart1()}}>
                            <Text style={styles.cartAddBtn}>+</Text>
                          </TouchableOpacity>
                          <View style={styles.cartAccountArea}>
                            <Text style={styles.cartAddBtn}>{this.state.itemNum2}</Text>
                          </View>
                          <TouchableOpacity style={styles.cartAccountArea} onPress={()=>{this.Minuscart1()}}>
                            <Text style={styles.cartAddBtn}>-</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{height:50}}></View>
            </ScrollView>
            <TouchableOpacity style={styles.AddCartBtn1} onPress={()=>{this.props.navigation.navigate("CheckOutScreen"), this.setState({isEmpty:true})}}>
                <Text style={styles.signinTxt1}>Next</Text>
            </TouchableOpacity>
            </View>
          }
        </View>
    );
  }
}
