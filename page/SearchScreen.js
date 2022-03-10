import React, { useState,useEffect } from "react";
import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";

import { FlatList} from "react-native-gesture-handler";
import MySearchInput from "../component/MySearchInput";
import { SliderBox } from "react-native-image-slider-box";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CategoriesCart from "../component/CategoriesCard";
import SearchCart from "../component/SearchCart";
import ProductCard from "../component/ProductCard";

const numberColums = 2;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SearchScreen = ({ navigation }) => {

  const [searchResult,setSearchResult] = useState([]);
  const [searchValue,setSearchValue] = useState("");
  const [pressCheck,setPressCheck] = useState(false);
  const [productData,setProductData] = useState([]);
  const [loading,setLoading] = useState();
  
  useEffect(() => {
    fetch('https://mykitchenk5.000webhostapp.com/API/search.php', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "searchValue":searchValue,
          })
      })
      
      .then((response)=>response.json())
      .then((responseJson)=>{
        console.log(responseJson);
        setSearchResult(responseJson);
      })
      .catch((error)=>{
          console.log("Error"+error);
      })
      .finally(()=>setLoading(true));
  }, [searchValue])
  return (
    <SafeAreaView style={{ marginTop:20,}}>
      <View
              style={{
                height: 50,
                backgroundColor: "#DB781D",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MySearchInput 
                    placeholder="Tìm tên món"
                    maxLength = {35}
                    value={searchValue}
                    onChangeText={setSearchValue}
                    onPressIn={()=>setPressCheck(true)}
              ></MySearchInput>
            </View>
      <ScrollView>
      
            {loading?
              <View style={styles.container}>
                <View style={{zIndex:100}}>
                  <View style={{display:'flex',alignItems:'center'}}>
                    <FlatList
                    data = {searchResult}
                    keyExtractor={(item) => item.id}
                    keyboardDismissMode="on-drag"
                    showsVerticalScrollIndicator={false}
                
                    renderItem={({item})=>
                    <ProductCard
                        image = {item.image}
                        title={item.title}
                        description = {item.description}
                        ViewDetail={()=>{
                        navigation.navigate('Detail',{item})
                        }}
                    />
                      }
                    />  
                  </View>
                  </View>
            </View>
            :
            <ActivityIndicator style={{marginTop:50}} size="large" color="#DB781D"></ActivityIndicator>
            }

      </ScrollView>
     
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position:'relative',
    backgroundColor:'white',
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
export default SearchScreen;
