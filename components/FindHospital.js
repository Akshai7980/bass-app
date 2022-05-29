/* eslint-disable */
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Linking
} from 'react-native'
import {
    colors,
    fonts,
    padding,
    dimensions,
    fsize,
    centerAlign,
    main,
    images,
    font
  } from "./styles/base.js";
  import ModalSelector from 'react-native-modal-selector'
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import Fab from './Widgets/Fab'
  import {BASE_URL} from "../helper";
  import Loader from "./Loader";
export default class FindHospital extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitals:[],
      country_list:[],
      selected_country:'Choose Country',
      country_id:'',
      region_list:[],
      selected_region:'Select Region',
      region_id:'',
      loading:false,
      
    };
  }

  getHospitals() {
    this.setState({loading:true});
    fetch(BASE_URL + `api/hospitals?country=${this.state.country_id}&region=${this.state.region_id}`)
    .then((response) =>
    {
      if (response.ok) {
        return response.json();
      }else{
        alert('Server Not responding.please try later...');
        this.setState({loading:false});
      }
    }
     
     )
    	.then((responseJson) => {
				// alert(JSON.stringify(responseJson));
				if (responseJson.success) {
					this.setState({hospitals: responseJson.data,loading:false});
				}
			})
    .catch((error) => {
      console.log(error);
    });
  }
    getCountries() {
      fetch(BASE_URL + "api/countries")
      .then((response) => response.json())
        .then((responseJson) => {
          // alert(JSON.stringify(responseJson));
          if (responseJson.success) {
            if(responseJson.data.length>0){
              let country_data={};
              let countryList=[];
              responseJson.data.forEach((item) => {
                country_data={
                  'label':item.country,
                  'key':item.id
                }
                countryList.push(country_data);
               
              })
              this.setState({country_list: countryList});
            }
            
          }
        })
      .catch((error) => {
        console.log(error);
      });
    }
    getRegion() {
      fetch(
        BASE_URL +
          `api/getRegionsByCountry?country=${this.state.country_id}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          this.setState({loading: false}, () => {
            alert("Server Not responding.please try later...");
            });
        })
        .then((responseJson) => {
          // alert(JSON.stringify(responseJson));
          if (responseJson.success) {
                  if (responseJson.data.regions.length > 0) {
                    let region_data = {};
                    let regionList = [];
                    responseJson.data.regions.forEach((item) => {
                      region_data = {
                        label: item.region,
                        key: item.id,
                      };
                      regionList.push(region_data);
                    });
                    this.setState({region_list: regionList});
                  }
                }
        })
        .catch((error) => {
          this.setState({loading: false}, () => {
            alert("Server Not responding.please try later...");
            });
        });
     
    
    }
   
   componentDidMount(){
     this.getCountries();
     this.getHospitals();
   }
  renderItem = ({ item }) => (
 
    <View key={item.id} style={{marginVertical:5,marginHorizontal:"5%",borderRadius:10,borderLeftWidth:10, borderLeftColor:colors.primary,flexDirection:"row",alignItems:"center",
    justifyContent:"center",backgroundColor:colors.GridBackground,paddingVertical:15}}>
    <View style={{flex:6,paddingLeft:18,}}>
    <Text><Text style={{color:colors.primary}}>{item.regionname}</Text>, {item.country_name}</Text>

  <Text style={{color:colors.TextColor,fontSize:12}}>{item.address1}</Text>
  {/* <Text>{item.address2}</Text> */}
  {item.phone && 
   <TouchableOpacity onPress={()=>Linking.openURL(`tel:${item.phone}`)}>
      <Text style={{color:colors.TextColor,fontSize:12}}>{item.phone}</Text>
      </TouchableOpacity>
  }
  {/* <Text>{item.email}</Text>  */}
    <View style={{flexDirection:"row",justifyContent:"space-between",marginVertical:5}}>
    <TouchableOpacity onPress={()=>this.props.navigation.navigate("HospitalDetail",{hospital_id:item.id,name:item.name})}>
      <Text style={{fontSize:fsize.xs,fontWeight:"bold",color:colors.TextColorDark}}>VIEW DETAILS</Text>
      </TouchableOpacity>

      
      <TouchableOpacity onPress={() => {
        Linking.canOpenURL("geo:" + item.latitude + "," + item.longitude).then(supported => {
          if (supported) {
            return Linking.openURL("geo:" + item.latitude + "," + item.longitude);
          } else {
            browser_url =
              "https://www.google.de/maps/@" +
              item.latitude +
              "," +
              item.longitude
            return Linking.openURL(browser_url);
          }
        })
        
        // Linking.openURL(`google.navigation:q=${item.latitude}+${item.longitude}`)}
        
      }}>
      <Text style={{fontSize:fsize.xs,fontWeight:"bold",color:colors.TextColorDark}}>GET DIRECTION</Text>
      </TouchableOpacity>
      </View>
    
    </View>
  <View style={{flex:3,paddingLeft:30,}}>
  <Image resizeMode="cover" style={{width:90,height:90,borderRadius:8}} source={{
																uri:BASE_URL+'front-assets/img/hospital/'+item.imgPath
															}} />
    </View>
    </View>
  );

  render() {
    console.log(this.state.hospitals)
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

        
        <View style={{flex:1,backgroundColor:"#fff"}}>
            <StatusBar
            backgroundColor="#D54C5D"
            barStyle="dark-content"
            translucent={false}
          />
           {this.state.loading && <Loader loading={this.state.loading}></Loader>}
            <View style={{backgroundColor:colors.primary,padding:20}}>
           
            <View style={{justifyContent:'space-around',paddingBottom:10}}>
           
           
            <ModalSelector
                      data={this.state.country_list}
                      selectedItemTextStyle={{color:colors.primary,fontFamily:font.primaryBold,fontSize: fsize.md}}
                      optionTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md}}
                      initValueTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md,textAlign:"left"}}
                      cancelTextStyle={{color:"red",fontFamily:font.primaryBold,fontSize: fsize.lg}}
                      initValue={this.state.selected_country}
                      ref={selector1 => { this.selector1 = selector1; }}
                      
                      onChange={(option)=>{ this.setState({selected_country:option.label,country_id:option.key,selected_region:'Select Region',region_id:''},()=>{
                        this.getHospitals();
                        this.getRegion();
                      }) }}
                      customSelector={
                          <TouchableOpacity onPress={() => this.selector1.open()}>
                            <View style={{borderWidth:1,borderColor:colors.TextFieldBorder,padding:10,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                      <Text style={{color:colors.TextFieldBorder,fontSize:fsize.md}}>{this.state.selected_country}</Text>
                          <Ionicons name="chevron-down" size={28} color={colors.TextFieldBorder} />
                          </View>
                          </TouchableOpacity>
                      
                          }
                      />
                     
            </View>
            <View style={{justifyContent:'space-around'}}>
            <ModalSelector
                      data={this.state.region_list}
                      selectedItemTextStyle={{color:colors.primary,fontFamily:font.primaryBold,fontSize: fsize.md}}
                      optionTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md}}
                      initValueTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md,textAlign:"left"}}
                      cancelTextStyle={{color:"red",fontFamily:font.primaryBold,fontSize: fsize.lg}}
                      initValue="Select Region"
                      ref={selector => { this.selector = selector; }}
                      onChange={(option)=>{ this.setState({selected_region:option.label,region_id:option.key},()=>{
                        this.getHospitals();
                      }) }}
                      customSelector={
                        <TouchableOpacity onPress={() => this.selector.open()}>
                       <View style={{borderWidth:1,borderColor:colors.TextFieldBorder,padding:10,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                      <Text style={{color:colors.TextFieldBorder,fontSize:fsize.md}}>{this.state.selected_region}</Text>
                      <Ionicons name="chevron-down" size={28} color={colors.TextFieldBorder} />
                      </View>
                      </TouchableOpacity>
                      
                          }
                      />
                     
            </View>
            </View>
            
  <View style={{marginVertical:10}}>
   
                       
    {this.state.hospitals.length > 0 && (<FlatList
          data={this.state.hospitals}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />)}
  
  
  
  
  
  </View>
  <Fab navigation={this.props.navigation} />
        </View>
      );
    }
   
  }

