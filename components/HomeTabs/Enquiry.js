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

import ModalSelector from 'react-native-modal-selector'
import Ionicons from 'react-native-vector-icons/Ionicons';
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


export default class Enquiry extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
  }
  }



  render() {
    let index = 0;
    const data = [
        { key: index++, section: true, label: 'Fruits' },
        { key: index++, label: 'Red Apples' },
        { key: index++, label: 'Cherries' },
        { key: index++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
        // etc...
        // Can also add additional custom keys which are passed to the onChange callback
        { key: index++, label: 'Vegetable', customKey: 'Not a fruit' }
    ];
    return (
      <View style={{flex:1}}>
      

      <View style={{ margin:10, backgroundColor:"#fff",padding: 5,borderRadius:8 }}>
      <Text style={{color:"#000",textAlign:"center",fontSize:16,paddingVertical:2}}>What are you looking for ?</Text>
  <View style={{flexDirection:"row", height: 40,borderColor: "grey", borderWidth: 1 ,borderRadius:6,alignItems:'center',justifyContent:'center'}}>
<Text>Your Location: Wall Street, Texas, 655332</Text>
<TouchableOpacity style={{marginLeft:10,borderRadius:4,backgroundColor:"orange",padding:4}}>
    <Text style={{fontSize:10, color:"#fff"}}>Change</Text>
    </TouchableOpacity>
  </View>
 
<View style={{flexDirection:"row"}}>
  <View style={{flex:2,marginRight:5}}>
  
          <ModalSelector
                    data={data}

                    initValue="Select something yummy!"
                    ref={selector => { this.selector = selector; }}
                    onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }}
                    customSelector={
                        <TouchableOpacity style={{height: 40}} onPress={() => this.selector.open()}>
                          <View style={{ paddingLeft:5, height: 40, marginVertical:10,borderWidth:1,borderColor:"grey",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                        <Text style={{color:"grey",fontSize:14}}>Category</Text>
                        <Ionicons name="chevron-down" size={28} color="grey" />
                        </View>
                        </TouchableOpacity>
                    
                        }
                    />
                   
          

</View>
<View style={{flex:2}}>
  <TextInput
      style={{ height: 40, borderColor: "grey", borderWidth: 1 ,borderRadius:6, fontSize:14, color:"#000",textAlign:this.state.searchTextAlign,marginVertical:10}}
      
      clearTextOnFocus={true}
      onChangeText={text => this.setState({searchText:text})}
      placeholder="Distance(Miles) With In"
      placeholderTextColor="grey"
    /> 
</View>

</View>
<ModalSelector
                    data={data}

                    initValue="Select something yummy!"
                    ref={selector => { this.selector = selector; }}
                    onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }}
                    customSelector={
                        <TouchableOpacity style={{height: 40,marginBottom:10,}} onPress={() => this.selector.open()}>
                          <View style={{ paddingLeft:5, height: 40, marginVertical:10,borderWidth:1,borderColor:"grey",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                        <Text style={{color:"grey",fontSize:14}}>Dealer(Optional)</Text>
                        <Ionicons name="chevron-down" size={28} color="grey" />
                        </View>
                        </TouchableOpacity>
                    
                        }
                    />


<TouchableOpacity style={{marginVertical:5, borderColor: "grey", borderWidth: 1 ,borderRadius:4,padding:4,backgroundColor:"#000"}}>
    <Text style={{fontSize:16, color:"#fff",textAlign:"center"}}>Search</Text>
    </TouchableOpacity>
  </View>
 <View
							style={{
								flex: 1,
                alignItems: "center",
								justifyContent: "center"
							}}
						>
 
   
     

 </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});