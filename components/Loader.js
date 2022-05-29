import React, { Component } from 'react'
import { Text, View,StyleSheet,Modal, ActivityIndicator } from 'react-native'

export default class Loader extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:this.props.loading,
            message:this.props.message?this.props.message:'loading...'
        }
    }
    render() {
        return (
            <Modal
      transparent={true}
      animationType={'none'}
      visible={this.state.loading}
      onRequestClose={() => {this.setState({loading:false})}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
          size="large"
            animating={this.state.loading} color='#D54C5D' />
            {/* <Text>{this.state.message}</Text> */}
        </View>
      </View>
    </Modal>
        )
    }
}
const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
      backgroundColor: 'rgba(237, 237, 237,0.6)',
      height: 75,
      width: 75,
      borderRadius:10 ,
      
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    }
  });
  