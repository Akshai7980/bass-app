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
	Alert,
	ImageBackground,
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
} from "./styles/base.js";
import ModalSelector from "react-native-modal-selector";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import Fab from "./Widgets/Fab";
import {BASE_URL, IMG_URL} from "../helper";
import Loader from "./Loader";
export default class AskDoctor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name:'',
            email:'',
			phone:'',
            textInputValue: "Select",
            speciality_list: [],
			speciality:'',
            selected_speciality: "Select Speciality",
			message:'',
			loading:false
		};
    }
    getSpecialization() {
		this.setState({loading:true});
		fetch(
			BASE_URL +
				`api/specializations`
		)
			.then((response) =>{
                if (response.ok) {
                    return response.json();
                  }
                  this.setState({loading: false},()=>{
                    alert("Server Not responding.please try later...");
                  });
            } )
			.then((responseJson) => {
				// alert(JSON.stringify(responseJson));
				this.setState({loading:false});
				if (responseJson.success) {
					if (responseJson.data.length > 0) {
						let speciality_data = {};
						let specialityList = [];
						responseJson.data.forEach((item) => {
							speciality_data = {
								label: item.name,
								key: item.id,
							};
							specialityList.push(speciality_data);
						});
						this.setState({speciality_list: specialityList});
					}
				}
			})
			.catch((error) => {
				this.setState({loading: false},()=>{
                    alert("Server Not responding.please try later...");
                  });
			});
    }
    componentDidMount(){
        this.getSpecialization();
    }
    sendAskRequest(){
        if(this.state.speciality!="" && this.state.message!=""){

       
       
            this.setState({loading:true});
            let formdata = new FormData();
            formdata.append("speciality", this.state.speciality);
            formdata.append("message", this.state.message);
			formdata.append("name", this.state.name);
            formdata.append("email", this.state.email);
            formdata.append("phone", this.state.phone);
            fetch(BASE_URL + "api/postQuickEnquiryData", {
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
                            
                            this.props.navigation.goBack();
    
    
                            
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
		let index = 0;
		const data = [
			{key: index++, section: true, label: "Fruits"},
			{key: index++, label: "Red Apples"},
			{key: index++, label: "Cherries"},
			{
				key: index++,
				label: "Cranberries",
				accessibilityLabel: "Tap here for cranberries",
			},
			// etc...
			// Can also add additional custom keys which are passed to the onChange callback
			{key: index++, label: "Vegetable", customKey: "Not a fruit"},
		];
		return (
			<View style={{flex: 1, backgroundColor: "#fff"}}>
				<StatusBar
					backgroundColor="#D54C5D"
					barStyle="dark-content"
					translucent={false}
				/>
				    {this.state.loading && <Loader loading={this.state.loading}></Loader>}
				<View style={{paddingHorizontal: 20, paddingTop: 10}}>
				<View style={{}}>
						<Text style={{color: colors.TextColor, paddingVertical: 10}}>
							Name*
						</Text>

						<TextInput
							style={{
								height: 45,
								borderColor: colors.TextColor,
								borderWidth: 1,
								fontSize: fsize.md,
								color: colors.TextColor,
							}}
							
							clearTextOnFocus={true}
							onChangeText={(text) => this.setState({name: text})}
                            placeholder="Name"
                            value={this.state.name}
							placeholderTextColor={colors.TextColor}
						/>
					</View>
                    <View style={{}}>
						<Text style={{color: colors.TextColor, paddingVertical: 10}}>
							Email*
						</Text>

						<TextInput
							style={{
								height: 45,
								borderColor: colors.TextColor,
								borderWidth: 1,
								fontSize: fsize.md,
								color: colors.TextColor,
							}}
							
							clearTextOnFocus={true}
							onChangeText={(text) => this.setState({email: text})}
                            placeholder="Email Address"
                            value={this.state.email}
							placeholderTextColor={colors.TextColor}
						/>
					</View>
                    <View style={{}}>
						<Text style={{color: colors.TextColor, paddingVertical: 10}}>
							Phone*
						</Text>

						<TextInput
							style={{
								height: 50,
								borderColor: colors.TextColor,
								borderWidth: 1,
								fontSize: fsize.md,
								color: colors.TextColor,
							}}
							
							clearTextOnFocus={true}
							onChangeText={(text) => this.setState({phone: text})}
                            placeholder="Phone Number"
                            value={this.state.phone}
                            keyboardType={'phone-pad'}
							placeholderTextColor={colors.TextColor}
						/>
					</View>
					<View style={{justifyContent: "space-around", paddingBottom: 10}}>
						<Text style={{color: colors.TextColor, paddingVertical: 10}}>
							Choose Specialities
						</Text>
						<ModalSelector
						data={this.state.speciality_list}
						selectedItemTextStyle={{color:colors.primary,fontFamily:font.primaryBold,fontSize: fsize.md}}
						optionTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md}}
						initValueTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md,textAlign:"left"}}
						cancelTextStyle={{color:"red",fontFamily:font.primaryBold,fontSize: fsize.lg}}
                        initValue="Select Speciality"
							ref={(selector1) => {
								this.selector1 = selector1;
							}}
							onChange={(option) => {
								this.setState(
									{
										selected_speciality: option.label,
										speciality: option.key,
									}
								);
							}}
							customSelector={
								<TouchableOpacity onPress={() => this.selector1.open()}>
									<View
										style={{
											borderWidth: 1,
											borderColor: colors.TextColor,
											paddingHorizontal: 10,
											paddingVertical: 5,
											flexDirection: "row",
											justifyContent: "space-between",
											alignItems: "center",
										}}>
										<Text style={{color: colors.TextColor, fontSize: fsize.md}}>
										{this.state.selected_speciality}
										</Text>
										<Ionicons
											name="chevron-down"
											size={28}
											color={colors.TextFieldBorder}
										/>
									</View>
								</TouchableOpacity>
							}
						/>
					</View>
					<View style={{}}>
						<Text style={{color: colors.TextColor, paddingVertical: 10}}>
							Write Your Question?
						</Text>

						<TextInput
							style={{
								height: 100,
								borderColor: colors.TextColor,
								borderWidth: 1,
								fontSize: fsize.md,
								color: colors.TextColor,
							}}
							multiline={true}
							clearTextOnFocus={true}
							onChangeText={(text) => this.setState({message: text})}
                            placeholder=""
                            value={this.state.message}
							placeholderTextColor={colors.TextColor}
						/>
					</View>
					{/* <TouchableOpacity
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginVertical: 10,
						}}>
						<Entypo name="attachment" size={24} color={colors.DarkText} />
						<Text style={{color: colors.TextColor, marginLeft: 5}}>
							Attach Flies
						</Text>
					</TouchableOpacity> */}
					<View
						style={{
							alignItems: "center",
							justifyContent: "center",
							marginVertical: 20,
						}}>
						<TouchableOpacity
							style={{
								width: "70%",
								backgroundColor: "#EF6E7D",
								paddingVertical: 14,
								borderRadius: 15,
								elevation: 5,
							}}
							onPress={() => {
								this.sendAskRequest();
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
				<Fab navigation={this.props.navigation} />
			</View>
		);
	}
}
