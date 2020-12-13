import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';

import {styles} from '../../components/styles'

import NonImage from '../../assets/iamges/productDetail1.png'

export default class OrderStatusScreen extends Component {
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
                        <Text style={styles.OrderStatusTitle}>Order Status</Text>
                    </View>
                    <View style={styles.statusArea}>
                        <View style={styles.orderStatusItem}>
                            <View style={styles.checkLineArea}>
                                <View style={styles.checkArea}>
                                    <Image source={require('../../assets/iamges/checkIcon.png')} resizeMode='stretch' style={styles.checkIcon} />
                                </View>
                                <View style={styles.lineArea}></View>
                            </View>
                            <View style={styles.orderStatus}>
                                <Text style={styles.statusTitle}>Order Placed</Text>
                                <Text style={styles.statusDescrition}>We have received your order.</Text>
                                <Text style={styles.statusDescrition}>11:20 AM, 11/20/2020</Text>
                            </View>
                        </View>
                        <View style={styles.orderStatusItem}>
                            <View style={styles.checkLineArea}>
                                <View style={styles.checkArea}>
                                    <Image source={require('../../assets/iamges/checkIcon.png')} resizeMode='stretch' style={styles.checkIcon} />
                                </View>
                                <View style={styles.lineArea}></View>
                            </View>
                            <View style={styles.orderStatus}>
                                <Text style={styles.statusTitle}>Order Confirmed</Text>
                                <Text style={styles.statusDescrition}>The store has confirmed your order</Text>
                                <Text style={styles.statusDescrition}>11:22 AM, 11/20/2020</Text>
                            </View>
                        </View>
                        <View style={styles.orderStatusItem}>
                            <View style={styles.checkLineArea}>
                                <View style={styles.checkArea}>
                                    <Image source={require('../../assets/iamges/checkIcon.png')} resizeMode='stretch' style={styles.checkIcon} />
                                </View>
                                <View style={styles.lineArea}></View>
                            </View>
                            <View style={styles.orderStatus}>
                                <Text style={styles.statusTitle}>Order En Route</Text>
                                <Text style={styles.statusDescrition}>Your order is being delivered</Text>
                                <Text style={styles.statusDescrition}>10:03 AM, 11/21/2020</Text>
                            </View>
                        </View>
                        <View style={styles.orderStatusItem}>
                            <View style={styles.checkLineArea}>
                                <View style={styles.checkArea}>
                                    {/* <Image source={require('../../assets/iamges/checkIcon.png')} resizeMode='stretch' style={styles.checkIcon} /> */}
                                </View>
                            </View>
                            <View style={styles.orderStatus}>
                                <Text style={styles.statusTitle}>Order Delivered</Text>
                                <Text style={styles.statusDescrition}>Your order has been dropped off. </Text>
                                <Text style={styles.statusDescrition}>10:32 AM, 11/21/2020</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{...styles.AddCartBtn, borderRadius:5, width:200}} onPress = {()=>{this.props.navigation.navigate("RateExperienceScreen")}}>
                            <Text style={styles.signinTxt1}>Message Driver</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{height:50}}></View>
            </ScrollView>
        </View>
    );
  }
}
