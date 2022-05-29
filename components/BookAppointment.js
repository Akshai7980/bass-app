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
  ActivityIndicator
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
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import DateTimePicker from "@react-native-community/datetimepicker";
import Fab from "./Widgets/Fab";
import {BASE_URL, IMG_URL} from "../helper";
import Loader from "./Loader";
export default class BookAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(1598051730000),
      show: false,
      textInputValue: "Select",
      country_list: [],
      selected_country: "Choose Country",
      region_list: [],
      selected_region: "Select Region",
      hospital_list: [],
      selected_hospital: "Select Centre",
      speciality_list: [],
      selected_speciality: "Select Speciality",
      doctor_list: [],
      selected_doctor: "Select Doctor",
      country_id:this.props.route.params?this.props.route.params.country_id:"",
			region_id: this.props.route.params?this.props.route.params.region_id:"",
			hospital_id: this.props.route.params?this.props.route.params.hospital_id:"",
			doctor_id: this.props.route.params?this.props.route.params.doctor_id:"",
      speciality: this.props.route.params?this.props.route.params.speciality_id:"",
      appointment_date:'',
      name:'',
      email:'',
      phone:'',
      loading:false,
      nameError:''
    };
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
  formatDate(date) {
		var d = new Date(date),
		  month = "" + (d.getMonth() + 1),
		  day = "" + d.getDate(),
		  year = d.getFullYear();
	
		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;
	
		return [year, month, day].join("-");
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
  getSpecialization() {
    this.setState({loading:true});
    fetch(
			BASE_URL +
				`api/specializations`
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
          				let speciality_data = {};
          				let specialityList = [];
          				responseJson.data.forEach((item) => {
          					speciality_data = {
          						label: item.name,
          						key: item.id,
          					};
                    specialityList.push(speciality_data);
                    if(this.state.speciality!="" && this.state.speciality==item.id){
                      this.setState({selected_speciality:item.name});
                    }
          				});
          				this.setState({speciality_list: specialityList},()=>{
                    this.getAllDoctor();
                  });
          			}
          		}
			})
			.catch((error) => {
				this.setState({loading: false}, () => {
          alert("Server Not responding.please try later...");
          });
			});
   
	
  }
  getSpeciality() {
    this.setState({loading:true});
    fetch(
			BASE_URL +`api/specializations?country=${this.state.country_id}`
		)
			.then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }else{
          this.setState({loading: false}, () => {
            alert("Server Not responding.please try later...1");
            });
        }
        
      })
			.then((responseJson) => {
        console.log(responseJson)
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
                    if(this.state.speciality!="" && this.state.speciality==item.id){
                      this.setState({selected_speciality:item.name});
                    }
          				});
          				this.setState({speciality_list: specialityList});
          			}
          		}
			})
			.catch((error) => {
				this.setState({loading: false}, () => {
          alert("Server Not responding.please try later...2");
          });
			});
   
	
  }
  getAllDoctor() {
    this.setState({loading:true});
    fetch(
			BASE_URL +
				`api/doctors?specialization=${this.state.speciality}`
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
          				let doctor_data = {};
          				let doctorList = [];
          				responseJson.data.forEach((item) => {
          					doctor_data = {
          						label: 'Dr. '+item.dname,
          						key: item.id,
          					};
                    doctorList.push(doctor_data);
                    if(this.state.doctor_id!="" && this.state.doctor_id==item.id){
                      this.setState({selected_doctor:item.dname});
                    }
          				});
          				this.setState({doctor_list: doctorList});
          			}
          		}
			})
			.catch((error) => {
				this.setState({loading: false}, () => {
          alert("Server Not responding.please try later...");
          });
			});
   
	
  }
  getDoctor() {
    this.setState({loading:true});
    fetch(
			BASE_URL +
				`api/doctors?country=${this.state.country_id}&region=${this.state.region_id}&specialization=${this.state.speciality}`
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
          				let doctor_data = {};
          				let doctorList = [];
          				responseJson.data.forEach((item) => {
          					doctor_data = {
          						label: 'Dr. '+item.dname,
          						key: item.id,
          					};
                    doctorList.push(doctor_data);
                    if(this.state.doctor_id!="" && this.state.doctor_id==item.id){
                      this.setState({selected_doctor:item.dname});
                    }
          				});
          				this.setState({doctor_list: doctorList});
          			}
          		}
			})
			.catch((error) => {
				this.setState({loading: false}, () => {
          alert("Server Not responding.please try later...");
          });
			});
   
	
  }
  bookAppointment(){
    
   
    if(this.state.country_id !=""  && this.state.speciality !="" && this.state.doctor_id !="" && this.state.appointment_date !="" && this.state.name !="" && this.state.email !="" && this.state.phone !=""){

       
       
      this.setState({loading:true});
      let formdata = new FormData();
      formdata.append("name", this.state.name);
      formdata.append("email", this.state.email);
      formdata.append("mobile", this.state.phone);
      formdata.append("country", this.state.country_id);
      formdata.append("region", this.state.region_id);
      formdata.append("speciality", this.state.speciality);
      formdata.append("doctor", this.state.doctor_id);
      formdata.append("appointTime", this.state.appointment_date);
      formdata.append("preferredHospital", this.state.hospital_id);
      formdata.append("user_id", 6);
      
      fetch(BASE_URL + "api/postAppointmentData", {
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
                    this.setState({name:'',email:'',phone:'',country_id:'',region_id:'',speciality:'',doctor_id:'',appointment_date:'',hospital_id:'',selected_country: "Choose Country",selected_hospital: "Select Centre",selected_speciality: "Select Speciality",selected_doctor: "Select Doctor"},()=>{
                      this.props.navigation.navigate("AppointmentSubmit");
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
  componentDidMount(){
  
    if(this.state.hospital_id!=""){
    
      this.getHospitals();
    }
    if(this.state.region_id!=""){
    
      this.getRegion();
    }
    if(this.state.speciality!=""){
    
    
      this.getSpecialization();
    }
    // if(this.state.speciality!="" && this.state.doctor_id!=""){
    
    //   this.getDoctor();
    // }
    this.getCountries();
  }
  render() {
    let index = 0;
    const data = [
      { key: index++, section: true, label: "Fruits" },
      { key: index++, label: "Red Apples" },
      { key: index++, label: "Cherries" },
      {
        key: index++,
        label: "Cranberries",
        accessibilityLabel: "Tap here for cranberries",
      },
      // etc...
      // Can also add additional custom keys which are passed to the onChange callback
      { key: index++, label: "Vegetable", customKey: "Not a fruit" },
    ];

   
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView>
          <StatusBar
            backgroundColor="#D54C5D"
            barStyle="dark-content"
            translucent={false}
          />
           {this.state.loading && <Loader loading={this.state.loading}></Loader>}
          <View style={{ paddingHorizontal: 20, paddingTop: 5 }}>
          <View style={{ justifyContent: "space-around", paddingBottom: 5 }}>
						<Text style={{color: colors.TextColor, paddingVertical: 5}}>
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
            {this.state.nameError!="" && (<Text>Name Required</Text>)}
           
					</View>
          <View style={{ justifyContent: "space-around", paddingBottom: 5 }}>
						<Text style={{color: colors.TextColor, paddingVertical: 5}}>
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
                            placeholder="Email"
                            keyboardType='email-address'
                            value={this.state.email}
							placeholderTextColor={colors.TextColor}
						/>
					</View>
          <View style={{ justifyContent: "space-around", paddingBottom: 5 }}>
						<Text style={{color: colors.TextColor, paddingVertical: 5}}>
							Phone*
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
							onChangeText={(text) => this.setState({phone: text})}
                            placeholder="Phone Number"
                            keyboardType={'number-pad'}
                            value={this.state.phone}
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
											selected_region: "Select Region",
                      region_id: "",
                      selected_hospital: "Select Centre",
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
            {/* <View style={{ justifyContent: "space-around", paddingBottom: 5 }}>
              <Text style={{ color: colors.TextColor, paddingVertical: 5 }}>
                Region*
              </Text>
              <ModalSelector
                data={this.state.region_list}
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
											selected_hospital: "Select Centre",
											hospital_id: "",
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
            </View> */}
            <View style={{ justifyContent: "space-around", paddingBottom: 5 }}>
              <Text style={{ color: colors.TextColor, paddingVertical: 5 }}>
              Select Centre*
              </Text>
              <ModalSelector
                 data={this.state.hospital_list}
                 selectedItemTextStyle={{color:colors.primary,fontFamily:font.primaryBold,fontSize: fsize.md}}
								optionTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md}}
								initValueTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md,textAlign:"left"}}
								cancelTextStyle={{color:"red",fontFamily:font.primaryBold,fontSize: fsize.lg}}
                 initValue={this.state.selected_hospital}
                ref={(selector2) => {
                  this.selector2 = selector2;
                }}
                onChange={(option) => {
									this.setState(
										{
											selected_hospital: option.label,
											hospital_id: option.key,
											selected_speciality: "Select Speciality",
											speciality: "",
										},
										() => {
											this.getSpeciality();
										}
                  );
                }}
                customSelector={
                  <TouchableOpacity onPress={() => this.selector2.open()}>
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
                        {this.state.selected_hospital}
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
                Speciality*
              </Text>
              <ModalSelector
                 data={this.state.speciality_list}
                 selectedItemTextStyle={{color:colors.primary,fontFamily:font.primaryBold,fontSize: fsize.md}}
								optionTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md}}
								initValueTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md,textAlign:"left"}}
								cancelTextStyle={{color:"red",fontFamily:font.primaryBold,fontSize: fsize.lg}}
                 initValue={this.state.selected_speciality}
                ref={(selector3) => {
                  this.selector3 = selector3;
                }}
                onChange={(option) => {
									this.setState(
										{
											selected_speciality: option.label,
											speciality: option.key,
											selected_doctor: "Select Doctor",
											doctor_id: "",
										},
										() => {
											this.getDoctor();
										}
                  );
                }}
                customSelector={
                  <TouchableOpacity onPress={() => this.selector3.open()}>
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
            <View style={{ justifyContent: "space-around", paddingBottom: 5 }}>
              <Text style={{ color: colors.TextColor, paddingVertical: 5 }}>
                Choose Doctor*
              </Text>
              <ModalSelector
                 data={this.state.doctor_list}
                 selectedItemTextStyle={{color:colors.primary,fontFamily:font.primaryBold,fontSize: fsize.md}}
								optionTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md}}
								initValueTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md,textAlign:"left"}}
								cancelTextStyle={{color:"red",fontFamily:font.primaryBold,fontSize: fsize.lg}}
                 initValue="Select Centre"
                ref={(selector4) => {
                  this.selector4 = selector4;
                }}
                onChange={(option) => {
									this.setState(
										{
											selected_doctor: option.label,
											doctor_id: option.key,
										
										},
										
									);
								}}
                customSelector={
                  <TouchableOpacity onPress={() => this.selector4.open()}>
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
                        {this.state.selected_doctor}
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
                Select Date*
              </Text>
              <TouchableOpacity onPress={() => this.setState({ show: true })}>
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
                  <Text style={{ color: colors.TextColor, fontSize: fsize.md }}>
                    {this.state.appointment_date}
                  </Text>
                  <Ionicons
                    name="ios-calendar-sharp"
                    size={28}
                    color={colors.TextColor}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "70%",
                  backgroundColor: "#EF6E7D",
                  paddingVertical: 14,
                  borderRadius: 15,
                  elevation: 5,
                }}
                onPress={() => {
                  this.bookAppointment();
                }}
              >
                <Text
                  style={{
                    color: colors.ButtonText,
                    fontFamily: font.primaryLight,
                    fontSize: fsize.lg,
                    textAlign: "center",
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Fab navigation={this.props.navigation} />

        {this.state.show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={"date"}
            is24Hour={true}
            display="default"
            format="YYYY-MM-DD"
            defaultDate={new Date()}
            onChange={(event, date)=>{
              this.setState({appointment_date:date?this.formatDate(date):'',show:false})
            }}
          />
        )}
      </View>
    );
        }
  }

