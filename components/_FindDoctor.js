import React from "react";
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
	fonts,
	padding,
	dimensions,
	fsize,
	centerAlign,
	main,
	images,
	font
} from "./styles/base.js";
import ModalSelector from "react-native-modal-selector";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fab from "./Widgets/Fab";
import {TabView, SceneMap} from "react-native-tab-view";
const initialLayout = {width: Dimensions.get("window").width};
import {BASE_URL, IMG_URL} from "../helper";
import Loader from "./Loader";
const renderTabBar = (props, active) => (
	<TabBar
		{...props}
		onTabPress={({route, preventDefault}) => {
			if (route.key >= 2 && active == false) {
				preventDefault();

				// Do something else
			}
		}}
		scrollEnabled={true}
		labelStyle={{
			fontSize: RFPercentage(2.3),
			fontFamily: "Lato-Regular",
			textTransform: "capitalize",
		}}
		tabStyle={{height: RFPercentage(8), borderColor: "#fff"}}
		style={{
			backgroundColor: "#5E5E5E",
			height: RFPercentage(8),
			borderColor: "#fff",
		}}
		activeTintColor="#EBEB1E"
		inactiveTintColor="#fff"
		indicatorStyle={{backgroundColor: "#fff", height: 4}}
	/>
);

export default class FindADoctor extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			searchTextAlign: "center",
			index: 0,
			setIndex: 0,
			routes: [],
			active: false,
			doctors: [],
			loading: false,
			country_list: [],
			selected_country: "Choose Country",

			region_list: [],
			selected_region: "Select Region",
			speciality_list: [],
			selected_speciality: "Select Speciality",
			country_id: "",
			region_id: "",
			specialization_id: "",
		};
	}
	getDoctors() {
		this.setState({loading: true});
		fetch(
			BASE_URL +
				`api/doctors?country=${this.state.country_id}&region=${this.state.region_id}&specialization=${this.state.specialization_id}`
		)
			.then((response) => response.json())
			.then((responseJson) => {
				// alert(JSON.stringify(responseJson.data.length));
				if (responseJson.success) {
					this.setState({doctors: responseJson.data, loading: false});
				}
			})
			.catch((error) => {
				console.log(error);
			});
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
	getSpecialization() {
		fetch(
			BASE_URL +
				`api/specializations?country=${this.state.country_id}&region=${this.state.region_id}`
		)
			.then((response) => response.json())
			.then((responseJson) => {
				// alert(JSON.stringify(responseJson));
				if (responseJson.success) {
					if (responseJson.data.length > 0) {
						let speciality_data = {};
						let specialityList = [];
						responseJson.data.forEach((item) => {
							speciality_data = {
								label: item.specialist,
								key: item.id,
							};
							specialityList.push(speciality_data);
						});
						this.setState({speciality_list: specialityList});
					}
				}
			})
			.catch((error) => {
				console.log(error);
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
		this.getCountries();
		this.getDoctors();
		this.getSpecialization();
	}
	renderItem = ({item}) => (
		<TouchableOpacity
			onPress={() => {
				this.props.navigation.navigate("DoctorProfile", {doctor_id: item.id});
			}}
			key={item.id}
			style={{
				marginVertical: 4,
				marginHorizontal: "5%",
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
				<Text>
				<Text style={{color:"red"}}>Dr.</Text> {item.dname}
				</Text>
				<Text style={{color:colors.TextColor,fontSize:12}}>{item.designation}</Text>
				<Text style={{color:colors.TextColor,fontSize:12}}>{item.year_of_exp} years of experience</Text>
				
				{/* <Text style={{color:colors.TextColorDark,fontSize:12}}>{item.specialization}</Text> */}
	
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
					{/* <View style={{flexDirection:"row",backgroundColor:colors.SearchBackground}}>
  <View style={{flex:2,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize:fsize.md,color:colors.primary}}>FIND A DOCTOR</Text></View>
  <View style={{flex:2}}>
  <TextInput
        style={{ height: 60, borderColor: 'gray', borderWidth: 0 , fontSize:fsize.md, color:"#fff",textAlign:this.state.searchTextAlign}}
        onFocus={()=>{this.setState({searchTextAlign:"left"})}}
        clearTextOnFocus={true}
        onChangeText={text => this.setState({searchText:text})}
        placeholder="SEARCH BY NAME"
        placeholderTextColor="#404F59"
        
        value={this.state.searchText}
      />
  </View>
            </View> */}
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
								ref={(selector1) => {
									this.selector1 = selector1;
								}}
								onChange={(option) => {
									this.setState(
										{
											selected_country: option.label,
											country_id: option.key,
											selected_region: "Select Region",
											region_id: "",
										},
										() => {
											this.getDoctors();
											this.getRegion();
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
								ref={(selector2) => {
									this.selector2 = selector2;
								}}
								onChange={(option) => {
									this.setState(
										{selected_region: option.label, region_id: option.key},
										() => {
											this.getSpecialization();
											this.getDoctors();
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
								data={this.state.speciality_list}
								selectedItemTextStyle={{color:colors.primary,fontFamily:font.primaryBold,fontSize: fsize.md}}
								optionTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md}}
								initValueTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md,textAlign:"left"}}
								cancelTextStyle={{color:"red",fontFamily:font.primaryBold,fontSize: fsize.lg}}
								initValue="Select Speciality"
								ref={(selector3) => {
									this.selector3 = selector3;
								}}
								onChange={(option) => {
									this.setState(
										{
											selected_speciality: option.label,
											specialization_id: option.key,
										},
										() => {
											this.getDoctors();
										}
									);
								}}
								customSelector={
									<TouchableOpacity onPress={() => this.selector3.open()}>
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
						{this.state.doctors.length > 0 && (
							<FlatList
								data={this.state.doctors}
								renderItem={this.renderItem}
								keyExtractor={(item) => item.id}
							/>
						)}
					</View>
					<Fab navigation={this.props.navigation} />
				</View>
			);
		}
	}

