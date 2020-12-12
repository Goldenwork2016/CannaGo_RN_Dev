import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import Modal from 'react-native-modalbox';

import {styles} from '../../components/styles'

const height = Dimensions.get('screen').height;

export default class CheckOutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalVisible: false,
        isEmpty:false
    };
  }

  render() {
    return (
        <View style={{...styles.container, justifyContent:'center'}}>
            <ScrollView style={{width:'100%', flex:1}}>
                <View style={{...styles.container}}>
                  <View style={{width:'100%', alignItems:'center', marginTop:55}}>
                    <TouchableOpacity style={styles.backBtn} onPress={()=>{this.props.navigation.goBack()}}>
                      <Image source={require('../../assets/iamges/backImage.png')} resizeMode='stretch' style={styles.backImage} />
                    </TouchableOpacity>
                    <Text style={{...styles.DetailTitle, marginTop:7}}>PAYMENT METHOD</Text>
                    <TouchableOpacity style={styles.paymethodAddBtn}>
                      <Image source={require('../../assets/iamges/paymethodAdd.png')} resizeMode='stretch' style={styles.paymethodAdd} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.paymenntArea}>
                    <Text style={styles.OrderSummeryTxt}>Order Summery</Text>
                    <View style={styles.orderContent}>
                      <View style={styles.ContentItem}>
                        <Text style={styles.ItemTxt}>Just CBD Gummies X 2</Text>
                        <Text style={styles.ItemTxt}>$49.98</Text>
                      </View>
                      <View style={styles.ContentItem}>
                        <Text style={styles.ItemTxt}>CBD Wax 10 ML</Text>
                        <Text style={styles.ItemTxt}>$$1.00</Text>
                      </View>
                      <View style={styles.ContentItem}>
                        <Text style={styles.ItemTxt}>Service Fee</Text>
                        <Text style={styles.ItemTxt}>$5.00</Text>
                      </View>
                      <View style={styles.ContentItem}>
                        <Text style={styles.ItemTxt}>State Tax</Text>
                        <Text style={styles.ItemTxt}>$4.98</Text>
                      </View>
                    </View>
                      <View style={styles.ContentItem}>
                        <Text style={styles.ItemTxt}>Total Amount</Text>
                        <Text style={{...styles.ItemTxt, color:'#E47911'}}>$74.81</Text>
                      </View>
                      <View style={styles.ContentItem}>
                        <Text style={styles.ItemTxt}>Promo Code</Text>
                      </View>
                      <View style={styles.ContentItem}>
                        <TextInput style={styles.PromoInput} placeholder="Type here" />
                        <TouchableOpacity style={styles.ApplyBtn}>
                          <Text style={styles.applyBtnTxt}>Apply</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{...styles.ContentItem, marginTop:30}}>
                        <Text style={styles.ItemTxt}>Card Number</Text>
                      </View>
                      <View style={styles.ContentItem}>
                        <TextInput style={styles.CardNumberInput} placeholderTextColor="#5E5E5E" placeholder="xxxx xxxx xxxx 1278" />
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <View style={{width:'50%'}}>
                          <View style={styles.ContentItem}>
                            <Text style={styles.ItemTxt}>Expiration Date</Text>
                          </View>
                          <View style={styles.ContentItem}>
                            <TextInput style={{...styles.CardNumberInput,width:96}} placeholderTextColor="#5E5E5E" placeholder="06/22" />
                          </View>
                        </View>
                        <View style={{width:'50%'}}>
                          <View style={styles.ContentItem}>
                            <Text style={styles.ItemTxt}>CVC</Text>
                          </View>
                          <View style={styles.ContentItem}>
                            <TextInput style={{...styles.CardNumberInput,width:96}} placeholderTextColor="#5E5E5E" placeholder="071" />
                          </View>
                        </View>
                      </View>
                      <View style={{...styles.ContentItem, marginTop:10}}>
                        <Text style={styles.ItemTxt}>Drop off Address</Text>
                      </View>
                      <View style={styles.ContentItem}>
                        <TextInput style={styles.CardNumberInput} placeholderTextColor="#5E5E5E" placeholder="8823 Normal Blvd, Atlanta,GA, 31390" />
                      </View>
                      <View style={{...styles.ContentItem, marginTop:10}}>
                        <Text style={styles.ItemTxt}>Special request</Text>
                      </View>
                      <View style={styles.ContentItem}>
                        <TextInput style={styles.specialInput} multiline={true} placeholderTextColor="#5E5E5E" placeholder="The gate code is #01234" />
                      </View>
                  </View>
                  <TouchableOpacity style={{...styles.signinBtn, width:'85%', alignSelf:'center'}} onPress={()=>{this.props.navigation.navigate("OrderStatusScreen")}}>
                      <Text style={styles.signinTxt1}>Check Out</Text>
                  </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
  }
}
