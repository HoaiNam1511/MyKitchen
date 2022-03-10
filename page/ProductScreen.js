import React,{useState,useEffect}  from "react";
import { SafeAreaView,View,StyleSheet,Text} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import ProductCard from "../component/ProductCard";


const  ProductScreen=({ navigation,route })=>{
    const [data,setData] = useState([]);
    useEffect(() => {
        dataProducts();
    },[])
    const dataProducts =()=>{
        fetch('https://mykitchenk5.000webhostapp.com/API/products.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "productId":route.params.categoryId,
                })
            })
            
            .then((response)=>response.json())
            .then((responseJson)=>{
                setData(responseJson);
                // console.log(responseJson);
            })
            .catch((error)=>{
                console.log("Error"+error);
            });
    }
    
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'white',marginTop:10}}>
            <View style={styles.container}>
                <FlatList
                data = {data}
                keyExtractor={(item) => item.id}
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
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
            /> 
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        display:'flex',
        alignItems:'center'
    }
})

export default ProductScreen;