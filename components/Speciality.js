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


export default class Speciality extends React.PureComponent {
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
			selected_region: "Choose Hospital",
			
			country_id: "",
			region_id: "",
            specialization_id: "",
            
            specialities:[],
		};
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
                    this.setState({specialities:responseJson.data})
					// if (responseJson.data.length > 0) {
					// 	let speciality_data = {};
					// 	let specialityList = [];
					// 	responseJson.data.forEach((item) => {
					// 		speciality_data = {
					// 			label: item.specialist,
					// 			key: item.id,
					// 		};
					// 		specialityList.push(speciality_data);
					// 	});
					// 	this.setState({speciality_list: specialityList});
					// }
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
      getHospitals() {
        this.setState({loading:true});
        fetch(
                BASE_URL +
                    `api/hospitals?country=${this.state.country_id}`
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
            this.setState({loading:false});
                    if (responseJson.success) {
                          if (responseJson.data.length > 0) {
                              let region_data = {};
                              let regionList = [];
                              responseJson.data.forEach((item) => {
                                  region_data = {
                                      label: item.name +","+item.regionname,
                                      key: item.regionId,
                                  };
                        regionList.push(region_data);
                        // if(this.state.hospital_id!="" && this.state.hospital_id==item.id){
                        //   this.setState({selected_hospital:item.name});
                        // }
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
		// this.getDoctors();
		this.getSpecialization();
	}
	renderItem = ({item}) => (
		<TouchableOpacity
			onPress={() => {
				this.props.navigation.navigate("SpecialityDetail", {speciality_id: item.id,hospital_id:this.state.region_id,country_id:this.state.country_id});
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
                	<View style={{flex: 3, paddingLeft: 18}}>
				<Image
					resizeMode="cover"
					style={{width: 90, height: 90, borderRadius: 8}}
					source={{
						uri: IMG_URL + item.filePath,
					}}
				/>
			</View>
			<View style={{flex: 6, paddingLeft: 30}}>
            <Text
				style={{color:colors.primary,fontSize:fonts.sm-1,textTransform:"capitalize"}}>
				{item.name}
			</Text>
			<Text style={{color:colors.TextColor,fontSize:12}} numberOfLines={3} ellipsizeMode="tail">
			{item.description?item.description.replace(/(<([^>]+)>)/gi, ""):''}
</Text> 
	
				<View style={{flexDirection: "row", justifyContent: "space-between",marginVertical:5}}>
					<Text style={{fontSize:fsize.xs,fontWeight:"bold",color:colors.TextColorDark}}>View Details</Text>
					
				</View> 
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
											selected_region: "Choose Hospital",
											region_id: "",
										},
										() => {
											this.getHospitals();
											
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
					
					</View>

					<View style={{marginVertical: 10}}>
						{this.state.specialities.length > 0 && (
							<FlatList
								data={this.state.specialities}
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

