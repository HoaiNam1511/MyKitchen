import React from 'react';
import { StyleSheet, View,TextInput } from 'react-native';

const MyTextInput=(props)=>{
    return(
        <View>
            <TextInput style={styles.TextInput} 
            onChangeText={props.onChangeText} 
            value={props.value} 
            placeholder = {props.placeholder} 
            secureTextEntry={props.secureTextEntry}
            ></TextInput>
        </View>
    )
}
const styles = StyleSheet.create({
    TextInput:{
        height:50,
        marginLeft:10,
        width: 320,
        fontSize:20,
    },
   
})
export default MyTextInput;