import React from 'react';
import { StyleSheet, View,TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const MySearchInput=(props)=>{
    return(
        <View style={{flexDirection:'row',position:'relative'}}>
                <TextInput style={styles.TextInput} 
                onChangeText={props.onChangeText} 
                value={props.value} 
                placeholder = {props.placeholder} 
                secureTextEntry={props.secureTextEntry}
                maxLength={props.maxLength}
                onPressIn={props.onPressIn}
                ></TextInput>
                <View style={{position:'absolute',right:10,top:2,zIndex:11,height:30,width:35}}>
                    <TouchableOpacity>
                        <Feather name="search" size={27} color="black" />
                    </TouchableOpacity>
                </View>
        </View>
    )
}
const styles = StyleSheet.create({
    TextInput:{
        height:35,
        width: 400,
        fontSize:18,
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'white',
        justifyContent:'center',
        borderColor:'#ffffffb5',
        paddingLeft:10,
        color:'#212121',
        
    },
   
})
export default MySearchInput;