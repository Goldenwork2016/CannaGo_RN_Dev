import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';

import { styles } from '../../components/styles'

import { func, string, bool, object, array } from "prop-types";
import { connect } from "react-redux";
import user, { load, userInfo } from "../../store/reducers/user";
import Spinner from 'react-native-loading-spinner-overlay';
import Firebase from '../../../config/firebase'

import NonImage from '../../assets/iamges/storeImage1.png'
import uncheckImage from '../../assets/iamges/uncheckImage.png'
import checkImage from '../../assets/iamges/checkImage.png'

const options = {
  title: 'Choose Photo',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library'
}

class DispensaryUpdateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: NonImage,
      ischecked: false,
      checkImage: checkImage,
      uncheckImage: uncheckImage,
      timeFlag: false,
      isloading: false,
      firstName: '',
      lastName: '',
      email: '',
      phoneNum: '',
      password: '',
      profileimage: '',
      storeName: '',
      storePhoneNum: '',
      storeAddress: '',
      storeHours: '',
      companyName: '',
      fein: '',
      userId: Firebase.auth().currentUser.uid,
      isModalVisible1: false,
    };
  }

  componentDidMount = async () => {
    const { real_data, user_real_info } = this.props
    this.setState({
      firstName: user_real_info.firstName,
      lastName: user_real_info.lastName,
      email: user_real_info.email,
      phoneNum: user_real_info.phoneNum,
      password: user_real_info.password,
      storeName: user_real_info.storePhoneNum,
      storePhoneNum: user_real_info.storePhoneNum,
      storeHours: user_real_info.storeHours,
      storeAddress: user_real_info.storeAddress,
      companyName: user_real_info.companyName,
      fein: user_real_info.fein,
      profileimage: user_real_info.profileimage,
      userType: user_real_info.userType
    })
  }

  NetworkSensor = async () => {
    await this.setState({
      timeFlag: true,
      isLoading: false
    })
    // alert('network error')
  }

  // chooseImage = () => {
  //   ImagePicker.showImagePicker(options, response => {
  //     console.log("Response = ", response);

  //     if (response.didCancel) {
  //       console.log("User cancelled image picker");
  //     } else if (response.error) {
  //       console.log("ImagePicker Error: ", response.error);
  //     } else {
  //       const source = { uri: response.uri };
  //       this.setState({
  //         avatarSource: source
  //       });
  //     }
  //   });
  // };

  async update() {
    const { firstName, lastName, email, phoneNum, userType, profileimage, password, storeName, storePhoneNum, storeAddress, storeHours, companyName, fein } = this.state
    var myTimer = setTimeout(function () { this.NetworkSensor() }.bind(this), 25000)
    await Firebase.database().ref('user/' + this.state.userId).update({
      fristName: firstName,
      lastName: lastName,
      email: email,
      phoneNum: phoneNum,
      password: password,
      storeName: storeName,
      storePhoneNum: storePhoneNum,
      storeAdress: storeAddress,
      storeHours: storeHours,
      companyName: companyName,
      fein: fein,
      userType: userType,
      profileimage: profileimage
    });
    const { userInfo } = this.props
    var updateUserInfo_row
    await Firebase.database()
      .ref('user/' + this.state.userId)
      .once("value")
      .then(snapshot => {
        console.log("====++=======================================");
        console.log(snapshot)
        updateUserInfo_row = {
          fristName: snapshot.fristName,
          lastName: snapshot.lastName,
          email: snapshot.email,
          phoneNum: snapshot.phoneNum,
          password: snapshot.password,
          storeName: snapshot.storeName,
          storePhoneNum: snapshot.storePhoneNum,
          storeAdress: snapshot.storeAddress,
          storeHours: snapshot.storeHours,
          companyName: snapshot.companyName,
          fein: snapshot.fein,
          userType: snapshot.userType,
          profileimage: snapshot.profileimage,
        }
        console.log("___________+++++++++++++++++++++++++______________")
        console.log(updateUserInfo_row)
        userInfo(updateUserInfo_row)
      });
    this.setState({ isModalVisible1: true })
    setTimeout(() => {
      this.setState({ isModalVisible1: false })
      this.props.navigation.navigate("ProfileScreen")
    }, 3000)
  }

  checkfun = async () => {
    await this.setState({ ischecked: !this.state.ischecked });
  }

  render() {
    const { firstName, lastName, email, phoneNum, userType, profileimage, password, storeName, storePhoneNum, storeAddress, storeHours, companyName, fein } = this.state
    return (
      <View style={styles.container}>
        <ScrollView style={{ width: '100%' }}>
          <View style={styles.container}>
            <View style={{ width: '100%', alignItems: 'center', marginTop: Platform.OS == 'ios' ? 40 : 20 }}>
              <TouchableOpacity style={styles.backBtn} onPress={() => { this.props.navigation.goBack() }}>
                <Image source={require('../../assets/iamges/backImage.png')} resizeMode='stretch' style={styles.backImage} />
              </TouchableOpacity>
              <Text style={{ ...styles.DetailTitle, marginTop: 50, fontSize: 24 }}>Dispensary Information</Text>
            </View>
            <View style={styles.inputArea}>
              <View style={styles.SignInfoArea}>
                <Text style={styles.SignInfoTxt}>Owner's Information</Text>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <TextInput onChangeText={value => this.setState({ firstName: value })} style={styles.inputTxt} placeholderTextColor="#7a7a7b" value={firstName} placeholder="Victor"></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <TextInput onChangeText={value => this.setState({ lastName: value })} style={styles.inputTxt} placeholderTextColor="#7a7a7b" value={lastName} placeholder="Nwadike"></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../../assets/iamges/email.png')} resizeMode='stretch' style={styles.InputImage} />
                <TextInput onChangeText={value => this.setState({ email: value })} style={styles.inputTxt} placeholderTextColor="#7a7a7b" value={email} placeholder="vnwakike69@gmail.com"></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <TextInput onChangeText={value => this.setState({ phoneNum: value })} style={styles.inputTxt} placeholderTextColor="#7a7a7b" value={phoneNum} placeholder="(786)-212-2578"></TextInput>
              </View>
              <TouchableOpacity style={styles.inputItem} onPress={() => { this.props.navigation.navigate("ChangePasswordScreen", { passowrd: password }) }}>
                <Image source={require('../../assets/iamges/password.png')} resizeMode='stretch' style={styles.InputImage1} />
                <Text style={{ ...styles.inputTxt, color: '#7a7a7b' }}>Change Password</Text>
              </TouchableOpacity>
              <View style={styles.SignInfoArea}>
                <Text style={styles.SignInfoTxt}>Dispensary Information</Text>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <TextInput onChangeText={value => this.setState({ storeName: value })} style={styles.inputTxt} placeholderTextColor="#7a7a7b" value={storeName} placeholder="Cannabis Station"></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../../assets/iamges/email.png')} resizeMode='stretch' style={styles.InputImage} />
                <TextInput style={styles.inputTxt} onChangeText={value => this.setState({ email: value })} placeholderTextColor="#7a7a7b" value={email} placeholder="ourstore@gmail.com"></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <TextInput onChangeText={value => this.setState({ storePhoneNum: value })} style={styles.inputTxt} placeholderTextColor="#7a7a7b" value={storePhoneNum} placeholder="(404)-212-1232"></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../../assets/iamges/position.png')} resizeMode='stretch' style={styles.InputImage3} />
                <TextInput onChangeText={value => this.setState({ storeAddress: value })} style={styles.inputTxt} placeholderTextColor="#7a7a7b" value={storeAddress} placeholder="369 MCDaniel Street, NW, Miami, FL, 313..."></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../../assets/iamges/position.png')} resizeMode='stretch' style={styles.InputImage3} />
                <TextInput onChangeText={value => this.setState({ storeHours: value })} style={styles.inputTxt} placeholderTextColor="#7a7a7b" value={storeHours} placeholder="Dispensary's Hours"></TextInput>
              </View>
              <View style={styles.TermsArea}>
                <TouchableOpacity style={styles.forgotBtn1} onPress={() => { this.checkfun() }}>
                  <Image source={this.state.ischecked ? this.state.checkImage : this.state.uncheckImage} resizeMode='stretch' style={styles.uncheckImage} />
                </TouchableOpacity>
                <Text style={{ ...styles.termsTxt, width: '90%', marginTop: 10 }}>By checking I am an authorized signatory of this business, with the power to commit to binding agreements</Text>
              </View>
              {/* <TouchableOpacity style={styles.inputItem}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <Text style={{...styles.inputTxt, color:'#7a7a7b'}}>Scan Driver's License</Text>
                <Image source={require('../../assets/iamges/arrow-left.png')} resizeMode='stretch' style={styles.arrowleft} />
              </TouchableOpacity> */}
              <View style={{ ...styles.SignInfoArea, marginTop: 20 }}>
                <Text style={styles.SignInfoTxt}>Tax Information</Text>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <TextInput onChangeText={value => this.setState({ companyName: value })} style={styles.inputTxt} placeholderTextColor="#7a7a7b" value={companyName} placeholder="Cannabis Station"></TextInput>
              </View>
              <Text style={{ ...styles.termsTxt, width: '90%', marginTop: -10, marginBottom: 10 }}>Ensure this matches the official tax documents for your business.</Text>
              <View style={styles.inputItem}>
                <Image source={require('../../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <TextInput onChangeText={value => this.setState({ fein: value })} style={{ ...styles.inputTxt, fontSize: 11 }} placeholderTextColor="#7a7a7b" value={fein} placeholder="21267236637"></TextInput>
              </View>
              <View style={styles.TermsArea}>
                <TouchableOpacity style={styles.forgotBtn1} onPress={() => { this.checkfun() }}>
                  <Image source={this.state.ischecked ? this.state.checkImage : this.state.uncheckImage} resizeMode='stretch' style={styles.uncheckImage} />
                </TouchableOpacity>
                <Text style={styles.termsTxt}>By checking this I agree to CannaGo's  </Text>
                <TouchableOpacity style={styles.forgotBtn1}>
                  <Text style={{ color: '#61D273', fontSize: 10, fontFamily: 'Poppins-Regular' }}>Terms & Conditions</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{ ...styles.signinBtn, backgroundColor: '#3EA3E1', width: 128, alignSelf: 'center' }} onPress={() => { this.update() }}>
                <Text style={styles.signinTxt1}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 150 }}></View>
        </ScrollView>
        <Modal isVisible={this.state.isModalVisible1}>
          <View style={{ ...styles.modalView, backgroundColor: 'white' }}>
            <Image source={require('../../assets/iamges/CannaGo.png')} resizeMode='stretch' style={{ width: 80, height: 80, marginBottom: 20 }} />
            <Text style={{ ...styles.Description1, fontSize: 20, color: "#61D273", fontFamily: 'Poppins-Regular' }}>Profile informations are updated.</Text>
          </View>
        </Modal>
      </View>
    );
  }
}

DispensaryUpdateScreen.propTypes = {
  load: func,
  real_data: array,
};

const mapDispatchToProps = dispatch => ({
  load: (data) => dispatch(load(data)),
  userInfo: (updateUserInfo_row) => dispatch(userInfo(updateUserInfo_row)),
});

const mapStateToProps = ({ user }) => ({
  real_data: user.real_data,
  user_real_info: user.user_real_info
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DispensaryUpdateScreen);
