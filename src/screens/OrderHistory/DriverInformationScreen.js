import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { styles } from '../../components/styles'

import NonImage from '../../assets/iamges/personImage.png'
import uncheckImage from '../../assets/iamges/uncheckImage.png'
import checkImage from '../../assets/iamges/checkImage.png'

const options = {
    title: 'Choose Photo',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library'
}

export default class DriverInformationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: NonImage,
            ischecked: false,
            checkImage: checkImage,
            uncheckImage: uncheckImage,
        };
    }

    checkfun = async () => {
        await this.setState({ ischecked: !this.state.ischecked });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ width: '100%' }}>
                    <View style={styles.container}>
                        <View style={{ width: '100%', alignItems: 'center', marginTop: Platform.OS == 'ios' ? 40 : 20 }}>
                            <TouchableOpacity style={{ alignItems: 'flex-start', width: '100%', marginTop: 10 }} onPress={() => { this.props.navigation.goBack() }}>
                                <Image source={require('../../assets/iamges/backImage.png')} resizeMode='stretch' style={styles.backImage} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputArea}>
                            <Text style={{ ...styles.SignInfoTxt, textAlign: 'center', fontSize: 18, color: '#414041', marginBottom: 20 }}>Driver Information</Text>
                            <View style={styles.inputItem}>
                                <Image source={require('../../assets/iamges/email.png')} resizeMode='stretch' style={styles.InputImage} />
                                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="larryw@gmail.com"></TextInput>
                            </View>
                            <TouchableOpacity style={styles.inputItem}>
                                <Image source={require('../../assets/iamges/password.png')} resizeMode='stretch' style={styles.InputImage1} />
                                <Text style={{ ...styles.inputTxt, color: '#7a7a7b' }}>UpdatePassword</Text>
                            </TouchableOpacity>
                            <View style={styles.inputItem}>
                                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="(404)-123-4674"></TextInput>
                            </View>
                            <TouchableOpacity style={styles.inputItem}>
                                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                <Text style={{ ...styles.inputTxt, color: '#7a7a7b' }}>Update Driver's License</Text>
                                <Image source={require('../../assets/iamges/arrow-left.png')} resizeMode='stretch' style={styles.arrowleft} />
                            </TouchableOpacity>
                            <View style={styles.SignInfoArea}>
                                <Text style={styles.SignInfoTxt}>Vehicle Information</Text>
                            </View>
                            <View style={styles.inputItem}>
                                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Honda"></TextInput>
                            </View>
                            <View style={styles.inputItem}>
                                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Civic"></TextInput>
                            </View>
                            <View style={styles.inputItem}>
                                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Black"></TextInput>
                            </View>
                            <View style={styles.inputItem}>
                                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="GFQIFD"></TextInput>
                            </View>
                            <View style={styles.SignInfoArea}>
                                <Text style={styles.SignInfoTxt}>Tax Information</Text>
                            </View>
                            <View style={styles.inputItem}>
                                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Update 1099 Agreement"></TextInput>
                            </View>
                            <TouchableOpacity style={{ ...styles.signinBtn, backgroundColor: '#3EA3E1', width: 128, alignSelf: 'center', marginTop:20 }} onPress={() => { this.props.navigation.navigate("App") }}>
                                <Text style={styles.signinTxt1}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: 150 }}></View>
                </ScrollView>
            </View>
        );
    }
}
