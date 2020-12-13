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
            <View style={{height:50}}></View>
          </ScrollView>
      </View>
    );
  }
}
