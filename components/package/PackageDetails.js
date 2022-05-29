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

import HTMLView from "react-native-htmlview";

export default class PackageDetails extends Component {
    constructor(props) {
		super(props);
		this.state = {
			package_id: this.props.route.params.package_id,
			package_data: {},
			loading: false,
			inclusion:[],
		};
    }
    getPackage() {
		this.setState({loading: true});
		fetch(BASE_URL + `api/package-details/${this.state.package_id}`)
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
						package_data: responseJson.data.package,
						loading: false,
						inclusion:responseJson.data.inclusions,
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
		this.getPackage();
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
                        {Object.keys(this.state.package_data).length !== 0 && (
                            <>
                         <View style={{}}>
									<ImageBackground
										resizeMode="cover"
										source={{uri: IMG_URL + this.state.package_data.package_image}}
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
									value={this.state.package_data.description}
									stylesheet={htmlstyles}
								/>
							</View>
                            <View style={{paddingHorizontal: 20, paddingTop: 10,marginBottom:5}}>
                                        <Text 
                                        style={{
                                            fontFamily: font.primaryBold,
                                            fontSize: fsize.md,
                                            color: colors.Heading,
                                        }}
                                        >PRICE : <Text style={{color:colors.primary}}>{this.state.package_data.amount+" " +this.state.package_data.currency_label}</Text></Text>
                                    </View>
                                    <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 10}}>

                                    {this.state.inclusion.length > 0 && (
                                        <>
                                        	<Text
											style={{
												fontSize: fsize.sm,
												fontFamily: font.primaryBold,
												color: colors.Heading,
												marginVertical: 1,
											}}>
											Inclusions
										</Text>
                                        <View style={{marginVertical: 10, marginLeft: 2}}>
                                        {this.state.inclusion.map((item, i) => {
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
															{item}
														</Text>
													</View>
												);
											})}
                                            </View>
                                        </>
                                    )}
                                       
                                    </View>
                                    <View
									style={{
										flexDirection: "row",
										marginVertical: 30,
										alignItems: "center",
										justifyContent: "center",
									}}>
	<TouchableOpacity
										style={{
											width: "47%",
											backgroundColor: colors.primary,
											paddingVertical: 18,
											borderRadius: 15,
										}}
										onPress={() => {
											this.props.navigation.navigate("SelectPackage",{package_id:this.state.package_data.id})
										}}>
										<Text
											style={{
												color: colors.ButtonText,
												fontFamily: font.primaryBold,
												fontSize: fsize.sm,
												textAlign: "center",
											}}>
											Choose Package
										</Text>
									</TouchableOpacity>
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