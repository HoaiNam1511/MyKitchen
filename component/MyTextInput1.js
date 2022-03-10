import React from 'react';
import { StyleSheet, View,TextInput,Dimensions,Text } from 'react-native';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MyTextInput1=(props)=>{
    return(
        <View style={styles.container}>
            <Text style={styles.Label}>{props.Label}</Text>
            <TextInput style={styles.TextInput} 
            onChangeText={props.onChangeText} 
            value={props.value} 
            placeholder = {props.placeholder} 
            secureTextEntry={props.secureTextEntry}
            maxLength={props.maxLength}
            >{props.name}</TextInput>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        display:"flex",
        alignItems:"center",
        marginLeft:15,
        marginRight:15,
        borderBottomWidth:1,
        borderBottomColor:"#c1c1c1",
    },
    TextInput:{
        height:50,
        marginLeft:10,
        fontSize:20,
        width:350,
    },
    Label:{
        fontSize:18,
    }
   
})
export default MyTextInput1;