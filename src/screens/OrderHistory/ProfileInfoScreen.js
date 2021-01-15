import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Firebase from '../../../config/firebase'
import ImagePicker from 'react-native-image-picker';


import { styles } from '../../components/styles'


export default class ProfileInfoScreen extends Component {
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
      fein: '',
      userId: "",
      isModalVisible1: false,
      timeFlag: false,
      isloading: false,
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
          firstName: snapshot.val().fristName,
          lastName: snapshot.val().lastName,
          password: snapshot.val().password,
          phoneNum: snapshot.val().phoneNum,
          profileimage: snapshot.val().profileimage,
          userType: snapshot.val().userType,
          zipCode: snapshot.val().zipCode,
          age: snapshot.val().age,
          // data.push(row)
        };
        console.log("================================");
        console.log(user_data);
        await this.setState({
          firstName: user_data.firstName,
          lastName: user_data.lastName,
          email: user_data.email,
          phoneNum: user_data.phoneNum,
          password: user_data.password,
          profileimage: user_data.profileimage,
          userType: user_data.userType,
          zipCode: user_data.zipCode,
          age: user_data.age,
        })
      })
  }

  render() {
    const { profileimage, firstName, lastName, age, phoneNum, email, availableBal } = this.state
    return (
      <View style={styles.container}>
        <ScrollView style={{ width: '100%' }}>
          <View style={styles.container}>
            <View style={{ width: '100%', alignItems: 'center', marginTop: Platform.OS == 'ios' ? 40 : 20 }}>
              <TouchableOpacity style={styles.backBtn} onPress={() => { this.props.navigation.goBack() }}>
                <Image source={require('../../assets/iamges/backImage.png')} resizeMode='stretch' style={styles.backImage} />
              </TouchableOpacity>
              <View style={styles.personUploadgImage}>
                <Text style={{ ...styles.inputTxt, color: '#707070', alignSelf: 'center', marginTop: 40, fontSize: 24 }}>Profile Information</Text>
                <Text style={{ ...styles.inputTxt, color: '#707070', alignSelf: 'center', marginTop: 70, fontSize: 18 }}>Welcome {firstName} {lastName}, {age}</Text>
              </View>
            </View>
            <View style={styles.inputArea}>
              <TouchableOpacity style={styles.inputItem}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <Text style={{ ...styles.inputTxt, color: '#7a7a7b' }}>Phone Number: {phoneNum}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputItem}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <Text style={{ ...styles.inputTxt, color: '#7a7a7b' }}>Email: {email}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputItem}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <Text style={{ ...styles.inputTxt, color: '#7a7a7b' }}>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputItem}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <Text style={{ ...styles.inputTxt, color: '#7a7a7b' }}>Update ID</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputItem}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <Text style={{ ...styles.inputTxt, color: '#7a7a7b' }}>Deactivate Account</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 150 }}></View>
        </ScrollView>
      </View>
    );
  }
}
