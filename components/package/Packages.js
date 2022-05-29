import React, {Component} from 'react';
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
	ActivityIndicator,
} from "react-native";
import {
	colors,
	font,
	fonts,
	padding,
	dimensions,
	fsize,
	centerAlign,
	main,
	images,
} from "../styles/base.js";
import ModalSelector from "react-native-modal-selector";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import Fab from "../Widgets/Fab";
const initialLayout = {width: Dimensions.get("window").width};
import {BASE_URL, IMG_URL} from "../../helper";
import { ScrollView } from "react-native-gesture-handler";
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 6);

export default class Packages extends Component {
    constructor(props) {
		super(props);
		this.state = {
            loading: false,
            packages:[],
            country_id:'',
            region_id:'',
			specialization_id:'',
			speciality_list: [],
			country_list: [],
			selected_country: "Choose Country",
			speciality:'',
			selected_speciality: "Select Speciality",
			category_list: [],
			category:'',
			selected_category: "Select Category",
			region_list: [],
			region:'',
			selected_region: "Select Region",
			country_id: "",
        }
	}
	getCountries() {
		fetch(BASE_URL + "api/countries")
			.then((response) => response.json())
			.then((responseJson) => {
				// alert(JSON.stringify(responseJson));
				if (responseJson.success) {
					if (responseJson.data.length > 0) {
						let country_data = {};
						let countryList = [];
						responseJson.data.forEach((item) => {
							country_data = {
								label: item.country,
								key: item.id,
							};
							countryList.push(country_data);
						});
						this.setState({country_list: countryList});
					}
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
    getPackages() {
		this.setState({loading: true});
		fetch(
			BASE_URL +
				`api/packages?speciality=${this.state.speciality}&region=${this.state.region_id}&category=${this.state.category}`
		)
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
				// alert(JSON.stringify(responseJson.data.length));
				if (responseJson.success) {
					this.setState({packages: responseJson.data.packages, loading: false});
				}
			})
			.catch((error) => {
                this.setState({loading: false},()=>{
                    alert("Server Not responding.please try later...");
                  });
			});
	}
	getSpecialization() {
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
	getCategory() {
		fetch(
			BASE_URL +
				`api/packages`
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
				if (responseJson.success) {
					if (responseJson.data.categories.length > 0) {
						let category_data = {};
						let categoryList = [];
						responseJson.data.categories.forEach((item) => {
							category_data = {
								label: item.category,
								key: item.id,
							};
							categoryList.push(category_data);
						});
						this.setState({category_list: categoryList});
					}
				}
			})
			.catch((error) => {
				this.setState({loading: false},()=>{
                    alert("Server Not responding.please try later...");
                  });
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
    componentDidMount() {
		this.getPackages();
		// this.getRegion();
		this.getSpecialization();
		this.getCategory();
		this.getCountries();
    }
    renderItem = ({item}) => (
		<TouchableOpacity
		onPress={() => {
			this.props.navigation.navigate("PackageDetails",{package_id:item.id,name:item.packageName});
		}}
		key={item.id}
		style={{
			marginVertical: 4,
			marginHorizontal: 10,
			borderRadius: 10,
			borderLeftWidth: 10,
			borderLeftColor: colors.primary,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: colors.GridBackground,
			paddingVertical: 15,
		}}>
		<View style={{flex: 6, paddingLeft: 18}}>
		<Text
				style={{color:colors.primary,fontSize:fonts.sm-1,textTransform:"capitalize"}}>
				{item.packageName}
			</Text>
			
            <Text
				style={{
					fontFamily: font.primaryBold,
					fontSize: fsize.md-2,
					opacity:.8,
					color:colors.DarkText,
					marginTop:5
				}}
                >
				{item.amount+' '+item.currency_label}
			</Text>
		
				
<View style={{flexDirection: "row", justifyContent: "space-between",marginTop:5}}>
			<Text
				style={{fontSize:fsize.xs+1,fontWeight:"bold",color:colors.TextColorDark}}>
				VIEW DETAILS
			</Text>
			</View>
			
		</View>
		<View style={{flex: 3, paddingLeft: 10}}>
			<Image
				resizeMode="cover"
				style={{width: 90, height: 90, borderRadius: 8}}
				source={{ uri:IMG_URL+item.package_image}}
			/>
		</View>
	</TouchableOpacity>
	);
    render() {
        if (this.state.loading) {
			return (
				<View style={{flex: 1, justifyContent: "center"}}>
					<ActivityIndicator size="large" color="#D54C5D" />
				</View>
			);
		} else {

        return (
            <View style={{flex: 1, backgroundColor: "#fff"}}>
                <StatusBar
						backgroundColor="#D54C5D"
						barStyle="dark-content"
						translucent={false}
					/>
					<View
					style={{
						backgroundColor: colors.primary,
						paddingHorizontal: 20,
						paddingTop: 10,
					}}>
						<View style={{justifyContent: "space-around", paddingBottom: 10}}>
							<ModalSelector
								data={this.state.country_list}
								selectedItemTextStyle={{color:colors.primary,fontFamily:font.primaryBold,fontSize: fsize.md}}
								optionTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md}}
								initValueTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md,textAlign:"left"}}
								cancelTextStyle={{color:"red",fontFamily:font.primaryBold,fontSize: fsize.lg}}
								initValue={this.state.selected_country}
								ref={(selector10) => {
									this.selector10 = selector10;
								}}
								onChange={(option) => {
									this.setState(
										{
											selected_country: option.label,
											country_id: option.key,
											selected_region: "Choose Region",
											region_id: "",
										},
										() => {
											this.getRegion();
											
										}
									);
								}}
								customSelector={
									<TouchableOpacity onPress={() => this.selector10.open()}>
										<View
											style={{
												borderWidth: 1,
												borderColor: colors.TextFieldBorder,
												padding: 10,
												flexDirection: "row",
												justifyContent: "space-between",
												alignItems: "center",
											}}>
											<Text
												style={{
													color: colors.TextFieldBorder,
													fontSize: fsize.md,
												}}>
												{this.state.selected_country}
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
						<View style={{justifyContent: "space-around", paddingBottom: 10}}>
						<ModalSelector
							data={this.state.region_list}
							selectedItemTextStyle={{color:colors.primary,fontFamily:font.primaryBold,fontSize: fsize.md}}
							optionTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md}}
							initValueTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md,textAlign:"left"}}
							cancelTextStyle={{color:"red",fontFamily:font.primaryBold,fontSize: fsize.lg}}
							initValue="Select Region"
							ref={(selector) => {
								this.selector = selector;
							}}
							onChange={(option) => {
								this.setState(
									{
										selected_region: option.label,
										region: option.key,
									},
									() => {
										this.getPackages();
									}
								);
							}}
							customSelector={
								<TouchableOpacity onPress={() => this.selector.open()}>
									<View
										style={{
											borderWidth: 1,
											borderColor: colors.TextFieldBorder,
											padding: 10,
											flexDirection: "row",
											justifyContent: "space-between",
											alignItems: "center",
										}}>
										<Text
											style={{
												color: colors.TextFieldBorder,
												fontSize: fsize.md,
											}}>
											{this.state.selected_region}
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
						<View style={{justifyContent: "space-around", paddingBottom: 10}}>
						<ModalSelector
							data={this.state.category_list}
							selectedItemTextStyle={{color:colors.primary,fontFamily:font.primaryBold,fontSize: fsize.md}}
							optionTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md}}
							initValueTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md,textAlign:"left"}}
							cancelTextStyle={{color:"red",fontFamily:font.primaryBold,fontSize: fsize.lg}}
							initValue="Select Category"
							ref={(selector1) => {
								this.selector1 = selector1;
							}}
							onChange={(option) => {
								this.setState(
									{
										selected_category: option.label,
										category: option.key,
									},
									() => {
										this.getPackages();
									}
								);
							}}
							customSelector={
								<TouchableOpacity onPress={() => this.selector1.open()}>
									<View
										style={{
											borderWidth: 1,
											borderColor: colors.TextFieldBorder,
											padding: 10,
											flexDirection: "row",
											justifyContent: "space-between",
											alignItems: "center",
										}}>
										<Text
											style={{
												color: colors.TextFieldBorder,
												fontSize: fsize.md,
											}}>
											{this.state.selected_category}
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
						<View style={{justifyContent: "space-around", paddingBottom: 10}}>
						<ModalSelector
							data={this.state.speciality_list}
							selectedItemTextStyle={{color:colors.primary,fontFamily:font.primaryBold,fontSize: fsize.md}}
							optionTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md}}
							initValueTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md,textAlign:"left"}}
							cancelTextStyle={{color:"red",fontFamily:font.primaryBold,fontSize: fsize.lg}}
							initValue="Select Speciality"
							ref={(selector2) => {
								this.selector2 = selector2;
							}}
							onChange={(option) => {
								this.setState(
									{
										selected_speciality: option.label,
										speciality: option.key,
									},
									() => {
										this.getPackages();
									}
								);
							}}
							customSelector={
								<TouchableOpacity onPress={() => this.selector2.open()}>
									<View
										style={{
											borderWidth: 1,
											borderColor: colors.TextFieldBorder,
											padding: 10,
											flexDirection: "row",
											justifyContent: "space-between",
											alignItems: "center",
										}}>
										<Text
											style={{
												color: colors.TextFieldBorder,
												fontSize: fsize.md,
											}}>
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

					</View>
               	<View style={{marginVertical: 10}}>
						{this.state.packages.length > 0 && (
							<FlatList
								data={this.state.packages}
								renderItem={this.renderItem}
								keyExtractor={(item) => item.id}
							/>
						)}
						{this.state.packages.length == 0 && (
							<View style={{ flex:1,justifyContent:'center',alignItems:'center',  }}>
							<View style={{ }}>
								<Text>No Records Founds</Text>
							</View>
							</View>
						)}
					</View>
					<Fab navigation={this.props.navigation} />
            </View>
        )
        }
    }
}
