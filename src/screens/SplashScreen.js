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
        <Image source={require('../assets/iamges/SplashLogo.png')} resizeMode='stretch' style={{ width: 162, height: 180 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    marginBottom:50
  }
})
