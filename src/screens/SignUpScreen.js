import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import { styles } from '../components/styles'
import Spinner from 'react-native-loading-spinner-overlay';
import RNFetchBlob from "react-native-fetch-blob";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import atl_zipCode from '../components/zipCode'

import NonImage from '../assets/iamges/emptyPerson.png'
import uncheckImage from '../assets/iamges/uncheckImage.png'
import checkImage from '../assets/iamges/checkImage.png'
import Firebase from 'firebase';

const options = {
  title: 'Choose Photo',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library'
}

let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let reg_strong = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/;

var renderIf = function (condition, content) {
  if (condition) {
    return content;
  }
  return null;
}

// function buildResult(result, key) {
//   if (result && result != -1) {
//     return key + ": " + result + "\n";
//   }
//   return ""
// }

// function buildDateResult(result, key) {
//   if (result) {
//     return key + ": " +
//       result.day + "." + result.month + "." + result.year + "."
//       + "\n";
//   }
//   return ""
// }

// const licenseKey = Platform.select({
//   // iOS license key for applicationID: com.microblink.sample
//   ios: 'sRwAAAEgb3JnLnJlYWN0anMubmF0aXZlLmZzdGFyLmNhbm5hZ29xkIzuDe6sAPx/esV44wkdOUcvts4ROcj6DzDOtk+pH6DxbJazROdgJ0HSrumXoDGEAzaO9bDgSTW7H4GWBS9lAwyboeJkF0qIWJ/1qdM0wZsZIT7C9Jciwz8eIwCQ5q/hiKb+/K7mYTJ0F/hxBWYC7ZWX8ZYzbuIt9H06PcCR5vvc6YZ/NNjl+KGvdvhvP/xnim3zQnXkhcTAo88NOsSb9D4EkKMXxRoXhniJDaPEh3x/ja5te1NwgkF4dmVHYyq1O+tCNqNXBfw1Vh5Le9ttKPbQExVJdmxnrcAlZBfIVWx3/ZVLVywHhxdfhTWcZsTRQRL4GuE=',
//   // android license key for applicationID: com.microblink.sample
//   android: 'sRwAAAAgb3JnLnJlYWN0anMubmF0aXZlLmZzdGFyLmNhbm5hZ2+uLqgu92xuqnYqkHR8Sr81G2E+bETfxW8gbfKXS26d78MwYaonbNaLonclr4el7d2bRO7TQM9yKotWQvQF7mPXDnBRNH564wUi7iRmkUqne8797YfL2yF53+mPqd1ecIQW9iJZ9sb3b0ZW2za0nhj/WOLs0zocgKmFZUn8R64sgAodyGfbxOCVnoUdOnr42CcovfbFH7azWMoujjyY10zZQ4kwoO7Xyeu6rhbCZhFYQ1Mn+jhAz7QFegYeag1zQt2F6FfOtyxOR29YqedothoA0fl1ig9K/YR1D7MnFOxqc3Xd60h8Rt4MXvxYir/On6sLMi5hBR0='
// })

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: NonImage,
      ischecked: false,
      checkImage: checkImage,
      uncheckImage: uncheckImage,
      //state for driver license
      showFrontImageDocument: false,
      resultFrontImageDocument: '',
      showBackImageDocument: false,
      resultBackImageDocument: '',
      showImageFace: false,
      resultImageFace: '',
      showSuccessFrame: false,
      successFrame: '',
      results: '',
      licenseKeyErrorMessage: '',
      firstName: '',
      img_url: '',
      lastName: '',
      zipCode: '',
      isTimeVisible: false,
      birthday: '',
      ageFlag: false,
      birthdayYear: '',
      age: '',
      email: '',
      password: '',
      conPassword: '',
      phoneNum: '',
      isModalVisible1: false,
      isModalVisible2: false,
      isModalVisible3: false,
      isModalVisible4: false,
      isModalVisible5: false,
      isModalVisible6: false,
      isModalVisible7: false,
      isModalVisible8: false,
      isModalVisible9: false,
      isModalVisible10: false,
      isModalVisible11: false,
      isModalVisible12: false,
      isModalVisible14: false,
      isModalVisible15: false,
      isModalVisible16: false,
      isModalVisible17: false,
      isModalVisible18: false,
      timeFlag: false,
      isloading: false,
      loggedIn: false,
      isImageUploading: false,
      userType: 'consumer',
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', async () => {

    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  // async scan() {
  //   try {

  //     // to scan any machine readable travel document (passports, visas and IDs with
  //     // machine readable zone), use MrtdRecognizer
  //     // var mrtdRecognizer = new BlinkIDReactNative.MrtdRecognizer();
  //     // mrtdRecognizer.returnFullDocumentImage = true;

  //     // var mrtdSuccessFrameGrabber = new BlinkIDReactNative.SuccessFrameGrabberRecognizer(mrtdRecognizer);

  //     // BlinkIDCombinedRecognizer automatically classifies different document types and scans the data from
  //     // the supported document
  //     var blinkIdCombinedRecognizer = new BlinkIDReactNative.BlinkIdCombinedRecognizer();
  //     blinkIdCombinedRecognizer.returnFullDocumentImage = true;
  //     blinkIdCombinedRecognizer.returnFaceImage = true;

  //     const scanningResults = await BlinkIDReactNative.BlinkID.scanWithCamera(
  //       new BlinkIDReactNative.BlinkIdOverlaySettings(),
  //       new BlinkIDReactNative.RecognizerCollection([blinkIdCombinedRecognizer/*, mrtdSuccessFrameGrabber*/]),
  //       licenseKey
  //     );

  //     if (scanningResults) {
  //       let newState = {
  //         showFrontImageDocument: false,
  //         resultFrontImageDocument: '',
  //         showBackImageDocument: false,
  //         resultBackImageDocument: '',
  //         showImageFace: false,
  //         resultImageFace: '',
  //         results: '',
  //         showSuccessFrame: false,
  //         successFrame: ''
  //       };

  //       for (let i = 0; i < scanningResults.length; ++i) {
  //         let localState = this.handleResult(scanningResults[i]);
  //         newState.showFrontImageDocument = newState.showFrontImageDocument || localState.showFrontImageDocument;
  //         if (localState.showFrontImageDocument) {
  //           newState.resultFrontImageDocument = localState.resultFrontImageDocument;
  //         }
  //         newState.showBackImageDocument = newState.showBackImageDocument || localState.showBackImageDocument;
  //         if (localState.showBackImageDocument) {
  //           newState.resultBackImageDocument = localState.resultBackImageDocument;
  //         }
  //         newState.showImageFace = newState.showImageFace || localState.showImageFace;
  //         if (localState.resultImageFace) {
  //           newState.resultImageFace = localState.resultImageFace;
  //         }
  //         newState.results += localState.results;
  //         newState.showSuccessFrame = newState.showSuccessFrame || localState.showSuccessFrame;
  //         if (localState.successFrame) {
  //           newState.successFrame = localState.successFrame;
  //         }

  //       }
  //       newState.results += '\n';
  //       this.setState(newState);
  //       console.log(this.state.results)
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     this.setState({
  //       showFrontImageDocument: false, resultFrontImageDocument: '', showBackImageDocument: false, resultBackImageDocument: '', showImageFace: false, resultImageFace: '', results: 'Scanning has been cancelled', showSuccessFrame: false,
  //       successFrame: ''
  //     });
  //   }
  // }

  // handleResult(result) {
  //   var localState = {
  //     showFrontImageDocument: false,
  //     resultFrontImageDocument: '',
  //     showBackImageDocument: false,
  //     resultBackImageDocument: '',
  //     resultImageFace: '',
  //     results: '',
  //     showSuccessFrame: false,
  //     successFrame: ''
  //   };

  //   if (result instanceof BlinkIDReactNative.BlinkIdCombinedRecognizerResult) {
  //     let blinkIdResult = result;
  //     console.log(blinkIdResult.firstName)
  //     this.setState({ firstName: blinkIdResult.firstName, lastName: blinkIdResult.lastName, age: blinkIdResult.age })

  //     let resultString =
  //       buildResult(blinkIdResult.firstName, "FirstName") +
  //       buildResult(blinkIdResult.lastName, "LastName") +
  //       buildResult(blinkIdResult.fullName, "FullName") +
  //       buildResult(blinkIdResult.localizedName, "LocalizedName") +
  //       buildResult(blinkIdResult.additionalNameInformation, "AdditionalNameInfo") +
  //       buildResult(blinkIdResult.address, "Address") +
  //       buildResult(blinkIdResult.additionalAddressInformation, "AdditionalAddressInfo") +
  //       buildResult(blinkIdResult.documentNumber, "DocumentNumber") +
  //       buildResult(blinkIdResult.documentAdditionalNumber, "AdditionalDocumentNumber") +
  //       buildResult(blinkIdResult.sex, "Sex") +
  //       buildResult(blinkIdResult.issuingAuthority, "IssuingAuthority") +
  //       buildResult(blinkIdResult.nationality, "Nationality") +
  //       buildDateResult(blinkIdResult.dateOfBirth, "DateOfBirth") +
  //       buildResult(blinkIdResult.age, "Age") +
  //       buildDateResult(blinkIdResult.dateOfIssue, "DateOfIssue") +
  //       buildDateResult(blinkIdResult.dateOfExpiry, "DateOfExpiry") +
  //       buildResult(blinkIdResult.dateOfExpiryPermanent, "DateOfExpiryPermanent") +
  //       buildResult(blinkIdResult.expired, "Expired") +
  //       buildResult(blinkIdResult.maritalStatus, "MartialStatus") +
  //       buildResult(blinkIdResult.personalIdNumber, "PersonalIdNumber") +
  //       buildResult(blinkIdResult.profession, "Profession") +
  //       buildResult(blinkIdResult.race, "Race") +
  //       buildResult(blinkIdResult.religion, "Religion") +
  //       buildResult(blinkIdResult.residentialStatus, "ResidentialStatus") +
  //       buildResult(blinkIdResult.processingStatus, "ProcessingStatus") +
  //       buildResult(blinkIdResult.recognitionMode, "RecognitionMode")
  //       ;

  //     let licenceInfo = blinkIdResult.driverLicenseDetailedInfo;
  //     if (licenceInfo) {
  //       resultString +=
  //         buildResult(licenceInfo.restrictions, "Restrictions") +
  //         buildResult(licenceInfo.endorsements, "Endorsements") +
  //         buildResult(licenceInfo.vehicleClass, "Vehicle class") +
  //         buildResult(licenceInfo.conditions, "Conditions");
  //     }

  //     // there are other fields to extract
  //     localState.results += resultString;

  //     // Document image is returned as Base64 encoded JPEG
  //     if (blinkIdResult.fullDocumentFrontImage) {
  //       localState.showFrontImageDocument = true;
  //       localState.resultFrontImageDocument = 'data:image/jpg;base64,' + blinkIdResult.fullDocumentFrontImage;
  //     }
  //     if (blinkIdResult.fullDocumentBackImage) {
  //       localState.showBackImageDocument = true;
  //       localState.resultBackImageDocument = 'data:image/jpg;base64,' + blinkIdResult.fullDocumentBackImage;
  //     }
  //     // Face image is returned as Base64 encoded JPEG
  //     if (blinkIdResult.faceImage) {
  //       localState.showImageFace = true;
  //       localState.resultImageFace = 'data:image/jpg;base64,' + blinkIdResult.faceImage;
  //     }
  //   }
  //   return localState;
  // }

  // chooseImage = () => {
  //   ImagePicker.showImagePicker(options, async (response) => {
  //       console.log('Response = ', response);
  //       if (response.didCancel) {
  //           console.log('User cancelled image picker');
  //       } else if (response.error) {
  //           console.log('ImagePicker Error: ', response.error);
  //       } else {
  //           console.log(response.uri)
  //           const source = { uri: response.uri };
  //           const URL = response.data;
  //       }
  //   });
  // }

  chooseImage = async () => {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response.uri);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = { uri: response.uri };
        // console.log(response.data);
        const Blob = RNFetchBlob.polyfill.Blob;    //firebase image upload
        const fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;

        const Fetch = RNFetchBlob.polyfill.Fetch
        // replace built-in fetch
        window.fetch = new Fetch({
          // enable this option so that the response data conversion handled automatically
          auto: true,
          // when receiving response data, the module will match its Content-Type header
          // with strings in this array. If it contains any one of string in this array, 
          // the response body will be considered as binary data and the data will be stored
          // in file system instead of in memory.
          // By default, it only store response data to file system when Content-Type 
          // contains string `application/octet`.
          binaryContentTypes: [
            'image/',
            'video/',
            'audio/',
            'foo/',
          ]
        }).build()

        let uploadBlob = null;

        var path = Platform.OS === "ios" ? response.uri.replace("file://", "") : response.uri

        var d = new Date();
        var _name = d.getHours() + d.getMinutes() + d.getSeconds() + 'img.jpg';

        fs.readFile(path, "base64")
          .then(data => {
            //console.log(data);
            let mime = "image/jpg";
            return Blob.build(data, { type: `${mime};BASE64` });
          })
          .then(blob => {
            this.setState({ isImageUploading: true })
            uploadBlob = blob;
            Firebase
              .storage()
              .ref("ProfileImages/" + _name)
              .put(blob)
              .then(() => {
                uploadBlob.close();
                return Firebase
                  .storage()
                  .ref("ProfileImages/" + _name)
                  .getDownloadURL();
              })
              .then(async uploadedFile => {
                console.log("++++++++++++");
                console.log({ uploadedFile });
                await this.setState({ img_url: uploadedFile })
                console.log(this.state.img_url);
                this.setState({ isImageUploading: false })
                this.setState({ isModalVisible12: true })
                setTimeout(() => {
                  this.setState({ isModalVisible12: false })
                }, 2000)
              })
              .catch(error => {
                console.log({ error });
              });
          });

        this.setState({
          avatarSource: source
        });
      }
    });
  };

  checkfun = async () => {
    await this.setState({ ischecked: !this.state.ischecked });
  }

  SingUp = () => {
    console.log("++++++++++++++++_______");
    const { firstName, lastName, birthday, ageFlag, phoneNum, email, zipCode, password, conPassword, img_url, userType, age, ischecked } = this.state;
    console.log(img_url);
    if (img_url == "") {
      this.setState({ isModalVisible15: true })
    } else if (firstName == "") {
      this.setState({ isModalVisible1: true })
    } else if (lastName == "") {
      this.setState({ isModalVisible2: true })
    } else if (birthday == "") {
      this.setState({ isModalVisible8: true })
    } else if (ageFlag == false) {
      this.setState({ isModalVisible18: true })
    } else if (zipCode == "") {
      this.setState({ isModalVisible16: true })
    } else if (zipCode.length != 5 || atl_zipCode.zip.indexOf(zipCode) < 0) {
      this.setState({ isModalVisible19: true })
    } else if (email == "") {
      this.setState({ isModalVisible3: true })
    } else if (reg.test(email) === false) {
      this.setState({ isModalVisible4: true })
    } else if (password == "") {
      this.setState({ isModalVisible5: true })
    } else if (reg_strong.test(password) === false) {
      this.setState({ isModalVisible6: true })
    } else if (password != conPassword) {
      this.setState({ isModalVisible7: true })
    } else if (phoneNum == "") {
      this.setState({ isModalVisible9: true })
    } else if (ischecked == false) {
      this.setState({ isModalVisible14: true })
    }
    else {
      // var myTimer = setTimeout(function () { this.NetworkSensor() }.bind(this), 25000)
      this.setState({ isLoading: true })
      try {
        Firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((res) => {
            console.log(firstName)
            console.log(lastName)
            console.log(phoneNum)
            console.log(password)
            console.log(password)
            AsyncStorage.setItem('Loggined', "Success");
            AsyncStorage.setItem('userUid', res.user.uid);
            this.setState({ isLoading: false })
            // clearTimeout(myTimer)
            var user = Firebase.auth().currentUser;
            Firebase.database().ref('user/' + res.user.uid).update({
              email: email,
              fristName: firstName,
              lastName: lastName,
              phoneNum: phoneNum,
              password: password,
              profileimage: img_url,
              userType: userType,
              availableBal: 0,
              birthday: birthday,
              zipCode: zipCode,
              age: age
            });
            this.setState({ isModalVisible17: true })
            setTimeout(() => {
              this.props.navigation.navigate('Main')
              this.setState({ isModalVisible17: false })
            }, 2000)
            // user.sendEmailVerification().then(function () {
            //   console.log('email sent!!!');// Email sent.
            //   this.showAlert("Created new account successfully! please check your email! if you login, you need email verification.");
            // }.bind(this)).catch(function (error) {
            //   console.log(error);
            // });
          }
          )
          .catch((error) => {
            console.log(error)
            if (error.message == "A network error (such as timeout, interrupted connection or unreachable host) has occurred.") {
              this.setState({ isModalVisible10: true })
            } else {
              this.setState({ isModalVisible11: true })
            }
            this.setState({ isLoading: false })
          })
      }
      catch (error) {
        console.log(error.toString())
      }
    }

  }

  handleTimePicker = async (date) => {
    await this.setState({ birthday: dayjs(date).format('MM/DD/YYYY') })
    await this.setState({ birthdayYear: dayjs(date).format('YYYY') })
    console.log(this.state.birthdayYear)
    this.setState({ isTimeVisible: false })
    var currentDay = new Date();
    var currentYear = currentDay.getFullYear();
    var yearDif = currentYear - this.state.birthdayYear;
    if (yearDif > 21) {
      await this.setState({ ageFlag: true })
      await this.setState({ age: yearDif })
      console.log(this.state.ageFlag);
    } else {
      await this.setState({ ageFlag: false })
      console.log(this.state.ageFlag);
    }
  }
  hideTimePicker = () => {
    this.setState({ isTimeVisible: false })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ width: '100%' }}>
          <View style={styles.container}>
            <Spinner
              visible={this.state.isLoading}
              textContent={'Creating your account...'}
              textStyle={{ color: 'white' }}
            />
            <Spinner
              visible={this.state.isImageUploading}
              textContent={'Uploading profile image...'}
              textStyle={{ color: 'white' }}
            />
            <View style={{ width: '100%', alignItems: 'center', marginTop: 40 }}>
              <TouchableOpacity style={styles.backBtn} onPress={() => { this.props.navigation.goBack() }}>
                <Image source={require('../assets/iamges/backImage.png')} resizeMode='stretch' style={styles.backImage} />
              </TouchableOpacity>
              <View style={styles.personUploadgImage}>
                <View style={styles.personImageArea}>
                  <View style={styles.personImageArea1}>
                    <Image source={this.state.avatarSource} resizeMode='cover' style={styles.personImage} />
                  </View>
                </View>
                <TouchableOpacity style={{ ...styles.addBtn, bottom: 10 }} onPress={() => { this.chooseImage() }}>
                  <Image source={require('../assets/iamges/addImage.png')} resizeMode='stretch' style={styles.addImage} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputArea}>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={{ ...styles.inputItem, width: '48.5%', marginRight: '3%' }}>
                  <Image source={require('../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage} />
                  <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Fisrt Name" value={this.state.firstName} onChangeText={(text) => { this.setState({ firstName: text }) }}></TextInput>
                </View>
                <View style={{ ...styles.inputItem, width: '48.5%' }}>
                  <Image source={require('../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage} />
                  <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Last Name" value={this.state.lastName} onChangeText={(text) => { this.setState({ lastName: text }) }}></TextInput>
                </View>
              </View>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <TouchableOpacity style={{ ...styles.inputItem, width: '48.5%', marginRight: '3%' }} onPress={() => { this.setState({ isTimeVisible: true, }) }}>
                  <Image source={require('../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                  <Text style={{ ...styles.inputTxt, color: '#7a7a7b' }}>{this.state.birthday == "" ? "Date of Birth" : this.state.birthday}</Text>
                  <Image source={require('../assets/iamges/down-left.png')} resizeMode='stretch' style={styles.downarror} />
                </TouchableOpacity>
                <View style={{ ...styles.inputItem, width: '48.5%', marginRight: '3%' }}>
                  <Image source={require('../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage} />
                  <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Delivery Zip" value={this.state.zipCode} onChangeText={(text) => { this.setState({ zipCode: text }) }}></TextInput>
                </View>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/email.png')} resizeMode='stretch' style={styles.InputImage} />
                <TextInput style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Email Address" value={this.state.email} onChangeText={(text) => { this.setState({ email: text }) }}></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/password.png')} resizeMode='stretch' style={styles.InputImage1} />
                <TextInput secureTextEntry={true} style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Password" value={this.state.password} onChangeText={(text) => { this.setState({ password: text }) }}></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/password.png')} resizeMode='stretch' style={styles.InputImage1} />
                <TextInput secureTextEntry={true} style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Retype password" value={this.state.conPassword} onChangeText={(text) => { this.setState({ conPassword: text }) }}></TextInput>
              </View>
              <View style={styles.inputItem}>
                <Image source={require('../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <TextInput keyboardType="phone-pad" style={styles.inputTxt} placeholderTextColor="#7a7a7b" placeholder="Mobile Number" value={this.state.phoneNum} onChangeText={(text) => { this.setState({ phoneNum: text }) }}></TextInput>
              </View>
              {/* <Text style={styles.results}>{displayFields}</Text> */}
              {/* <TouchableOpacity style={styles.inputItem} onPress={this.scan.bind(this)}>
                <Image source={require('../assets/iamges/user.png')} resizeMode='stretch' style={styles.InputImage2} />
                <Text style={{ ...styles.inputTxt, color: '#7a7a7b' }}>Scan Driver's License</Text>
                <Image source={require('../assets/iamges/arrow-left.png')} resizeMode='stretch' style={styles.arrowleft} />
              </TouchableOpacity> */}
              <View style={styles.TermsArea}>
                <TouchableOpacity style={styles.forgotBtn1} onPress={() => { this.checkfun() }}>
                  <Image source={this.state.ischecked ? this.state.checkImage : this.state.uncheckImage} resizeMode='stretch' style={styles.uncheckImage} />
                </TouchableOpacity>
                <Text style={styles.termsTxt}>By checking this I agree to CannaGo's  </Text>
                <TouchableOpacity style={styles.forgotBtn1}>
                  <Text style={{ color: '#61D273', fontSize: 10, fontFamily: 'Poppins-Regular' }}>Terms & Conditions</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.signinBtn} onPress={() => this.SingUp()}>
                <Text style={styles.signinTxt1}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 50 }}></View>
          <DateTimePickerModal
            isVisible={this.state.isTimeVisible}
            mode="date"
            onConfirm={(date) => { this.handleTimePicker(date) }}
            onCancel={this.hideTimePicker}
          />
        </ScrollView>
        <Modal isVisible={this.state.isModalVisible1}>
          <View style={styles.modalView}>
            <Text style={styles.TitleTxt1}>OOPS!</Text>
            <Text style={styles.Description}>Please input first name</Text>
            <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible1: false })}>
              <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible2}>
          <View style={styles.modalView}>
            <Text style={styles.TitleTxt1}>OOPS!</Text>
            <Text style={styles.Description}>Please input last name</Text>
            <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible2: false })}>
              <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible3}>
          <View style={styles.modalView}>
            <Text style={styles.TitleTxt1}>OOPS!</Text>
            <Text style={styles.Description}>Please input email address</Text>
            <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible3: false })}>
              <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible4}>
          <View style={styles.modalView}>
            <Text style={styles.TitleTxt1}>OOPS!</Text>
            <Text style={styles.Description}>Email type error, Please type again</Text>
            <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible4: false })}>
              <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible5}>
          <View style={styles.modalView}>
            <Text style={styles.TitleTxt1}>OOPS!</Text>
            <Text style={styles.Description}>Please input your password</Text>
            <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible5: false })}>
              <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible6}>
          <View style={styles.modalView1}>
            <Text style={styles.TitleTxt1}>OOPS!</Text>
            <View style={{ width: "95%", alignSelf: 'center' }}>
              <Text style={{ ...styles.Description, textAlign: 'center' }}>
                Password must contain following:
                    </Text>
              <Text style={styles.Description1}>
                A lowercase letter{'\n'}
                        A capital letter{'\n'}
                        A number{'\n'}
                        A special character{'\n'}
                        Minimum 8 characters
                    </Text>
            </View>
            <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible6: false })}>
              <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible7}>
          <View style={styles.modalView}>
            <Text style={styles.TitleTxt1}>OOPS!</Text>
            <Text style={styles.Description}>Password doesn't match</Text>
            <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible7: false })}>
              <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible8}>
          <View style={styles.modalView}>
            <Text style={styles.TitleTxt1}>OOPS!</Text>
            <Text style={styles.Description}>Please select your birthday</Text>
            <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible8: false })}>
              <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible9}>
          <View style={styles.modalView}>
            <Text style={styles.TitleTxt1}>OOPS!</Text>
            <Text style={styles.Description}>Please input phone number</Text>
            <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible9: false })}>
              <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible11}>
          <View style={{ ...styles.modalView, alignItems: 'center' }}>
            <Text style={styles.TitleTxt1}>OOPS!</Text>
            <Text style={{ ...styles.Description, textAlign: 'center' }}>The email address is already in use by another account.</Text>
            <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible11: false })}>
              <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible10}>
          <View style={styles.modalView}>
            <Text style={styles.TitleTxt1}>OOPS!</Text>
            <Text style={styles.Description}>Your internet Connection is failed</Text>
            <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible10: false })}>
              <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible12}>
          <View style={{ ...styles.modalView, backgroundColor: 'white' }}>
            <Image source={require('../assets/iamges/CannaGo.png')} resizeMode='stretch' style={{ width: 80, height: 80, marginBottom: 20 }} />
            <Text style={{ ...styles.Description1, fontSize: 20, color: "#61D273", fontFamily: 'Poppins-Regular' }}>Profile image is uploaded</Text>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible15}>
          <View style={styles.modalView}>
            <Text style={styles.TitleTxt1}>OOPS!</Text>
            <Text style={styles.Description}>Please Select Profile Image</Text>
            <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible15: false })}>
              <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible14}>
          <View style={styles.modalView}>
            <Text style={styles.TitleTxt1}>OOPS!</Text>
            <Text style={styles.Description}>You need to agree our Terms and Conditions</Text>
            <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible14: false })}>
              <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible17}>
          <View style={{ ...styles.modalView, backgroundColor: 'white' }}>
            <Image source={require('../assets/iamges/CannaGo.png')} resizeMode='stretch' style={{ width: 80, height: 80, marginBottom: 20 }} />
            <Text style={{ ...styles.Description1, fontSize: 20, color: "#61D273", fontFamily: 'Poppins-Regular' }}>Welcome to CannaGo App!</Text>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible16}>
          <View style={styles.modalView}>
            <Text style={styles.TitleTxt1}>OOPS!</Text>
            <Text style={styles.Description}>Please input zip code</Text>
            <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible16: false })}>
              <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible18}>
          <View style={styles.modalView}>
            <Text style={styles.TitleTxt1}>OOPS!</Text>
            <Text style={{ ...styles.Description, textAlign: 'center' }}>Sorry, you have to be 21 years or older to use our service.</Text>
            <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible18: false })}>
              <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.isModalVisible19}>
          <View style={styles.modalView}>
            <Text style={styles.TitleTxt1}>OOPS!</Text>
            <Text style={{ ...styles.Description, textAlign: 'center' }}>Sorry, we're only serving the Atlanta, GA Metro Area.</Text>
            <Text style={{ ...styles.Description, textAlign: 'center', marginTop: -20 }}>Please stay tuned for more locations.</Text>
            <TouchableOpacity style={styles.QuitWorkout} onPress={() => this.setState({ isModalVisible19: false })}>
              <Text style={{ ...styles.Dismiss, color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
