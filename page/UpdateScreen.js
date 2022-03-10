import React,{useState,useEffect} from 'react'
import { SafeAreaView,Alert,Text,View,StyleSheet,Dimensions,Image,Button,Label,Platform,Modal} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import MyTextInput1 from '../component/MyTextInput1';

import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const windownWidth = Dimensions.get('window').width;
const windownHeight = Dimensions.get('window').height;
    
const UpdateScreen=({navigation,route})=>{
    const email = route.params.email;
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const [name,changeName] = useState();
    const [phoneNumber,changePhoneNumber] = useState("");
    const [dateOfBirth,changeDateOfBirth] = useState("");
    const [avatar,setAvatar] = useState("");
    const [data,setData] = useState({});
    const [checkDate,setCheckDate] = useState(false);
    const [avatarChange,setAvatarChange] = useState(null);

    const [checkAvatar,setCheckAvatar] = useState(false);

    const [image, setImage] = useState(null);
    const [imageURI,setImageURI] = useState(null);
    const [CheckUpload,setCheckUpload] = useState(false);
    const [waiting,setWaiting] = useState(false);

    const [checkName,setCheckName]=useState(false);
    const [checkPhoneNumber,setCheckPhoneNumber]=useState(false);
    const [checkImage,setCheckImage] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + "/" + (tempDate.getMonth()+1) + "/" + tempDate.getFullYear();
        changeDateOfBirth(fDate);
        setCheckDate(true);
        };
        const showMode = (currentMode) => {
          setShow(true);
          setMode(currentMode);
        };
    
        const showDatepicker = () => {
          showMode('date');
        };

        const handleCheckName = (val) => {
            if(val.length>=5) {
                changeName(val);
                setCheckName(true);
            }
            else{
                changeName(val);
                setCheckName(false);
            }
        }
        const handleCheckPhone=(val)=>{
            if(val.length >= 8){
                changePhoneNumber(val);
                setCheckPhoneNumber(true);
            }
            else{
                changePhoneNumber(val);
                setCheckPhoneNumber(false);
            }
        }

    useEffect(() => {
                fetch('https://mykitchenk5.000webhostapp.com/API/info.php', {
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
                    setAvatar(data.avatar);
                    // console.log(responseJson);
                })
                .catch((error)=>{
                    console.log("Error"+error);
                });
        },[email])
   
    const info=()=>{
        // console.log(name);
            fetch('https://mykitchenk5.000webhostapp.com/API/update.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email":email,
                "name":name,
                "date":dateOfBirth,
                "phoneNumber":phoneNumber,
                })
            })
            
            .then((response)=>response.json())
            .then((responseJson)=>{
                //setData(responseJson);
                 //console.log("======="+responseJson);
            })
            .catch((error)=>{
                console.log("Error"+error);
            });
        }
