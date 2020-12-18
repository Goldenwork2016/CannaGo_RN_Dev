import React, { Component } from 'react';
import { StatusBar, View } from 'react-native'

import RootNavigator from './navigations/RootNavigation';
import AsyncStorage from '@react-native-community/async-storage'
const theme = {}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usertype: 'consumer',
        };
    }

    componentDidMount = async () => {

        // await AsyncStorage.getItem('user')
        //     .then((value) => {
        //         // const user = JSON.parse(value);
        //         // console.warn('user1131242314311', user)
        //         // usertype1 = user
        //         // console.log('user111', usertype1)
        //         console.log('-----', value);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        var usertype = await AsyncStorage.getItem("usertype");
        console.log('-------', usertype);
        await this.setState({ usertype: usertype })
        console.log('----state---', this.state.usertype);
    }
    render() {
        return (
            <>
                <RootNavigator />
            </>
        );
    }
}