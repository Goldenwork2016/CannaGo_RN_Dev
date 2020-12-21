import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Firebase from '../config/Firebase'

import { styles } from '../components/styles'

import NonImage from '../assets/iamges/storeImage1.png'
import uncheckImage from '../assets/iamges/uncheckImage.png'
import checkImage from '../assets/iamges/checkImage.png'

const options = {
  title: 'Choose Photo',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library'
}

export default class DispensariesSignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: NonImage,
      ischecked: false,
      checkImage: checkImage,
      uncheckImage: uncheckImage,
      fristName: '',
      lastName: '',
      ownerEmail: '',
      ownerPhoneNum: '',
      password: '',
      conPassword: '',
      storeName: '',
      storePhoneNum: '',
      storeAdress: '',
      storeHours: '',
      companyName: '',
      fein: '',
      userType: 'dispensary'
    };
  }

  // chooseImage = () => {
  //   ImagePicker.showImagePicker(options, async (response) => {
  //       console.log('Response = ', response);
  //       if (response.didCancel) {
  //           console.log('User cancelled image picker');
  //       } else if (response.error) {
  //           console.log('ImagePicker Error: ', response.error);
  //       } else {
  //           console.log(response.uri)
  //           const source = { uri: response.uri };
  //           const URL = response.data;
  //       }
  //   });
  // }

  chooseImage = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({
          avatarSource: source
        });
      }
    });
  };

  checkfun = async () => {
    await this.setState({ ischecked: !this.state.ischecked });
  }

  // handleValueChange = (e) => {
  //   let nextState = {};
  //   nextState[e.target.name] = e.target.value;
  //   // console.log(nextState)
  //   this.setState(nextState);
  //   console.log(this.state.fir)
  // }

  SingUp = () => {
    alert("sdfsdfsdfsdf")
    const {fristName, lastName, ownerPhoneNum, ownerEmail, password, conPassword} = this.state;
    Firebase.auth()
      .createUserWithEmailAndPassword(ownerEmail, password)
      .then(function (result) {
        var user = Firebase.auth().currentUser;
        Firebase.database().ref('User_info/' + result.user.uid).update({
          email: ownerEmail,
          name: fristName,
          phoneNum: ownerPhoneNum,
          password: password,
        });
        // user.sendEmailVerification().then(function () {
        //   console.log('email sent!!!');// Email sent.
        //   this.showAlert("Created new account successfully! please check your email! if you login, you need email verification.");
        // }.bind(this)).catch(function (error) {
        //   console.log(error);
        // });
      }.bind(this)).catch(function (error) {
        // self.showAlert(error.message);
      });
  }

  render() {
    return (
      <View style={styles.container} >
        <ScrollView style={{ width: '100%' }}>
          <View style={styles.container}>
            <View style={{ width: '100%', alignItems: 'center', marginTop: 40 }}>
              <TouchableOpacity style={styles.backBtn} onPress={() => { this.props.navigation.goBack() }}>
                <Image source={require('../assets/iamges/backImage.png')} resizeMode='stretch' style={styles.backImage} />
              </TouchableOpacity>
              <View style={styles.storeUploadgImage}>
                <Image source={this.state.avatarSource} resizeMode='cover' style={styles.storeImage1} />
                <TouchableOpacity style={styles.addStoreBtn} onPress={() => { this.chooseImage() }}>
                  <Image source={require('../assets/iamges/cameraImage.png')} resizeMode='stretch' style={styles.addImage} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputArea}>
              <View style={styles.SignInfoArea}>
                <Text style={styles.SignInfoTxt}>Sign Up Information</Text>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <TextInput style={styles.inputTxt} name="fristName" value={this.state.fristName} placeholderTextColor="#7a7a7b" placeholder="First Name" onChangeText={(text) => { this.setState({ fristName: text }) }}></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Last Name" value={this.state.lastName} onChangeText={(text) => { this.setState({ lastName: text }) }}></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/email.png')} resizeMode='stretch' style={styles.InputImage} />
                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Owner's Email Address" value={this.state.ownerEmail} onChangeText={(text) => { this.setState({ ownerEmail: text }) }}></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Owner's Phone Number" value={this.state.ownerPhoneNum} onChangeText={(text) => { this.setState({ ownerPhoneNum: text }) }}></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/password.png')} resizeMode='stretch' style={styles.InputImage1} />
                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Password" value={this.state.password} onChangeText={(text) => { this.setState({ password: text }) }}></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/password.png')} resizeMode='stretch' style={styles.InputImage1} />
                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Retype password" value={this.state.conPassword} onChangeText={(text) => { this.setState({ conPassword: text }) }}></TextInput>
              </View>
              <View style={styles.SignInfoArea}>
                <Text style={styles.SignInfoTxt}>Dispensary Information</Text>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Dispensary Store Name"></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Dispensary's Phone Number"></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/position.png')} resizeMode='stretch' style={styles.InputImage3} />
                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Dispensary's Address"></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/position.png')} resizeMode='stretch' style={styles.InputImage3} />
                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Dispensary's Hours"></TextInput>
              </View>
              <View style={styles.TermsArea}>
                <TouchableOpacity style={styles.forgotBtn1} onPress={() => { this.checkfun() }}>
                  <Image source={this.state.ischecked ? this.state.checkImage : this.state.uncheckImage} resizeMode='stretch' style={styles.uncheckImage} />
                </TouchableOpacity>
                <Text style={{ ...styles.termsTxt, width: '90%', marginTop: 10 }}>By checking I am an authorized signatory of this business, with the power to commit to binding agreements</Text>
              </View>
              {/* <TouchableOpacity style={styles.inputItem}>
                <Image source={require('../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <Text style={{...styles.inputTxt, color:'#7a7a7b'}}>Scan Driver's License</Text>
                <Image source={require('../assets/iamges/arrow-left.png')} resizeMode='stretch' style={styles.arrowleft} />
              </TouchableOpacity> */}
              <View style={{ ...styles.SignInfoArea, marginTop: 20 }}>
                <Text style={styles.SignInfoTxt}>Tax Information</Text>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Business entity/Company name"></TextInput>
              </View>
              <Text style={{ ...styles.termsTxt, width: '90%', marginTop: -10, marginBottom: 10 }}>Ensure this matches the official tax documents for your business.</Text>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <TextInput style={{ ...styles.inputTxt, fontSize: 11 }} placeholderTextColor="#7a7a7b" placeholder="FEIN (Federal Employer Identification Number)"></TextInput>
              </View>
              <View style={styles.TermsArea}>
                <TouchableOpacity style={styles.forgotBtn1} onPress={() => { this.checkfun() }}>
                  <Image source={this.state.ischecked ? this.state.checkImage : this.state.uncheckImage} resizeMode='stretch' style={styles.uncheckImage} />
                </TouchableOpacity>
                <Text style={styles.termsTxt}>By checking this I agree to CannaGo's  </Text>
                <TouchableOpacity style={styles.forgotBtn1}>
                  <Text style={{ color: '#61D273', fontSize: 10, fontFamily: 'Poppins-Regular' }}>Terms & Conditions</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.signinBtn} onPress={() => { this.SingUp() }}>
                <Text style={styles.signinTxt1}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 50 }}></View>
        </ScrollView>
      </View>
    );
  }
}
