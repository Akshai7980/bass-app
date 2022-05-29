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
  StatusBar,
  FlatList,
  ActivityIndicator
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
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
  import Fab from './Widgets/Fab'
  import { TabView, SceneMap } from 'react-native-tab-view';
  import FindADoctor from './_FindDoctor';
  const initialLayout = { width: Dimensions.get('window').width };
  import {BASE_URL,IMG_URL} from "../helper";
  import Loader from "./Loader";
  const renderTabBar = (props ,active)=> (
    <TabBar
      {...props}
      onTabPress={({ route, preventDefault }) => {
        
        if (route.key >= 2 && active==false) {
          preventDefault();
    
          // Do something else
        }
      }}
      scrollEnabled={true}
    labelStyle= {{ fontSize: RFPercentage(2.3),fontFamily:"Lato-Regular",textTransform:"capitalize" }}
    tabStyle= {{height: RFPercentage(8),borderColor:"#fff" }}
    style= {{ backgroundColor: '#5E5E5E',height: RFPercentage(8),borderColor:"#fff" }}
    activeTintColor="#EBEB1E"
    inactiveTintColor="#fff"
    indicatorStyle={{backgroundColor:"#fff",height:4}}
    />
  );
 
export default class SearchDoctor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        searchText:"",
        searchTextAlign:"center",
        index:0,
        setIndex:0,
        routes:[],
        active:false,
        doctors:[],
        loading:false,
    };
  }
  getDoctors() {
    this.setState({loading:true});
    fetch(BASE_URL + `api/doctors?doctor=${this.state.searchText}`)
    .then((response) => response.json())
    	.then((responseJson) => {
				// alert(JSON.stringify(responseJson.data.length));
				if (responseJson.success) {
					this.setState({doctors: responseJson.data,loading:false});
				}
			})
    .catch((error) => {
      console.log(error);
    });
  }
  componentDidMount(){
    this.getDoctors();
  }
  renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("DoctorProfile",{doctor_id:item.id})}} key={item.id} style={{marginVertical:4,marginHorizontal:"5%",borderRadius:10,borderLeftWidth:10, borderLeftColor:colors.primary,flexDirection:"row",alignItems:"center",
    justifyContent:"center",backgroundColor:colors.GridBackground,paddingVertical:15}}>
 		<View style={{flex: 6, paddingLeft: 18}}>
				<Text>
				<Text style={{color:colors.primary}}>Dr.</Text> {item.dname}
				</Text>
				<Text style={{color:colors.TextColor,fontSize:12}}>{item.designation}</Text>
        <Text style={{color:colors.TextColor,fontSize:12}}>{item.year_of_exp} years of experience</Text>
	
				<View style={{flexDirection: "row", justifyContent: "space-between",marginVertical:5}}>
					<Text style={{fontSize:fsize.xs,fontWeight:"bold",color:colors.TextColorDark}}>VIEW PROFILE</Text>
					{/* <Text style={{fontSize:fsize.xs,fontWeight:"bold"}}>GET DIRECTION</Text> */}
				</View>
			</View>
      <View style={{flex: 3, paddingLeft: 30}}>
				<Image
					resizeMode="cover"
					style={{width: 90, height: 90, borderRadius: 8}}
					source={{
						uri: IMG_URL + item.profileImageFilePath,
					}}
				/>
			</View>
  </TouchableOpacity>
  );
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
        
      <View style={{flex:1,backgroundColor:"#fff"}}>
          <StatusBar
          backgroundColor="#D54C5D"
          barStyle="dark-content"
          translucent={false}
        />
          <View style={{backgroundColor:colors.primary,paddingHorizontal:20}}>
          {/* <View style={{justifyContent:'space-around',paddingBottom:10}}>
          <ModalSelector
                    data={data}

                    initValue="Select something yummy!"
                    ref={selector => { this.selector = selector; }}
                   onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }}
                    customSelector={
                        <TouchableOpacity onPress={() => this.selector.open()}>
                          <View style={{borderWidth:1,borderColor:colors.TextFieldBorder,padding:10,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                        <Text style={{color:colors.TextFieldBorder,fontSize:fsize.md}}>Choose Country</Text>
                        <Ionicons name="chevron-down" size={28} color={colors.TextFieldBorder} />
                        </View>
                        </TouchableOpacity>
            
                        }
                    />
                   
          </View>  */}
         
    
         <View style={{ position:"relative",}}>
    <TextInput
      style={{ height: 50, borderColor: colors.FormText, borderWidth: 1 , fontSize:fsize.md, color:"#fff",marginVertical:10}}
      
      clearTextOnFocus={true}
      onChangeText={text => this.setState({searchText:text},()=>{
        this.getDoctors();
      })}
      placeholder=""
      placeholderTextColor={colors.FormText}
    > 
   
    </TextInput>
    <TouchableOpacity style={{position:'absolute',right:10,top:20}}><Ionicons  name="search-outline" size={25} color={colors.FormText} /></TouchableOpacity> 
  </View>

        
          </View>
          
<View style={{marginVertical:10}}>
  {this.state.loading && (<View style={{ 
          justifyContent: "center" }}>
          <ActivityIndicator size="small" color="#D54C5D" />
        </View>)}

{this.state.doctors.length > 0 && (<FlatList
            data={this.state.doctors}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />)}


</View>
<Fab navigation={this.props.navigation} />
      </View>
    );
  }
}
