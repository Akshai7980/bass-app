/* eslint-disable */
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
  StatusBar,
  Modal, 
  Alert
} from 'react-native'
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
  import ModalSelector from 'react-native-modal-selector'
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
  import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
  import Fab from './Widgets/Fab'
import { Colors } from 'react-native/Libraries/NewAppScreen';


 
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        searchText:"",
        modalVisible:false
    };
  }

  render() {

    return (
        
     <View style={{flex: 1,backgroundColor:colors.primary}}>
         <StatusBar
          backgroundColor="#fff"
          barStyle="dark-content"
          translucent={false}
        />

<Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
         this.setState({modalVisible:false})
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TouchableOpacity style={{position:'absolute',right:10,top:10}} onPress={() => {
                this.setState({modalVisible:!this.state.modalVisible});
              }}><FontAwesome5  name="window-close" size={25} color={colors.primary} /></TouchableOpacity> 
            <View style={{marginVertical:20,marginHorizontal:20}}> 
  
  <Text style={{fontSize:fsize.lg,fontFamily:font.primaryLight,color:colors.DarkText,marginBottom:15}}>Forgot Password ?</Text> 
  
  <View style={{ }}>
  <Text style={{fontSize:fsize.sm,fontFamily:font.primaryLight,color:colors.DarkText}}>Enter your email address</Text>
  <TextInput
      style={{ height: 50, borderColor: colors.TextColor, borderWidth: 1 , fontSize:fsize.md, color:"#fff",marginVertical:10}}
      
      clearTextOnFocus={true}
      onChangeText={text => this.setState({searchText:text})}
      placeholder=""
      placeholderTextColor={colors.FormText}
    /> 
     <Text style={{fontSize:fsize.sm,fontFamily:font.primaryLight,color:colors.DarkText}}>You will receive a password reset link in the above mentioned email</Text>
  </View>

  <View style={{alignItems:'center',justifyContent:'center'}}>


  <TouchableOpacity style={{width:'80%',backgroundColor:"#EF6E7D",paddingVertical:14,borderRadius:15,elevation:5,marginVertical:20}} onPress={()=>{console.log('VIEW DETAILED PROFILE')}}>
  <Text style={{color:colors.BrightText,fontFamily:font.primaryLight,fontSize:fsize.lg,textAlign:"center"}}>Proceed</Text>
  </TouchableOpacity>
  

</View>
  </View>

          </View>
        </View>
      </Modal>

<ScrollView style={{}}>

<View style={{backgroundColor:'#fff'}}>
    <View style={{alignItems:"center",justifyContent:"center"}}>
        <Image source={images.logo}
        resizeMode="contain"
         style={{width:"70%",height:200}}/>  
    </View>

  </View>
  <View style={{flex:1,marginVertical:15,marginHorizontal:35}}> 
  
  <Text style={{fontSize:fsize.xxl,fontFamily:font.primaryLight,color:colors.FormText,marginBottom:15}}>Login</Text> 
  
  <View style={{ }}>
  <Text style={{fontSize:fsize.md,fontFamily:font.primaryLight,color:colors.FormText}}>Email</Text>
  <TextInput
      style={{ height: 50, borderColor: colors.FormText, borderWidth: 1 , fontSize:fsize.md, color:"#fff",marginVertical:10}}
      
      clearTextOnFocus={true}
      onChangeText={text => this.setState({searchText:text})}
      placeholder=""
      placeholderTextColor={colors.FormText}
    /> 
  </View>






  <View style={{ position:"relative",}}>
  <Text style={{fontSize:fsize.md,fontFamily:font.primaryLight,color:colors.FormText}}>Password</Text>
  <TextInput
      style={{ height: 50, borderColor: colors.FormText, borderWidth: 1 , fontSize:fsize.md, color:"#fff",marginVertical:10}}
      
      clearTextOnFocus={true}
      onChangeText={text => this.setState({searchText:text})}
      placeholder=""
      placeholderTextColor={colors.FormText}
    > 
   
    </TextInput>
    <TouchableOpacity style={{position:'absolute',right:10,top:40}}><FontAwesome5  name="eye" size={25} color="#000" /></TouchableOpacity> 
  </View>





 
  <View style={{alignItems:'center',justifyContent:'center'}}>
  <TouchableOpacity style={{width:'70%',paddingVertical:18}} onPress={()=>{this.setState({modalVisible:true})}}>
  <Text style={{color:colors.BrightText,fontFamily:font.primaryLight,fontSize:fsize.sm+1,textAlign:"center"}}>Forget Password ?</Text>
  </TouchableOpacity>

  <TouchableOpacity style={{width:'70%',backgroundColor:"#EF6E7D",paddingVertical:18,borderRadius:15,elevation:5}} onPress={()=>{this.props.navigation.navigate('Dashboard')}}>
  <Text style={{color:colors.ButtonText,fontFamily:font.primaryLight,fontSize:fsize.lg,textAlign:"center"}}>Proceed</Text>
  </TouchableOpacity>
  
  <TouchableOpacity style={{width:'70%',paddingVertical:18}} onPress={()=>{this.props.navigation.navigate('Register')}}>
  <Text style={{color:colors.BrightText,fontFamily:font.primaryLight,fontSize:fsize.sm+1,textAlign:"center"}}>New User ? Register Here</Text>
  </TouchableOpacity>
</View>
  </View>



</ScrollView>


     </View >
    );
  }
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: 'rgba(227, 124, 138,0.9)',
    },
    modalView: {
        width:'90%',
      
      backgroundColor:"white",
     position:"relative",
     
     borderRadius:4,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });