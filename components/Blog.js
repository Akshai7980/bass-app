/* eslint-disable */
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
import AntDesign from "react-native-vector-icons/AntDesign";
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import Fab from "./Widgets/Fab";
import {TabView, SceneMap, ScrollPager, TabBar} from "react-native-tab-view";
import BlogPage from "./_BlogPage";
import VlogPage from "./_VlogPage";
const initialLayout = {width: Dimensions.get("window").width};
import {BASE_URL, IMG_URL} from "../helper";
import DateTimePicker from '@react-native-community/datetimepicker';
import Loader from "./Loader";
const renderTabBar = (props, active) => (
	<TabBar
		{...props}
		labelStyle={{
			fontSize: fsize.sm,
			fontFamily: font.primaryBold,
			textTransform: "uppercase",
		}}
		tabStyle={{height: RFPercentage(8), borderColor: "#fff"}}
		style={{backgroundColor: colors.SearchBackground, height: RFPercentage(8)}}
		activeColor={colors.primary}
		inactiveColor="#404F59"
		pressColor={colors.primary}
		indicatorStyle={{backgroundColor: "#fff", height: 0}}
	/>
);

export default class Blog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			searchTextAlign: "center",
			index: 0,
			routes: [
				{key: "BlogPage", title: "BLOG"},
				{key: "VlogPage", title: "V LOG"},
			],
			active: false,
			speciality_list: [],
			speciality:'',
			selected_speciality: "Select Speciality",
			blogs: [],
			date:new Date(),
			show:false,
			chosenDate:'',
			blog_date:'',
			vblogs:[],
			featuredBlogs:[],
			featuredVBlogs:[],
			loading:false,
		};
		this.setDate = this.setDate.bind(this);
	}

	renderScene = ({route, jumpTo}) => {
		const {navigation} = this.props;
		switch (route.key) {
			case "BlogPage":
				return <BlogPage navigation={navigation} jumpTo={jumpTo} blogs={this.state.blogs} featuredBlogs={this.state.featuredBlogs} />;
				break;
			case "VlogPage":
				return <VlogPage navigation={navigation} jumpTo={jumpTo} vblogs={this.state.vblogs} featuredVBlogs={this.state.featuredVBlogs} />;
				break;

			default:
				return <Text>Not Found Error</Text>;
		}
	};
	setIndex = (index) => {
		this.setState({index: index});
	};
	
	getBlogs() {
		this.setState({loading: true});
		fetch(BASE_URL + `api/blogs?speciality=${this.state.speciality}&search_date=${this.state.blog_date}`)
			.then((response) => response.json())
			.then((responseJson) => {
			
				if (responseJson.success) {
					this.setState({blogs: responseJson.data.blogs,vblogs:responseJson.data.vlogs,featuredBlogs:responseJson.data.featuredBlogs,featuredVBlogs:responseJson.data.featuredVlogs, loading: false},()=>{
						this.getSpecialization();
					});
				}
			})
			.catch((error) => {
				console.log(error);
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
	  setDate(newDate) {
		this.setState({
		  chosenDate: this.formatDate(newDate)
		});
	  }
	getSpecialization() {
		fetch(
			BASE_URL +
				`api/specializations`
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
				console.log(error);
			});
	}
	componentDidMount(){
		this.getBlogs();
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
				<View
					style={{
						backgroundColor: colors.primary,
						paddingHorizontal: 20,
						paddingTop: 10,
					}}>
					<View style={{justifyContent: "space-around", paddingBottom: 10}}>
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
									},
									() => {
										this.getBlogs();
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
					<View style={{justifyContent: "space-around", paddingBottom: 10}}>
					<TouchableOpacity onPress={() => this.setState({show:true})}>
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
											{this.state.blog_date!=''?this.state.blog_date:'Date'}
										</Text>
										<AntDesign
											name="calendar"
											size={24}
											color={colors.TextFieldBorder}
										/>
									</View>
								</TouchableOpacity>
					</View>
				</View>
				<TabView
					renderTabBar={(props) => renderTabBar(props, this.state.active)}
					navigationState={{
						index: this.state.index,
						routes: this.state.routes,
					}}
					renderScene={this.renderScene}
					onIndexChange={(index) => this.setIndex(index)}
					activeTintColor={colors.primary}
					inactiveTintColor="#404F59"
					initialLayout={initialLayout}
					swipeEnabled={false}
				/>
				 {this.state.show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="date"
          is24Hour={true}
		  display="default"
		  format="YYYY-MM-DD"
		  defaultDate={new Date()}
		  onChange={(event, date)=>{this.setState({blog_date:this.formatDate(date),show:false},()=>{
			  this.getBlogs();
		  })}}
		
		  
        />
      )}
			</View>
		);
	}
}
