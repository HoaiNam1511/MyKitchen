import React from 'react';
import { StyleSheet, Text,TouchableOpacity } from 'react-native';

const MyButton=(props)=>{
    return(
        <TouchableOpacity style={styles.Button_size} onPress={props.customClick}>
            <Text style={styles.Button_text}>{props.title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    Button_size:{
        height:45,
        width:300,
        backgroundColor:'#DB781D',
        borderRadius:5,
    },
    Button_text:{
        fontSize:30,
        color:'white',
        textAlign:'center',
        marginTop:2
    }
   
})
export default MyButton;