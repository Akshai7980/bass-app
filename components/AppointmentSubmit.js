import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text,
    TouchableHighlight
  } from 'react-native';
  import {
    colors,
    font,
    padding,
    dimensions,
    fsize,
    centerAlign,
    main,
    images,
    
  } from "./styles/base.js";
  import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class FeedbackSubmit extends Component {
    
    render() {
        return (
            <View style={styles.container}>
              <View style={{width:80,height:80,borderRadius:40,borderWidth:3,borderColor:colors.primary,alignItems:'center',justifyContent:"center",marginBottom:20}}>
                <Icon name="checkmark-sharp" size={50} color={colors.DarkText} />
                </View>
              <Text style={styles.title}>Thank you! Your message has been successfully sent </Text>
              <Text style={styles.title}>We will contact you very soon! </Text>
             
            </View>
          )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffff',
      alignItems: 'center',
      paddingTop:100,
    },
    
    title:{
      fontSize:fsize.md,
      textAlign: 'center',
     
      color:colors.TextColor
    },
   
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:10,
      marginTop:25
    },
    loginButton: {
      backgroundColor: "#D54C5D",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize:20,
    }
  });
