import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Platform } from 'react-native';
import Firebase from '../../../config/firebase'
import { styles } from '../../components/styles'
import Modal from 'react-native-modal';
import AlertModal from '../../components/AlertModal'
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import NonImage from '../../assets/iamges/productDetail1.png'

export default class CoaImageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coaImage:''
        };
    }

    componentDidMount = async () => {
        await this.setState({ coaImage: this.props.navigation.getParam('coaImage') })
        console.log(this.state.coaImage);
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ width: '100%' }}>
                    <View style={styles.container}>
                        <View style={{ width: '100%', alignItems: 'center', flex: 1, marginTop: Platform.OS == 'ios' ? 55 : 25 }}>
                            <TouchableOpacity style={styles.backBtn} onPress={() => { this.props.navigation.goBack() }}>
                                <Image source={require('../../assets/iamges/backImage.png')} resizeMode='stretch' style={styles.backImage} />
                            </TouchableOpacity>
                            <View style={{...styles.personUploadgImage, flex: 1, justifyContent:'center'}}>
                                <Text style={styles.DetailTitle}>COA</Text>
                                <Image source={{ uri: this.state.coaImage }} resizeMode='stretch' style={styles.productDetailImage} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
