import React,{useState} from "react";
import { SafeAreaView,Alert,Text,View,StyleSheet} from "react-native";
import MyTextInput from "../component/MyTextInput";
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import MyButton from "../component/MyButton";
import MyTextLink from "../component/MyTextLink";

const RegisterScreen=({navigation})=>{
        const [name,changeName] = useState("");
        const [email,changeEmail] = useState("");
        const [password,changePass] = useState("");
        const [checkPass,setCheckPass] = useState(false);
        const [checkSuccess,setCheckSucces] = useState(true);
        const onRegester=()=>{ 
            if(name.length > 5 && password.length > 5){
                setCheckPass(true);
                fetch('https://mykitchenk5.000webhostapp.com/API/register.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email":email,
                    "name": name,
                    "password": password,
                })
                })
                .then((response)=>response.json())
                .then((responseJson)=>{
                    if(responseJson.message === "Success"){
                        Alert.alert('Tạo tài khoản thành công')
                    }
                    else{
                        Alert.alert("Tài khoản đã tồn tại")
                    }
                })
                .catch((error)=>{
                    Alert.alert("Error"+error)
                });
            }
            else{
                setCheckSucces(false);
            } 
        }
    return(
        <SafeAreaView>
          <View style={styles.Container}>
            <View style={styles.Text_Title_marginTop}>
                <Text style={styles.Text_Title}>MY KITCHEN</Text>
            </View>

            <View>
                <View style={styles.View_account}>

                     <View style={styles.TextInput_marginTop}>
                        <Fontisto name="email" size={24} color="black" />
                        <MyTextInput placeholder="Email" onChangeText = {changeEmail} value={email}></MyTextInput>
                    </View>

                    <View style={styles.TextInput_marginTop}>
                        <Feather name="user" size={26} color="black" />
                        <MyTextInput placeholder="Tên tài khoản" onChangeText = {changeName} value={name}></MyTextInput>
                    </View>
                    {checkPass?
                    <View>
                        <View style={styles.TextInput_marginTop}>
                            <Feather name="lock" size={24} color="black" />
                            <MyTextInput placeholder="Mật khẩu" secureTextEntry={true} onChangeText= {changePass} value={password}></MyTextInput>
                        </View>
                        <View>
                            <Text></Text>
                        </View>
                    </View>
                    :
                    <View>
                        <View style={styles.TextInput_marginTop}>
                            <Feather name="lock" size={24} color="black" />
                            <MyTextInput placeholder="Mật khẩu" secureTextEntry={true} onChangeText= {changePass} value={password}></MyTextInput>
                        </View>
                        <View>
                            {checkSuccess?
                            <Text style={{color:'red'}}></Text>
                            :
                            <Text style={{color:'red'}}>Mật khẩu và tài khoản phải trên 5 kí tự</Text>
                            }
                        </View>
                    </View>
                    }
                </View>  
            </View>
            <View style={styles.Button_center}>
                <MyButton title="Đăng Ký" customClick={()=>{onRegester()}}/>
                <MyTextLink title="Đăng Nhập" customClick={()=>{navigation.navigate('Login')}}></MyTextLink>    
            </View>
          </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    Container:{
        marginTop:70,
    },
    Text_Title:{
        fontSize:55,
        textAlign:'center',
        color:'#DB781D',
        fontWeight:'bold'
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
        marginTop:30,
        alignItems:'center'
    },
    View_account:{
        display:'flex',
        alignSelf:'center',
        marginTop:20
    },
   
})
export default RegisterScreen;