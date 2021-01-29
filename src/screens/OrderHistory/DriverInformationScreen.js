import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import { styles } from '../../components/styles'
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import Firebase from 'firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
            modalVisible: false,
            usertype: 'consumer',
            firstName: '',
            lastName: '',
            email: '',
            phoneNum: '',
            password: '',
            profileimage: '',
            age: '',
            ageFlag: false,
            fein: '',
            userId: "",
            isloading: false,
            isModalVisible1: false,
            isModalVisible2: false,
            timeFlag: false,
            birthday: '',
            vehicleName: '',
            vehicleModel: '',
            vehicleColor: '',
            vehicleLicense: '',
            licenseState: '',
            licenseNumber: '',
            licenseExpiration: '',
            isExpirationTimeVisible: false,
        };
    }

    componentDidMount = async () => {
        const usertype = await AsyncStorage.getItem("usertype");
        const userId = await AsyncStorage.getItem("userUid");
        await this.setState({ userId: userId })
        await this.setState({ usertype: usertype });
        Firebase.database()
            .ref('user/' + this.state.userId)
            .on("value", async (snapshot) => {
                user_data = {
                    email: snapshot.val().email,
                    fristName: snapshot.val().fristName,
                    lastName: snapshot.val().lastName,
                    phoneNum: snapshot.val().phoneNum,
                    password: snapshot.val().password,
                    profileimage: snapshot.val().img_url,
                    userType: snapshot.val().userType,
                    birthday: snapshot.val().birthday,
                    age: snapshot.val().age,
                    licenseNumber: snapshot.val().licenseNumber,
                    licenseState: snapshot.val().licenseState,
                    licenseExpiration: snapshot.val().licenseExpiration,
                    vehicleName: snapshot.val().vehicleName,
                    vehicleModel: snapshot.val().vehicleModel,
                    vehicleColor: snapshot.val().vehicleColor,
                    vehicleLicense: snapshot.val().vehicleLicense,
                    taxInfo: snapshot.val().taxInfo,
                    availableBal: snapshot.val().availableBal
                    // data.push(row)
                };
                console.log("================================");
                console.log(user_data);
                await this.setState({
                    email: user_data.email,
                    firstName: user_data.fristName,
                    lastName: user_data.lastName,
                    phoneNum: user_data.phoneNum,
                    password: user_data.password,
                    profileimage: user_data.img_url,
                    userType: user_data.userType,
                    birthday: user_data.birthday,
                    age: user_data.age,
                    licenseNumber: user_data.licenseNumber,
                    licenseState: user_data.licenseState,
                    licenseExpiration: user_data.licenseExpiration,
                    vehicleName: user_data.vehicleName,
                    vehicleModel: user_data.vehicleModel,
                    vehicleColor: user_data.vehicleColor,
                    vehicleLicense: user_data.vehicleLicense,
                    taxInfo: user_data.taxInfo,
                    availableBal: user_data.availableBal
                })
            })
    }

    handleTimePicker = async (date) => {
        await this.setState({ birthday: dayjs(date).format('MM/DD/YYYY') })
        await this.setState({ birthdayYear: dayjs(date).format('YYYY') })
        await this.setState({ birthdayMonth: dayjs(date).format('MM') })
        await this.setState({ birthdayDate: dayjs(date).format('DD') })
        console.log(this.state.birthdayDate)
        this.setState({ isTimeVisible: false })
        var currentDay = new Date();
        var currentYear = currentDay.getFullYear();
        var currentMonth = currentDay.getMonth();
        var currentDate = currentDay.getDate();
        var yearDif = currentYear - this.state.birthdayYear;
        console.log(yearDif);
        var monDif = currentMonth - this.state.birthdayMonth;
        var dateDif = currentDate - this.state.birthdayDate;
        if (monDif >= 0 && dateDif >= 0) {
            await this.setState({ ageFlag: true })
            await this.setState({ age: yearDif })
            console.log(this.state.age);
        } else {
            await this.setState({ age: yearDif - 1 })
            console.log(this.state.age);
        }
    }
    hideTimePicker = () => {
        this.setState({ isTimeVisible: false })
    }

    handleTimePicker1 = async (date) => {
        await this.setState({ licenseExpiration: dayjs(date).format('MM/YYYY') })
    }

    hideTimePicker1 = () => {
        this.setState({ isExpirationTimeVisible: false })
    }

    async update() {
        const { firstName, lastName, birthday, ageFlag, phoneNum, email, zipCode, password, conPassword, img_url, userType, age, ischecked, licenseExpiration, licenseState, licenseNumber, taxInfo, vehicleName, vehicleColor, vehicleModel, vehicleLicense } = this.state;
        this.setState({ isLoading: true })
        try {
            await Firebase.database()
                .ref('user/' + this.state.userId)
                .update({
                    email: email,
                    fristName: firstName,
                    lastName: lastName,
                    phoneNum: phoneNum,
                    password: password,
                    userType: userType,
                    birthday: birthday,
                    age: age,
                    licenseNumber: licenseNumber,
                    licenseState: licenseState,
                    licenseExpiration: licenseExpiration,
                    vehicleName: vehicleName,
                    vehicleModel: vehicleModel,
                    vehicleColor: vehicleColor,
                    vehicleLicense: vehicleLicense,
                    taxInfo: taxInfo,
                });
            this.setState({ isLoading: false })
            this.setState({ isModalVisible1: true })
            setTimeout(() => {
                this.setState({ isModalVisible1: false })
                this.props.navigation.navigate("ProfileScreen")
            }, 3000)
        } catch (error) {
            console.log(error)
            this.setState({ isLoading: true })
        }
    }

    checkfun = async () => {
        await this.setState({ ischecked: !this.state.ischecked });
    }

    render() {
        return (
            <KeyboardAwareScrollView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <ScrollView style={{ width: '100%' }}>
                        <View style={styles.container}>
                            <Spinner
                                visible={this.state.isloading}
                                textContent={'Updating profile infomation...'}
                                textStyle={{ color: 'white' }}
                            />
                            <DateTimePickerModal
                                isVisible={this.state.isTimeVisible}
                                mode="date"
                                onConfirm={(date) => { this.handleTimePicker(date) }}
                                onCancel={this.hideTimePicker}
                            />
                            <DateTimePickerModal
                                isVisible={this.state.isExpirationTimeVisible}
                                mode="date"
                                onConfirm={(date) => { this.handleTimePicker1(date) }}
                                onCancel={this.hideTimePicker1}
                            />
                            <Modal isVisible={this.state.isModalVisible1}>
                                <View style={{ ...styles.modalView, backgroundColor: 'white' }}>
                                    <Image source={require('../../assets/iamges/CannaGo.png')} resizeMode='stretch' style={{ width: 80, height: 80, marginBottom: 20 }} />
                                    <Text style={{ ...styles.Description1, fontSize: 20, color: "#61D273", fontFamily: 'Poppins-Regular' }}>Profile informations are updated.</Text>
                                </View>
                            </Modal>
                            <View style={{ width: '100%', alignItems: 'center', marginTop: Platform.OS == 'ios' ? 40 : 20 }}>
                                <TouchableOpacity style={{ alignItems: 'flex-start', width: '100%', marginTop: 10 }} onPress={() => { this.props.navigation.goBack() }}>
                                    <Image source={require('../../assets/iamges/backImage.png')} resizeMode='stretch' style={styles.backImage} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.inputArea}>
                                <View style={styles.inputItem}>
                                    <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                    <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="First Name" value={this.state.firstName} onChangeText={(text) => { this.setState({ firstName: text }) }}></TextInput>
                                </View>
                                <View style={styles.inputItem}>
                                    <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                    <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Last Name" value={this.state.lastName} onChangeText={(text) => { this.setState({ lastName: text }) }}></TextInput>
                                </View>
                                <TouchableOpacity style={styles.inputItem} onPress={() => { this.setState({ isTimeVisible: true, }) }}>
                                    <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                    <Text style={{ ...styles.inputTxt, color: this.state.birthday == "" ? "#7a7a7b" : "#000" }}>{this.state.birthday == "" ? "Date of Birth" : this.state.birthday}</Text>
                                    <Image source={require('../../assets/iamges/down-left.png')} resizeMode='stretch' style={styles.downarror} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inputItem} onPress={() => { this.props.navigation.navigate("ChangeEmailScreen", { email: this.state.email, password: this.state.password }) }}>
                                    <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                    <Text style={{ ...styles.inputTxt }}>{this.state.email}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inputItem} onPress={() => { this.props.navigation.navigate("ChangePasswordScreen", { passoword: this.state.password }) }}>
                                    <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                    <Text style={{ ...styles.inputTxt }}>Update Password</Text>
                                </TouchableOpacity>
                                <View style={styles.inputItem}>
                                    <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                    <TextInput style={styles.inputTxt} keyboardType='phone-pad' placeholderTextColor="#7a7a7b" placeholder="Mobile Number" value={this.state.phoneNum} onChangeText={(text) => { this.setState({ phoneNum: text }) }}></TextInput>
                                </View>
                                <View style={styles.inputItem}>
                                    <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                    <TextInput style={styles.inputTxt} keyboardType='number-pad' placeholderTextColor="#7a7a7b" placeholder="Driver's License Number" value={this.state.licenseNumber} onChangeText={(text) => { this.setState({ licenseNumber: text }) }}></TextInput>
                                </View>
                                <View style={styles.inputItem}>
                                    <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                    <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Driver's License State" value={this.state.licenseState} onChangeText={(text) => { this.setState({ licenseState: text }) }}></TextInput>
                                    <Image source={require('../../assets/iamges/down-left.png')} resizeMode='stretch' style={styles.downarror} />
                                </View>
                                <TouchableOpacity style={styles.inputItem} onPress={() => { this.setState({ isExpirationTimeVisible: true, }) }}>
                                    <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                    <Text style={{ ...styles.inputTxt, color: this.state.licenseExpiration == "" ? "#7a7a7b" : "#000" }}>{this.state.licenseExpiration == "" ? "Driver's License Expiration" : this.state.licenseExpiration}</Text>
                                    <Image source={require('../../assets/iamges/down-left.png')} resizeMode='stretch' style={styles.downarror} />
                                </TouchableOpacity>
                                <View style={styles.SignInfoArea}>
                                    <Text style={styles.SignInfoTxt}>Vehicle Information</Text>
                                </View>
                                <View style={styles.inputItem}>
                                    <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                    <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Vehicle Name" value={this.state.vehicleName} onChangeText={(text) => { this.setState({ vehicleName: text }) }}></TextInput>
                                </View>
                                <View style={styles.inputItem}>
                                    <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                    <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Vehicle Model" value={this.state.vehicleModel} onChangeText={(text) => { this.setState({ vehicleModel: text }) }}></TextInput>
                                </View>
                                <View style={styles.inputItem}>
                                    <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                    <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Vehicle Color" value={this.state.vehicleColor} onChangeText={(text) => { this.setState({ vehicleColor: text }) }}></TextInput>
                                </View>
                                <View style={styles.inputItem}>
                                    <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                    <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" keyboardType="number-pad" placeholder="Vehicle License Plate Number" value={this.state.vehicleLicense} onChangeText={(text) => { this.setState({ vehicleLicense: text }) }}></TextInput>
                                </View>
                                <View style={styles.SignInfoArea}>
                                    <Text style={styles.SignInfoTxt}>Tax Information</Text>
                                </View>
                                <View style={styles.inputItem}>
                                    <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                                    <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="1099 Agreement" value={this.state.taxInfo} onChangeText={(text) => { this.setState({ taxInfo: text }) }}></TextInput>
                                </View>
                                <TouchableOpacity style={{ ...styles.signinBtn, backgroundColor: '#3EA3E1', width: 128, alignSelf: 'center', marginTop: 20 }} onPress={() => { this.update() }}>
                                    <Text style={styles.signinTxt1}>Update</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 150 }}></View>
                    </ScrollView>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}
