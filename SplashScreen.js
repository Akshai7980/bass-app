import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, StatusBar } from 'react-native';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{alignItems:"center",justifyContent:"center"}}>
      <StatusBar hidden/>
      <ImageBackground style={{width:'100%',height:"100%",position:"relative"}} resizeMode="cover" source={require('./assets/images/splasg_bg.png')} >
       <View style={{position:"absolute",right:20,top:20}}>
       <Image style={{width:100,height:100}} resizeMode="contain" source={require('./assets/images/jc3x.png')} />  
      </View>
      <View style={{position:"absolute",width:"100%",height:150,bottom:0,backgroundColor:"white",alignItems:'center',justifyContent:"center"}}>
       <Image style={{width:250,height:250}} resizeMode="contain" source={require('./assets/images/splashlogo3x.png')} />  
      </View>    
      </ImageBackground>
      </View>
    );
  }
}
