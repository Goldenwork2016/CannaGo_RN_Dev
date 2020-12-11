import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text } from 'react-native';


export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotationAngle: 0
    };
    this._bootstrapAsync();
  }

  componentDidMount = async () => {

  }

  _bootstrapAsync = async () => {
    setTimeout(() => {
      this.props.navigation.navigate('Auth')
    }, 3000)
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/iamges/logo.png')} resizeMode='stretch' style={{ width: 162, height: 170 }} />
        <Text style={{color:'gray'}}>Let's be buds!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  }
})
