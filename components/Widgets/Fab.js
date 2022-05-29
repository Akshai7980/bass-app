/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
    colors,
    fsize,
    images,
  } from "../styles/base.js";
export default class Fab extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={{backgroundColor:"#ff9900",
        position:"absolute",
        height:70,width:70,
        borderRadius:70,
        right:10,
        alignItems:"center",justifyContent:"center",
        bottom:40,zIndex:1,}}> 
<TouchableOpacity onPress={()=>{this.props.navigation.navigate("QuickEnquiry")}}>
   <Text style={{color:"white",fontSize:fsize.sm+1,textAlign:"center",}}>Quick Enquiry</Text>
</TouchableOpacity>
</View>
    );
  }
}
