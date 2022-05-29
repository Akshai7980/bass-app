/* eslint-disable */
import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import YoutubePlayer from "react-native-youtube-iframe";
import {
	colors,
	font,
	padding,
	dimensions,
	fsize,
	centerAlign,
	main,
	images,
	fonts,
} from "./styles/base.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import Loader from "./Loader";
export default class Blog_details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		blog: this.props.route.params.item,
		loading:false,
      
    };
  }
    render(){
        let pathParts =this.state.blog.link.split('/');
return(
  <ScrollView style={{backgroundColor: "#fff"}}>
	    {this.state.loading && <Loader loading={this.state.loading}></Loader>}
<View style={styles.container}>
  
 <View>
    <YoutubePlayer
        height={230}
        width={"100%"}
        play={false}
        videoId={pathParts[pathParts.length - 1]}
        
      />

</View> 
 
 

<View style={{paddingHorizontal: 20, marginTop: 10}}>  
<Text style={{color:colors.TextColor,fontSize:fonts.xs-3}}><Ionicons
												name="md-calendar-sharp"
												size={18}
												color={colors.TextColor}
											/> On 18 JUNE 2020</Text>
<Text style={{color:"#929292",fontSize:13,paddingTop:10}}>{this.state.blog.description} </Text>


  </View>
  <View style={{paddingHorizontal: 20,  marginTop: 10}}>
  <View
										style={{
											backgroundColor: "#eeeeee",
											flex: 0.5,
											flexDirection: "row",
											alignItems: "center",
										}}>
										<View
											style={{
												backgroundColor: "#db5665",
												width: 50,
												height: 50,
												borderRadius: 25,
												alignItems: "center",
												justifyContent: "center",
												margin: 15,
											}}>
											<Text
												style={{
													color: "#fff",
													fontFamily: font.primaryBold,
													fontSize: fsize.lg,
												}}>
												AA
											</Text>
										</View>

										<View>
											<Text
												style={{
													color: "#6d6d6d",
													fontFamily: font.primaryBoldt,
													fontSize: fsize.sm,
												}}>
												Very Informative
											</Text>
											<Text
												style={{
													color: colors.TextColor,
													fontFamily: font.primaryLight,
													fontSize: fsize.xs + 1,
												}}>
												Adrian Abraham 2 days ago
											</Text>
										</View>
									</View>

</View>
</View> 
</ScrollView>
         )
        }
    }
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
        
          backgroundColor:"#ffffff",
        },
      
      })