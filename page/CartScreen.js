import React,{useState,useEffect} from "react";
import { SafeAreaView,Text,View,Dimensions,TouchableOpacity,StyleSheet,Image,ScrollView,ActivityIndicator } from "react-native";

import MySearchInput from "../component/MySearchInput";
import { FlatList, Swipeable} from "react-native-gesture-handler";
import ProductCard from "../component/ProductCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SwipeListView } from 'react-native-swipe-list-view';
import { AntDesign } from '@expo/vector-icons';
const numberColums = 2;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CartScreen=({navigation})=>{
    const [email,setEmail] = useState("");
    const [data,setData] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const [loading,setLoading] = useState();
    const [checkData,setCheckData] = useState(false);

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

    const FetchCart=()=>{
        console.log("=======+++++++++++++++");
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
                console.log(responseJson);
                setData(responseJson);
                setCheckData(true);
            })
            .catch((error)=>{
                console.log("Error"+error)
            })
            .finally(()=>setLoading(true));
        }


    useEffect(() => {
            const unsubscribe = navigation.addListener('focus', async() => {
            await getData();
            FetchCart();
        }); 
        FetchCart();
        return unsubscribe;
    },[navigation,email,refresh]);

    const deleteCart =(title)=>{
        fetch('https://mykitchenk5.000webhostapp.com/API/deleteCart.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "title":title,
                "email":email,
                })
            })
            .then((response)=>response.json())
            .then((responseJson)=>{
                // console.log(responseJson);
                setRefresh(!refresh);  
            })
            .catch((error)=>{
                console.log("Error"+error);
            }); 
         
            console.log("=======");
            FetchCart();
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
            {loading?
            <View style={styles.container}>
            <SwipeListView
            data={data}
            renderItem={({item})=>
            <ProductCard
                image = {item.image}
                title={item.title}
                description = {item.description}
                ViewDetail={()=>{
                navigation.navigate('Detail',{item})
                }}
            />
            }
            renderHiddenItem={ ({item}) => (
                <View>
                    <TouchableOpacity
                        style={{
                            position:'absolute',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            right:0,
                            height:50,
                            height: windowHeight * 0.16,
                            width:windowWidth * 0.2,
                            borderRadius:11,
                        }}
                        onPress={()=>{deleteCart(item.title)}}
                    >
                         <AntDesign name="delete" size={30} color="black" />
                    </TouchableOpacity>
                   
                </View>
            )}
            leftOpenValue={0}
            rightOpenValue={-65}
            />
            </View>
            :          
            <ActivityIndicator style={{marginTop:50}} size="large" color="#DB781D"></ActivityIndicator>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        alignItems:'center',
        
    }
})
export default CartScreen;