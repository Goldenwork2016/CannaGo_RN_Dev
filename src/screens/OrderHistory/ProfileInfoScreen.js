import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';


import {styles} from '../../components/styles'

import NonImage from '../../assets/iamges/personImage.png'
import uncheckImage from '../../assets/iamges/uncheckImage.png'
import checkImage from '../../assets/iamges/checkImage.png'

const options = {
  title: 'Choose Photo',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library'
}


export default class ProfileInfoScreen extends Component {
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
                    <Image source={require('../../assets/iamges/backImage.png')} resizeMode='stretch' style={styles.backImage} />
                </TouchableOpacity>
                <View style={styles.personUploadgImage}>
                    <Text style={{...styles.inputTxt, color:'#707070', alignSelf:'center', marginTop:40, fontSize:24}}>Profile Information</Text>
                    <Text style={{...styles.inputTxt, color:'#707070', alignSelf:'center', marginTop:70, fontSize:18}}>Welcome John H, 25</Text>
                </View>
            </View>
            <View style={styles.inputArea}>
              <TouchableOpacity style={styles.inputItem}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <Text style={{...styles.inputTxt, color:'#7a7a7b'}}>Phone Number: 786 7821 1232</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputItem}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <Text style={{...styles.inputTxt, color:'#7a7a7b'}}>Email: JohnH@gmail.com</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputItem}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <Text style={{...styles.inputTxt, color:'#7a7a7b'}}>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputItem}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <Text style={{...styles.inputTxt, color:'#7a7a7b'}}>Update ID</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputItem}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <Text style={{...styles.inputTxt, color:'#7a7a7b'}}>Deactivate Account</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height:50}}></View>
        </ScrollView>
      </View>
    );
  }
}
