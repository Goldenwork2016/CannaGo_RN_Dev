import React, { Component } from 'react';
import { View, Text, Image, ScrollView, FlatList, Dimensions, RefreshControl } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Firebase from '../../../config/firebase'

import { func, string, bool, object, array } from "prop-types";
import { connect } from "react-redux";
import { load } from "./../../store/reducers/user";

import { styles } from '../../components/styles';
const width = Dimensions.get('screen').width * 0.9 / 2 - 20;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usertype: 'consumer',
      real_data: [],
      userId: Firebase.auth().currentUser.uid,
      contentList: [
        {
          id: 1,
          Title: 'Cannabis Station',
          ImageUrl: require('../../assets/iamges/storeImage1.png'),
          price: "Store's pricing: $$",
          time: "Store's Hours Today: 9am - 9pm",
        },
        {
          id: 2,
          Title: 'Harvest',
          ImageUrl: require('../../assets/iamges/storeImage3.png'),
          price: "Store's pricing: $$",
          time: "Store's Hours Today: 10am - 15pm",
        },
        {
          id: 3,
          Title: 'Sunnyside',
          ImageUrl: require('../../assets/iamges/storeImage2.png'),
          price: "Store's pricing: $$",
          time: "Store's Hours Today: 9am - 5pm",
        },
        {
          id: 4,
          Title: 'SUMMER READY',
          ImageUrl: require('../../assets/iamges/storeImage1.png'),
          price: "Store's pricing: $$",
          time: "Store's Hours Today: 8am - 7pm",
        },
      ],
      contentList1: [
      ],
      refreshing:false
    };
  }

  componentDidMount = async () => {
    const { real_data } = this.props
    console.log("real++++++", real_data)
    const usertype = await AsyncStorage.getItem("usertype");
    await this.setState({ usertype: usertype })
    // var data = []
    // var row
    // Firebase.database()
    //     .ref('Items')
    //     .once("value")
    //     .then(snapshot => {
    //       snapshot.forEach(element => {
    //         row = {
    //           Description: element.val().Description,
    //           GpriceValue: element.val().GpriceValue,
    //           Tag: element.val().Tag,
    //           feeValue: element.val().feeValue,
    //           id: element.val().id,
    //           itemImage: element.val().itemImage,
    //           itemNum1: element.val().itemNum1,
    //           priceValue: element.val().priceValue,
    //           productName: element.val().productName
    //         } 
    //         data.push(row)  
    //       });  
    //       console.log(data)
    //       this.setState({
    //         real_data: data,

    //       });
    //     });


    // Firebase.database()
    // .ref("Items")
    // .on("value", (snapshot) => {
    //   data = []
    //   snapshot.forEach(element => {
    //     row = {
    //       Description: element.val().Description,
    //       GpriceValue: element.val().GpriceValue,
    //       Tag: element.val().Tag,
    //       feeValue: element.val().feeValue,
    //       id: element.val().id,
    //       itemImage: element.val().itemImage,
    //       itemNum1: element.val().itemNum1,
    //       priceValue: element.val().priceValue,
    //       productName: element.val().productName
    //     } 
    //     data.push(row)  
    //   });  
    //   console.log(data)
    //   this.setState({
    //     real_data: data,

    //   });
    // })  
  }

  _onRefresh = () =>{
    this.setState({refreshing:true})
    const { real_data } = this.props
    this.setState({refreshing:false})
  }

  _rendermakelist({ item, index }) {
    return (
      <TouchableOpacity style={styles.StoreItem} onPress={() => { this.props.navigation.navigate("TouchableOpacity") }}>
        <Text style={styles.homeTitle}> {item.Title} </Text>
        <Image source={item.ImageUrl} resizeMode='stretch' style={styles.storeImage} />
        <View style={styles.storeDes}>
          <Text style={styles.desTxt}>{item.price}</Text>
          <Text style={styles.desTxt}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { real_data } = this.props
    return (
      <View style={{ flex: 1, alignItems: "center", }}>
        {this.state.usertype == "consumer" ?
          <ScrollView style={{ width: '100%', borderColor: 'white' }}>
            <View style={{ ...styles.container, paddingTop: 30 }}>
              <FlatList
                // showsVerticalScrollIndicator={true}
                style={{ width: '100%' }}
                numColumns={1}
                data={this.state.contentList}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.StoreItem} onPress={() => { this.props.navigation.navigate("ProductScreen") }}>
                    <Text style={styles.homeTitle}> {item.Title} </Text>
                    <Image source={item.ImageUrl} resizeMode='stretch' style={styles.storeImage} />
                    <View style={styles.storeDes1}>
                      <Text style={styles.desTxt}>{item.price}</Text>
                      <Text style={styles.desTxt}>{item.time}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => `${item.id}`}
              />
            </View>
            <View style={{ height: 150, backgroundColor: 'white' }}></View>
          </ScrollView> :
          <View style={{ paddingTop: Platform.OS === 'ios' ? 70 : 30, backgroundColor: 'white', flex: 1, width: '100%' }}>
            <Text style={{ ...styles.CartTitle, marginTop: Platform.OS == 'ios' ? 7 : -10 }}>Your Store Front</Text>
            <TouchableOpacity style={styles.addItemBtn} onPress={() => { this.props.navigation.navigate("AddStoreItemScreen") }}>
              <Image source={require('../../assets/iamges/addImage.png')} resizeMode='stretch' style={styles.addImage} />
            </TouchableOpacity>
            <View style={{ paddingHorizontal: '5%', height: '100%', paddingBottom: Platform.OS == 'ios' ? 150 : 100, width: '100%' }}>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this._onRefresh()}
                  />
                }
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                // showsVerticalScrollIndicator={true}
                data={real_data.length == 0 ? this.state.contentList1 : real_data}
                renderItem={({ item }) => (
                  <TouchableOpacity style={{ width: width, height: 201, marginHorizontal: 10, marginTop: 30 }} onPress={() => { this.props.navigation.navigate('UpdateItemScreen', { item: item }) }}>
                    <View style={{ justifyContent: 'center', height: 134, alignItems: 'center', borderWidth: 2, borderColor: '#61D273', borderTopLeftRadius:30 }}>
                      <Image source={real_data.length == 0 ? item.ImageUrl : { uri: item.itemImage }} resizeMode='stretch' style={{...styles.productImage,borderTopLeftRadius: Platform.OS === 'ios' ? 30 : 60}} />
                      <Text style={styles.desTxt1}>$ {parseFloat(item.priceValue).toFixed(2)}</Text>
                    </View>
                    <View style={styles.storeDes}>
                      <Text style={styles.desTxt}>{item.productName}</Text>
                      <TouchableOpacity>
                        <Image source={require('../../assets/iamges/rightArror.png')} resizeMode='stretch' style={{ height: 16, width: 16, marginTop: 10 }} />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => `${item.id}`}
              />
            </View>
          </View>
        }
      </View>
    );
  }
}

HomeScreen.propTypes = {
  load: func,
  real_data: array,
};

const mapDispatchToProps = dispatch => ({
  load: (data) => dispatch(load(data)),
});

const mapStateToProps = ({ user }) => ({
  real_data: user.real_data,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
