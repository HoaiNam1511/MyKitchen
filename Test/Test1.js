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

const Test1=({navigation})=>{
    return(
        <SafeAreaView>
            <View>
                <Button title="Trang 2" onPress={()=>{navigation.navigate('Test2')}}></Button>
            </View>
        </SafeAreaView>
    )
}
export default Test1