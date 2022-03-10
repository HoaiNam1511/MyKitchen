import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import HomeScreen from '../page/HomeScreen'
import LoginScreen from '../page/LoginScreen'
import ProductScreen from '../page/ProductScreen'
import ProfileScreen from '../page/ProfileScreen'
import RegisterScreen from '../page/RegisterScreen'
import CartScreen from '../page/CartScreen'
import DetailScreen from '../page/DetailScreen'
import TabNavigation from './Tab'
import ChangePassScreen from '../page/ChangePassScreen'
import UpdateScreen from '../page/UpdateScreen'
import PolicyScreen from '../page/PolicyScreen'
const Stack = createNativeStackNavigator()

const StackMain = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={TabNavigation} options={{headerShown:false}}/>
                <Stack.Screen name='Login' component={LoginScreen}/>
                <Stack.Screen name='Register' component={RegisterScreen} />
                <Stack.Screen name='Product' component={ProductScreen}  options={{title:"Các món ăn"}}/>
                <Stack.Screen name='Cart' component={CartScreen} options={{headerShown:false}}/>
                <Stack.Screen name='Detail' component={DetailScreen} options={{title:"Chi tiết món"}}/>
                <Stack.Screen name='ChangePass' component={ChangePassScreen} options={{title:"Đổi mật khẩu"}}/>
                <Stack.Screen name='Update' component={UpdateScreen} options={{title:"Thông tin cá nhân"}}/>
                <Stack.Screen name='Policy' component={PolicyScreen} options={{title:"Chính sách người dùng"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackMain