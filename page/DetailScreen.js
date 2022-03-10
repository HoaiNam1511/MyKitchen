import React,{useState,useEffect} from "react";
import { SafeAreaView,Text,View,Dimensions,StyleSheet,Image,TouchableOpacity, Alert,Button} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AntDesign } from '@expo/vector-icons';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const DetailScreen=({navigation,route})=>{

    const [email,setEmail] = useState("");
    const [checkPress,setCheckPress] = useState(false);
    const [checkEmail,setCheckEmail] = useState(false);
    const [data,setData] = useState({});
    const [titleValue,setTitleValue] = useState("");
    const getData=async()=>{
        try{
            await AsyncStorage.getItem('Email')
            .then(value=>{
                if(value != null){
                    setEmail(value);
                }
            })
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        if(email!==""){
            setCheckEmail(true);
        }
        else{
            setCheckEmail(false);
        }
    })
    // Get data
    const FetchCart=()=>{
        fetch('https://mykitchenk5.000webhostapp.com/API/getFromCart.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email":email,
                })
            })
            .then((response)=>response.json())
            .then((responseJson)=>{
                setData(responseJson);
            })
            .catch((error)=>{
                console.log("Error"+error);
            }); 
            checkRefresh();
        }

    useEffect(() => {
        FetchCart();
    },[email])
    useEffect(() => {
            const unsubscribe = navigation.addListener('focus', async() => {
            await getData();
            FetchCart();
        });
        return unsubscribe;
    },[navigation,email]);

    // Up data
    const addToCard=()=>{
        setTitleValue(route.params.item.title);
        fetch('https://mykitchenk5.000webhostapp.com/API/addToCard.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email":email,
                "productID":route.params.item.productID,
                "title":route.params.item.title,
                "description":route.params.item.description,
                "material":route.params.item.material,
                "perform":route.params.item.perform,
                "image":route.params.item.image,
                })
            })
            .then((response)=>response.json())
            .then((responseJson)=>{
                // console.log(responseJson);
                if(responseJson == "ADD"){
                    setCheckPress(true);
                }
                else{
                    setCheckPress(false);
                }
            })
            .catch((error)=>{
                console.log("Error"+error);
            });   
    }
    
    const deleteCart =()=>{
        setTitleValue(route.params.item.title);
        fetch('https://mykitchenk5.000webhostapp.com/API/deleteCart.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "title":route.params.item.title,
                "email":email,
                })
            })
            .then((response)=>response.json())
            .then((responseJson)=>{
                if(responseJson == "Success"){
                    setCheckPress(false);
                }
                else{
                    setCheckPress(true);
                }
            })
            .catch((error)=>{
                console.log("Error"+error);
            }); 
          
    }
    const checkRefresh=()=>{
        fetch('https://mykitchenk5.000webhostapp.com/API/checkCart.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "title":route.params.item.title,
                "email":email,
                })
            })
            .then((response)=>response.json())
            .then((responseJson)=>{
                //console.log(route.params.item.title);
                if(responseJson === "HaveValue"){
                    setCheckPress(true);
                }
                else{
                    setCheckPress(false);
                }
                
            })
            .catch((error)=>{
                console.log("Error"+error);
            }); 
    }
    return(
        <SafeAreaView >
            <ScrollView>
                <Image
                        resizeMode='cover'
                        style={styles.image}
                        source={{uri:route.params.item.image}}
                />
                <View style={styles.content}>
                    <View style={{flexDirection:'row',margin:10}}>
                        <Text style={styles.title}>{route.params.item.title}</Text>
                        {checkEmail?
                            <TouchableOpacity style={{position:'absolute',right:15,top:5}}>
                            {checkPress?
                                <View style={{flexDirection:'row',position:'relative'}}> 
                                    <Text style={{position:'absolute',left:-80,fontSize:20}}>Đã thêm</Text>
                                     <AntDesign name="heart" size={30} color='red' onPress={()=>{deleteCart()}} />
                                </View>
                                :
                                <View style={{flexDirection:'row',position:'relative'}}> 
                                    <Text style={{position:'absolute',left:-80,fontSize:20}}>Thêm</Text>
                                    <AntDesign name="hearto" size={30} color='red' onPress={()=>{addToCard()}} />
                                </View>  
                            }
                            </TouchableOpacity> 
                        :
                            <TouchableOpacity style={{position:'absolute',right:15,top:0}}>
                                <AntDesign name="hearto" size={30} color='red' onPress={()=>{Alert.alert("Bạn cần phải đăng nhập")}} />
                            </TouchableOpacity>         
                        }
                    </View>
                    <View style={{margin:10}}>
                        <Text style={styles.title_first}>Nguyên liệu:</Text>
                        <View style={[styles.container__material,styles.shadow__container]}>
                            <ScrollView>
                            <Text style={styles.content}>{route.params.item. material}</Text>
                            </ScrollView>
                        </View>
                    </View>
                   
                    <View style={{margin:10}}>
                        <Text style={styles.title_first}>Hướng dẫn chế biến</Text>
                        <View style={[styles.container__perform,styles.shadow__container]}>
                            <ScrollView>
                            <Text style={styles.content}>{route.params.item.perform}</Text>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    image:{
        height:windowHeight*0.3,
        width:windowWidth,
    },
    title:{
        fontSize:26,
        fontWeight:'bold',
    
    },
    title_first:{
        fontSize:22,
        fontWeight:'bold',
    },
    content:{
        fontSize:18,
        margin:15,
        lineHeight:27,
    },
    container__material:{
        backgroundColor:'#F8F8F8',
        height:250,
        borderRadius:20,
        marginTop:20,
     
    },
    container__perform:{
        backgroundColor:'#F8F8F8',
        height:400,
        borderRadius:20,
        marginTop:20,
    },
    shadow__container:{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5, 
        elevation:3
    }
})
export default DetailScreen