///Upload image
    useEffect(() => {
            (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            }
            })();
        }, []);

    const pickImage=async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            });
        if(!result.cancelled){
            setImageURI(result.uri);
            setImage(result.data);
        }
        setCheckImage(true);
        setCheckAvatar(true);

    }

    const ImageUpload=async()=> {
        if(checkImage===true){
            const response = await fetch(imageURI);
            const blob = await response.blob();
            console.log(imageURI);
            var reader = new FileReader();
            reader.onload = () => {
              var InsertAPI = 'https://mykitchenk5.000webhostapp.com/API/avatarUpload.php';
              setAvatarChange(reader.result);
                    var Data={img:reader.result,email:email};
                    var headers={
                    'Accept':'application/json',
                    'Content-Type':'application.json'
                    }
                    fetch(InsertAPI,{
                        method:'POST',
                        headers:headers,
                        body:JSON.stringify(Data),
                    })
                    .then((response)=>response.json())
                    .then((responseJson)=>{
                        if(responseJson==1){
                          setCheckUpload(true);
                          setWaiting(false);
                        //   console.log(responseJson);
                        Alert.alert("Đã lưu");
                        }
                        else {
                          setCheckUpload(false);
                          setWaiting(true);
                        }
                    })
                    .catch(err=>{
                        console.log(err);
                    })  
                }
            reader.readAsDataURL(blob);
        }
        else{
            Alert.alert("Bạn chưa chọn ảnh!");
        }
  
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            fetch('https://mykitchenk5.000webhostapp.com/API/info.php', {
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
                })
                .catch((error)=>{
                    Alert.alert("Error"+error)
                });
        });
        return unsubscribe;
      },[]);
  
    return(
        <SafeAreaView>
            <View style={styles.container}>
                <View style={{backgroundColor:"#FFFFFF"}}>
                    <View style={styles.image_container}>
                            {checkAvatar?
                            <Image style={styles.image} source={{ uri: imageURI }} />
                            :
                            <Image style={styles.image} source={{ uri: data.avatar }}/>
                            }
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity style={styles.btn_changeImage} onPress={pickImage}>
                                    <Text style={{fontSize:17,marginRight:5}}>Đổi ảnh</Text>
                                    <Feather name="camera" size={22} color="black"/>
                            </TouchableOpacity>
                                <TouchableOpacity style={styles.btn_saveImage} onPress={ImageUpload}>
                                    <Text style={{fontSize:17,marginRight:5}}>Lưu ảnh</Text>
                                    <Entypo name="image" size={22} color="black" />
                                </TouchableOpacity>
                            </View>
                        
                    </View>
                    <View style={styles.email_container}>
                        <Text style={{fontSize:18}}>Email</Text>
                        <Text style={{fontSize:20,marginLeft:15}}>{data.email}</Text>
                    </View>
                </View >
                <View style={{marginTop:10,backgroundColor:"#FFFFFF"}}>
                    <MyTextInput1 Label="Tên tài khoản" placeholder={data.name} value={name} maxLength={25} onChangeText={(val)=>handleCheckName(val)}></MyTextInput1>
                    <MyTextInput1 Label="Số điện thoại" placeholder={data.phonenumber}  maxLength={11} value={phoneNumber} onChangeText={(val)=>handleCheckPhone(val)} ></MyTextInput1>
                    <View>
                        <View style={styles.item_date}>
                            <Text style={{fontSize:18,}}>Ngày sinh</Text>
                            <View style={{flex:1}}>
                                <TouchableOpacity style={{flexDirection:'row',position:"relative"}} onPress={showDatepicker}>
                                    <View>
                                        {checkDate?
                                            <Text style={{fontSize:18,marginLeft:10}}>{dateOfBirth}</Text>
                                            :
                                            <Text style={{fontSize:18,marginLeft:10}}>{data.date}</Text>
                                        }
                                    </View>
                                    <MaterialIcons style={{position:'absolute',marginLeft:'90%'}} name="date-range" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {show && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            display="default"
                            onChange={onChange}
                            />
                            )}
                    </View>
                </View>
                <View style={styles.changeInfo}>
                   {checkName && checkPhoneNumber?
                     <TouchableOpacity style={styles.btn_changeInfo} onPress={()=>{info(),Alert.alert("Đã lưu")}} >
                             <Text style={{fontSize:20}}>Lưu thông tin</Text>
                     </TouchableOpacity>
                    :
                    <TouchableOpacity style={[styles.btn_changeInfoDisabled,{opacity:0.8}]} disabled={true}>
                             <Text style={{fontSize:18}}>Lưu thông tin</Text>
                     </TouchableOpacity>   
                    }
                </View>
                <View>
            </View>
           
            </View>      
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container:{
       
    },
    image:{
        height:100,
        width:100,
        borderRadius:100,
        borderWidth:1,
        borderColor:'#DB781D',
    },
    email_container:{
        flexDirection:'row',
        height:50,display:'flex',
        alignItems:'center',
        borderBottomColor:'#c1c1c1',
        borderBottomWidth:1,
        marginLeft:15,
        marginRight:15
    },
    image_container:{
        marginTop:15,
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        height:150,
        
    },
    btn_changeImage:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        borderWidth:1,
        padding:7,
        borderTopLeftRadius:15,
        borderBottomLeftRadius:15,
        borderColor:'#c1c1c1',
    },
    btn_saveImage:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        borderWidth:1,
        padding:7,
        borderTopRightRadius:15,
        borderBottomRightRadius:15,
        borderColor:'#c1c1c1',
    },
    changeInfo:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        position:"relative",
        height:'50%',
    },
    btn_changeInfo:{
        height:40,
        width:windownWidth-30,
        borderColor:"#DB781D",
        borderWidth:2,
        borderRadius:20,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
    
    },
    btn_changeInfoDisabled:{
        height:40,
        width:windownWidth-30,
        borderColor:"#c1c1c1",
        borderWidth:2,
        borderRadius:20,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
    },
    item_date:{
        height:50, 
        flexDirection:'row',display:"flex",
        alignItems:"center",
        marginLeft:15,
        marginRight:15,
        borderBottomWidth:1,
        borderBottomColor:"#c1c1c1",
    }

})
export default UpdateScreen