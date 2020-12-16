import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {styles} from '../../components/styles'

import NonImage from '../../assets/iamges/product4.png'
import uncheckImage from '../../assets/iamges/uncheckImage.png'
import checkImage from '../../assets/iamges/checkImage.png'

const options = {
  title: 'Choose Photo',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library'
}

export default class UpdateItemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: NonImage,
      ischecked:false,
      checkImage:checkImage,
      uncheckImage:uncheckImage,
      itemNum1: 6,
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

  Addcart = () => {
    this.setState({itemNum1:this.state.itemNum1 + 1})
  }

  Minuscart = async() => {
    await this.setState({itemNum1:this.state.itemNum1 - 1})
    if(this.state.itemNum1 <= 0){
      this.setState({itemNum1:0})
    }
  }

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
            <Text style={{...styles.CartTitle, marginTop:Platform.OS=='ios'?7:-10}}>Edit Item in Your Store</Text>
            <View style={{width:'100%', alignItems:'center', marginTop:40}}>
                <TouchableOpacity style={styles.backBtn} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image source={require('../../assets/iamges/backImage.png')} resizeMode='stretch' style={styles.backImage} />
                </TouchableOpacity>
                <View style={styles.AddItemImage}>
                    <Image source={this.state.avatarSource} resizeMode='cover' style={styles.storeImage2} />
                    <TouchableOpacity style={styles.addStoreBtn} onPress={() => { this.chooseImage() }}>
                        <Image source={require('../../assets/iamges/cameraImage.png')} resizeMode='stretch' style={styles.addImage} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', marginTop:50}}>
                <Text style={styles.quantityNum}>Quantity in Stock</Text>
                <View style={{...styles.countItem, marginTop:0}}>
                    <TouchableOpacity style={styles.cartAccountArea} onPress={()=>{this.Minuscart()}}>
                    <Text style={styles.cartAddBtn}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.cartAccountArea}>
                    <Text style={styles.cartAddBtn}>{this.state.itemNum1}</Text>
                    </View>
                    <TouchableOpacity style={styles.cartAccountArea} onPress={()=>{this.Addcart()}}>
                    <Text style={styles.cartAddBtn}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flexDirection:'row', width:'90%', justifyContent:'space-between'}}>
                <View style={{...styles.inputArea, width:'28%'}}>
                    <Text style={{...styles.quantityNum, textAlign:'center', marginBottom:10}}>Our fees</Text>
                    <View style={{...styles.inputItem, alignItems:'center'}}>
                        <TextInput style={{...styles.inputTxt, textAlign:'center'}} placeholderTextColor="#7a7a7b" placeholder="$12.90"></TextInput>
                    </View>
                </View>
                <View style={{...styles.inputArea, width:'30%'}}>
                    <Text style={{...styles.quantityNum, textAlign:'center', marginBottom:10}}>Product Price</Text>
                    <View style={styles.inputItem}>
                        <TextInput style={{...styles.inputTxt, textAlign:'center'}} placeholderTextColor="#7a7a7b" placeholder="$15.33"></TextInput>
                    </View>
                </View>
                <View style={{...styles.inputArea, width:'30%'}}>
                    <Text style={{...styles.quantityNum, textAlign:'center', marginBottom:10}}>Gross Price</Text>
                    <View style={styles.inputItem}>
                        <TextInput style={{...styles.inputTxt, textAlign:'center'}} placeholderTextColor="#7a7a7b" placeholder="$13.55"></TextInput>
                    </View>
                </View>
            </View>
            <View style={{...styles.inputArea, marginTop:0}}>
              <Text style={{...styles.quantityNum, marginBottom:10}}>Name of Product</Text>
              <View style={styles.inputItem}>
                <TextInput style={{...styles.inputTxt, marginLeft:20}} placeholderTextColor="#000000" placeholder="Enter items's Name"></TextInput>
              </View>
              <Text style={{...styles.quantityNum, marginBottom:10}}>Tags</Text>
              <View style={styles.inputItem}>
                <TextInput style={{...styles.inputTxt, marginLeft:20}} placeholderTextColor="#000000" placeholder="ECBD, Flower,CBD Plant, CBD Bud"></TextInput>
              </View>
              <Text style={{...styles.quantityNum, marginBottom:10}}>Description</Text>
              <View style={styles.ContentItem}>
                <TextInput style={styles.specialInput} multiline={true} placeholderTextColor="#000000" placeholder="Lorem ipsum, or lipsum as it is sometimes known, Lorem ipsum, or lipsum as it is sometimes known, " />
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:-20}}>
                <TouchableOpacity style={{...styles.signinBtn, backgroundColor:"white", width:128}} onPress={()=>{this.props.navigation.navigate("HomeScreen")}}>
                  <Text style={{...styles.signinTxt1, color:"#CD5D5D"}}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.signinBtn, backgroundColor:"#3EA5E1", width:128}} onPress={()=>{this.props.navigation.navigate("HomeScreen")}}>
                  <Text style={styles.signinTxt1}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{height:150}}></View>
        </ScrollView>
      </View>
    );
  }
}
