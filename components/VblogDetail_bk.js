/* eslint-disable */
import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import YoutubePlayer from "react-native-youtube-iframe";
export default class Blog_details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        blog: this.props.route.params.item,
      
    };
  }
    render(){
        let pathParts =this.state.blog.link.split('/');
return(
<View style={styles.container}>
  <View style={{flex:1}}>
    <View style={{flex:1 ,flexDirection:"row"}}>
    <YoutubePlayer
        height={300}
        width={"100%"}
        play={false}
        videoId={pathParts[pathParts.length - 1]}
        
      />
    </View>
    
    {/* <View>
    <View style={{left:"5%",position:"relative",bottom:15}}>
        <Text style={{fontSize:16,color:"#fff"}}>Dr.Benny Panackal</Text>
        <Text style={{fontSize:16,color:"#fff"}}>Senior Consutant</Text>
        <Text style={{fontSize:14,color:"#fff"}}>CARDIOLOGY</Text>
        <Text style={{fontSize:14,color:"#fff"}}>MD, DM,FAPSC,FACC(USA)</Text>
    </View>
    </View> */}
  </View>
 

  <View style={{marginLeft:25,marginRight:13,flex:2,marginTop:20
}}>  
  <View style={{flex:1 ,flexDirection:"row"}}>
<Text style={{color:"#929292",fontSize:13}}>{this.state.blog.description} </Text>
    </View>
  {/* <View  style={{flexDirection:"row",alignItems:"flex-start",justifyContent:"flex-start",}}>
        <View>
            <Image source={require('../assets/images/calendar.png')} />
        </View>
        <View style={{marginLeft:5}}>
            <Text  style={{color:"#bdbdbd",fontSize:13}}>on 25 FEBRUARY 2020</Text>
        </View>
  </View  >  */}
        {/* <Text style={{color:"#929292",fontSize:13}}>
        You will need an Android device to run your React Native 
        Android app. This can be either a physical Android device, or more commonly, 
        you can use an Android Virtual Device which 
        allows you to emulate an Android device on your computer.
         </Text> */}
         {/* <Text  style={{color:"#929292",fontSize:13,marginVertical:5}}>
        You will need an Android device to run your React Native 
        Android app. This can be either a physical Android device, or more commonly, 
        you can use an Android Device which 
        allows you to emulate an Android device on your computer.
        </Text> */}
   {/* <View  style={{flexDirection:"row",alignItems:"flex-start",justifyContent:"flex-start",marginBottom:5,marginVertical:0}}>
       <Text style={{fontSize:14,color:"#343434"}}>Indroduction</Text>
   </View> */}
        {/* <Text  style={{color:"#929292",fontSize:13}}>
        You will need an Android device to run your React Native 
        Android app. This can be either a physical Android device, or more commonly, 
        you can use an Android Device which 
        allows you to emulate an Android device on your computer.
        </Text> */}
  </View>
      {/* <View   style={{flexDirection:"row",alignItems:"flex-start",
                justifyContent:"flex-start",marginBottom:0,marginVertical:-20,marginBottom:10,marginLeft:25}}>
            <Text  style={{color:"#929292",fontSize:14}}>Posted by:Dr Nasha Kollathodi.</Text>
      </View> */}

  {/* <View style={{flexDirection:"row",margin:10}}>
      <View>
          <Text style={{color:"#d64c5d",position:"absolute",left:30,bottom:19,zIndex:1}}>10</Text>
          <Icon name="ios-chatbox" size={20} color="#bdbdbd" style={{marginLeft:17}} />
      </View>
      <View>
          <FontAwesome name="facebook" size={20} color="#242021" style={{marginLeft:17}} />
      </View>
      <View>
          <FontAwesome name="instagram" size={20} color="#242021" style={{marginLeft:17}} />
      </View>
      <View>
          <FontAwesome name="twitter" size={20} color="#242021" style={{marginLeft:17}} />
      </View>
      <View>
          <FontAwesome name="linkedin" size={20} color="#242021" style={{marginLeft:17}} />
      </View>
  </View> */}
  {/* <View  
        style={{height:30,
        backgroundColor:"#eeeeee",
        flex:0.5,flexDirection:"row", 
        marginLeft:10,marginRight:10,
        justifyContent:"flex-start",
        alignItems:"center",
        }}>
        <View 
            style={{backgroundColor:"#db5665",
            width:60,height:60,
            borderRadius:50,
            alignItems:"center",
            justifyContent:"center",
            margin:15}}>
        <Text style={{color:"#fff",fontSize:20}}>AA</Text>
        </View>

        <View>
            <Text style={{color:"#6d6d6d",fontSize:15}}>Very Informative</Text>
            <Text  style={{color:"#d2d2d2",fontSize:14}}>Adrian Abraham 2 days ago</Text>
        </View>
  </View> */}
   
   {/* <View style={{marginLeft:30,padding:0}}>

            <View  style={{flexDirection:"row",
            alignItems:"flex-start",
            justifyContent:"flex-start",marginTop:10}}>
               <Text style={{color:"#929292",fontSize:14}}>Recent Posts</Text>
            </View>
   </View> */}
{/* 
   <View  style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginVertical:0,position:"relative"}}>
   <View style={{backgroundColor:"#ff9900",
            position:"absolute",
            height:70,width:70,
            borderRadius:40,
            right:"3%",
            alignItems:"center",justifyContent:"center",
            bottom:50,zIndex:1,}}> 
   <TouchableOpacity>
       <Text style={{color:"white",fontSize:16,textAlign:"center",}}>Quick Enquiry</Text>
    </TouchableOpacity>
   </View>
   
   
     <View style={{marginBottom:20}}>
            <TouchableOpacity style={{marginRight:16}}>
            <Text style={{color:"#d64c5d",fontSize:14}}>Congenetal Heart Deceases CHDS</Text>
            </TouchableOpacity>
    </View> 

    <View style={{marginBottom:20}}>
            <TouchableOpacity style={{marginLeft:80}}>
                <Image source={require('../assets/images/right_arrow.png')}/>
            </TouchableOpacity>
    </View>  
         
   </View> */}



</View> 
         )
        }
    }
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent:"center",
          backgroundColor:"#ffffff",
        },
      
      })