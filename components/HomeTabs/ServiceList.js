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


export default class ServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
  }
  }

renderItem = ({item})=> {
return(
	<View style={styles.item}>
<View style={{alignItems:"center",justifyContent:"center"}}>
<Text style={{color:"#fff",textAlign:"center",fontSize:12}}>{item.title}</Text>
</View>
</View>
)}

  render() {
    return (
      <View style={{flex:1,marginVertical:20}}>
      


 <View
style={{
flex: 1,
alignItems: "center",
justifyContent: "center"
}}>
 
   
     
   <FlatList
        data={DATA}
        style={{ flex: 1 }}
        renderItem={this.renderItem}
        numColumns={numColumns}
        scrollEnabled={false}
        keyExtractor={item => item.id}
      />
   
 </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

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