import React, {useState}from 'react';
import { StyleSheet,Dimensions, Text, View,Image,TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SearchCart=({title,image,ViewDetail})=>{
    return(
        <TouchableOpacity style={styles.Card} onPress={ViewDetail}>
            <View style={styles.container}>
                <Feather  name="search" size={27} color="black" />
                <View style={{display:'flex',alignItems:'center'}}>
                </View>
                <View style={styles.container_content}>
                    <Text style={styles.title}>{title}</Text>
                </View>       
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
   
    container:{
        flexDirection:'row',
        display:'flex',
        alignItems:'center',
        borderBottomWidth:1,
        backgroundColor:'#F8F8F8',
    },
    Card:{
        flex:1,
        height: 30,
        width:windowWidth * 0.88,
        marginBottom:10,
        borderRadius:10,

    },
    container_content:{
        width:400,
    },
    title:{
        fontWeight:'bold',
        fontSize:20,
        margin:10,
    },
    description:{
        fontSize:16,
        marginLeft:10,
    }
})
export default SearchCart;