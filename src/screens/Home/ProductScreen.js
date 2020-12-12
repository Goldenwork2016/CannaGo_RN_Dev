import React, { Component } from 'react';
import { View, Text, Image, ScrollView, FlatList, Dimensions, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {styles} from '../../components/styles'
const width = Dimensions.get('screen').width*0.9/2-20;

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        contentList: [
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
        <TouchableOpacity style={styles.StoreItem} >
            <Text style={styles.homeTitle}> {item.Title} </Text>
            <Image source={item.ImageUrl} resizeMode='stretch' style={styles.storeImage} />
            <View style={styles.storeDes}>
                <Text style={styles.desTxt}>{item.price}</Text>
                <Text style={styles.desTxt}>{item.Description}</Text>
            </View>
        </TouchableOpacity>
    )
  }

  render() {
    return (
    //   <View style={{flex: 1, alignItems: "center",}}>
            <View style={{paddingTop: Platform.OS === 'ios'? 70:30, paddingHorizontal:'5%', backgroundColor:'white', flex:1}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                  <Image source={require('../../assets/iamges/backImage.png')} resizeMode='stretch' style={styles.backImage} />
                </TouchableOpacity>
                <FlatList
                    numColumns={2}
                    columnWrapperStyle={{justifyContent:'space-between'}}
                    // showsVerticalScrollIndicator={true}
                    data={this.state.contentList}
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
    //   </View>
    );
  }
}
