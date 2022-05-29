/* eslint-disable */
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions
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
  import { TabView, SceneMap, ScrollPager, TabBar } from 'react-native-tab-view';
  import FindADoctor from './_FindDoctor';
  import SearchDoctor from './_SearchDoctor';
  import {BASE_URL} from "../helper";
  const initialLayout = { width: Dimensions.get('window').width };

  const renderTabBar = (props)=> (
    <TabBar
      {...props}
    labelStyle= {{ fontSize:fsize.sm,fontFamily:font.primaryBold,textTransform:"uppercase" }}
    tabStyle= {{height: RFPercentage(8),borderColor:"#fff" }}
    style= {{ backgroundColor:colors.SearchBackground,height: RFPercentage(8), }}
    activeColor={colors.primary}
    inactiveColor="#404F59"
    pressColor={colors.primary}
    indicatorStyle={{backgroundColor:"#fff",height:0}}
    />
  );
 
export default class FindDoctor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        searchText:"",
        searchTextAlign:"center",
        index:0,
        routes:[{ key: 'FindADoctor', title: 'FIND A DOCTOR' },
                { key: 'SearchDoctor', title: 'SEARCH BY NAME' },],
     
    };
  }

  renderScene = ({ route , jumpTo,}) => {
    const { navigation } = this.props;
    switch(route.key){
      case 'FindADoctor':
        return <FindADoctor navigation={navigation} jumpTo={jumpTo}/>;
        break;
      case 'SearchDoctor':
        return <SearchDoctor navigation={navigation} jumpTo={jumpTo}/>
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
        
        <>
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
    />
   
     </>
    );
  }
}
