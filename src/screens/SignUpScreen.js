import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {styles} from '../components/styles'

import NonImage from '../assets/iamges/personImage.png'
import uncheckImage from '../assets/iamges/uncheckImage.png'
import checkImage from '../assets/iamges/checkImage.png'

const options = {
  title: 'Choose Photo',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library'
}

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: NonImage,
      ischecked:false,
      checkImage:checkImage,
      uncheckImage:uncheckImage,
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

  checkfun = async() =>{
    await this.setState({ischecked:!this.state.ischecked});
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{width:'100%'}}>
          <View style={styles.container}>
            <View style={{width:'100%', alignItems:'center', marginTop:40}}>
                <TouchableOpacity style={styles.backBtn} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image source={require('../assets/iamges/backImage.png')} resizeMode='stretch' style={styles.backImage} />
                </TouchableOpacity>
                <View style={styles.personUploadgImage}>
                    <View style={styles.personImageArea}>
                      <View style={styles.personImageArea1}>
                        <Image source={this.state.avatarSource} resizeMode='stretch' style={styles.personImage} />
                      </View>
                    </View>
                    <TouchableOpacity style={styles.addBtn} onPress={() => { this.chooseImage() }}>
                        <Image source={require('../assets/iamges/addImage.png')} resizeMode='stretch' style={styles.addImage} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.inputArea}>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/email.png')} resizeMode='stretch' style={styles.InputImage} />
                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Email Address"></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/password.png')} resizeMode='stretch' style={styles.InputImage1} />
                <TextInput secureTextEntry={true} style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Password"></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/password.png')} resizeMode='stretch' style={styles.InputImage1} />
                <TextInput secureTextEntry={true} style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Retype password"></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Mobile Number"></TextInput>
              </View>
              <TouchableOpacity style={styles.inputItem}>
                <Image source={require('../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <Text style={{...styles.inputTxt, color:'#7a7a7b'}}>Scan Driver's License</Text>
                <Image source={require('../assets/iamges/arrow-left.png')} resizeMode='stretch' style={styles.arrowleft} />
              </TouchableOpacity>
              <View style={styles.TermsArea}>
                <TouchableOpacity style={styles.forgotBtn1} onPress={()=>{this.checkfun()}}>
                  <Image source={this.state.ischecked?this.state.checkImage:this.state.uncheckImage} resizeMode='stretch' style={styles.uncheckImage}  />
                </TouchableOpacity>
                <Text style={styles.termsTxt}>By checking this I agree to CannaGo's  </Text>
                <TouchableOpacity style={styles.forgotBtn1}>
                  <Text style={{color:'#61D273', fontSize:10, fontFamily:'Poppins-Regular'}}>Terms & Conditions</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.signinBtn} onPress={()=>{this.props.navigation.navigate("Main")}}>
                <Text style={styles.signinTxt1}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height:50}}></View>
        </ScrollView>
      </View>
    );
  }
}
