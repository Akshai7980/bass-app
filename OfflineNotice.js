import React, { Component } from 'react'
import { Text, View,Dimensions,Platform } from 'react-native'
import NetInfo from "@react-native-community/netinfo";

const {width}=Dimensions.get('window');

export default class OfflineNotice extends Component {
    state={
        connectionInfo:true
    }
    componentDidMount(){
        NetInfo.fetch().then(isConnected =>{
            this.handleConnectivityChange(isConnected);
            NetInfo.addEventListener(state => {this.handleConnectivityChange(state)});
            // NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
          
           
        });
    }
    handleConnectivityChange=(conectioninfo)=>{
        this.setState({connectionInfo:conectioninfo.isConnected})
    }
  render() {
      if(!this.state.connectionInfo){
        return (
            <View style={{ alignItems:'center',justifyContent:'center',backgroundColor:'red' }}>
              <Text style={{ color:'#fff',height:20 }}> No Internet Connection </Text>
            </View>
          )
      }else{
          return null;
      }
  
  }
}