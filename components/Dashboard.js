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
  ActivityIndicator,
  Linking
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
  font,
} from "./styles/base.js";
import ModalSelector from "react-native-modal-selector";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fab from "./Widgets/Fab";
import Carousel from "react-native-snap-carousel";
import {BASE_URL, IMG_URL} from "../helper";
import Loader from "./Loader";
// Slider
import { scrollInterpolator, animatedStyles } from "./utils/animations";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 6);

const DATA = [];
for (let i = 0; i < 10; i++) {
  DATA.push(i);
}
// Slider

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      sliders:[],
      carouselItems: [
        {
          title: "Item 1",
          text: "Text 1",
          image: images.slider1,
        },
        {
          title: "Item 2",
          text: "Text 2",
          image: images.slider2,
        },
        {
          title: "Item 3",
          text: "Text 3",
          image: images.slider3,
        },
        {
          title: "Item 4",
          text: "Text 4",
          image: images.slider4,
        },
        {
          title: "Item 5",
          text: "Text 5",
          image: images.slider5,
        },
      ],
    };
  }
  getSliders() {
		this.setState({loading: true});
		fetch(
			BASE_URL +
				`api/sliders`
		)
			.then((response) => response.json())
			.then((responseJson) => {
				// alert(JSON.stringify(responseJson.data.length));
				if (responseJson.success) {
					this.setState({sliders: responseJson.data, loading: false});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
  _renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.itemContainer}>
          <ImageBackground
            style={{ width: "100%", height: "100%", position: "relative" }}
            resizeMode="cover"
            source={{ uri:IMG_URL +item.imagePath }}
          >
            <View style={{ flex: 1 , justifyContent: "flex-end"}}>
              
              <View style={{backgroundColor:"rgba(213, 77, 93,0.5)",
             elevation: 10,  
             zIndex:1,  
            overflow:'visible',
        
            //    shadowColor: 'pink',
            //    shadowOffset: { width: 20, height: 20 },
            //    shadowOpacity: 0.8,
            //    shadowRadius: 50,
              
            //    elevation:15,
            
              }}>
              <Text style={styles.itemLabel}>
               {item.title}
              </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }
  componentDidMount(){
    this.getSliders();
  }
  render() {
  
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar
          backgroundColor="#D54C5D"
          barStyle="dark-content"
          translucent={false}
        />
        <ScrollView style={{ flex: 1 }}>
        {this.state.loading && <Loader loading={this.state.loading}></Loader>}
          {this.state.sliders.length >  0 && (
            <>
             <Carousel
            ref={(c) => (this.carousel = c)}
            data={this.state.sliders}
            firstItem={2}
            renderItem={this._renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            containerCustomStyle={styles.carouselContainer}
            inactiveSlideShift={0}
            useScrollView={true}
            // onSnapToItem={(index) => {alert(`${index} slide clicked`)}}
            scrollInterpolator={scrollInterpolator}
            slideInterpolatedStyle={animatedStyles}
            useScrollView={true}
          />
            </>
          )}
         

          <View style={{ paddingVertical: 10, marginHorizontal: "15%" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("BookAppointment");
                }}
                style={{
                  elevation: 5,
                  width: 120,
                  height: 120,
                  backgroundColor: colors.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                  source={images.appointment3x}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: fsize.xs + 1,
                    color: colors.BrightText,
                    fontFamily: font.primaryBold,
                    lineHeight: 14,
                  }}
                >
                  Book An Appointment
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://meet-my-doctor.firebaseapp.com/#/app?entity=badr-al-samaa-ruwi&hideHospitalName=true");
                }}
                style={{
                  elevation: 5,
                  width: 120,
                  height: 120,
                  backgroundColor: colors.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                  source={images.schedulevideo3x}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: fsize.xs + 1,
                    color: colors.BrightText,
                    fontFamily: font.primaryBold,
                    lineHeight: 14,
                  }}
                >
                  Schedule Video Consultation
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("FindHospital");
                }}
                style={{
                  elevation: 5,
                  width: 120,
                  height: 120,
                  backgroundColor: colors.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                  source={images.findhospital3x}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: fsize.xs + 1,
                    color: colors.BrightText,
                    fontFamily: font.primaryBold,
                    lineHeight: 14,
                  }}
                >
                  Find A Hospital
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("FindDoctor");
                }}
                style={{
                  elevation: 5,
                  width: 120,
                  height: 120,
                  backgroundColor: colors.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                  source={images.findoctor3x}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: fsize.xs + 1,
                    color: colors.BrightText,
                    fontFamily: font.primaryBold,
                    lineHeight: 14,
                  }}
                >
                  Find A Doctor
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("FindSpeciality");
                }}
                style={{
                  elevation: 5,
                  width: 120,
                  height: 120,
                  backgroundColor: colors.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                }}
              >
                <MaterialCommunityIcons name="hospital-box-outline" size={35} color="#fff" />
                {/* <Image
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                  source={images.findhospital3x}
                /> */}
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: fsize.xs + 1,
                    color: colors.BrightText,
                    fontFamily: font.primaryBold,
                    lineHeight: 14,
                  }}
                >
                  Find Speciality
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Offers");
                }}
                style={{
                  elevation: 5,
                  width: 120,
                  height: 120,
                  backgroundColor: colors.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                }}
              >
                <MaterialCommunityIcons name="offer" size={35} color="#fff" />
                {/* <Image
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                  source={images.findoctor3x}
                /> */}
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: fsize.xs + 1,
                    color: colors.BrightText,
                    fontFamily: font.primaryBold,
                    lineHeight: 14,
                  }}
                >
                  Offer Page
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
<View  style={{
              marginTop:10,
              backgroundColor: "#F4F4F4",
            }}>
          <View
            style={{
              paddingVertical: 10,
              marginHorizontal: "15%",
              // backgroundColor: "#F4F4F4",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("AskDoctor");
                }}
                style={{
                  elevation: 3,
                  width: 120,
                  height: 120,
                  backgroundColor: "#FCDEE2",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                  source={images.askdoctor3x}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: fsize.xs + 1,
                    color: "#000",
                    fontFamily: font.primaryBold,
                    lineHeight: 14,
                  }}
                >
                  Ask A Doctor
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Feedback");
                }}
                style={{
                  elevation: 3,
                  width: 120,
                  height: 120,
                  backgroundColor: "#FCDEE2",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                  source={images.feedbac3x}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: fsize.xs + 1,
                    color: "#000",
                    fontFamily: font.primaryBold,
                    lineHeight: 14,
                  }}
                >
                  Feedback
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("News");
                }}
                style={{
                  elevation: 3,
                  width: 120,
                  height: 120,
                  backgroundColor: "#FCDEE2",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                  source={images.newsevents3x}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: fsize.xs + 1,
                    color: "#000",
                    fontFamily: font.primaryBold,
                    lineHeight: 14,
                  }}
                >
                  News & Events
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Packages");
                }}
                style={{
                  elevation: 3,
                  width: 120,
                  height: 120,
                  backgroundColor: "#FCDEE2",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                  source={images.healthpackages3x}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: fsize.xs + 1,
                    color: "#000",
                    fontFamily: font.primaryBold,
                    lineHeight: 14,
                  }}
                >
                  Health Packages
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          </View>
        </ScrollView>
        <Fab navigation={this.props.navigation} />
      </View>
    );
                }
  }


const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 5,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: colors.primary,
    overflow: "hidden",
  },
  itemLabel: {
    color: "white",
    fontFamily: font.primaryBold,
    lineHeight: 18,
    fontSize: fsize.sm-1,
    textAlign: "center",
    padding: 15,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
