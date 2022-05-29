/* eslint-disable */

import {StyleSheet, Dimensions, Platform} from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}
export const deviceWidth = Dimensions.get("window").width;
export const deviceHeight = Platform.OS === "ios"
    ? Dimensions.get("window").height
    : Dimensions.get("window").height


export const colors  = {
  BrightText:"#F7C9CE",
  DarkText:"#000",
  primary: '#D54C5D',
  TextFieldBorder:'#EB8895',
  GridBackground:'#F1F1F1',
  SearchBackground:'#2A3F4D',
  TextColor:'#A4A4A4',
  TextColorDark:'#757575',
  Heading:'#000',
  FormText:'#EFB0B8',
  ButtonText:'#fff',
  InputColor:'#b3b3b3',
  
}
export const font  = {
  primaryLight: 'HelveticaNeue-Light',
  primaryBold:'HelveticaNeue-Medium'

 
}
export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
  
}
export const fonts = {
  h1:22,
  sm: 14,
  md:RFPercentage(2.3),
  lg: 28,
  xs:14,
}
export const fsize = {
  
  sm: RFPercentage(2),
  md: RFPercentage(2.3),
  lg: RFPercentage(2.5),
  xs:RFPercentage(1.4),
  xxl:RFPercentage(3.2)

}
export const centerAlign= {
  alignItems:'center',
  justifyContent:'center'
}

export const images= {

  
  logo:require('../Assets/images/splashlogo3x.png'),
  facebook:require('../Assets/images/facebook.png'),
  linkedin:require('../Assets/images/linkidin.png'),
  google:require('../Assets/images/google.png'),
  twitter:require('../Assets/images/twiter.png'),
  appointment3x:require('../Assets/images/appointment3x.png'),
  askdoctor3x:require('../Assets/images/askdoctor3x.png'),
  newsevents3x:require('../Assets/images/newsevents3x.png'),

  bell3x:require('../Assets/images/bell3x.png'),
  calendar_colored3x:require('../Assets/images/calendar_colored3x.png'),
  call3x:require('../Assets/images/call3x.png'),
  downarrow3x:require('../Assets/images/downarrow3x.png'),
  eye3x:require('../Assets/images/eye3x.png'),
  feedbac3x:require('../Assets/images/feedbac3x.png'),
  findhospital3x:require('../Assets/images/findhospital3x.png'),
  findoctor3x:require('../Assets/images/findoctor3x.png'),
  askdoctor3x:require('../Assets/images/askdoctor3x.png'),
  healthpackages3x:require('../Assets/images/healthpackages3x.png'),
  jc3x:require('../Assets/images/jc3x.png'),
  lens3x:require('../Assets/images/lens3x.png'),
  listicon3x:require('../Assets/images/listicon3x.png'),
  menu3x:require('../Assets/images/menu3x.png'),
  right_arrow3x:require('../Assets/images/right_arrow3x.png'),
  schedulevideo3x:require('../Assets/images/schedulevideo3x.png'),
  user_male:require('../Assets/images/user_male.png'),
  themeimage1:require('../Assets/images/sunset_countryside_nature_932243.jpg'),
  themeimage_doctor1:require('../Assets/images/doctor.jpeg'),
  slider1:require('../Assets/images/slider-1.jpg'),
  slider2:require('../Assets/images/slider-2.jpg'),
  slider3:require('../Assets/images/slider-3.jpg'),
  slider4:require('../Assets/images/slider-1.jpg'),
  slider5:require('../Assets/images/slider-1.jpg'),
  Blogslider1:require('../Assets/images/blog-1.jpg'),
  Blogslider2:require('../Assets/images/blog-2.jpg'),
  Blogslider3:require('../Assets/images/blog-3.jpg'),
  
  

 
}
export const main = StyleSheet.create({   
  container: {                       
    marginTop: 150,
    backgroundColor: '#ededed',
    flexWrap: 'wrap'
  },
  centerAlign:{
  
    alignItems:'center',
    justifyContent:'center',
  }

})