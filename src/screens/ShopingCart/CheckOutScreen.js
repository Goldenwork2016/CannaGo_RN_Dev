import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Dimensions, FlatList, Platform } from 'react-native';
import Modal from 'react-native-modalbox';
import Firebase from '../../../config/firebase'

import { styles } from '../../components/styles'

const height = Dimensions.get('screen').height;

export default class CheckOutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      isEmpty: false,
      cardNum: '',
      expired_date: '',
      userId: Firebase.auth().currentUser.uid,
      real_data: [],
      contentList: [],
      totalPrice:''
    };
  }

  componentDidMount = async () => {
    console.log(this.state.productId)
    console.log(this.state.storeId)

    Firebase.database()
      .ref("Carts/" + this.state.userId)
      .on("value", async (snapshot) => {
        console.log("cart++++++++++")
        console.log(snapshot)
        var data = []
        var row
        snapshot.forEach(element => {
          row = {
            'Description': element.val().Description,
            'GpriceValue': element.val().GpriceValue,
            'Tag': element.val().Tag,
            'feeValue': element.val().feeValue,
            'id': element.key,
            'itemImage': element.val().itemImage,
            'itemNum1': element.val().itemNum1,
            'priceValue': element.val().priceValue,
            'productName': element.val().productName,
            'coaImage': element.val().coaImage,
            'num': element.val().num,
          }
          data.push(row)
          console.log("_____________+++++++++++++_________________");
          console.log(data)
          console.log("_____________+++++++++++++_________________");
        })
        await this.setState({
          real_data: data,
        });
        // console.log(this.state.real_data)
        var totalPrice = 0;
        this.state.real_data.forEach(element => {
          var itemPrice = element.priceValue * element.num
          totalPrice = totalPrice + itemPrice
        })
        this.setState({
          totalPrice: totalPrice,
        });
      })
  }

  parseCardNumber = async (input) => {
    await this.setState({ cardNum: input })
    if (this.state.cardNum.length === 4) {
      await this.setState({ cardNum: this.state.cardNum + " " })
    }
    if (this.state.cardNum.length === 9) {
      await this.setState({ cardNum: this.state.cardNum + " " })
    }
    if (this.state.cardNum.length === 14) {
      await this.setState({ cardNum: this.state.cardNum + " " })
    }
    console.log(this.state.cardNum)
  }
  parseExpireDate = async (input) => {
    await this.setState({ expired_date: input })
    if (this.state.expired_date.length === 2) {
      await this.setState({ expired_date: this.state.expired_date + "/" })
    }
  }

  render() {
    const { real_data } = this.state
    return (
      <View style={{ ...styles.container, justifyContent: 'center' }}>
        <ScrollView style={{ width: '100%', flex: 1 }}>
          <View style={{ ...styles.container }}>
            <View style={{ width: '100%', alignItems: 'center', marginTop: Platform.OS == 'ios' ? 55 : 25 }}>
              <TouchableOpacity style={styles.backBtn} onPress={() => { this.props.navigation.goBack() }}>
                <Image source={require('../../assets/iamges/backImage.png')} resizeMode='stretch' style={styles.backImage} />
              </TouchableOpacity>
              <Text style={{ ...styles.DetailTitle, marginTop: 7 }}>PAYMENT METHOD</Text>
              <TouchableOpacity style={styles.paymethodAddBtn}>
                <Image source={require('../../assets/iamges/paymethodAdd.png')} resizeMode='stretch' style={styles.paymethodAdd} />
              </TouchableOpacity>
            </View>
            <View style={styles.paymenntArea}>
              <Text style={styles.OrderSummeryTxt}>Order Summery</Text>
              <View style={styles.orderContent}>
                <FlatList
                  style={{ width: '100%' }}
                  numColumns={1}
                  data={real_data.length == 0 ? this.state.contentList : real_data}
                  renderItem={({ item }) => (
                    // <TouchableOpacity style={styles.StoreItem} onPress={() => { this.props.navigation.navigate("ProductScreen", { storeId: item.id }) }}>
                    <View style={styles.ContentItem}>
                      <Text style={styles.ItemTxt}>{item.productName} X {item.num}</Text>
                      <Text style={styles.ItemTxt}>$ {parseFloat(item.priceValue * item.num).toFixed(2)}</Text>
                    </View>
                  )}
                  keyExtractor={item => `${item.id}`}
                />
                <View style={styles.ContentItem}>
                  <Text style={styles.ItemTxt}>Service Fee</Text>
                  <Text style={styles.ItemTxt}>$5.00</Text>
                </View>
                <View style={styles.ContentItem}>
                  <Text style={styles.ItemTxt}>State Tax</Text>
                  <Text style={styles.ItemTxt}>$ {((this.state.totalPrice+5) * 0.089).toFixed(2)}</Text>
                </View>
              </View>
              <View style={styles.ContentItem}>
                <Text style={styles.ItemTxt}>Total Amount</Text>
                <Text style={{ ...styles.ItemTxt, color: '#E47911' }}>$ {parseFloat(this.state.totalPrice +(this.state.totalPrice+5) * 0.089 +5).toFixed(2)}</Text>
              </View>
              <View style={styles.ContentItem}>
                <Text style={styles.ItemTxt}>Promo Code</Text>
              </View>
              <View style={styles.ContentItem}>
                <TextInput style={styles.PromoInput} placeholder="Type here" />
                <TouchableOpacity style={styles.ApplyBtn}>
                  <Text style={styles.applyBtnTxt}>Apply</Text>
                </TouchableOpacity>
              </View>
              <View style={{ ...styles.ContentItem, marginTop: 30 }}>
                <Text style={styles.ItemTxt}>Card Number</Text>
              </View>
              <View style={styles.ContentItem}>
                <TextInput keyboardType="number-pad" value={this.state.cardNum} onChangeText={(input) => { this.parseCardNumber(input) }} maxLength={19} style={styles.CardNumberInput} placeholderTextColor="#5E5E5E" placeholder="xxxx xxxx xxxx 1278" />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%' }}>
                  <View style={styles.ContentItem}>
                    <Text style={styles.ItemTxt}>Expiration Date</Text>
                  </View>
                  <View style={styles.ContentItem}>
                    <TextInput keyboardType="number-pad" value={this.state.expired_date} onChangeText={(input) => { this.parseExpireDate(input) }} maxLength={5} style={{ ...styles.CardNumberInput, width: 96 }} placeholderTextColor="#5E5E5E" placeholder="06/22" />
                  </View>
                </View>
                <View style={{ width: '50%' }}>
                  <View style={styles.ContentItem}>
                    <Text style={styles.ItemTxt}>CVC</Text>
                  </View>
                  <View style={styles.ContentItem}>
                    <TextInput style={{ ...styles.CardNumberInput, width: 96 }} keyboardType="number-pad" maxLength={3} placeholderTextColor="#5E5E5E" placeholder="071" />
                  </View>
                </View>
              </View>
              <View style={{ ...styles.ContentItem, marginTop: 10 }}>
                <Text style={styles.ItemTxt}>Drop off Address</Text>
              </View>
              <View style={styles.ContentItem}>
                <TextInput style={styles.CardNumberInput} placeholderTextColor="#5E5E5E" placeholder="8823 Normal Blvd, Atlanta,GA, 31390" />
              </View>
              <View style={{ ...styles.ContentItem, marginTop: 10 }}>
                <Text style={styles.ItemTxt}>Special request</Text>
              </View>
              <View style={styles.ContentItem}>
                <TextInput style={styles.specialInput} multiline={true} placeholderTextColor="#5E5E5E" placeholder="The gate code is #01234" />
              </View>
            </View>
            <TouchableOpacity style={{ ...styles.signinBtn, width: '85%', alignSelf: 'center' }} onPress={() => { this.props.navigation.navigate("OrderStatusScreen") }}>
              <Text style={styles.signinTxt1}>Check Out</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 150 }}></View>
        </ScrollView>
      </View>
    );
  }
}
