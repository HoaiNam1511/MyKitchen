import React,{useState,useEffect} from "react";
import { SafeAreaView,View,StyleSheet,Dimensions,Text,TouchableOpacity, Button,Alert, FlatList, Image,ActivityIndicator } from "react-native";

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const ProfileScreen=({navigation,route})=>{

    const [email,setEmail] = useState(""); 
    const [name,changeName] = useState("");
    const [data,setData] = useState({});
    const [checkEmail, getcheckEmail] = useState(false);
    const [checkAvatar, getCheckAvatar] = useState(false);

    const getData=async()=>{
            try{
                await AsyncStorage.getItem('Email')
                .then(value=>{
                    if(value != null){
                        getcheckEmail(true);
                        setEmail(value);
                        FetchInfo(value);
                        console.log("---------"+email);
                    }
                    else{
                        getcheckEmail(false);
                    }
                })
            }
            catch(error){
                console.log(error);
            }
        }

    const FetchInfo=(value)=>{
        fetch('https://mykitchenk5.000webhostapp.com/API/info.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email":value,
                    })
                })
                .then((response)=>response.json())
                .then((responseJson)=>{
                    console.log(responseJson);
                    setData(responseJson);
                    changeName(data.name);
                    getcheckEmail(true);
                    console.log(responseJson);
                })
                .catch((error)=>{
                    Alert.alert("Error"+error);
                })
        }
    useEffect(() => {
        getData();
        console.log("11111111111111111111111");
        //FetchInfo();
    },[email])
    useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
             getData();
             console.log("00000000000000000000000000");
            //FetchInfo();
        });
        return unsubscribe;
    },[navigation,email]);

    return(
        <SafeAreaView style={{position:"relative"}}>
                <View style={styles.container}>
                        {checkEmail?
                        <TouchableOpacity style={styles.account} disabled={true} onPress={()=>{navigation.navigate('Login')}}>
                            <View style={{marginLeft:10,flexDirection:'row',alignItems:'center'}}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Image style={{height:50,width:50,borderRadius:100}} source={{uri:data.avatar}}></Image>
                                    <Text style={{fontSize:20,marginLeft:10,color:"#121212",fontWeight:'bold'}}>{data.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        :    
                        <TouchableOpacity  style={styles.account} onPress={()=>{navigation.navigate('Login')}}>
                            <View style={{marginLeft:10,flexDirection:'row',alignItems:'center'}}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Image style={{height:50,width:50,borderRadius:100}} source={require('../assets/NewAvatar.png')} />
                                    <Text style={{fontSize:20,marginLeft:10,color:"#121212",fontWeight:'bold'}}>Đăng nhập</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        }
                </View>
                <View style={{marginTop:1}}>
                    <TouchableOpacity style={styles.item} onPress={()=>{navigation.navigate('Update',{email})}}>
                        <View style={{width:40,height:40}}>
                        <Ionicons style={styles.icon} name="pencil" size={20} color="black" />
                        </View>
                        <Text style={styles.title}>Sửa thông tin</Text>
                        <AntDesign style={styles.icon} name="right" size={22} color="black"/>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop:1}}>
                    <TouchableOpacity style={styles.item} onPress={()=>{navigation.navigate('ChangePass',{email})}}>
                        <Ionicons style={styles.icon} name="ios-key-outline" size={24} color="black" />
                        <Text style={styles.title}>Đổi mật khẩu </Text>
                        <AntDesign style={styles.icon} name="right" size={22} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={{marginTop:1}}>
                    <TouchableOpacity style={styles.item} onPress={()=>{navigation.navigate('Policy',{email})}}>
                        <Ionicons style={styles.icon} name="ios-newspaper-outline" size={24} color="black" />
                        <Text style={styles.title}>Chính sách người dùng</Text>
                        <AntDesign style={styles.icon} name="right" size={22} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.logout_container}>
                    {checkEmail?
                    <TouchableOpacity style={styles.btnLogout} onPress = {()=>Alert.alert('Đăng xuất','Bạn có chắc muốn đăng xuất ?',
                    [{
                        text:'Đồng ý',onPress:async()=>{
                        navigation.replace('Home');
                        await AsyncStorage.clear();
                    }},
                    {
                        text:'Bỏ qua', 
                        onPress:()=>{
                        navigation.navigate('Profile');    
                    }}
                    ])}>
                        <Text style={{fontSize:20}}>Đăng xuất</Text>
                    </TouchableOpacity>
                    :
                    <View></View>
                    }  
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        flexDirection:'row',
        height:60,
        backgroundColor:'#E4E5E7',
    },
    account:{
        alignItems:'center',
        flexDirection:'row',
        height:60,
        backgroundColor:'#E4E5E7',
        flex:1
    },
    setting:{
        marginRight:10,
    },
    item:{
        marginTop:2,
        height:45,
        borderBottomWidth:2,
        borderColor:'#E4E5E7',
        flexDirection:'row',
        display:"flex",
        alignItems:"center",
        marginLeft:10,
        marginRight:10,
    },
    title:{
        fontSize:16,
        marginLeft:20,
        flex:1,
    },
    icon:{
        margin:8,
    },
    logout_container:{
        display:'flex',
        alignItems:'center',
        height:'60%',
    },
    btnLogout:{
        height:40,
        width:windowWidth-30,
        borderColor:"#D3D3D3",
        borderWidth:2,
        borderRadius:20,
        position:'absolute',
        bottom:0,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderColor:"#DB781D",
    }
})
export default ProfileScreen;