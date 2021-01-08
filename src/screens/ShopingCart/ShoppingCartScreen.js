import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground, TextInput, Dimensions, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modalbox';

import { styles } from '../../components/styles'

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class ShoppingCartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      isEmpty: true,
      itemNum1: 2,
      itemNum2: 1,
      usertype: 'consumer',
    };
  }
  componentDidMount = async () => {
    const usertype = await AsyncStorage.getItem("usertype");
    await this.setState({ usertype: usertype })
  }

  closeModal = () => {
    this.refs.modal6.close();
    // this.props.navigation.navigate('LoginScreen');
  }

  GoBack = () => {
    this.props.navigation.navigate("ProductDetailScreen")
  }

  Addcart = () => {
    this.setState({ itemNum1: this.state.itemNum1 + 1 })
  }

  Minuscart = async () => {
    await this.setState({ itemNum1: this.state.itemNum1 - 1 })
    if (this.state.itemNum1 <= 0) {
      this.setState({ itemNum1: 0 })
    }
  }

  Addcart1 = () => {
    this.setState({ itemNum2: this.state.itemNum2 + 1 })
  }

  Minuscart1 = async () => {
    await this.setState({ itemNum2: this.state.itemNum2 - 1 })
    if (this.state.itemNum2 <= 0) {
      this.setState({ itemNum2: 0 })
    }
  }

  chageState = async () => {
    await this.setState({ isEmpty: false })
  }

  render() {
    return (
      <View style={{ ...styles.container, justifyContent: 'center' }}>
        {this.state.usertype == "consumer" ?
          this.state.isEmpty ?
            <View style={{ alignItems: 'center', height: '100%', justifyContent: 'center' }}>
              <Text style={{ ...styles.CartTitle, marginTop: Platform.OS == 'ios' ? 7 : -10 }}>Cart</Text>
              <TouchableOpacity onPress={() => { this.chageState() }}>
                <Image source={require('../../assets/iamges/plusImage.png')} resizeMode='stretch' style={styles.plusImage} />
              </TouchableOpacity>
              <Text style={{ ...styles.AddShopiingTxt, color: '#414041' }}>Shopping Cart Empty</Text>
            </View>
            :
            <View style={{ width: '100%', flex: 1, alignItems: 'center' }}>
              <ScrollView style={{ width: '100%', flex: 1 }}>
                <View style={{ ...styles.container, flex: 1 }}>
                  <View style={{ width: '100%', alignItems: 'center', marginTop: Platform.OS == 'ios' ? 55 : 25 }}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => { this.GoBack() }}>
                      <Image source={require('../../assets/iamges/backImage.png')} resizeMode='stretch' style={styles.backImage} />
                    </TouchableOpacity>
                    <Text style={{ ...styles.DetailTitle, marginTop: 7 }}>Cart</Text>
                    <View style={styles.cartItemArea}>
                      <View style={styles.cartImage}>
                        <Image source={require('../../assets/iamges/product3.png')} resizeMode='stretch' style={styles.productCartImage} />
                      </View>
                      <View>
                        <Text style={styles.productDescription}>Just CBD Gummies</Text>
                        <Text style={{ ...styles.productDescription, color: "#61D273" }}>$ 24.99</Text>
                        <View style={styles.countItem}>
                          <TouchableOpacity style={styles.cartAccountArea} onPress={() => { this.Minuscart() }}>
                            <Text style={styles.cartAddBtn}>-</Text>
                          </TouchableOpacity>
                          <View style={styles.cartAccountArea}>
                            <Text style={styles.cartAddBtn}>{this.state.itemNum1}</Text>
                          </View>
                          <TouchableOpacity style={styles.cartAccountArea} onPress={() => { this.Addcart() }}>
                            <Text style={styles.cartAddBtn}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View style={styles.cartItemArea}>
                      <View style={styles.cartImage}>
                        <Image source={require('../../assets/iamges/product1.png')} resizeMode='stretch' style={styles.productCartImage} />
                      </View>
                      <View>
                        <Text style={styles.productDescription}>CBD Wax 10 ML</Text>
                        <Text style={{ ...styles.productDescription, color: "#61D273" }}>$ 15.00</Text>
                        <View style={styles.countItem}>
                          <TouchableOpacity style={styles.cartAccountArea} onPress={() => { this.Minuscart1() }}>
                            <Text style={styles.cartAddBtn}>-</Text>
                          </TouchableOpacity>
                          <View style={styles.cartAccountArea}>
                            <Text style={styles.cartAddBtn}>{this.state.itemNum2}</Text>
                          </View>
                          <TouchableOpacity style={styles.cartAccountArea} onPress={() => { this.Addcart1() }}>
                            <Text style={styles.cartAddBtn}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ height: 150 }}></View>
              </ScrollView>
              <TouchableOpacity style={styles.AddCartBtn1} onPress={() => { this.props.navigation.navigate("CheckOutScreen"), this.setState({ isEmpty: true }) }}>
                <Text style={styles.signinTxt1}>Next</Text>
              </TouchableOpacity>
            </View> :
          this.state.usertype == "dispensaries" ?
            <View style={{ backgroundColor: '#61D273', height: '100%', width: '100%' }}>
              <View style={{ ...styles.container, backgroundColor: '#61D273', position: 'absolute' }}>
                <View style={{ width: '100%', alignItems: 'center', marginTop: Platform.OS == 'ios' ? 60 : 40 }}>
                  <View style={styles.personUploadgImage}>
                    <Text style={{ ...styles.inputTxt, color: "white", alignSelf: 'center', marginTop: -30, fontSize: 28, fontFamily: 'Poppins-SemiBold' }}>Order Histroy</Text>
                  </View>
                </View>
              </View>
              <ImageBackground source={require('../../assets/iamges/orderBackgroudImage.png')} resizeMode='stretch' style={{ ...styles.backgroundImage, width: width * 0.9 }} >
                <ScrollView style={{ width: '100%' }}>
                  <View style={styles.historyItem}>
                    <Text style={styles.ItemHeader}>Order Placed 11/24/20,11:04 AM</Text>
                    <Text style={styles.ItemHeader}>Order Reference #FG1735UIWH7</Text>
                    <View style={styles.historyContent}>
                      <View style={styles.histroyImageArea}>
                        <Image source={require('../../assets/iamges/product3.png')} resizeMode='stretch' style={{ width: 60, height: 60 }} />
                      </View>
                      <View>
                        <Text style={styles.ItemHeader}>Just CBD Gummies</Text>
                        <Text style={styles.ItemHeader}>from Cannabis Station </Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.ItemHeader}>Quantity</Text>
                          <View style={styles.qualityArea}>
                            <Text style={styles.ItemHeader}>1</Text>
                          </View>
                        </View>
                        <Text style={{ ...styles.ItemHeader, color: '#61D273' }}>$12.55</Text>
                      </View>
                    </View>
                    <View style={styles.historyContent}>
                      <View style={styles.histroyImageArea}>
                        <Image source={require('../../assets/iamges/product2.png')} resizeMode='stretch' style={{ width: 70, height: 70 }} />
                      </View>
                      <View>
                        <Text style={styles.ItemHeader}>Just CBD Gummies</Text>
                        <Text style={styles.ItemHeader}>from Cannabis Station </Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.ItemHeader}>Quantity</Text>
                          <View style={styles.qualityArea}>
                            <Text style={styles.ItemHeader}>2</Text>
                          </View>
                        </View>
                        <Text style={{ ...styles.ItemHeader, color: '#61D273' }}>$15.00</Text>
                      </View>
                    </View>
                    {/* <Text style={{ ...styles.ItemHeader, textAlign: 'center', marginTop: 30 }}>Delivered 11/22/20, 10:32 AM</Text> */}
                    <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-between' }}>
                      <Text style={{ ...styles.ItemHeader, textAlign: 'center', marginTop: 10 }}>Product Total</Text>
                      <Text style={{ ...styles.ItemHeader, textAlign: 'center', marginTop: 10 }}>$27.55</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-between' }}>
                      <Text style={{ ...styles.ItemHeader, textAlign: 'center', marginTop: 10 }}>CannnaGo Service Fee</Text>
                      <Text style={{ ...styles.ItemHeader, textAlign: 'center', marginTop: 10 }}>-$8.26</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-between' }}>
                      <Text style={{ ...styles.ItemHeader, textAlign: 'center', marginTop: 10 }}>Your Payout</Text>
                      <Text style={{ ...styles.ItemHeader, textAlign: 'center', marginTop: 10, color: '#61D273' }}>$19.00</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity style={styles.orderBtn}>
                        <Text style={styles.OrderTxt}>Order Ready for Pickup</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style={{ ...styles.ReportTxt, marginTop: 7 }}>Don't have Item</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.historyItem}>
                    <Text style={styles.ItemHeader}>Order Placed 11/24/20,11:04 AM</Text>
                    <Text style={styles.ItemHeader}>Order Reference #HEYF71736JDH</Text>
                    <View style={styles.historyContent}>
                      <View style={styles.histroyImageArea}>
                        <Image source={require('../../assets/iamges/product1.png')} resizeMode='stretch' style={{ width: 60, height: 60 }} />
                      </View>
                      <View>
                        <Text style={styles.ItemHeader}>Just Pure Karma</Text>
                        <Text style={styles.ItemHeader}>from Cannabis Station </Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.ItemHeader}>Quantity</Text>
                          <View style={styles.qualityArea}>
                            <Text style={styles.ItemHeader}>2</Text>
                          </View>
                        </View>
                        <Text style={{ ...styles.ItemHeader, color: '#61D273' }}>$30.00</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-between' }}>
                      <Text style={{ ...styles.ItemHeader, textAlign: 'center', marginTop: 10 }}>Product Total</Text>
                      <Text style={{ ...styles.ItemHeader, textAlign: 'center', marginTop: 10 }}>$27.55</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-between' }}>
                      <Text style={{ ...styles.ItemHeader, textAlign: 'center', marginTop: 10 }}>CannnaGo Service Fee</Text>
                      <Text style={{ ...styles.ItemHeader, textAlign: 'center', marginTop: 10 }}>-$8.26</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-between' }}>
                      <Text style={{ ...styles.ItemHeader, textAlign: 'center', marginTop: 10 }}>Your Payout</Text>
                      <Text style={{ ...styles.ItemHeader, textAlign: 'center', marginTop: 10, color: '#61D273' }}>$19.00</Text>
                    </View>
                    {/* <View style={styles.historyContent}>
                      <View style={styles.histroyImageArea}>
                        <Image source={require('../../assets/iamges/product4.png')} resizeMode='stretch' style={{ width: 70, height: 70 }} />
                      </View>
                      <View>
                        <Text style={styles.ItemHeader}>Hemp Oil</Text>
                        <Text style={{ ...styles.ItemHeader, color: '#61D273' }}>$25</Text>
                      </View>
                    </View> */}
                    <Text style={{ ...styles.ItemHeader, textAlign: 'center',  }}>Order Completed 11/22/20, 10:32 AM</Text>
                    {/* <Text style={{ ...styles.ItemHeader, textAlign: 'center', marginTop: 10 }}>Total Amount: <Text style={{ color: '#61D273' }}>$50</Text></Text> */}
                    <TouchableOpacity onPress={() => this.refs.modal6.open()}>
                      <Text style={styles.ReportTxt}>Report an Issue</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ height: 200 }}></View>
                </ScrollView>
              </ImageBackground>
              <Modal style={styles.modal1} position={"bottom"} ref={"modal6"} swipeArea={20}>
                <TouchableOpacity style={styles.closeBtn} onPress={() => { this.closeModal() }}>
                  <Image source={require('../../assets/iamges/close.png')} resizeMode='stretch' style={styles.closeImage} />
                </TouchableOpacity>
                <Text style={styles.MessageTxt}>Message</Text>
                <TextInput style={styles.contactlInput} multiline={true} placeholderTextColor="#BCBCBC" placeholder={'Order Reference #FG1735UIWH7\nType here...'} />
                <View style={styles.ModalBtnArea}>
                  <TouchableOpacity style={styles.modalBackBtn} onPress={() => { this.closeModal() }}>
                    <View style={styles.backArea}>
                      <Text style={styles.modalBackTxt}>Back</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.sendBtn} onPress={() => { this.closeModal() }}>
                    <Text style={styles.sendTxt}>Send</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View> :
            <View style={{ backgroundColor: '#61D273', height: '100%', width: '100%' }}>
              <View style={{ ...styles.container, backgroundColor: '#61D273', position: 'absolute' }}>
                <View style={{ width: '100%', alignItems: 'center', marginTop: Platform.OS == 'ios' ? 60 : 40 }}>
                  <View style={styles.personUploadgImage}>
                    <Text style={{ ...styles.inputTxt, color: "white", alignSelf: 'center', marginTop: -30, fontSize: 28, fontFamily: 'Poppins-SemiBold' }}>Driver Histroy</Text>
                  </View>
                </View>
              </View>
              <ImageBackground source={require('../../assets/iamges/orderBackgroudImage.png')} resizeMode='stretch' style={{ ...styles.backgroundImage, width: width * 0.9 }} >
                <ScrollView style={{ width: '100%' }}>
                  <View style={styles.historyItem}>
                    <View style={styles.historyContent}>
                      <View style={styles.histroyImageArea}>
                        <Image source={require('../../assets/iamges/product3.png')} resizeMode='stretch' style={{ width: 60, height: 60 }} />
                      </View>
                      <View>
                        <Text style={styles.ItemHeader}>Victor N. Order</Text>
                        <Text style={{ ...styles.ItemHeader, color: '#61D273' }}>Earned $5.00 + $2.36 Tip</Text>
                        <Text style={styles.ItemHeader}>Date Completed 06/28/2019 </Text>
                      </View>
                    </View>
                    <TouchableOpacity style={{ marginTop: 30 }} onPress={() => this.refs.modal6.open()}>
                      <Text style={styles.ReportTxt}>Report an Issue</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.historyItem}>
                    <View style={styles.historyContent}>
                      <View style={styles.histroyImageArea}>
                        <Image source={require('../../assets/iamges/product3.png')} resizeMode='stretch' style={{ width: 60, height: 60 }} />
                      </View>
                      <View>
                        <Text style={styles.ItemHeader}>Meg F. Order</Text>
                        <Text style={{ ...styles.ItemHeader, color: '#61D273' }}>Earned $5.00 + $2.36 Tip</Text>
                        <Text style={styles.ItemHeader}>Date Completed 06/25/2019 </Text>
                      </View>
                    </View>
                    <TouchableOpacity style={{ marginTop: 30 }} onPress={() => this.refs.modal6.open()}>
                      <Text style={styles.ReportTxt}>Report an Issue</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ height: 200 }}></View>
                </ScrollView>
              </ImageBackground>
              <Modal style={styles.modal1} position={"bottom"} ref={"modal6"} swipeArea={20}>
                <TouchableOpacity style={styles.closeBtn} onPress={() => { this.closeModal() }}>
                  <Image source={require('../../assets/iamges/close.png')} resizeMode='stretch' style={styles.closeImage} />
                </TouchableOpacity>
                <Text style={styles.MessageTxt}>Message</Text>
                <TextInput style={styles.contactlInput} multiline={true} placeholderTextColor="#BCBCBC" placeholder={'Order Reference #FG1735UIWH7\nType here...'} />
                <View style={styles.ModalBtnArea}>
                  <TouchableOpacity style={styles.modalBackBtn} onPress={() => { this.closeModal() }}>
                    <View style={styles.backArea}>
                      <Text style={styles.modalBackTxt}>Back</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.sendBtn} onPress={() => { this.closeModal() }}>
                    <Text style={styles.sendTxt}>Send</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
        }
      </View>
    );
  }
}
