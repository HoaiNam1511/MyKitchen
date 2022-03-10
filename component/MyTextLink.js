import React from 'react';
import { StyleSheet, Text,TouchableOpacity } from 'react-native';

const MyTextLink=(props)=>{
    return(
        <TouchableOpacity onPress={props.customClick}>
            <Text style={styles.Button_text}>{props.title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({

    Button_text:{
        fontSize:20,
        color:'black',
        marginTop:4,
        marginLeft:170,
    }
    
})
export default MyTextLink;