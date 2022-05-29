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

import Entypo from 'react-native-vector-icons/Entypo';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 7);
const numColumns = 3;

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


export default class Advertisements extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
  }
  }

renderItem = ({item})=> {
return(
	<View style={styles.item}>
<View style={{alignItems:"center",justifyContent:"center"}}>
<Text style={{color:"#fff",textAlign:"center",fontSize:fonts.xs-3}}>{item.title}</Text>
</View>
</View>
)}

  render() {
    return (
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
      
   
        <Text style={{textAlign:'center'}}> <Entypo name="tools" size={30} color="#FB7A52" /> Coming Soon</Text>
     
           </View>
    );
  }
}

