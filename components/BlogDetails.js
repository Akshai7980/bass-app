import React from "react";
import {
	View,
	Image,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	Text,
	TextInput,
	Dimensions,
	ScrollView,
	StatusBar,
	ActivityIndicator,
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
	fonts,
} from "./styles/base.js";
import ModalSelector from "react-native-modal-selector";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import Fab from "./Widgets/Fab";
import {BASE_URL, IMG_URL} from "../helper";
import HTMLView from "react-native-htmlview";
import Loader from "./Loader";
export default class BlogDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			blog_id: this.props.route.params.blog_id,
			loading: false,
			blog_data: {},
			recentBlogs: [],
		};
	}
	componentDidMount() {
		this.getDetail();
	}
	getDetail() {
		this.setState({loading: true});
		fetch(BASE_URL + `api/blog-details/${this.state.blog_id}`)
			.then((response) => {
        if (response.ok) {
          return response.json();
        }
        this.setState({loading: false},()=>{
          alert("Server Not responding.please try later...");
        });
      })
			.then((responseJson) => {
				// alert(JSON.stringify(responseJson.data.blog));
				if (responseJson.success) {
					this.setState(
						{
							blog_data: responseJson.data.blog,
							recentBlogs: responseJson.data.recentBlogs,
							loading: false,
						},
						() => {
							this.props.navigation.setOptions({
								title: this.state.blog_data.title,
							});
							// this.props.navigation.navigate("Blog")
							// alert(this.state.blog_data.title)
							// console.log(this.state.blog_data)
						}
					);
				}
			})
			.catch((error) => {
			  this.setState({loading: false},()=>{
          alert("Server Not responding.please try later...");
        });
			});
	}

	formatHtml=(node)=>{
		//console.log(node)
		if(node.children != null){
			
			if(node.name == "span"){
				console.log(node)
				// return <View style={{display:'none',height:0,}}></View>
			}

			
		}
		

	}
	render() {
		//console.log(this.state.blog_data.content)
		
			return (
				<View style={{flex: 1, backgroundColor: "#fff", marginBottom: 20}}>
					<StatusBar
						backgroundColor="#D54C5D"
						barStyle="dark-content"
						translucent={false}
					/>
					   {this.state.loading && <Loader loading={this.state.loading}></Loader>}
					<ScrollView style={{backgroundColor: "#fff"}}>
						{Object.keys(this.state.blog_data).length !== 0 && (
							<>
								<View style={{}}>
									<ImageBackground
										resizeMode="cover"
										source={{uri: IMG_URL + this.state.blog_data.filePath}}
										style={{height: 200, width: "100%"}}>
										<View
											style={{
												flex: 1,
												justifyContent: "flex-end",
												padding: 20,
											}}>
											<Text
												style={{
													color: "#fff",
													fontSize: fsize.md,
													fontFamily: font.primaryBold,
													marginBottom:5
												}}>
												{this.state.blog_data.title}
											</Text>
											{/* <Text style={{color:"#fff",fontSize:fsize.md-2,fontFamily:font.primaryBold,paddingBottom:10}}>
         Don't panic, Be Cautious!
        </Text> */}
											{/* <Text style={{color:"#fff",fontSize:fsize.md-2,fontFamily:font.primaryBold}}>
												{this.state.blog_data.cname}
											</Text> */}
											<Text style={{color:"#fff",fontSize:fsize.sm-2,fontFamily:font.primaryBold}}>Dr. Nasha Kollathodi.</Text>
        <Text style={{color:"#fff",fontSize:fsize.sm-1,fontFamily:font.primaryBold}}>MBBS, MD (MICROBIOLOGY)</Text>
										</View>
									</ImageBackground>
								</View>

								<View style={{paddingHorizontal: 20, paddingTop: 10}}>
								<Text style={{color:colors.TextColor,fontSize:fonts.xs-3}}><Ionicons
												name="md-calendar-sharp"
												size={18}
												color={colors.TextColor}
											/> On 18 JUNE 2020</Text>
									<HTMLView
										value={this.state.blog_data.content}
										stylesheet={htmlstyles}
										renderNode={(node)=>this.formatHtml(node)}
									/>
								</View>

								{/* <View style={{paddingHorizontal:20,paddingTop:10}}>   
        <Text style={{color:colors.TextColor,fontSize:fsize.xs+2,fontFamily:font.primaryLight,lineHeight:16,textAlign:"justify"}}>
        You will need an Android device to run your React Native 
        Android app. This can be either a physical Android device, or more commonly, 
        you can use an Android Virtual Device which 
        allows you to emulate an Android device on your computer.
     
        You will need an Android device to run your React Native 
        Android app.
        </Text>
  </View> */}

								<View style={{paddingHorizontal: 20, paddingTop: 10}}>
									{/* <Text style={{fontSize:fsize.xs+1,fontFamily:font.primaryLight,color:colors.Heading,marginVertical:1}}>Introduction</Text>
  <View style={{paddingTop:10}}>   
        <Text style={{color:colors.TextColor,fontSize:fsize.xs+2,fontFamily:font.primaryLight,lineHeight:16,textAlign:"justify"}}>
        You will need an Android device to run your React Native 
        Android app. This can be either a physical Android device, or more commonly, 
        you can use an Android Virtual Device which allows you to emulate an Android device on your computer.You will need an Android device to run your React Native 
        Android app.</Text>
        
  </View> */}
									{/* <View style={{paddingTop:10}}> 
<Text style={{color:colors.TextColor,fontSize:fsize.xs+2,fontStyle:"italic",fontFamily:font.primaryLight}}>Posted by:Dr Nasha Kollathodi.</Text>
</View> */}
									{/* <View style={{flexDirection:"row",marginVertical:20}}>
      <View style={{position:"relative"}}>
          <Text style={{fontSize:fsize.xs+1, color:"#d64c5d",position:"absolute",right:-5,top:-14,zIndex:1}}>10</Text>
          <Ionicons  name="ios-chatbox" size={20} color="#bdbdbd" style={{}} />
      </View>
      <View>
          <FontAwesome name="facebook" size={20} color="#242021" style={{marginLeft:17}} />
      </View>
      <View>
          <FontAwesome name="instagram" size={20} color="#242021" style={{marginLeft:17}} />
      </View>
      <View>
          <FontAwesome name="twitter" size={20} color="#242021" style={{marginLeft:17}} />
      </View>
      <View>
          <FontAwesome name="linkedin" size={20} color="#242021" style={{marginLeft:17}} />
      </View>
  </View> */}

									<View
										style={{
											backgroundColor: "#eeeeee",
											flex: 0.5,
											flexDirection: "row",
											alignItems: "center",
										}}>
										<View
											style={{
												backgroundColor: "#db5665",
												width: 50,
												height: 50,
												borderRadius: 25,
												alignItems: "center",
												justifyContent: "center",
												margin: 15,
											}}>
											<Text
												style={{
													color: "#fff",
													fontFamily: font.primaryBold,
													fontSize: fsize.lg,
												}}>
												AA
											</Text>
										</View>

										<View>
											<Text
												style={{
													color: "#6d6d6d",
													fontFamily: font.primaryBoldt,
													fontSize: fsize.sm,
												}}>
												Very Informative
											</Text>
											<Text
												style={{
													color: colors.TextColor,
													fontFamily: font.primaryLight,
													fontSize: fsize.xs + 1,
												}}>
												Adrian Abraham 2 days ago
											</Text>
										</View>
									</View>
									<Text
										style={{
											fontSize: fsize.sm,
											fontFamily: font.primaryBold,
											color: colors.Heading,
											marginVertical: 1,
										}}>
										Recent Posts
									</Text>
									{this.state.recentBlogs.length > 0 && (
										<>
											{this.state.recentBlogs.map((item, i) => {
												return (
													<TouchableOpacity
														style={{marginTop: 10}}
														onPress={() => {
															this.props.navigation.push("BlogDetails", {
																blog_id: item.id,
															});
														}}>
														<Text
															style={{
																color: colors.primary,
																fontFamily: font.primaryBold,
																fontSize: fsize.sm,
															}}>
															{item.title}
														</Text>
													</TouchableOpacity>
												);
											})}
										</>
									)}
								</View>
							</>
						)}
					</ScrollView>

					<Fab navigation={this.props.navigation} />
				</View>
			);
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