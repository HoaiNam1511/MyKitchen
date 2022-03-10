import React, { useState,useEffect } from "react";
import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  Alert, 
  ActivityIndicator,
} from "react-native";

import { FlatList} from "react-native-gesture-handler";
import { SliderBox } from "react-native-image-slider-box";

import CategoriesCart from "../component/CategoriesCard";
const numberColums = 2;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomeScreen = ({ navigation }) => {

  const [data,setData] = useState({});
  const [id,setId] = useState("");
  const [loading,setLoading] = useState();
  var imageSlide=[];
  useEffect(() => {
    fetch('https://mykitchenk5.000webhostapp.com/API/categories.php')
    .then((response)=>response.json())
    .then((responseJson)=>{
          setData(responseJson);
          setId(data.categoryId);
    })
    .catch((error)=>{
      Alert.alert("Error"+error);
    })
    .finally(()=>setLoading(true));
    
  }, []);
  for(var key in data){
    if(data.hasOwnProperty(key)){
        console.log(data[key].image);
        imageSlide.push(data[key].image);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView style={{marginTop:20,}}>
      <View
              style={{
                height: 50,
                backgroundColor: "#DB781D",
                justifyContent: "center",
                alignItems: "center",
                display:'flex',
                justifyContent:'center'
              }}
            >
            <Image style={{height:50}} source={require('../assets/Group3.png')}></Image>
        </View>
        <View style={styles.container}>
          <View style={{zIndex:100}}>
          </View>
          {loading?
            <View style={{position:'relative'}}>
            <SliderBox
                  images={imageSlide}
                  sliderBoxHeight={220}
                  resizeMode="cover"
                  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                  dotColor="#FFEE58"
                  inactiveDotColor="#90A4AE"
                  paginationBoxVerticalPadding={20}
                  autoplay
                  circleLoop
                  activeOpacity={0.6}
                />
              <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    numColumns={numberColums}
                    renderItem ={({item})=>(
                      <View style={styles.wrapper}>
                        <CategoriesCart
                        image = {item.image}
                        title = {item.title}
                        categoryId={item.categoryId}
                        />
                      </View>
                    )}
                  ></FlatList>
            </View>
          :
          <ActivityIndicator style={{marginTop:50}} size="large" color="#DB781D"></ActivityIndicator>
          }
        </View>
      </ScrollView>
     
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position:'relative',
  },
  container_flatList:{
    flex:1,
    paddingHorizontal:12,
  },
  wrapper:{
    flex:1,
    paddingHorizontal:3,
    marginTop:7,
  },
  wrap: {
    width: windowWidth,
    height: windowHeight * 0.25,
  },
  wrapDot: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignSelf: "center",
  },
  dotActive: {
    margin: 3,
    color: "#fff",
  },
  dot: {
    margin: 3,
    color: "#888",
  },
  img_Style: {
    height: 130,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  title_Style: {
    marginTop: 6,
    fontSize: 16,
    textAlign: "center",
  },
});
export default HomeScreen;
