import React, {useState, useEffect} from "react";

import {
	Platform,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	StatusBar,
	PermissionsAndroid,
	SafeAreaView,
	ScrollView,
	Image,
	Alert,
	Dimensions,
	Button,
	ToastAndroid,
	ActivityIndicator,
	Linking
} from "react-native";
import {colors, fsize, font,images} from "./components/styles/base.js";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import {connect} from "react-redux";
import {useSelector} from "react-redux";
import FindHospital from "./components/FindHospital";
import HospitalDetail from "./components/HospitalDetail";
import Speciality from "./components/Speciality";
import SpecialityDetail from "./components/SpecialityDetail";
import Offer from "./components/Offer";
import OfferDetail from "./components/OfferDetail";
import GetInTouch from "./components/GetInTouch";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";
import FindDoctor from "./components/FindDoctor";
import DoctorProfile from "./components/DoctorProfile";
import Blog from "./components/Blog";
import BlogPage from "./components/_BlogPage";
import VlogPage from "./components/_VlogPage";
import BlogDetails from "./components/BlogDetails";
import VblogDetail from "./components/VblogDetail";
import Home from "./components/Home";
import SplashScreen from "./SplashScreen";
import OfflineNotice from "./OfflineNotice";
import PersonalDetails from "./components/PersonalDetails";
import {Colors} from "react-native/Libraries/NewAppScreen";

import News from './components/news/News.js';
import NewsDetails from './components/news/NewsDetails.js';
import Packages from './components/package/Packages.js';
import PackageDetails from './components/package/PackageDetails.js';
import SelectPackage from './components/package/SelectPackage.js';
import PackageSubmit from './components/package/PackageSubmit.js';
import QuickEnquiry from './components/QuickEnquiry.js';
import EnquirySubmit from './components/EnquirySubmit.js';
import Feedback from './components/Feedback.js';
import FeedbackSubmit from './components/FeedbackSubmit.js';
import BookAppointment from './components/BookAppointment.js';
import AppointmentSubmit from './components/AppointmentSubmit.js';

import AskDoctor from './components/AskDoctor.js';
import FindADoctor from "./components/_FindDoctor.js";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Messages(props) {
	return (
		<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
			<Entypo name="tools" size={50} color="#FB7A52" />
			<Text style={{marginVertical: 5, fontFamily: "HelveticaNeue-Light"}}>
				Page Under Maintenance
			</Text>
			<Text style={{marginVertical: 5, fontFamily: "HelveticaNeue-Medium"}}>
				Please Check Later.
			</Text>
		</View>
	);
}

function Settings(props) {
	return (
		<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
			<Entypo name="tools" size={50} color="#FB7A52" />
			<Text style={{marginVertical: 5}}>Page Under Maintenance</Text>
			<Text>Please Check Later</Text>
		</View>
	);
}
function VideoConsulting(props) {
	return (
		Linking.openURL("https://meet-my-doctor.firebaseapp.com/#/app?entity=badr-al-samaa-ruwi&hideHospitalName=true")
	);
}
function CustomDrawerContent(props) {
	return (
		<DrawerContentScrollView {...props}>
			<SafeAreaView style={{flex: 1}}>
				<View style={{flex: 1}}>
					<View
						style={{
							height: 150,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Image style={styles.logo} source={images.logo} />
					</View>

					<View style={{flex: 1}}>
						<DrawerItemList {...props} />
					</View>
				</View>
			</SafeAreaView>
		</DrawerContentScrollView>
	);
}
const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
	const activeState = useSelector((state) => state);

	return (
		<AuthStack.Navigator>
			<AuthStack.Screen
				name="Landing"
				component={Messages}
				options={{headerShown: false}}
			/>
			<AuthStack.Screen
				name="Translation"
				component={Settings}
				options={{headerShown: false}}
			/>
		</AuthStack.Navigator>
	);
};

const BlogStack = createStackNavigator();
const BlogStackScreen = () => (
	<BlogStack.Navigator
		screenOptions={({navigation, route}) => ({
			headerStyle: {
				backgroundColor: "#D54C5D",
			},
			headerTintColor: "#fff",

			//   headerLeft: (props) => (
			//    <View style={{paddingLeft:20}}><TouchableOpacity onPress={()=>{navigation.toggleDrawer()}}><Ionicons name="menu" size={40} color="#fff" /></TouchableOpacity></View>
			//  ),
			headerTitleStyle: {
				fontFamily: font.primaryLight,
				alignSelf: "center",
			},

		
		})}>
		<BlogStack.Screen
			name="Blog"
			component={Blog}
			options={({navigation, route}) => ({
				title: "Blog",
				headerLeft: (props) => (
					<View style={{paddingLeft: 20}}>
						<TouchableOpacity
							onPress={() => {
								navigation.toggleDrawer();
							}}>
							<Ionicons name="menu" size={40} color="#fff" />
						</TouchableOpacity>
					</View>
				),
				headerRight: (props) => (
					<View style={{paddingRight: 20, position: "relative"}}>
						<View
							style={{
								position: "absolute",
								top: -10,
								right: 16,
								zIndex: 1,
								alignItems: "center",
								justifyContent: "center",
								width: 16,
								height: 16,
								borderRadius: 8,
							}}>
							<Text style={{color: "#fff", fontWeight: "bold"}}>5</Text>
						</View>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("Settings");
							}}>
							<Ionicons name="notifications" size={28} color="#fff" />
						</TouchableOpacity>
					</View>
				),
			})}
		/>

		<BlogStack.Screen
			name="BlogDetails"
			component={BlogDetails}
			options={({navigation, route}) => ({
				title: route.params.name,
			})}
		/>
		<BlogStack.Screen
			name="VblogDetail"
			component={VblogDetail}
			options={({navigation, route}) => ({
				title: route.params.name,
			})}
		/>
	</BlogStack.Navigator>
);

