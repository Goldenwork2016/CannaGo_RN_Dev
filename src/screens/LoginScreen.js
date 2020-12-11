import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';

import {styles} from '../components/styles'

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{width:'100%'}}>
          <View style={styles.container}>
            <Image source={require('../assets/iamges/logo.png')} resizeMode='stretch' style={styles.logoImage} />
            <Text style={styles.logoTxt}>for consumers</Text>
            <View style={styles.inputArea}>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/email.png')} resizeMode='stretch' style={styles.InputImage} />
                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Email Adress"></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/password.png')} resizeMode='stretch' style={styles.InputImage1} />
                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Password"></TextInput>
              </View>
              <TouchableOpacity style={styles.forgotBtn} onPress={()=>{this.props.navigation.navigate("ForgotPasswordScreen")}}>
                <Text style={{...styles.signinTxt, color:'#7E7E7E'}}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.signinBtn} onPress={()=>{this.props.navigation.navigate("App")}}>
                <Text style={styles.signinTxt1}>Sign in</Text>
              </TouchableOpacity>
              <Text style={styles.dontaccountTxt}>Don't you have an account?</Text>
              <TouchableOpacity style={{...styles.forgotBtn, alignItems:'center', marginTop:5}} onPress={()=>{this.props.navigation.navigate("SignUpScreen")}}>
                <Text style={styles.signinTxt}>Sign up</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputArea}>
              <TouchableOpacity style={styles.wantBtn}>
                <Text style={styles.wantTxt}>Want to drive with us?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.wantBtn}>
                <Text style={styles.wantTxt}>Want to sell with us?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
