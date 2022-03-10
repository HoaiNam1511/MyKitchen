import React, {useState}from 'react';
import { StyleSheet,Dimensions, Text, View,Image,TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProductCard=({title,image,ViewDetail,description})=>{
    
    return(
        <TouchableOpacity style={styles.Card} onPress={ViewDetail}>
            <View style={styles.container}>
                <View style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Image style={styles.image} source={{uri:image}}></Image>
                </View>
                <View style={styles.container_content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>       
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    Card:{
        flex:1,
        height:windowHeight * 0.16,
        width:windowWidth * 0.88,
        marginBottom:10,
        borderRadius:10,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#F8F8F8',
        
    },
    container:{
        flexDirection:'row',
    },
    container_content:{
        width:215,
    },
    image:{
        height:100,
        width:130,
        borderRadius:10,
      
    },
    title:{
        fontWeight:'bold',
        fontSize:22,
        marginLeft:10,
    },
    description:{
        fontSize:16,
        marginLeft:10,
    },
    

})
export default ProductCard;