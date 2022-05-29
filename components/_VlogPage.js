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
	Alert,
	ImageBackground,
  StatusBar,
  Modal,
  FlatList
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
} from "./styles/base.js";
import ModalSelector from "react-native-modal-selector";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fab from "./Widgets/Fab";
import Carousel from "react-native-snap-carousel";
const initialLayout = {width: Dimensions.get("window").width};
// Slider
import {scrollInterpolator, animatedStyles} from "./utils/animations";
import YoutubePlayer from "react-native-youtube-iframe";
import { WebView } from 'react-native-webview';

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 6);

const DATA = [];
for (let i = 0; i < 10; i++) {
	DATA.push(i);
}
// Slider
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

export default class VlogPage extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			searchTextAlign: "center",
			index: 0,
			setIndex: 0,
			routes: [],
			active: false,
      activeIndex: 0,
      videoPlay:false,
      videoModal:false,
      currentVideo:''
			
		};
	}
  _renderItem=({item})=> {
    let pathParts =item.link.split('/');
   
		return (
			<TouchableOpacity onPress={() =>{this.props.navigation.navigate("VblogDetail",{item:item,name:item.title})}}>
				<View style={styles.itemContainer}>
				
					<ImageBackground
						style={{width: "100%", height: "100%", position: "relative"}}
						resizeMode="cover"
						source={{ uri:'https://i3.ytimg.com/vi/'+pathParts[pathParts.length - 1]+'/hqdefault.jpg' }}>
						<View style={{justifyContent: "flex-end", flex: 1}}>
							<Text style={styles.itemLabel}>
								{item.title}
							</Text>
   
						</View>
					</ImageBackground>
					
				</View>
			</TouchableOpacity>
		);
  }
  showVideo(item){
    alert(item.title)
  }
  render_Item= ({ item }) => {
	let pathParts =item.link.split('/');
	  return (
	
		<TouchableOpacity
		onPress={() => {
			this.props.navigation.navigate("VblogDetail",{item:item,name:item.title});
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
	
		{/* <Text style={{color:colors.TextColor,fontSize:8}}><Ionicons
												name="md-calendar-sharp"
												size={14}
												color={colors.TextColor}
											/> On {item.publishedOn}</Text> */}
			<Text
				style={{color:colors.primary,fontSize:fonts.sm-1}}>
				{item.title}
			</Text>
			 {/* <Text
				style={{
					fontFamily: font.primaryBold,
					fontSize: fsize.md,
					color: colors.primary,
				}}>
				Don't Panic, be Cautious!
			</Text>  */}
			 <Text style={{color:colors.TextColor,fontSize:12}} numberOfLines={3} ellipsizeMode="tail">
			{item.description}
	</Text> 
	
	<View style={{flexDirection: "row", justifyContent: "space-between",marginVertical:5}}>
			<Text
				style={{fontSize:fsize.xs,fontWeight:"bold",color:colors.TextColorDark}}>
				READ MORE{item.publishedOn}
			</Text>
			</View>
		</View>
		<View style={{flex: 3, paddingLeft: 10}}>
			<Image
				resizeMode="cover"
				style={{width: 90, height: 90, borderRadius: 8}}
				source={{ uri:'https://i3.ytimg.com/vi/'+pathParts[pathParts.length - 1]+'/hqdefault.jpg' }}
			/>
		</View>
	</TouchableOpacity>
	
	)
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
				<View style={{}}>

        {this.props.featuredVBlogs.length > 0 && (
          <>
          	<Carousel
						ref={(c) => (this.carousel = c)}
						data={this.props.featuredVBlogs}
						firstItem={1}
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
				
				</View>

				<View style={{marginVertical: 10}}>
				{this.props.vblogs.length > 0 && (<FlatList
            data={this.props.vblogs}
            renderItem={this.render_Item}
            keyExtractor={item => item.id}
          />)}
         
				
				</View>
       

<Modal
        style={{

        }}
        animationType="slide"
        transparent={true}
        visible={this.state.videoModal}
        onRequestClose={() => {
         this.setState({videoModal:false})
        }}>
        <View style={{ 
          flex: 1,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'white',
        
          
          marginTop: 22 }}>
 <YoutubePlayer
        height={300}
        play={false}
        videoId={this.state.currentVideo}
        
      />
            {/* <WebView
              javaScriptEnabled={true}
              style={{flex:1, borderColor:'red', borderWidth:1, height:300, width:300}}
              source={{
                uri: 'https://www.youtube.com/embed/RJa4kG1N3d0'
              }}
            /> */}
            

        </View>
      </Modal>
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
		fontSize: fsize.sm - 1,
		textAlign: "center",
    paddingBottom: 20,
    backgroundColor:'#808080'
	},
	counter: {
		marginTop: 25,
		fontSize: 30,
		fontWeight: "bold",
		textAlign: "center",
	},
});
