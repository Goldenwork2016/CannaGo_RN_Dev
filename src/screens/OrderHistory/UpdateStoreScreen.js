import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, TextInput, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { styles } from '../../components/styles';
import dayjs from 'dayjs';
import RNPickerSelect from "react-native-picker-select";
import Firebase from '../../../config/firebase'
import NonImage from '../../assets/iamges/productDetail1.png'

export default class SelectStoreHourScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: NonImage,
            ischecked: false,
            isTimeVisible: false,
            index: '',
            ii: '',
            isTimeVisible2: false,
            SunStartTime: '',
            // dayData: [
            //     { id: 1, day: 'Sun.', startTime: '', endTime: '', openStatus:false },
            //     { id: 2, day: 'Mon.', startTime: '', endTime: '', openStatus:false },
            //     { id: 3, day: 'Tues.', startTime: '', endTime: '', openStatus:false },
            //     { id: 4, day: 'Wed.', startTime: '', endTime: '', openStatus:false },
            //     { id: 5, day: 'Thurs.', startTime: '', endTime: '', openStatus:false },
            //     { id: 6, day: 'Fri.', startTime: '', endTime: '', openStatus:false },
            //     { id: 7, day: 'Sat.', startTime: '', endTime: '', openStatus:false },
            // ],
            dayData: [],
            userId: Firebase.auth().currentUser.uid,
            count:0
        };
    }

    componentDidMount = () => {
        Firebase.database()
            .ref('user/' + this.state.userId)
            .on("value", async (snapshot) => {
                console.log(snapshot);
                user_data = {
                    storeHours: snapshot.val().storeHours,
                    // data.push(row)
                };
                console.log(user_data);
                await this.setState({
                    dayData: user_data.storeHours,
                })
            })
    }

    handleTimePicker = (time, index, i) => {
        if (i == 1) {
            this.state.dayData[index].startTime = dayjs(time).format('hh:mm A')
        } else {
            this.state.dayData[index].endTime = dayjs(time).format('hh:mm A')
        }
        this.setState({
            isTimeVisible: false,
        })

    }
    hideTimePicker = () => {
        this.setState({ isTimeVisible: false })
    }

    _onChangeStatus = (value, index) => {
        this.state.dayData[index].openStatus = value,
        this.setState({count:this.state.count+1})
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ width: '100%' }}>
                    <View style={styles.container}>
                        <View style={{ width: '100%', alignItems: 'center', marginTop: Platform.OS == 'ios' ? 55 : 25 }}>
                            <TouchableOpacity style={styles.backBtn} onPress={() => { this.props.navigation.goBack() }}>
                                <Image source={require('../../assets/iamges/backImage.png')} resizeMode='stretch' style={styles.backImage} />
                            </TouchableOpacity>
                            <View style={{ ...styles.personUploadgImage, marginTop: 70 }}>
                                <Text style={styles.DetailTitle}>Please enter your daily hours of operation</Text>
                            </View>
                        </View>
                        <View style={{ ...styles.inputArea, marginTop: 50 }}>
                            <FlatList
                                data={this.state.dayData}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <View>
                                        <View style={styles.TimePickerRow}>
                                            <View style={styles.selectArea}>
                                                <View style={styles.selectBtn}>
                                                    <View style={{ width: '75%', marginLeft: '5%' }}>
                                                        <RNPickerSelect
                                                            placeholder={{ label: 'Select...' }}
                                                            value={this.state.dayData[index].openStatus}
                                                            onValueChange={(value) => {
                                                                this._onChangeStatus(value, index);
                                                            }}
                                                            items={[
                                                                { label: 'Closed', value: 'Closed' },
                                                                { label: 'Open', value: 'Open' },
                                                            ]}
                                                        />
                                                    </View>
                                                    {/* <Text style={styles.selectTxt}>Closed</Text> */}
                                                    <Image source={require('../../assets/iamges/arrowdown.png')} resizeMode='stretch' style={styles.arrowdown} />
                                                </View>
                                            </View>
                                            <View style={styles.unselectArea}>
                                                <Text style={styles.selectTxt}>{item.day}</Text>
                                            </View>
                                            <View style={styles.selectArea}>
                                                <TouchableOpacity style={styles.selectBtn} onPress={() => { this.setState({ isTimeVisible: true, index: index, ii: 1 }) }}>
                                                    <Text style={styles.selectTxt}>{item.startTime}</Text>
                                                    <Image source={require('../../assets/iamges/arrowdown.png')} resizeMode='stretch' style={styles.arrowdown} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ ...styles.unselectArea, width: '12%' }}>
                                                <Text style={styles.selectTxt}>To</Text>
                                            </View>
                                            <View style={styles.selectArea}>
                                                <TouchableOpacity style={styles.selectBtn} onPress={() => { this.setState({ isTimeVisible: true, index: index, ii: 2 }) }}>
                                                    <Text style={styles.selectTxt}>{item.endTime}</Text>
                                                    <Image source={require('../../assets/iamges/arrowdown.png')} resizeMode='stretch' style={styles.arrowdown} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )}

                            />
                            <DateTimePickerModal
                                isVisible={this.state.isTimeVisible}
                                mode="time"
                                onConfirm={(time) => this.handleTimePicker(time, this.state.index, this.state.ii)}
                                onCancel={this.hideTimePicker}
                            />
                            <TouchableOpacity style={{ ...styles.signinBtn, marginTop: 100 }} onPress={() => { this.props.navigation.navigate("DispensaryUpdateScreen", {storeHour:this.state.dayData})}}>
                                <Text style={styles.signinTxt1}>Save Dispensary Hours</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: 150 }}></View>
                </ScrollView>


            </View>
        );
    }
}
