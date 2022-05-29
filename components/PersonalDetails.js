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
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
  import Fab from './Widgets/Fab'


 
export default class PersonalDetails extends React.Component {
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
  
  <Text style={{fontSize:fsize.xxl,fontFamily:font.primaryLight,color:colors.FormText,marginBottom:5}}>Personal Details</Text> 
  
  <View style={{ }}>
  <Text style={{fontSize:fsize.md,fontFamily:font.primaryLight,color:colors.FormText}}>Fullname</Text>
  <TextInput
      style={{ height: 50, borderColor: colors.FormText, borderWidth: 1 , fontSize:fsize.md, color:"#fff",textAlign:this.state.searchTextAlign,marginVertical:10}}
      
      clearTextOnFocus={true}
      onChangeText={text => this.setState({searchText:text})}
      placeholder=""
      placeholderTextColor={colors.FormText}
    /> 
  </View>


  <View style={{ }}>
  <Text style={{fontSize:fsize.md,fontFamily:font.primaryLight,color:colors.FormText}}>Phone Number</Text>
  
  <View style={{flexDirection:"row"}}>
  <View style={{flex:2,marginRight:5}}>
  <TextInput
      style={{ height: 50, borderColor: colors.FormText, borderWidth: 1 , fontSize:fsize.md, color:"#fff",textAlign:this.state.searchTextAlign,marginVertical:10}}
      
      clearTextOnFocus={true}
      onChangeText={text => this.setState({searchText:text})}
      placeholder=""
      placeholderTextColor={colors.FormText}
    /> 
</View>
<View style={{flex:6}}>
  <TextInput
      style={{ height: 50, borderColor: colors.FormText, borderWidth: 1 , fontSize:fsize.md, color:"#fff",textAlign:this.state.searchTextAlign,marginVertical:10}}
      
      clearTextOnFocus={true}
      onChangeText={text => this.setState({searchText:text})}
      placeholder=""
      placeholderTextColor={colors.FormText}
    /> 
</View>
</View>
  </View>



  <View style={{ }}>
  <Text style={{fontSize:fsize.md,fontFamily:font.primaryLight,color:colors.FormText}}>Nationality</Text>
  <TextInput
      style={{ height: 40, borderColor: colors.FormText, borderWidth: 1 , fontSize:fsize.md, color:"#fff",textAlign:this.state.searchTextAlign,marginVertical:10}}
      
      clearTextOnFocus={true}
      onChangeText={text => this.setState({searchText:text})}
      placeholder=""
      placeholderTextColor={colors.FormText}
    /> 
  </View>

  <View style={{ }}>
  <Text style={{fontSize:fsize.md,fontFamily:font.primaryLight,color:colors.FormText}}>National ID Number</Text>
  <TextInput
      style={{ height: 40, borderColor: colors.FormText, borderWidth: 1 , fontSize:fsize.md, color:"#fff",textAlign:this.state.searchTextAlign,marginVertical:10}}
      
      clearTextOnFocus={true}
      onChangeText={text => this.setState({searchText:text})}
      placeholder=""
      placeholderTextColor={colors.FormText}
    /> 
  </View>

  <View style={{ }}>
  <Text style={{fontSize:fsize.md,fontFamily:font.primaryLight,color:colors.FormText}}>Current Address: Street/Building/Flat</Text>
  <TextInput
      style={{ height: 40, borderColor: colors.FormText, borderWidth: 1 , fontSize:fsize.md, color:"#fff",textAlign:this.state.searchTextAlign,marginVertical:10}}
      
      clearTextOnFocus={true}
      onChangeText={text => this.setState({searchText:text})}
      placeholder=""
      placeholderTextColor={colors.FormText}
    /> 
  </View>

  <View style={{ }}>
  <Text style={{fontSize:fsize.md,fontFamily:font.primaryLight,color:colors.FormText}}>Current City</Text>
  <TextInput
      style={{ height: 40, borderColor: colors.FormText, borderWidth: 1 , fontSize:fsize.md, color:"#fff",textAlign:this.state.searchTextAlign,marginVertical:10}}
      
      clearTextOnFocus={true}
      onChangeText={text => this.setState({searchText:text})}
      placeholder=""
      placeholderTextColor={colors.FormText}
    /> 
  </View>
  <View style={{flexDirection:"row",marginVertical:55,alignItems:'center',justifyContent:'center'}}>
  <TouchableOpacity style={{width:'70%',backgroundColor:"#EF6E7D",paddingVertical:18,borderRadius:15,elevation:5}} onPress={()=>{console.log('VIEW DETAILED PROFILE')}}>
  <Text style={{color:colors.ButtonText,fontFamily:font.primaryLight,fontSize:fsize.lg,textAlign:"center"}}>Proceed</Text>
  </TouchableOpacity>
  
</View>
  </View>



</ScrollView>

<Fab/>
     </View >
    );
  }
}
