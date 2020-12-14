import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modalbox';

import {styles} from '../../components/styles'

import NonImage from '../../assets/iamges/personImage.png'
import uncheckImage from '../../assets/iamges/uncheckImage.png'
import checkImage from '../../assets/iamges/checkImage.png'

const options = {
  title: 'Choose Photo',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library'
}

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: NonImage,
      ischecked:false,
      checkImage:checkImage,
      uncheckImage:uncheckImage,
      modalVisible: false,
    };
  }

  closeModal = () => {
    this.refs.modal6.close();
    // this.props.navigation.navigate('LoginScreen');
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
            <View style={{width:'100%', alignItems:'center', marginTop:Platform.OS=='ios'?40:20}}>
                <View style={styles.personUploadgImage}>
                    <View style={styles.personImageArea}>
                      <View style={styles.personImageArea1}>
                        <Image source={this.state.avatarSource} resizeMode='cover' style={styles.personImage} />
                      </View>
                    </View>
                    <TouchableOpacity style={{...styles.addBtn, bottom:50}} onPress={() => { this.chooseImage() }}>
                        <Image source={require('../../assets/iamges/addImage.png')} resizeMode='stretch' style={styles.addImage} />
                    </TouchableOpacity>
                    <Text style={{...styles.inputTxt, color:'#121214', alignSelf:'center', marginTop:20}}>John H, 25</Text>
                </View>
            </View>
            <View style={styles.inputArea}>
              <TouchableOpacity style={styles.inputItem} onPress={()=>{this.props.navigation.navigate("ProfileInfoScreen")}}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <Text style={{...styles.inputTxt, color:'#7a7a7b'}}>Profile Information</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputItem}  onPress={()=>{this.props.navigation.navigate("OrderHistoryScreen")}}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <Text style={{...styles.inputTxt, color:'#7a7a7b'}}>Order History</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputItem} onPress={() => this.refs.modal6.open()}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2}/>
                <Text style={{...styles.inputTxt, color:'#7a7a7b'}}>Contact Support</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputItem} onPress={()=>{this.props.navigation.navigate('LoginScreen')}}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <Text style={{...styles.inputTxt, color:'#7a7a7b'}}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height:150}}></View>
        </ScrollView>
        <Modal style={styles.modal1} position={"bottom"} ref={"modal6"} swipeArea={20}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => {this.closeModal()}}>
                <Image source={require('../../assets/iamges/close.png')} resizeMode='stretch' style={styles.closeImage} />
            </TouchableOpacity>
            <Text style={styles.MessageTxt}>Message</Text>
            <TextInput style={styles.contactlInput} multiline={true} placeholderTextColor="#BCBCBC" placeholder={'Account ID 17YGBEYG57272\nType here...'} />
            <View style={styles.ModalBtnArea}>
                <TouchableOpacity style={styles.modalBackBtn}  onPress={() => {this.closeModal()}}>
                    <View style={styles.backArea}>
                        <Text style={styles.modalBackTxt}>Back</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sendBtn}  onPress={() => {this.closeModal()}}>
                    <Text style={styles.sendTxt}>Send</Text>
                </TouchableOpacity>
            </View>
        </Modal>
      </View>
    );
  }
}
