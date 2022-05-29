import React, { Component } from 'react'
import {
	View,
	Image,
	StyleSheet,
	TouchableOpacity,
	Text,
	TextInput,
	Dimensions,
	ScrollView,
	StatusBar,
    ActivityIndicator,
    ImageBackground,
    Linking
} from "react-native";
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
import ModalSelector from "react-native-modal-selector";
import Ionicons from "react-native-vector-icons/Ionicons";

import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import Fab from "./Widgets/Fab";
import {BASE_URL, IMG_URL} from "../helper";

import HTMLView from "react-native-htmlview";

export default class SpecialityDetail extends Component {
    constructor(props) {
		super(props);
		this.state = {
			speciality_id: this.props.route.params.speciality_id,
			hospital_id: this.props.route.params.hospital_id,
			region_id: this.props.route.params.region_id,
			country_id: this.props.route.params.country_id,
			speciality_data: {},
			loading: false,
		
		};
    }
    getDetail() {
		this.setState({loading: true});
		fetch(BASE_URL + `api/speciality-details/${this.state.speciality_id}`)
            .then((response) => 
            
            {
                if (response.ok) {
                    return response.json();
                  }
                  this.setState({loading: false},()=>{
                    alert("Server Not responding.please try later...");
                  });
            }
            
            )
			.then((responseJson) => {
				// alert(JSON.stringify(responseJson));
				if (responseJson.success) {
					this.setState({
						speciality_data: responseJson.data.specialization,
						loading: false,
						
					});
				}
			})
			.catch((error) => {
                this.setState({loading: false},()=>{
                    alert("Server Not responding.please try later...");
                  });
			});
	}
	componentDidMount() {
		this.getDetail();
	}
    render() {
        if (this.state.loading) {
			return (
				<View style={{flex: 1, justifyContent: "center"}}>
					<ActivityIndicator size="large" color="#D54C5D" />
				</View>
			);
		} else {
        return (
            <View style={{flex: 1, backgroundColor: "#fff", marginBottom: 20}}>
                	<StatusBar
					backgroundColor="#D54C5D"
					barStyle="dark-content"
					translucent={false}
				/>
                		<ScrollView style={{backgroundColor: "#fff"}}>
                        {Object.keys(this.state.speciality_data).length !== 0 && (
                            <>
                         <View style={{}}>
									<ImageBackground
										resizeMode="cover"
										source={{uri: IMG_URL +this.state.speciality_data.filePath}}
										style={{height: 200, width: "100%"}}>
										<View
											style={{
												flex: 1,
												justifyContent: "flex-end",
												padding: 20,
											}}>
											
										
											
											
										</View>
									</ImageBackground>
								</View>
                                <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 10}}>
								<HTMLView
									value={this.state.speciality_data.description}
									stylesheet={htmlstyles}
								/>
                                 <View
									style={{
										flexDirection: "row",
										marginVertical: 55,
										alignItems: "center",
										justifyContent: "space-between",
									}}>
									<TouchableOpacity
										style={{
											width: "47%",
											backgroundColor: colors.primary,
											paddingVertical: 18,
											borderRadius: 15,
										}}
										onPress={() => {
											this.props.navigation.navigate("BookAppointment",{hospital_id:this.state.hospital_id,country_id:this.state.country_id,region_id:this.state.region_id})
										}}>
										<Text
											style={{
												color: colors.ButtonText,
												fontFamily: font.primaryBold,
												fontSize: fsize.sm,
												textAlign: "center",
											}}>
											Book Appointment
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={{
											width: "47%",
											backgroundColor: colors.primary,
											paddingVertical: 18,
											borderRadius: 15,
										}}
										onPress={() => {
                                            this.props.navigation.navigate("AskDoctor")
										}}>
										<Text
											style={{
												color: colors.ButtonText,
												fontFamily: font.primaryBold,
												fontSize: fsize.sm,
												textAlign: "center",
											}}>
											Ask A Question
										</Text>
									</TouchableOpacity>
								</View>
							</View>
                          
                                  
                                  
                            </>
                        )}
                        </ScrollView>
                
            </View>
        )
        }
    }
}


var fontSize=18;
var htmlstyles =StyleSheet.create({
        a: {
                fontWeight: '300',
                fontSize:fontSize
        },
	p:{
		color: colors.TextColor, textAlign: "justify", fontSize:fsize.sm
	},
	strong:{
		fontWeight:'bold',
		fontSize:fontSize
	},
	li:{
		fontSize:fontSize,
	},
	div:{
display:'none',
	},
	br:{
		display:'none'
	},
	font:{
		display:'none'
	}

	
})