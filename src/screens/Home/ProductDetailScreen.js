import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';

import {styles} from '../../components/styles'

import NonImage from '../../assets/iamges/productDetail1.png'

export default class ProductDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: NonImage,
      ischecked:false,
    };
  }

  render() {
    return (
        <View style={styles.container}>
            <ScrollView style={{width:'100%'}}>
                <View style={styles.container}>
                    <View style={{width:'100%', alignItems:'center', marginTop:55}}>
                        <TouchableOpacity style={styles.backBtn} onPress={()=>{this.props.navigation.goBack()}}>
                            <Image source={require('../../assets/iamges/backImage.png')} resizeMode='stretch' style={styles.backImage} />
                        </TouchableOpacity>
                        <View style={styles.personUploadgImage}>
                            <Text style={styles.DetailTitle}>Details</Text>
                            <Image source={this.state.avatarSource} resizeMode='stretch' style={styles.productDetailImage} />
                        </View>
                    </View>
                    <View style={styles.inputArea}>
                    <View style={{width:'90%',marginLeft:'5%'}}>
                        <Text style={styles.productDescription}>Name: Just CBD Gummies</Text>
                        <Text style={styles.productDescription}>Price: $ 24.99</Text>
                    </View>
                    <View style={{width:'90%',marginLeft:'5%', marginTop:50}}>
                        <Text style={{...styles.productDescription, fontSize:16}}>Description</Text>
                        <Text style={{...styles.productDescription, fontSize:12, marginTop:10, color:'#707070'}}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic designs. The passage is attributed to an </Text>
                    </View>
                    <TouchableOpacity style={styles.AddCartBtn} onPress={()=>{this.props.navigation.navigate("ShoppingCartScreen")}}>
                        <Text style={styles.signinTxt1}>Add to Cart</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
  }
}
