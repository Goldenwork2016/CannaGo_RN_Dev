import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Firebase from '../../config/firebase';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import {styles} from '../components/styles'

const consumers_logo = require('../assets/iamges/logo.png');
const driver_logo = require('../assets/iamges/driver_logo.png');
const seller_logo = require('../assets/iamges/seller_log.png');
var usertype =  "consumer";

let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let reg_strong = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo_image:consumers_logo,
      logo_title:'for consumers',
      isConsumers:true,
      isDriver:false,
      isDispensaries:false,
      email:'',
      password:'',
      isModalVisible1:false,
      isModalVisible2:false,
      isModalVisible3:false,
      isModalVisible4:false,
      timeFlag: false,
      isloading: false,
      loggedIn: false,
    };
    this.gotoMain = this.gotoMain.bind(this)
  }

  componentDidMount = async() => {
    await AsyncStorage.setItem('usertype', "consumer");
  }

  NetworkSensor = async () => {
    await this.setState({
      timeFlag: true,
      isLoading: false
    })
    alert('network error')
  }

  changefirst = () => {
    if(this.state.isConsumers){
      this.change_logo(3)
    } else {
      this.change_logo(1)
    }
  }

  changeSecond = async() => {
    if(!this.state.isDispensaries){
      this.change_logo(2)
    } else {
      this.change_logo(3)
    }
  }

  change_logo= async(logo_num)=>{
    switch(logo_num){
      case 1:
        await this.setState({isDispensaries:false, isDriver:false, isConsumers:true})
        await AsyncStorage.setItem('usertype', "consumer");
        this.ChangeState();
        break;
      case 2:
        await this.setState({isDispensaries:true, isDriver:false, isConsumers:false})
        this.ChangeState();
        await AsyncStorage.setItem('usertype', "dispensaries");
        break;
      case 3:
        await this.setState({isDispensaries:false, isDriver:true, isConsumers:false})
        this.ChangeState();
        await AsyncStorage.setItem('usertype', "driver");
        break;
    }
    usertype = (await AsyncStorage.getItem("usertype")).toString();
  }

  ChangeState = async() => {
    if(this.state.isDispensaries){
      await this.setState({logo_image:seller_logo, logo_title:'for dispensaries'})
    } else if(this.state.isDriver){
      await this.setState({logo_image:driver_logo, logo_title:'for drivers'})
    } else if(this.state.isConsumers){
      await this.setState({logo_image:consumers_logo, logo_title:'for consumers'})
    }
  }

  

  gotoSignUp = () => {
    if(this.state.isDispensaries){
      this.props.navigation.navigate("DispensariesSignupScreen")
    } else if(this.state.isDriver){
      this.props.navigation.navigate("DriverSignupScreen")
    } else if(this.state.isConsumers){
      this.props.navigation.navigate("SignUpScreen")
    }
  }

  routing = () => {
    const {email, password} = this.state
    const self=this;
    if (self.state.isDriver === true) {
      return self.props.navigation.navigate('Driver')
    } else { 
      if(email == ""){
        self.setState({ isModalVisible1: true })
      }else if (reg.test(email) === false) {
        self.setState({ isModalVisible2: true })
      }else if(password == ""){
        self.setState({ isModalVisible3: true })
      }
      else if (reg_strong.test(password) === false){
        self.setState({ isModalVisible4: true })
      } else{
        var myTimer = setTimeout(function () { self.NetworkSensor() }.bind(self), 25000)
        self.setState({ isLoading: true })
        Firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(user){
          self.setState({ isLoading: false })
          clearTimeout(myTimer)
          self.props.navigation.navigate('Main')
        })
        .catch((error) => {
          console.log(error)
        }) 
      }
      
    }
  }

  gotoMain(){
    console.log("sdfsdfsdfdfdfdfdf++++++++++++++++++")
    // return this.props.navigation.navigate('Main')
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.isLoading}
          textContent={'Logging in...'}
          textStyle={{ color: 'white' }}
        />
        <ScrollView style={{width:'100%'}}>
          <View style={styles.container}>
            <Image source={this.state.logo_image} resizeMode='stretch' style={styles.logoImage} />
            <Text style={styles.logoTxt}>{this.state.logo_title}</Text>
            <View style={styles.inputArea}>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/email.png')} resizeMode='stretch' style={styles.InputImage} />
                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder={this.state.isDispensaries?"Dispensary Email Address":"Email Address"} onChangeText={(text)=>{this.setState({email:text})}}></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/password.png')} resizeMode='stretch' style={styles.InputImage1} />
                <TextInput secureTextEntry={true} style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Password"  onChangeText={(text)=>{this.setState({password:text})}}></TextInput>
              </View>
              <TouchableOpacity style={styles.forgotBtn} onPress={()=>this.props.navigation.navigate("ForgotPasswordScreen")}>
                <Text style={{fontFamily:'Poppins-Regular',color:'#7E7E7E', fontSize:13}}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.signinBtn} onPress={()=>{this.routing()}}>
                <Text style={styles.signinTxt1}>Sign in</Text>
              </TouchableOpacity>
              <Text style={styles.dontaccountTxt}>Don't have an account?</Text>
              <TouchableOpacity style={{...styles.forgotBtn, alignItems:'center', marginTop:5}} onPress={()=>{this.gotoSignUp()}}>
                <Text style={styles.signinTxt}>Sign up</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputArea}>
              <TouchableOpacity style={styles.wantBtn} onPress={()=>{this.changefirst()}}>
                <Text style={styles.wantTxt}>{this.state.isConsumers?"Want to drive with us?":"Want to buy from us?"}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.wantBtn} onPress={()=>{this.changeSecond()}}>
                <Text style={styles.wantTxt}>{!this.state.isDispensaries?"Want to sell with us?":"Want to drive with us?"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height:50}}></View>
        </ScrollView>
        <Modal isVisible={this.state.isModalVisible1}>
          <View style={styles.modalView}>
              <Text style={styles.TitleTxt1}>OOPS!</Text>
              <Text style={styles.Description}>Please input your email address</Text>
              <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible1: false })}>
                  <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
              </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible2}>
          <View style={styles.modalView}>
              <Text style={styles.TitleTxt1}>OOPS!</Text>
              <Text style={styles.Description}>Email type error, Please type again</Text>
              <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible2: false })}>
                  <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
              </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible3}>
          <View style={styles.modalView}>
              <Text style={styles.TitleTxt1}>OOPS!</Text>
              <Text style={styles.Description}>Please input your password</Text>
              <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible3: false })}>
                  <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
              </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible4}>
            <View style={styles.modalView1}>
                <Text style={styles.TitleTxt1}>OOPS!</Text>
                <View style={{width:"95%", alignSelf:'center'}}>
                    <Text style={{...styles.Description, textAlign:'center'}}>
                        Password must contain following:
                    </Text>
                    <Text style={styles.Description1}>
                        A lowercase letter{'\n'}
                        A capital letter{'\n'}
                        A number{'\n'}
                        A special character{'\n'}
                        Minimum 8 characters
                    </Text>
                </View>
                <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible4: false })}>
                    <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
                </TouchableOpacity>
            </View>
        </Modal>
      </View>
    );
  }
}
