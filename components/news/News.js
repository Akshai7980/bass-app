import React, {Component} from 'react';
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
	font,
	padding,
	dimensions,
	fsize,
	fonts,
	centerAlign,
	main,
	images,
	
} from "../styles/base.js";
import ModalSelector from "react-native-modal-selector";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import Fab from "../Widgets/Fab";
const initialLayout = {width: Dimensions.get("window").width};
import {BASE_URL, IMG_URL} from "../../helper";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from "react-native-gesture-handler";
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 6);
import Loader from "../Loader";
export class News extends Component {
    constructor(props) {
		super(props);
		this.state = {
            speciality_list: [],
			speciality:'',
			selected_speciality: "Select Speciality",
			news: [],
			date:new Date(),
			show:false,
			chosenDate:'',
            news_date:'',
			loading:false,
			category_list: [{label:'News',key:0},{label:'Events',key:1},{label:'Press Realese',key:2},{label:'General Topics',key:3},{label:'Health Awareness',key:4}],
			category:'',
			selected_category: "Select Category",
        }
    }
    getNews() {
		this.setState({loading: true});
		fetch(BASE_URL + `api/news?speciality=${this.state.speciality}&news_date=${this.state.news_date}&type=${this.state.category}`)
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
				// alert(JSON.stringify(responseJson))


			
				if (responseJson.success) {
                   
					this.setState({news: responseJson.data.newsEvents, loading: false},()=>{
						this.getSpecialization();
					});
				}
			})
			.catch((error) => {
                this.setState({loading: false},()=>{
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
      getSpecialization() {
		fetch(
			BASE_URL +
				`api/specializations`
		)
			.then((response) =>{
                if (response.ok) {
                    return response.json();
                  }
                  this.setState({loading: false},()=>{
                    alert("Server Not responding.please try later...");
                  });
            } )
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
				this.setState({loading: false},()=>{
                    alert("Server Not responding.please try later...");
                  });
			});
    }
    render_Item= ({ item }) => (
		<TouchableOpacity
		onPress={() => {
			this.props.navigation.navigate("NewsDetails",{news_id:item.id,name:item.title});
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
			
		<Text style={{color:colors.TextColor,fontSize:8,paddingBottom:5}}>
			<Ionicons
												name="md-calendar-sharp"
												size={14}
												color={colors.TextColor}
											/> On {item.publishedOn}</Text>
				<Text
				style={{color:colors.primary,fontSize:fonts.sm-1,textTransform:"capitalize"}}>
				{item.title}
			</Text>
			<Text style={{color:colors.TextColor,fontSize:12}} numberOfLines={3} ellipsizeMode="tail">
			{item.content.replace(/(<([^>]+)>)/gi, "")}
</Text> 


		
<View style={{flexDirection: "row", justifyContent: "space-between",marginVertical:5}}>
			<Text
				style={{fontSize:fsize.xs,fontWeight:"bold",color:colors.TextColorDark}}>
				READ MORE
			</Text>
			</View>
		</View>
		<View style={{flex: 3, paddingLeft: 10}}>
			<Image
				resizeMode="cover"
				style={{width: 90, height: 90, borderRadius: 8}}
				source={{ uri:IMG_URL+item.image}}
			/>
		</View>
	</TouchableOpacity>

	);
	componentDidMount(){
		this.getNews();
	}
    render() {
        
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
							data={this.state.category_list}
							selectedItemTextStyle={{color:colors.primary,fontFamily:font.primaryBold,fontSize: fsize.md}}
							optionTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md}}
							initValueTextStyle={{color:"#000",fontFamily:font.primaryBold,fontSize: fsize.md,textAlign:"left"}}
							cancelTextStyle={{color:colors.primary,fontFamily:font.primaryBold,fontSize: fsize.lg}}
							initValue="Select Category"
							ref={(selector2) => {
								this.selector2 = selector2;
							}}
							onChange={(option) => {
								this.setState(
									{
										selected_category: option.label,
										category: option.key,
									},
									() => {
										this.getNews();
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
											{this.state.selected_category}
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
							cancelTextStyle={{color:colors.primary,fontFamily:font.primaryBold,fontSize: fsize.lg}}
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
										this.getNews();
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
											{this.state.news_date!=''?this.state.news_date:'Date'}
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
              	<View style={{marginVertical: 10}}>
				{this.state.news.length > 0 && (<FlatList
            data={this.state.news}
            renderItem={this.render_Item}
            keyExtractor={item => item.id}
          />)}
          {/* {!this.loading && this.state.news.length==0 && (
              <View style={{ flex:1,justifyContent:'center',alignItems:'center' }}>
                  <Text>No Records Founds...</Text>
              </View>
          )} */}
         
				
				</View>

				<Fab navigation={this.props.navigation} />
                {this.state.show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="date"
          is24Hour={true}
		  display="default"
		  format="YYYY-MM-DD"
		  defaultDate={new Date()}
		  onChange={(event, date)=>{this.setState({news_date:date?this.formatDate(date):'',show:false},()=>{
			  this.getNews();
		  })}}
		
		  
        />
      )}
            </View>
        )
                }
    }


export default News
