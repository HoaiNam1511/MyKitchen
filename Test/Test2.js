import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Button,
} from "react-native";

const Test2=({navigation,route})=>{
    return(
        <SafeAreaView>
            <View>
                <Text>{route.params.id}</Text>
                <Text>{route.params.title}</Text>
            </View>
        </SafeAreaView>
    )
}
export default Test2