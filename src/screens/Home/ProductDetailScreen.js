import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Platform } from 'react-native';
import Firebase from '../../../config/firebase'
import { styles } from '../../components/styles'

import NonImage from '../../assets/iamges/productDetail1.png'

export default class ProductDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: NonImage,
            ischecked: false,
            productId: '',
            storeId: '',
            real_data:''
        };
    }

    componentDidMount = async () => {
        await this.setState({ productId: this.props.navigation.getParam('productId') })
        await this.setState({ storeId: this.props.navigation.getParam('storeId') })
        console.log(this.state.productId)
        console.log(this.state.storeId)

        Firebase.database()
            .ref("Items/" + this.state.storeId + '/' + this.state.productId)
            .on("value", async (snapshot) => {
                console.log(snapshot)
                var row
                row = {
                    'Description': snapshot.val().Description,
                    'GpriceValue': snapshot.val().GpriceValue,
                    'Tag': snapshot.val().Tag,
                    'feeValue': snapshot.val().feeValue,
                    'id': snapshot.val().id,
                    'itemImage': snapshot.val().itemImage,
                    'itemNum1': snapshot.val().itemNum1,
                    'priceValue': snapshot.val().priceValue,
                    'productName': snapshot.val().productName
                }
                console.log("_____________+++++++++++++_________________");
                console.log(row)
                await this.setState({
                    real_data: row,
                });
                console.log(this.state.real_data.itemImage)
            })
    }

    render() {
        const { real_data } = this.state
        return (
            <View style={styles.container}>
                <ScrollView style={{ width: '100%' }}>
                    <View style={styles.container}>
                        <View style={{ width: '100%', alignItems: 'center', marginTop: Platform.OS == 'ios' ? 55 : 25 }}>
                            <TouchableOpacity style={styles.backBtn} onPress={() => { this.props.navigation.goBack() }}>
                                <Image source={require('../../assets/iamges/backImage.png')} resizeMode='stretch' style={styles.backImage} />
                            </TouchableOpacity>
                            <View style={styles.personUploadgImage}>
                                <Text style={styles.DetailTitle}>Details</Text>
                                <Image source={{uri: this.state.real_data.itemImage}} resizeMode='stretch' style={styles.productDetailImage} />
                            </View>
                        </View>
                        <View style={styles.inputArea}>
                            <View style={{ width: '90%', marginLeft: '5%' }}>
                                <Text style={{...styles.productDescription, marginBottom:10}}>Name: {this.state.real_data.productName}</Text>
                                <Text style={styles.productDescription}>Price: $ {this.state.real_data.priceValue}</Text>
                            </View>
                            <View style={{ width: '90%', marginLeft: '5%', marginTop: 50 }}>
                                <Text style={{ ...styles.productDescription, fontSize: 16 }}>Description</Text>
                                <Text style={{ ...styles.productDescription, fontSize: 12, marginTop: 10, color: '#707070' }}>{this.state.real_data.Description}</Text>
                            </View>
                            <TouchableOpacity style={styles.AddCartBtn} onPress={() => { this.props.navigation.navigate("ShoppingCartScreen") }}>
                                <Text style={styles.signinTxt1}>Add to Cart</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: 150 }}></View>
                </ScrollView>
            </View>
        );
    }
}
