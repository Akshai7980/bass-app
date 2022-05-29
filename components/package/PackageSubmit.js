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
  
  import Icon from 'react-native-vector-icons/FontAwesome';
export default class PackageSubmit extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <Icon name="thumbs-up" size={60} color="#D54C5D" />
             
              <Text style={styles.title}>Congratulation, your request submited successfully</Text>
            
              <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.props.navigation.navigate('Packages')}>
                <Text style={styles.buttonText}>Ok</Text>
              </TouchableHighlight>
            </View>
          )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EEEEEE',
      alignItems: 'center',
      paddingTop:50,
    },
    
    title:{
      fontSize:24,
      textAlign: 'center',
      marginTop:22,
      color: "#5F6D7A"
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