const NewsStack = createStackNavigator();
const NewsStackScreen = () => (
	<NewsStack.Navigator
		screenOptions={({navigation, route}) => ({
			headerStyle: {
				backgroundColor: "#D54C5D",
			},
			headerTintColor: "#fff",

			
			headerTitleStyle: {
				fontFamily: font.primaryLight,
				alignSelf: "center",
			},

		
		})}>
		<NewsStack.Screen
			name="News"
			component={News}
			options={({navigation, route}) => ({
				title: "News",
				headerLeft: (props) => (
					<View style={{paddingLeft: 20}}>
						<TouchableOpacity
							onPress={() => {
								navigation.toggleDrawer();
							}}>
							<Ionicons name="menu" size={40} color="#fff" />
						</TouchableOpacity>
					</View>
				),
				headerRight: (props) => (
					<View style={{paddingRight: 20, position: "relative"}}>
						<View
							style={{
								position: "absolute",
								top: -10,
								right: 16,
								zIndex: 1,
								alignItems: "center",
								justifyContent: "center",
								width: 16,
								height: 16,
								borderRadius: 8,
							}}>
							<Text style={{color: "#fff", fontWeight: "bold"}}>5</Text>
						</View>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("Settings");
							}}>
							<Ionicons name="notifications" size={28} color="#fff" />
						</TouchableOpacity>
					</View>
				),
			})}
		/>

		<NewsStack.Screen
			name="NewsDetails"
			component={NewsDetails}
			options={({navigation, route}) => ({
				title: route.params.name,
			})}
		/>
	</NewsStack.Navigator>
);
const PackageStack = createStackNavigator();
const PackageStackScreen = () => (
	<PackageStack.Navigator
		screenOptions={({navigation, route}) => ({
			headerStyle: {
				backgroundColor: "#D54C5D",
			},
			headerTintColor: "#fff",

			
			headerTitleStyle: {
				fontFamily: font.primaryLight,
				alignSelf: "center",
			},

		
		})}>
		<PackageStack.Screen
			name="Packages"
			component={Packages}
			options={({navigation, route}) => ({
				title: "Health Packages",
				headerLeft: (props) => (
					<View style={{paddingLeft: 20}}>
						<TouchableOpacity
							onPress={() => {
								navigation.toggleDrawer();
							}}>
							<Ionicons name="menu" size={40} color="#fff" />
						</TouchableOpacity>
					</View>
				),
				headerRight: (props) => (
					<View style={{paddingRight: 20, position: "relative"}}>
						<View
							style={{
								position: "absolute",
								top: -10,
								right: 16,
								zIndex: 1,
								alignItems: "center",
								justifyContent: "center",
								width: 16,
								height: 16,
								borderRadius: 8,
							}}>
							<Text style={{color: "#fff", fontWeight: "bold"}}>5</Text>
						</View>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("Settings");
							}}>
							<Ionicons name="notifications" size={28} color="#fff" />
						</TouchableOpacity>
					</View>
				),
			})}
		/>

		<PackageStack.Screen
			name="PackageDetails"
			component={PackageDetails}
			options={({navigation, route}) => ({
				title: route.params.name,
			})}
		/>
		<PackageStack.Screen
			name="SelectPackage"
			component={SelectPackage}
			options={({navigation, route}) => ({
				title: "Contact Details",
			})}
		/>
		<PackageStack.Screen
			name="PackageSubmit"
			component={PackageSubmit}
			options={({navigation, route}) => ({
				title: "Thank You",
			})}
		/>
	</PackageStack.Navigator>
);
const HospitalStack = createStackNavigator();
const HospitalStackScreen = () => (
	<HospitalStack.Navigator
		screenOptions={({navigation, route}) => ({
			headerStyle: {
				backgroundColor: "#D54C5D",
			},
			headerTintColor: "#fff",

			
			headerTitleStyle: {
				fontFamily: font.primaryLight,
				alignSelf: "center",
			},

		
		})}>
		<HospitalStack.Screen
			name="FindHospital"
			component={FindHospital}
			options={({navigation, route}) => ({
				title: "Find A Hospital",
				headerLeft: (props) => (
					<View style={{paddingLeft: 20}}>
						<TouchableOpacity
							onPress={() => {
								navigation.toggleDrawer();
							}}>
							<Ionicons name="menu" size={40} color="#fff" />
						</TouchableOpacity>
					</View>
				),
				headerRight: (props) => (
					<View style={{paddingRight: 20, position: "relative"}}>
						<View
							style={{
								position: "absolute",
								top: -10,
								right: 16,
								zIndex: 1,
								alignItems: "center",
								justifyContent: "center",
								width: 16,
								height: 16,
								borderRadius: 8,
							}}>
							<Text style={{color: "#fff", fontWeight: "bold"}}>5</Text>
						</View>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("Settings");
							}}>
							<Ionicons name="notifications" size={28} color="#fff" />
						</TouchableOpacity>
					</View>
				),
			})}
		/>

		<HospitalStack.Screen
			name="HospitalDetail"
			component={HospitalDetail}
			options={({navigation, route}) => ({
				title: route.params.name,
			})}
		/>
		
		
	</HospitalStack.Navigator>
);
const SpecialityStack = createStackNavigator();
const SpecialityStackScreen = () => (
	<SpecialityStack.Navigator
		screenOptions={({navigation, route}) => ({
			headerStyle: {
				backgroundColor: "#D54C5D",
			},
			headerTintColor: "#fff",

			
			headerTitleStyle: {
				fontFamily: font.primaryLight,
				alignSelf: "center",
			},

		
		})}>
		<SpecialityStack.Screen
			name="FindSpeciality"
			component={Speciality}
			options={({navigation, route}) => ({
				title: "Find Speciality",
				headerLeft: (props) => (
					<View style={{paddingLeft: 20}}>
						<TouchableOpacity
							onPress={() => {
								navigation.toggleDrawer();
							}}>
							<Ionicons name="menu" size={40} color="#fff" />
						</TouchableOpacity>
					</View>
				),
				headerRight: (props) => (
					<View style={{paddingRight: 20, position: "relative"}}>
						<View
							style={{
								position: "absolute",
								top: -10,
								right: 16,
								zIndex: 1,
								alignItems: "center",
								justifyContent: "center",
								width: 16,
								height: 16,
								borderRadius: 8,
							}}>
							<Text style={{color: "#fff", fontWeight: "bold"}}>5</Text>
						</View>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("Settings");
							}}>
							<Ionicons name="notifications" size={28} color="#fff" />
						</TouchableOpacity>
					</View>
				),
			})}
		/>

		<SpecialityStack.Screen
			name="SpecialityDetail"
			component={SpecialityDetail}
			options={({navigation, route}) => ({
				title: route.params.name,
			})}
		/>
		
		
	</SpecialityStack.Navigator>
);
const OfferStack = createStackNavigator();
const OfferStackScreen = () => (
	<OfferStack.Navigator
		screenOptions={({navigation, route}) => ({
			headerStyle: {
				backgroundColor: "#D54C5D",
			},
			headerTintColor: "#fff",

			
			headerTitleStyle: {
				fontFamily: font.primaryLight,
				alignSelf: "center",
			},

		
		})}>
		<OfferStack.Screen
			name="Offer"
			component={Offer}
			options={({navigation, route}) => ({
				title: "Offers",
				headerLeft: (props) => (
					<View style={{paddingLeft: 20}}>
						<TouchableOpacity
							onPress={() => {
								navigation.toggleDrawer();
							}}>
							<Ionicons name="menu" size={40} color="#fff" />
						</TouchableOpacity>
					</View>
				),
				headerRight: (props) => (
					<View style={{paddingRight: 20, position: "relative"}}>
						<View
							style={{
								position: "absolute",
								top: -10,
								right: 16,
								zIndex: 1,
								alignItems: "center",
								justifyContent: "center",
								width: 16,
								height: 16,
								borderRadius: 8,
							}}>
							<Text style={{color: "#fff", fontWeight: "bold"}}>5</Text>
						</View>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("Settings");
							}}>
							<Ionicons name="notifications" size={28} color="#fff" />
						</TouchableOpacity>
					</View>
				),
			})}
		/>

		<OfferStack.Screen
			name="OfferDetail"
			component={OfferDetail}
			options={({navigation, route}) => ({
				title: route.params.name,
			})}
		/>
		<OfferStack.Screen
			name="GetinTouch"
			component={GetInTouch}
			
		/>
		
		
	</OfferStack.Navigator>
);
const AppointmentStack = createStackNavigator();
const AppointmentStackScreen = () => (
	<AppointmentStack.Navigator
		screenOptions={({navigation, route}) => ({
			headerStyle: {
				backgroundColor: "#D54C5D",
			},
			headerTintColor: "#fff",

			
			headerTitleStyle: {
				fontFamily: font.primaryLight,
				alignSelf: "center",
			},

		
		})}>
		<AppointmentStack.Screen
			name="BookAppointment"
			component={BookAppointment}
			options={({navigation, route}) => ({
				title: "Book An Appointment",
				headerLeft: (props) => (
					<View style={{paddingLeft: 20}}>
						<TouchableOpacity
							onPress={() => {
								navigation.toggleDrawer();
							}}>
							<Ionicons name="menu" size={40} color="#fff" />
						</TouchableOpacity>
					</View>
				),
				headerRight: (props) => (
					<View style={{paddingRight: 20, position: "relative"}}>
						<View
							style={{
								position: "absolute",
								top: -10,
								right: 16,
								zIndex: 1,
								alignItems: "center",
								justifyContent: "center",
								width: 16,
								height: 16,
								borderRadius: 8,
							}}>
							<Text style={{color: "#fff", fontWeight: "bold"}}>5</Text>
						</View>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("Settings");
							}}>
							<Ionicons name="notifications" size={28} color="#fff" />
						</TouchableOpacity>
					</View>
				),
			})}
		/>

		<AppointmentStack.Screen
			name="AppointmentSubmit"
			component={AppointmentSubmit}
			options={({navigation, route}) => ({
				title: "Thank you",
			})}
		/>
		
		
		
	</AppointmentStack.Navigator>
);
const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
	<HomeStack.Navigator
		screenOptions={({navigation, route}) => ({
			headerStyle: {
				backgroundColor: "#D54C5D",
			},
			headerTintColor: "#fff",

			headerLeft: (props) => (
				<View style={{paddingLeft: 20}}>
					<TouchableOpacity
						onPress={() => {
							navigation.toggleDrawer();
						}}>
						<Ionicons name="menu" size={40} color="#fff" />
					</TouchableOpacity>
				</View>
			),
			headerTitleStyle: {
				fontFamily: font.primaryLight,
				alignSelf: "center",
			},

			headerRight: (props) => (
				<View style={{paddingRight: 20, position: "relative"}}>
					<View
						style={{
							position: "absolute",
							top: -10,
							right: 16,
							zIndex: 1,
							alignItems: "center",
							justifyContent: "center",
							width: 16,
							height: 16,
							borderRadius: 8,
						}}>
						<Text style={{color: "#fff", fontWeight: "bold"}}>5</Text>
					</View>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("Settings");
						}}>
						<Ionicons name="notifications" size={28} color="#fff" />
					</TouchableOpacity>
				</View>
			),
		})}>
		<HomeStack.Screen
			name="Login"
			component={Login}
			options={({navigation, route}) => ({
				title: "Login",
				headerShown: false,
			})}
		/>
		<HomeStack.Screen
			name="Register"
			component={Register}
			options={({navigation, route}) => ({
				title: "Register",
				headerShown: false,
			})}
		/>
		<HomeStack.Screen
			name="Dashboard"
			component={Dashboard}
			options={({navigation, route}) => ({
				title: "Welcome",
			})}
		/>
		<HomeStack.Screen
			name="Blog"
			component={Blog}
			options={({navigation, route}) => ({
				title: "Blog",
			})}
		/>
		<HomeStack.Screen
			name="BlogDetails"
			component={BlogDetails}
			options={({navigation, route}) => ({
				title: "The Novel Corona Virus...",
			})}
		/>
		<HomeStack.Screen
			name="PersonalDetails"
			component={PersonalDetails}
			options={({navigation, route}) => ({
				title: "Personal Details",
				headerShown: false,
			})}
		/>
		<HomeStack.Screen
			name="DoctorProfile"
			component={DoctorProfile}
			options={({navigation, route}) => ({
				title: "Doctor Profile",
			})}
		/>
		<HomeStack.Screen
			name="FindDoctor"
			component={FindDoctor}
			options={({navigation, route}) => ({
				title: "Find Doctor",
			})}
		/>
		<HomeStack.Screen
			name="FindHospital"
			component={HospitalStackScreen}
			options={({navigation, route}) => ({
				title: "Find Hospital",
			})}
		/>
		<HomeStack.Screen
			name="FindSpeciality"
			component={SpecialityStackScreen}
			options={({navigation, route}) => ({
				title: "Find Speciality",
			})}
		/>
		<HomeStack.Screen
			name="Offers"
			component={OfferStackScreen}
			options={({navigation, route}) => ({
				title: "Offers",
			})}
		/>
		<HomeStack.Screen
			name="Home"
			component={Messages}
			options={({navigation, route}) => ({
				title: "Listing",
			})}
		/>
		<HomeStack.Screen
			name="Settings"
			component={Settings}
			options={({navigation, route}) => ({
				title: "Settings",
			})}
		/>
    	<HomeStack.Screen
			name="News"
			component={NewsStackScreen}
			options={({navigation, route}) => ({
				title: "News",
			})}
		/>
		<HomeStack.Screen
			name="Packages"
			component={PackageStackScreen}
			options={({navigation, route}) => ({
				title: "Health Packages",
			})}
		/>
		<HomeStack.Screen
			name="AskDoctor"
			component={AskDoctor}
			options={({navigation, route}) => ({
				title: "Ask A Doctor",
			})}
		/>
		<HomeStack.Screen
			name="QuickEnquiry"
			component={QuickEnquiry}
			options={({navigation, route}) => ({
				title: "Quick Enquiry",
			})}
		/>
		<HomeStack.Screen
			name="EnquirySubmit"
			component={EnquirySubmit}
			options={({navigation, route}) => ({
				title: "Enquiry Submited",
			})}
		/>
		<HomeStack.Screen
			name="Feedback"
			component={Feedback}
			options={({navigation, route}) => ({
				title: "Feedback",
			})}
		/>
		<HomeStack.Screen
			name="FeedbackSubmit"
			component={FeedbackSubmit}
			options={({navigation, route}) => ({
				title: "Feedback Submited",
			})}
		/>
		<HomeStack.Screen
			name="BookAppointment"
			component={AppointmentStackScreen}
			options={({navigation, route}) => ({
				title: "Book Appointment",
			})}
		/>
		
	</HomeStack.Navigator>
);
const TabsScreen = () => {
	const activeState = useSelector((state) => state);

	return (
		<Tab.Navigator
			tabBarOptions={{
				activeTintColor: "#000",
			}}
			initialRouteName="HomeScreen">
			<Tab.Screen
				name="HomeScreen"
				component={HomeStackScreen}
				options={{
					tabBarLabel: "Home",
					tabBarIcon: () => <Icon name="home" size={20} color="#FB7A52" />,
				}}
			/>
			<Tab.Screen
				name="Messages"
				component={Messages}
				options={{
					tabBarLabel: "Message",
					tabBarIcon: () => (
						<MaterialIcons name="message" size={20} color="#FB7A52" />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

function Logout(props) {
	useEffect(() => {
		props.navigation.navigate("Login");
	});
	return (
		<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
			<ActivityIndicator size="large" color={colors.primary} />
			<Text style={{fontFamily: font.primaryLight, fontSize: fsize.lg}}>
				Logging Out
			</Text>
		</View>
	);
}
const DrawerScreen = () => {
	const activeState = useSelector((state) => state);

	return (
		<Drawer.Navigator
			initialRouteName="Dashboard"
			drawerStyle={{
				backgroundColor: "#FFF",
				width: 240,
			}}
			drawerContent={(props) => <CustomDrawerContent {...props} />}
		>
	
			<Drawer.Screen
				name="Home"
				component={HomeStackScreen}
				options={{
					title: "Home", //Set Header Title
					drawerIcon: () => <Icon name="home" size={20} color="#D54C5D" />,
				}}
			/>

			
			<Drawer.Screen
				name="Blog"
				component={BlogStackScreen}
				options={{
					title: "Blog", //Set Header Title
					drawerIcon: () => <Icon name="book" size={20} color="#D54C5D" />,
				}}
			/>
			<Drawer.Screen
				name="News & Events"
				component={NewsStackScreen}
				options={{
					title: "News & Events", //Set Header Title
					drawerIcon: () => <Icon name="newspaper-o" size={17} color="#D54C5D" />,
				}}
			/>
				<Drawer.Screen
				name="Book An Appointment"
				component={BookAppointment}
				options={{
					title: "Book An Appointment", //Set Header Title
					drawerIcon: () => <MaterialCommunityIcons name="book-open-outline" size={20} color="#D54C5D" />,
				}}
			/>
			<Drawer.Screen
				name="Video Consultation"
				component={VideoConsulting}
				
				options={{
					title: "Video Consultation", //Set Header Title
					drawerIcon: () => <MaterialCommunityIcons name="webcam" size={20} color="#D54C5D" />,
				}}
			/>
			
			<Drawer.Screen
				name="Find A Doctor"
				component={FindADoctor}
				options={{
					title: " Find A Doctor", //Set Header Title
					drawerIcon: () => <MaterialCommunityIcons name="doctor" size={20} color="#D54C5D" />,
				}}
			/>
			<Drawer.Screen
				name="Find Hospital"
				component={FindHospital}
				options={{
					title: "Find Hospital", //Set Header Title
					drawerIcon: () => <MaterialCommunityIcons name="hospital-building" size={20} color="#D54C5D" />,
				}}
			/>
		
			<Drawer.Screen
				name="Health Packages"
				component={PackageStackScreen}
				options={{
					title: "Health Packages", //Set Header Title
					drawerIcon: () => <Icon name="medkit" size={20} color="#D54C5D" />,
				}}
			/>
			<Drawer.Screen
				name="Feedback"
				component={Feedback}
				options={{
					title: "Feedback", //Set Header Title
					drawerIcon: () => <MaterialCommunityIcons name="emoticon-happy-outline" size={20} color="#D54C5D" />,
				}}
			/>
			<Drawer.Screen
				name="Logout"
				component={Logout}
				options={{
					title: "Logout", //Set Header Title
					drawerIcon: () => <Icon name="sign-out" size={20} color="#D54C5D" />,
				}}
			/>
		</Drawer.Navigator>
	);
};

const RootStack = createStackNavigator();
const RootStackScreen = ({userToken, registrationStatus}) => {
	if (registrationStatus == "open") {
		return (
			<RootStack.Navigator headerMode="none">
				<RootStack.Screen
					name="Registration"
					component={RegistrationStackScreen}
					options={{
						animationEnabled: false,
					}}
				/>
			</RootStack.Navigator>
		);
	}
	return (
		<RootStack.Navigator headerMode="none">
			<RootStack.Screen
				name="App"
				component={DrawerScreen}
				options={{
					animationEnabled: false,
				}}
			/>
		</RootStack.Navigator>
	);
};

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			token: true,
			isLoading: true,
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({isLoading: false});
		}, 3000);
	}
	render() {
		if (this.state.isLoading) {
			return <SplashScreen />;
		}
		return (
			<>
				<View style={{flex: 1}}>
					<StatusBar
						backgroundColor="#D54C5D"
						barStyle="dark-content"
						translucent={false}
					/>
					<NavigationContainer>
						<OfflineNotice></OfflineNotice>

						<RootStackScreen
							userToken={this.state.token}
							registrationStatus="false"
						/>
					</NavigationContainer>
				</View>
			</>
		);
	}
}

const styles = StyleSheet.create({
	container: {},
	header: {
		backgroundColor: "red",
	},
	logo: {
		width: 130,
		resizeMode: "contain",
	},
	input: {
		width: 100,
		height: 60,
		marginTop: 10,
		padding: 20,
		color: "#000000",
		borderRadius: 14,
		fontSize: 18,
		fontWeight: "400",
		borderColor: "gray",
		// borderWidth: 1,
		backgroundColor: "#FBFBFB",
	},
});
