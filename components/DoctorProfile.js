import React from "react";
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
import Loader from "./Loader";
import HTMLView from "react-native-htmlview";
export default class DoctorProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			doctor_id: this.props.route.params.doctor_id,
			profile_data: {},
			loading: false,
		};
	}
	getDoctor() {
		this.setState({loading: true});
		fetch(BASE_URL + `api/doctor-details/${this.state.doctor_id}`)
			.then((response) => response.json())
			.then((responseJson) => {
				// alert(JSON.stringify(JSON.parse(responseJson.data.doctor.workExperience)));
				if (responseJson.success) {
					this.setState({
						profile_data: responseJson.data.doctor,
						loading: false,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
	componentDidMount() {
		this.getDoctor();
	}
	render() {
		
		return (
			<View style={{flex: 1, backgroundColor: "#fff", marginBottom: 20}}>
				<StatusBar
					backgroundColor="#D54C5D"
					barStyle="dark-content"
					translucent={false}
				/>
				   {this.state.loading && <Loader loading={this.state.loading}></Loader>}
				<ScrollView style={{backgroundColor: "#fff"}}>
					{Object.keys(this.state.profile_data).length !== 0 && (
						<View>
							<View
								style={{
									backgroundColor: "#E33A54",
									flex: 1,
									flexDirection: "row",
									paddingVertical: 30,
									paddingHorizontal: 5,
								}}>
								<View
									style={{
										flex: 2,
										alignItems: "center",
										justifyContent: "center",
									}}>
										<View style={{height: 100, width: 100, borderRadius: 50,backgroundColor:"#D82E48",position:"relative",overflow:'hidden'}}>
									<Image
										source={{
											uri:
												IMG_URL + this.state.profile_data.profileImageFilePath,
										}}
										style={{height: 110, width: 110,position:"absolute",bottom:-10}}
									/>

                                </View>
								</View>

								<View style={{flex: 4, marginLeft: 10}}>
									<Text style={{fontSize: 18, color: "#fff"}}>
										Dr.{this.state.profile_data.dname}
									</Text>
									<Text style={{color:colors.TextColor,fontSize:12,color:'#fff'}}>
										{this.state.profile_data.designation}
									</Text>
									<Text style={{color:colors.TextColor,fontSize:12,color:'#fff',textTransform:"uppercase"}}>
										{this.state.profile_data.specialization}
									</Text>
									<Text style={{color:colors.TextColor,fontSize:12,color:'#fff'}}>
									{this.state.profile_data.qualification}
									</Text>
								
									<Text style={{color:colors.TextColor,fontSize:12,color:'#fff'}}>
										{this.state.profile_data.year_of_exp} years of experience
									</Text>
								
								</View>
							</View>

							<View style={{flex: 1, paddingHorizontal: 20, paddingTop: 20}}>
								<HTMLView
									value={this.state.profile_data.introduction}
									stylesheet={htmlstyles}
								/>
							</View>

							<View style={{flex: 1, paddingHorizontal: 20,}}>
								{this.state.profile_data.workexperience.length > 0 && (
									<>
										<Text
											style={{
												fontSize: fsize.sm,
												fontFamily: font.primaryBold,
												color: colors.Heading,
												marginVertical: 1,
											}}>
											Area of Excellence
										</Text>
										<View style={{marginVertical: 10, marginLeft: 2}}>
											{this.state.profile_data.workexperience.map((item, i) => {
												return (
													<View
														style={{
															flexDirection: "row",
															alignItems: "flex-start",
															paddingBottom: 8,
														}}>
														<Image
															resizeMode="contain"
															style={{
																width: fsize.lg + 3,
																height: fsize.lg + 3,
															}}
															source={images.listicon3x}
														/>
														<Text style={{color: colors.TextColor, textAlign: "justify", fontSize:fsize.sm,paddingLeft:10}}>
															{item.experience}
														</Text>
													</View>
												);
											})}
										</View>
									</>
								)}

								{/* <TouchableOpacity onPress={()=>{console.log('VIEW DETAILED PROFILE')}}>
  <Text style={{color:colors.primary,fontFamily:font.primaryBold,fontSize:fsize.sm-2}}>VIEW DETAILED PROFILE</Text>
  </TouchableOpacity> */}

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
											this.props.navigation.navigate("AskDoctor")
										}}>
										<Text
											style={{
												color: colors.ButtonText,
												fontFamily: font.primaryBold,
												fontSize: fsize.sm,
												textAlign: "center",
											}}>
											Ask a Question
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
											this.props.navigation.navigate("BookAppointment",{speciality_id:this.state.profile_data.specialityid,doctor_id:this.state.profile_data.doctorID})
										}}>
										<Text
											style={{
												color: colors.ButtonText,
												fontFamily: font.primaryBold,
												fontSize: fsize.sm,
												textAlign: "center",
											}}>
											Book an Appointment
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					)}
				</ScrollView>

				<Fab navigation={this.props.navigation} />
			</View>
		);
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
	}

	
})