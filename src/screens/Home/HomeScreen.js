import React, { Component } from 'react';
import { View, Text, Image, ScrollView, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {styles} from '../../components/styles'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        </ScrollView>
      </View>
    );
  }
}
