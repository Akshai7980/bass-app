import React, {Component} from "react";
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
} from "../styles/base.js";
import ModalSelector from "react-native-modal-selector";
import Ionicons from "react-native-vector-icons/Ionicons";
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import Fab from "../Widgets/Fab";
import {BASE_URL, IMG_URL} from "../../helper";
import { Colors } from "react-native/Libraries/NewAppScreen";
export default class SelectPackage extends Component {
	constructor(props) {
		super(props);
		this.state = {
            searchText: "",
            name:'',
            email:'',
            phone:'',
            package_id: this.props.route.params.package_id,
            loading:false,
		};
    }
    selectPack(){
        if(this.state.name!=""|| this.state.email!=""){

       
       
        this.setState({loading:true});
		let formdata = new FormData();
        formdata.append("package", this.state.package_id);
        formdata.append("name", this.state.name);
        formdata.append("email", this.state.email);
        formdata.append("phone", this.state.phone);
        formdata.append("user_id",6);
        fetch(BASE_URL + "api/postPackageEnquiry", {
			method: "post",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			body: formdata,
		})
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
				// console.log(responseJson.business_info);
				if (responseJson) {
					this.setState({loading:false});
					if (responseJson.success) {
						
                        this.props.navigation.navigate("PackageSubmit");


						
					} else {
						this.setState({loading: false}, () => {
                            alert("Server Not responding.please try later...");
                          });
					}
				} else {
					this.setState({loading: false}, () => {
						alert("Server Not responding.please try later...");
					  });
				}
			})
			.catch((error) => {
	
				if (error) {
					this.setState({loading: false}, () => {
						alert("Server Not responding.please try later...");
					  });
				}

				
            });	
        }else{
            alert("Please fill the fields...");
        }
    }
	render() {
		return (
			<View style={{flex: 1, backgroundColor: "#fff"}}>
				<StatusBar
					backgroundColor="#fff"
					barStyle="dark-content"
					translucent={false}
				/>
				<ScrollView style={{}}>
					
					<View style={{flex: 1, marginVertical: 15, marginHorizontal: 35}}>
						<Text
							style={{
								fontSize: fsize.sm,
								fontFamily: font.primaryBold,
								color: colors.TextColorDark,
								marginBottom: 10,
							}}>
							Your details will be sent to the hospital
						</Text>

						<View style={{}}>
						<Text style={{color: colors.TextColor, paddingVertical: 5}}>
								Name
							</Text>
							<TextInput
								style={{
									height: 45,
									borderColor: colors.TextColor,
									borderWidth: 1,
									fontSize: fsize.md,
									color: colors.TextColor,
									marginVertical: 5,
								}}
								clearTextOnFocus={true}
								onChangeText={(text) => this.setState({name: text})}
                                placeholder=""
                                value={this.state.name}
								placeholderTextColor={colors.FormText}
							/>
						</View>
                        <View style={{}}>
						<Text style={{color: colors.TextColor, paddingVertical: 5}}>
								Email ID
							</Text>
							<TextInput
								style={{
									height: 45,
								borderColor: colors.TextColor,
								borderWidth: 1,
								fontSize: fsize.md,
								color: colors.TextColor,
								marginVertical: 5,
								}}
								clearTextOnFocus={true}
								onChangeText={(text) => this.setState({email: text})}
                                placeholder=""
                                value={this.state.email}
								placeholderTextColor={colors.FormText}
							/>
						</View>
                        <View style={{}}>
						<Text style={{color: colors.TextColor, paddingVertical: 5}}>
								Phone Number
							</Text>
							<TextInput
								style={{
									height: 45,
								borderColor: colors.TextColor,
								borderWidth: 1,
								fontSize: fsize.md,
								color: colors.TextColor,
								marginVertical: 5,
								}}
								clearTextOnFocus={true}
								onChangeText={(text) => this.setState({phone: text})}
                                placeholder=""
                                value={this.state.phone}
                                keyboardType={'phone-pad'}
								placeholderTextColor={colors.FormText}
							/>
						</View>
						


						


						<View
							style={{
								flexDirection: "row",
								marginVertical: 20,
								alignItems: "center",
								justifyContent: "center",
							}}>
							<TouchableOpacity
								style={{
									width: "70%",
									backgroundColor: "#EF6E7D",
									paddingVertical: 18,
									borderRadius: 15,
									elevation: 5,
								}}
								onPress={() => {
									this.selectPack();
								}}>
								<Text
									style={{
										color: colors.ButtonText,
										fontFamily: font.primaryLight,
										fontSize: fsize.lg,
										textAlign: "center",
									}}>
									Submit
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>

				<Fab navigation={this.props.navigation} />
			</View>
		);
	}
}
