import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  Alert,
  ImageBackground,
  StatusBar,
  FlatList,
  SafeAreaView
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
  fonts,
} from "./styles/base.js";
import Carousel from 'react-native-snap-carousel';
import ServiceList from'./HomeTabs/ServiceList';
import Enquiry from'./HomeTabs/Enquiry';
import Advertisements from'./HomeTabs/Advertisements';
import Offers from'./HomeTabs/Offers';
import { scrollInterpolator, animatedStyles } from './utils/animations';
import { TabView, TabBar } from 'react-native-tab-view';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Fab from './Widgets/Fab'
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 7);
const numColumns = 3;
const initialLayout = { width: Dimensions.get('window').width };

const renderTabBar = (props)=> (
  <TabBar
    {...props}
    scrollEnabled={true}
  labelStyle= {{ fontSize:fsize.sm,fontFamily:font.primaryBold,textTransform:"uppercase" }}
  tabStyle= {{height: RFPercentage(8),borderColor:"#fff" }}
  style= {{ backgroundColor:colors.SearchBackground,height: RFPercentage(8), }}
  activeColor={colors.primary}
  inactiveColor="#404F59"
  pressColor={colors.primary}
  indicatorStyle={{backgroundColor:"#fff",height:0}}
  />
);
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
    title:"Truck Repair",
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f632',
    title:"Towing & Recovery",
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d723',
    title:"Tire Sales & Repair",
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba4',
    title: 'Transport Refrigeration',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d725',
    title:"Trailer Repair",
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba6',
    title: 'Truck Stops with Repair',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba7',
    title: 'Rentals',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d728',
    title:"Truck Wash",
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba9',
    title: 'Glass Repair',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba10',
    title: 'Locksmiths',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba11',
    title: 'Fuel Stops',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7212',
    title:"Motels",
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba13',
    title: 'Scales',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba14',
    title: 'Weigh Stations',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba15',
    title: 'Rest Areas',
  }
  
];


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index:0,
      carouselItems: [
        {
            title:"Truck Repair",
            text: "Text 1",
            image:images.Blogslider1
        },
        {
            title:"Towing & Recovery",
            text: "Text 2",
            image:images.Blogslider2

        },
        {
            title:"Tire Sales & Repair",
            text: "Text 3",
            image:images.Blogslider3
        },
        
      
      ],
      routes:[
        { key: 'QuickEnquiry', title: 'Quick Enquiry' },
        { key: 'Services', title: 'Services' },
        { key: 'Offers', title: 'Offers' },
        { key: 'Advertisements', title: 'Advertisements' },
    ],  
      
    }

  }
  _renderItem({ item }) {
    if (item.empty === true) {
			return <View style={[styles.item, styles.itemInvisible]} />;
		}
    return (
     <TouchableOpacity onPress={()=>{}}> 
       <View style={styles.itemContainer}>
        <ImageBackground style={{width:'100%',height:"100%",position:"relative"}} resizeMode="cover" source={item.image}>
        <View style={{justifyContent:"flex-end",flex:1}}>
        <Text style={styles.itemLabel}>{item.title}</Text>
        </View>
       
        </ImageBackground>
      </View>
      </TouchableOpacity>
    );
  }
//   _renderList = ({item, index}) => {
//     return (
//         <View style={{backgroundColor:'pink',minHeight:200}}>
//           <View style={{flex:1,flexDirection:"row"}}>
//           <Text style={styles.title}>{ item.title }</Text>
//           <Text style={styles.title}>{ item.title }</Text>
//           <Text style={styles.title}>{ item.title }</Text>
//           <Text style={styles.title}>{ item.title }</Text>
//           <Text style={styles.title}>{ item.title }</Text>
//           <Text style={styles.title}>{ item.title }</Text>
//           <Text style={styles.title}>{ item.title }</Text>
//           <Text style={styles.title}>{ item.title }</Text>
//           <Text style={styles.title}>{ item.title }</Text>
//           <Text style={styles.title}>{ item.title }</Text>
//           <Text style={styles.title}>{ item.title }</Text>
//           <Text style={styles.title}>{ item.title }</Text>
//           <Text style={styles.title}>{ item.title }</Text>
//           <Text style={styles.title}>{ item.title }</Text>
//           <Text style={styles.title}>{ item.title }</Text>
//           </View>
                                                                                   
//         </View>
//     );
// }
renderItem = ({item})=> {
return(
	<View style={styles.item}>
<View style={{alignItems:"center",justifyContent:"center"}}>
<Text style={{color:"#fff",textAlign:"center",fontSize:fonts.xs-3}}>{item.title}</Text>
</View>
</View>
)}

renderScene = ({ route , jumpTo}) => {
  const { navigation } = this.props;
  switch(route.key){
    case 'QuickEnquiry':
      return <Enquiry navigation={navigation} jumpTo={jumpTo}/>
      break;
    case 'Services':
      return <ServiceList navigation={navigation} jumpTo={jumpTo}/>;
      break;
      case 'Advertisements':
      return <Advertisements navigation={navigation} jumpTo={jumpTo}/>
      break;
    case 'Offers':
      return <Offers navigation={navigation} jumpTo={jumpTo}/>
      break;
    
  
    default:
      return <Text>Not Found Error</Text>
  }

      

}
setIndex = (index) =>{
this.setState({index:index})
} 
  render() {
    return (
      <View style={{flex:1}}>
      
       <View style={{ marginVertical:5}}>

<Carousel
         ref={(c) => this.carousel = c}
         data={this.state.carouselItems}
         firstItem={1}
         renderItem={this._renderItem}
         sliderWidth={SLIDER_WIDTH}
         itemWidth={ITEM_WIDTH}
         containerCustomStyle={styles.carouselContainer}
         inactiveSlideShift={0}
         useScrollView={true}
         // onSnapToItem={(index) => {alert(`${index} slide clicked`)}}
         scrollInterpolator={scrollInterpolator}
         slideInterpolatedStyle={animatedStyles}
         useScrollView={true}          
       />
      
 </View>
 <TabView
            
            renderTabBar={(props)=>renderTabBar(props)}
       navigationState={{
         index: this.state.index,
         routes: this.state.routes
       }}
       renderScene={this.renderScene}
       onIndexChange={(index)=>this.setIndex(index)}
       activeTintColor={colors.primary}
       inactiveTintColor="#404F59"
       initialLayout={initialLayout}
       swipeEnabled={false}
     />


 {/* <Fab/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 5
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:12,
    backgroundColor: colors.primary,
    overflow:"hidden"
   
  },
  itemLabel: {
    color: 'white',
    fontFamily:font.primaryBold,
    lineHeight:18,
    fontSize: fsize.md,
    textAlign:'center',
    paddingBottom:20
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  item: {
    backgroundColor:"green",
		alignItems: "center",
		justifyContent: "center",
borderRadius:4,
    margin:5,
    minHeight:30,
		width: (Dimensions.get("window").width / numColumns) * 0.9 // approximate a square
  },
  itemInvisible:{
    display:'none'  }
});