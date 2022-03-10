import React,{useState,useEffect} from "react";
import { SafeAreaView,Text,View,Dimensions,StyleSheet,Alert} from "react-native";
import MyTextInput from "../component/MyTextInput";
import { Feather } from '@expo/vector-icons';
import MyButton from "../component/MyButton";
import MyTextLink from "../component/MyTextLink";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from '@expo/vector-icons';

const windownWidth = Dimensions.get('window').width;
const windownHeight = Dimensions.get('window').height;

const LoginScreen=({navigation})=>{

    const [getEmail,setEmail] = useState("");
    const [email,changeEmail] = useState("");
    const [password,changePass] = useState("");
            useEffect(() => {
                setData();
            },[getEmail])
            const setData= async ()=>{
                try{
                    await AsyncStorage.setItem('Email',getEmail);
                }
                catch(error){
                    console.log(error);
                }
            }
            const onLogin=()=>{
                fetch('https://mykitchenk5.000webhostapp.com/API/login.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email":email,
                    "password": password,
                })
            })
            .then((response)=>response.json())
            .then((responseJson)=>{
                if(responseJson.message==="Success"){ 
                    setEmail(responseJson.info.email);
                    navigation.navigate('Profile',{getEmail});
                }
                else{
                    Alert.alert("Đăng nhập thất bại")
                }
            })
            .catch((error)=>{
                Alert.alert("Error"+error);
            });
            }
    return(
        <SafeAreaView>
            {/* <Image style={{height:150,width:'100%',borderBottomLeftRadius:20,borderBottomRightRadius:20}} source={require('../assets/background2.jpeg')}></Image> */}
            <View style={styles.Container}>
                <View>
                    <Text style={styles.Text_Title}>MY KITCHEN</Text>
                </View>
                <View>
                    <View style={styles.View_account}>
                        <View style={styles.TextInput_marginTop}>
                            <Fontisto name="email" size={24} color="black" />
                            <MyTextInput placeholder="Email" onChangeText={changeEmail} value={email}></MyTextInput>
                        </View>
                        
                        <View style={styles.TextInput_marginTop}>
                            <Feather name="lock" size={24} color="black" />
                            <MyTextInput placeholder="Mật khẩu" secureTextEntry={true} onChangeText={changePass} value={password}  ></MyTextInput>
                        </View>
                    </View>  
                </View>
                <View style={styles.Button_center}>
                    <MyButton title="Đăng Nhập" customClick={()=>{onLogin()}}></MyButton>
                    <MyTextLink title="Đăng Ký?" customClick={()=>{navigation.navigate('Register')}}></MyTextLink>   
                </View>
            </View>
        </SafeAreaView>
    ) 
}
const styles = StyleSheet.create({
    Container:{
        marginTop:130,
    },
    backgroundImage:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',

    },
    Text_Title:{
        fontSize:55,
        textAlign:'center',
        color:'#DB781D',
        fontWeight:'bold'
    },
    Text_Title_marginTop:{
        marginTop:40,
    },
    TextInput_marginTop:{
        flexDirection:'row',
        marginTop:20,
        height:50,
        alignItems:'center',
        width:350,
        borderBottomWidth:1,
        borderColor:'#BDBDBD',
    },
    Button_center:{
        marginTop:20,
        alignItems:'center'
    },
    View_account:{
        display:'flex',
        alignSelf:'center',
        
    },
   
})
export default LoginScreen;