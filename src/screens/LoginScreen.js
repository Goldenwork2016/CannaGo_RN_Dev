import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {styles} from '../components/styles'

const consumers_logo = require('../assets/iamges/logo.png');
const driver_logo = require('../assets/iamges/driver_logo.png');
const seller_logo = require('../assets/iamges/seller_log.png')

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo_image:consumers_logo,
      logo_title:'for consumers',
      isConsumers:true,
      isDriver:false,
      isDispensaries:false
    };
  }

  componentDidMount = async() => {
    await AsyncStorage.setItem(usertype, "consumer");
  }

  change_logo= async(logo_num)=>{
    switch(logo_num){
      case 1:
        await this.setState({isDispensaries:false, isDriver:false, isConsumers:true})
        await AsyncStorage.setItem(usertype, "consumer");
        break;
      case 2:
        await this.setState({isDispensaries:true, isDriver:false, isConsumers:false})
        await AsyncStorage.setItem('usertype', "dispensaries");
        break;
      case 3:
        await this.setState({isDispensaries:false, isDriver:true, isConsumers:false})
        await AsyncStorage.setItem('usertype', "driver");
        break;
    }
    const ssss = await AsyncStorage.getItem(usertype);
    alert(ssss)
    if(this.state.isDispensaries){
      this.setState({logo_image:seller_logo, logo_title:'for dispensaries'})
    } else if(this.state.isDriver){
      this.setState({logo_image:driver_logo, logo_title:'for drivers'})
    } else if(this.state.isConsumers){
      this.setState({logo_image:consumers_logo, logo_title:'for consumers'})
    }
  }

  gotoSignUp = () => {
    if(this.state.isDispensaries){
      this.props.navigation.navigate("DispensariesSignupScreen")
    } else if(this.state.isDriver){
    } else if(this.state.isConsumers){
      this.props.navigation.navigate("SignUpScreen")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{width:'100%'}}>
          <View style={styles.container}>
            <Image source={this.state.logo_image} resizeMode='stretch' style={styles.logoImage} />
            <Text style={styles.logoTxt}>{this.state.logo_title}</Text>
            <View style={styles.inputArea}>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/email.png')} resizeMode='stretch' style={styles.InputImage} />
                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder={this.state.isDispensaries?"Dispensary Email Address":"Email Address"}></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/password.png')} resizeMode='stretch' style={styles.InputImage1} />
                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Password"></TextInput>
              </View>
              <TouchableOpacity style={styles.forgotBtn} onPress={()=>{this.props.navigation.navigate("ForgotPasswordScreen")}}>
                <Text style={{fontFamily:'Poppins-Regular',color:'#7E7E7E', fontSize:13}}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.signinBtn} onPress={()=>{this.props.navigation.navigate("App")}}>
                <Text style={styles.signinTxt1}>Sign in</Text>
              </TouchableOpacity>
              <Text style={styles.dontaccountTxt}>Don't have an account?</Text>
              <TouchableOpacity style={{...styles.forgotBtn, alignItems:'center', marginTop:5}} onPress={()=>{this.gotoSignUp()}}>
                <Text style={styles.signinTxt}>Sign up</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputArea}>
              <TouchableOpacity style={styles.wantBtn} onPress={()=>{this.change_logo(3)}}>
                <Text style={styles.wantTxt}>Want to drive with us?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.wantBtn} onPress={()=>{this.change_logo(2)}}>
                <Text style={styles.wantTxt}>Want to sell with us?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.wantBtn} onPress={()=>{this.change_logo(1)}}>
                <Text style={styles.wantTxt}>Want to buy from us?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height:50}}></View>
        </ScrollView>
      </View>
    );
  }
}
