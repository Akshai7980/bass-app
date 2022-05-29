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
  StatusBar 
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


 
export default class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        searchText:""
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
<ScrollView style={{}}>

<View style={{backgroundColor:'#fff'}}>
    <View style={{alignItems:"center",justifyContent:"center"}}>
        <Image source={images.logo}
        resizeMode="contain"
         style={{width:"70%",height:200}}/>  
    </View>

  </View>
  <View style={{flex:1,marginVertical:15,marginHorizontal:35}}> 
  
  <Text style={{fontSize:fsize.xxl,fontFamily:font.primaryLight,color:colors.FormText,marginBottom:15}}>Register</Text> 
  
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
  <TouchableOpacity style={{width:'70%',paddingVertical:18}} onPress={()=>{console.log('VIEW DETAILED PROFILE')}}>
  <Text style={{color:colors.BrightText,fontFamily:font.primaryLight,fontSize:fsize.sm+1,textAlign:"center"}}>Forget Password ?</Text>
  </TouchableOpacity>

  <TouchableOpacity style={{width:'70%',backgroundColor:"#EF6E7D",paddingVertical:18,borderRadius:15,elevation:5}} onPress={()=>{console.log('VIEW DETAILED PROFILE')}}>
  <Text style={{color:colors.ButtonText,fontFamily:font.primaryLight,fontSize:fsize.lg,textAlign:"center"}}>Proceed</Text>
  </TouchableOpacity>
  
  <TouchableOpacity style={{width:'70%',paddingVertical:18}} onPress={()=>{console.log('VIEW DETAILED PROFILE')}}>
  <Text style={{color:colors.BrightText,fontFamily:font.primaryLight,fontSize:fsize.sm+1,textAlign:"center"}}>Existing User ? Login Here</Text>
  </TouchableOpacity>
</View>
  </View>



</ScrollView>


     </View >
    );
  }
}
