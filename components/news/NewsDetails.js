import React, {Component} from 'react';
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
} from "../styles/base.js";
import Fab from "../Widgets/Fab";
import {BASE_URL, IMG_URL} from "../../helper";
import HTMLView from "react-native-htmlview";
export class NewsDetails extends Component {
    constructor(props) {
		super(props);
		this.state = {
			news_id: this.props.route.params.news_id,
			loading: false,
			news_data: {},
			recentNews: [],
		};
    }
    componentDidMount() {
		this.getDetail();
    }
    getDetail() {
		this.setState({loading: true});
		fetch(BASE_URL + `api/news-details/${this.state.news_id}`)
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
				// alert(JSON.stringify(responseJson.data.blog));
				if (responseJson.success) {
					this.setState(
						{
							news_data: responseJson.data.newsEvent,
							recentNews: responseJson.data.recentNewsEvents,
							loading: false,
						},
						() => {
							this.props.navigation.setOptions({
								title: this.state.news_data.title,
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
						{Object.keys(this.state.news_data).length !== 0 && (
							<>
								<View style={{}}>
									<ImageBackground
										resizeMode="cover"
										source={{uri: IMG_URL + this.state.news_data.image}}
										style={{height: 200, width: "100%"}}>
											<View style={{ flex: 1 , justifyContent: "flex-end"}}>
										<View
											style={{
												
												padding: 10,
												backgroundColor:"rgba(213, 77, 93,0.5)"
											}}>
										<Text
												style={{
													color: "#fff",
													fontSize: fsize.md,
													fontFamily: font.primaryBold,
													marginBottom:5
												}}>
												{this.state.news_data.title}
											</Text>
										
											<Text style={{color:"#fff",fontSize:fsize.sm-2,fontFamily:font.primaryBold}}>Dr. Nasha Kollathodi.</Text>
        <Text style={{color:"#fff",fontSize:fsize.sm-1,fontFamily:font.primaryBold}}>MBBS, MD (MICROBIOLOGY)</Text>	
											
										</View>
										</View>
									</ImageBackground>
								</View>

								<View style={{paddingHorizontal: 20, paddingTop: 10}}>
									<HTMLView
										value={this.state.news_data.content}
										stylesheet={htmlstyles}
									/>
								</View>

							

								<View style={{paddingHorizontal: 20, paddingTop: 10}}>
		

								
									<Text
										style={{
											fontSize: fsize.sm,
											fontFamily: font.primaryBold,
											color: colors.Heading,
											marginVertical: 1,
										}}>
										Recent News
									</Text>
									{this.state.recentNews.length > 0 && (
										<>
											{this.state.recentNews.map((item, i) => {
												return (
													<TouchableOpacity
														style={{marginTop: 10}}
														onPress={() => {
															this.props.navigation.push("NewsDetails", {
																news_id: item.id,
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


export default NewsDetails


