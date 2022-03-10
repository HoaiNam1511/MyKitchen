import React,{useState,useEffect} from 'react'
import { SafeAreaView,Alert,Text,View,StyleSheet,Dimensions } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

import MyTextInput1 from '../component/MyTextInput1';

const windownWidth = Dimensions.get('window').width;
const windownHeight = Dimensions.get('window').height;

const ChangePassScreen=({navigation,route})=>{
    
    const [oldPass,setOldPass] = useState("");
    const [newPass,setNewPass] = useState("");
    const [confirmPass,setConfirmPass] = useState("");
    const [mesNotifi,setMesNotifi] = useState("");
    const [message,setMessage] = useState({});
    const [checkRes,setCheckRes] = useState(false);
    const [checkSuccess,setCheckSuccess] = useState(false);
    const [checkLengthPass,setCheckLengthPass] = useState(false);
    const [handlePress,setHandlePress] = useState(false);
    const [checkMess, setcheckMess] = useState(true);
    useEffect(() => {
        if((newPass.length >= 5) && (oldPass.length >= 6) && (confirmPass.length >= 5)){
            setCheckLengthPass(true);
        }
        else{
            setCheckLengthPass(false);
        }
    },[oldPass,newPass,confirmPass])
    const checkPass =()=>{
        setHandlePress(true);
        if(newPass === confirmPass){
                fetch('https://mykitchenk5.000webhostapp.com/API/updatePassword.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "email":route.params.email,
                        "oldPass":oldPass,
                        "newPass":newPass,
                        })
                    })
                    
                    .then((response)=>response.json())
                    .then((responseJson)=>{
                        console.log(responseJson);
                        // Alert.alert(responseJson);
                        setMessage(responseJson);
                        setCheckRes(true);
                        setMesNotifi("");
                        if(responseJson === "Mật khẩu được thay đổi"){
                            Alert.alert("Mật khẩu đã được thay đổi");
                            setCheckSuccess(true);
                            setcheckMess(false);
                        } 
                    })
                    
                    .catch((error)=>{
                        console.log("Error"+error);
                    });
            }
            else{
                setMesNotifi("Mật khẩu không trùng khớp");
            }
    }

    return(
        <SafeAreaView>
            <View>
                {checkRes?
                    <View>
                        {checkSuccess?
                            <View>
                                <MyTextInput1 secureTextEntry={true}  placeholder="Mật khẩu cũ" value={oldPass} maxLength={15} onChangeText={setOldPass}></MyTextInput1>
                                {checkMess?
                                <Text style={{marginLeft:20,color:'red'}}>{message}</Text>
                                :
                                <Text style={{marginLeft:20,color:'red'}}></Text>
                                }
                            </View>
                        :
                            <View>
                                <MyTextInput1 secureTextEntry={true} placeholder="Mật khẩu cũ" value={oldPass} maxLength={15} onChangeText={setOldPass}></MyTextInput1>
                                <Text style={{marginLeft:20,color:'red'}}>{message}</Text>
                            </View>
                        }  
                    </View>
                    :
                    <View>
                        <MyTextInput1 secureTextEntry={true} placeholder="Mật khẩu cũ" value={oldPass} maxLength={15} onChangeText={setOldPass}></MyTextInput1>
                        <Text style={{marginLeft:20,color:'red'}}></Text>
                    </View>
                }
                {checkRes?
                    <View>
                        <MyTextInput1 secureTextEntry={true} placeholder="Mật khẩu mới"  value={newPass} maxLength={15} onChangeText={setNewPass} ></MyTextInput1>
                        <Text style={{marginLeft:20,color:'red'}}></Text>
                    </View> 
                    :
                    <View>
                        <MyTextInput1 secureTextEntry={true}  placeholder="Mật khẩu mới"  value={newPass} maxLength={15} onChangeText={setNewPass} ></MyTextInput1>
                        <Text style={{marginLeft:20,color:'red'}}></Text>
                    </View> 
                }
                {checkRes?
                    <View>
                        <MyTextInput1 secureTextEntry={true}  placeholder="Xác nhận mật khẩu"  value={confirmPass} maxLength={15} onChangeText={setConfirmPass} ></MyTextInput1>
                        <Text style={{marginLeft:20,color:'red'}}>{mesNotifi}</Text>
                    </View> 
                    :
                    <View>
                        <MyTextInput1 secureTextEntry={true}  placeholder="Xác nhận mật khẩu"  value={confirmPass} maxLength={15} onChangeText={setConfirmPass} ></MyTextInput1>
                        <Text style={{marginLeft:20,color:'red'}}>{mesNotifi}</Text>
                    </View> 
                }
                <View style={styles.changeInfo}>
                   {checkLengthPass?
                     <TouchableOpacity style={styles.btn_changeInfo} onPress={()=>{checkPass()}} >
                             <Text style={{fontSize:20}}>Thay đổi mật khẩu</Text>
                     </TouchableOpacity>
                    :
                    <TouchableOpacity style={[styles.btn_changeInfoDisabled,{opacity:0.8}]} disabled={true}>
                             <Text style={{fontSize:18}}>Thay đổi mật khẩu</Text>
                     </TouchableOpacity>   
                    }
                </View>
                <Text style={{margin:20}}>Lưu ý: Để an toàn bảo mật, vui lòng nhập mật khẩu trên 5 kí tự.</Text>
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
    },
})
export default ChangePassScreen