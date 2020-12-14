import React, { Component } from 'react';
import { View, Text, Image, ScrollView, FlatList, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import {styles} from '../../components/styles';
const width = Dimensions.get('screen').width*0.9/2-20;

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        usertype:'consumer',
        contentList: [
            {
              id:1,
              Title: 'Cannabis Station',
              ImageUrl: require('../../assets/iamges/storeImage1.png'),
              price: "Store's pricing: $$",
              time: "Store's Hours Today: 9am - 9pm",
            },
            {
              id:2,
              Title: 'Harvest',
              ImageUrl: require('../../assets/iamges/storeImage3.png'),
              price: "Store's pricing: $$",
              time: "Store's Hours Today: 10am - 15pm",
            },
            {
              id:3,
              Title: 'Sunnyside',
              ImageUrl: require('../../assets/iamges/storeImage2.png'),
              price: "Store's pricing: $$",
              time: "Store's Hours Today: 9am - 5pm",
            },
            {
              id:4,
              Title: 'SUMMER READY',
              ImageUrl: require('../../assets/iamges/storeImage1.png'),
              price: "Store's pricing: $$",
              time: "Store's Hours Today: 8am - 7pm",
            },
          ],
          contentList1: [
            {
              id:1,
              Title: 'Cannabis Station',
              ImageUrl: require('../../assets/iamges/product1.png'),
              price: "$30.00",
              Description: "John Doe’s CBD Oil",
            },
            {
              id:2,
              Title: 'Harvest',
              ImageUrl: require('../../assets/iamges/product2.png'),
              price: "$30.00",
              Description: "Pure Karma",
            },
            {
              id:3,
              Title: 'Sunnyside',
              ImageUrl: require('../../assets/iamges/product3.png'),
              price: "$30.00",
              Description: "Just CBD Gummies",
            },
            {
              id:4,
              Title: 'SUMMER READY',
              ImageUrl: require('../../assets/iamges/product4.png'),
              price: "$30.00",
              Description: "CBD Flower",
            },
            {
              id:5,
              Title: 'Cannabis Station',
              ImageUrl: require('../../assets/iamges/product1.png'),
              price: "$30.00",
              Description: "John Doe’s CBD Oil",
            },
            {
              id:6,
              Title: 'Harvest',
              ImageUrl: require('../../assets/iamges/product2.png'),
              price: "$30.00",
              Description: "Pure Karma",
            },
            {
              id:7,
              Title: 'Sunnyside',
              ImageUrl: require('../../assets/iamges/product3.png'),
              price: "$30.00",
              Description: "Just CBD Gummies",
            },
            {
              id:8,
              Title: 'SUMMER READY',
              ImageUrl: require('../../assets/iamges/product4.png'),
              price: "$30.00",
              Description: "CBD Flower",
            },
          ],
    };
  }

  componentDidMount = async() => {
    const usertype = await AsyncStorage.getItem("usertype");
    await this.setState({usertype:usertype})
  }

  _rendermakelist({ item, index }) {
    return (
        <TouchableOpacity style={styles.StoreItem} onPress={()=>{this.props.navigation.navigate("TouchableOpacity")}}>
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
    return (
      <View style={{flex: 1, alignItems: "center",}}>
        {this.state.usertype == "consumer"?
          <ScrollView style={{width:'100%'}}>
            <View style={{...styles.container, paddingTop:30}}>
                <FlatList
                // showsVerticalScrollIndicator={true}
                style={{width:'100%'}}
                numColumns={1}
                data={this.state.contentList}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.StoreItem} onPress={()=>{this.props.navigation.navigate("ProductScreen")}}>
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
            <View style={{height:150}}></View>
          </ScrollView>:
          <View style={{paddingTop: Platform.OS === 'ios'? 70:30, backgroundColor:'white', flex:1}}>
              <Text style={{...styles.CartTitle, marginTop:Platform.OS=='ios'?7:-10}}>Your Store Front</Text>
              <TouchableOpacity style={styles.addItemBtn} onPress={()=>{this.props.navigation.navigate("AddStoreItemScreen")}}>
                <Image source={require('../../assets/iamges/addImage.png')} resizeMode='stretch' style={styles.addImage} />
              </TouchableOpacity>
              <View style={{paddingHorizontal:'5%', flex:1, paddingBottom:150}}>
                <FlatList
                    numColumns={2}
                    columnWrapperStyle={{justifyContent:'space-between'}}
                    // showsVerticalScrollIndicator={true}
                    data={this.state.contentList1}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{width:width, height:201, marginHorizontal:10, marginTop:30}}  onPress={()=>{this.props.navigation.navigate('ProductDetailScreen')}}>
                            <View style={{justifyContent:'center', height:134, alignItems:'center', borderWidth:2, borderColor:'#61D273', borderTopLeftRadius:30}}>
                              <Image source={item.ImageUrl} resizeMode='stretch' style={styles.productImage} />
                              <Text style={styles.desTxt1}>{item.price}</Text>
                            </View>
                            <View style={styles.storeDes}>
                                <Text style={styles.desTxt}>{item.Description}</Text>
                                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ProductDetailScreen')}}>
                                  <Image source={require('../../assets/iamges/rightArror.png')} resizeMode='stretch' style={{height:16, width:16, marginTop:10}} />
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
