import React, { useState } from "react";
import {

  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,

} from "react-native";

import { useNavigation } from "@react-navigation/core";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CategoriesCart = ({ title,image,categoryId}) => {
    const navigation = useNavigation();
  console.log("========================="+categoryId);
    return (
      <TouchableOpacity
        style={styles.item_Style} onPress={()=>{navigation.navigate('Product',{categoryId})}}
      >
        <View>
          <Image
            style={styles.img_Style}
            resizeMode="cover"
            source={{uri: image}}
          />
        </View>
        <Text style={styles.title_Style}>{title}</Text>
      </TouchableOpacity>
    );
  };
  const styles = StyleSheet.create({

    item_Style: {

      height: 170,
      display: "flex",
      textAlign: "center",
      marginHorizontal: "1%",
      backgroundColor: "#d7d8d8",

      borderRadius: 7,
    },
    img_Style: {
      height: 130,
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
    },
    title_Style: {
      marginTop:8,
      fontSize: 18,
      textAlign: "center",
    },
  });
  export default CategoriesCart