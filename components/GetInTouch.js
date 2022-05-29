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
export default class GetInTouch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            
            
            name:'',
            email:'',
			phone:'',
            message:'get in touch',
			country_list: [],
      selected_country: "Choose Country",
      region_list: [],
      selected_region: "Select Hospital",
      hospital_list: [],
      selected_hospital: "Select Hospital",
	  country_id:'',
	  region_id:'',
		};
    }
   
    componentDidMount(){
        this.getCountries();
	}
	getCountries() {
		this.setState({loading:true});
			fetch(BASE_URL + "api/countries")
		  .then((response) => 
		 {
		  if (response.ok) {
			return response.json();
		  }
		  this.setState({loading: false}, () => {
			alert("Server Not responding.please try later...");
			});
		 }
		  )
				.then((responseJson) => {
			// alert(JSON.stringify(responseJson));
			this.setState({loading:false});
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
				  if(this.state.country_id!="" && this.state.country_id==item.id){
					this.setState({selected_country:item.country});
				  }
							});
							this.setState({country_list: countryList});
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
                    `api/hospitals?country=${this.state.country_id}&region=${this.state.region_id}`
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
                              let hospital_data = {};
                              let hospitalList = [];
                              responseJson.data.forEach((item) => {
                                  hospital_data = {
                                      label: item.name +","+item.regionname,
                                      key: item.id,
                                  };
                        hospitalList.push(hospital_data);
                        if(this.state.hospital_id!="" && this.state.hospital_id==item.id){
                          this.setState({selected_hospital:item.name});
                        }
                              });
                              this.setState({hospital_list: hospitalList});
                          }
                      }
                })
                .catch((error) => {
                    this.setState({loading: false}, () => {
              alert("Server Not responding.please try later...");
              });
                });
       
        
      }
	  getRegion() {
		this.setState({loading:true});
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
			this.setState({loading:false});
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
						if(this.state.region_id!="" && this.state.region_id==item.id){
						  this.setState({selected_region:item.region});
						}
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
    sendEnquiry(){
        if(this.state.name!="" &&  this.state.email!="" &&  this.state.phone!=""){

       
       
            this.setState({loading:true});
            let formdata = new FormData();
            formdata.append("name", this.state.name);
            formdata.append("email", this.state.email);
            formdata.append("phone", this.state.phone);
            formdata.append("message", this.state.message);
          
           formdata.append("country", this.state.country_id);
            formdata.append("region", this.state.region_id);
           
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
                    
                    // console.log(responseJson.business_info);
                    if (responseJson) {
                        this.setState({loading:false});
                        if (responseJson.success) {


							this.setState({
								name:'',email:'',phone:'',country_id:'',region_id:'',message:'',
				selected_country: "Choose Country",selected_region: "Select Hospital",
								},()=>{
									this.props.navigation.goBack();
    
								})
                            
                           
    
                            
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
					<View style={{ justifyContent: "space-around", paddingBottom: 5 }}>
              <Text style={{ color: colors.TextColor, paddingVertical: 5 }}>
                Country*
              </Text>
              <ModalSelector
                  data={this.state.country_list}
                  selectedItemTextStyle={{color:colors.primary,fontFamily:font.primaryBold,fontSize: fsize.md}}
								optionTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md}}
								initValueTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md,textAlign:"left"}}
								cancelTextStyle={{color:"red",fontFamily:font.primaryBold,fontSize: fsize.lg}}
                  initValue={this.state.selected_country}
                ref={(selector) => {
                  this.selector = selector;
                }}
                onChange={(option) => {
									this.setState(
										{
											selected_country: option.label,
											country_id: option.key,
											selected_region: "Select Hospital",
                      region_id: "",
                      selected_hospital: "Select Hospital",
											hospital_id: "",
										},
										() => {
                                            this.getHospitals();
										}
									);
								}}
                customSelector={
                  <TouchableOpacity onPress={() => this.selector.open()}>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: colors.TextColor,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ color: colors.TextColor, fontSize: fsize.md }}
                      >
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
            <View style={{ justifyContent: "space-around", paddingBottom: 5 }}>
              <Text style={{ color: colors.TextColor, paddingVertical: 5 }}>
                Hospital*
              </Text>
              <ModalSelector
                data={this.state.hospital_list}
                selectedItemTextStyle={{color:colors.primary,fontFamily:font.primaryBold,fontSize: fsize.md}}
								optionTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md}}
								initValueTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md,textAlign:"left"}}
								cancelTextStyle={{color:"red",fontFamily:font.primaryBold,fontSize: fsize.lg}}
								initValue={this.state.selected_region}
                ref={(selector1) => {
                  this.selector1 = selector1;
                }}
                onChange={(option) => {
									this.setState(
										{
											selected_region: option.label,
											region_id: option.key,
											selected_hospital: "Select Hospital",
											hospital_id: "",
										},
										
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
                      }}
                    >
                      <Text
                        style={{ color: colors.TextColor, fontSize: fsize.md }}
                      >
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
								this.sendEnquiry();
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
			
			</View>
		);
	}
}
