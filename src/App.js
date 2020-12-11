import React, { Component } from 'react';
import { StatusBar } from 'react-native'

import RootNavigator from './navigations/RootNavigation';
const theme = {}

export default class App extends Component {
    render() {
        return (
            <>
                {/* <StatusBar hidden={true} /> */}
                <RootNavigator />
            </>
        );
    }
}