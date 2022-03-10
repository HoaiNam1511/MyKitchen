import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import CartScreen from '../page/CartScreen'
import StackMain from './Stack'
import Profile from '../page/ProfileScreen'
import SearchScreen from '../page/SearchScreen'
import HomeScreen from '../page/HomeScreen'

import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  return(
    <Tab.Navigator 
    screenOptions={{
      tabBarLabelStyle:{
        fontSize:16,
      },
      tabBarActiveTintColor:'#DB781D',
      tabBarInactiveTintColor:'#708090'
    }}
    >
      <Tab.Screen name='Home' component={HomeScreen} 
                  options={{
                  headerShown:false,
                  tabBarLabel:'Home',
                  tabBarIcon:({color})=><AntDesign name="home" size={24} color="black" color={color}/>
                }}/>
       <Tab.Screen name='Search' component={SearchScreen} 
                  options={{
                  headerShown:false,
                  tabBarLabel:'Tìm kiếm',
                  tabBarIcon:({color})=><AntDesign name="search1" size={24} color="black" color={color} />
                }}/>
      <Tab.Screen name='Cart' component={CartScreen} 
                  
                  options={{
                  headerTitle:"Danh sách yêu thích",
                  tabBarLabel:'Đã thêm',
                  tabBarIcon:({color})=><AntDesign name="hearto" size={24} color="black" color={color} />
                  }}
      />
      <Tab.Screen 
                name='Profile' 
                component={Profile} 
                options={{
                title:"Tài khoản",
                tabBarLabel:'Tài khoản',
                tabBarIcon:({color})=><MaterialCommunityIcons name="account" size={28} color="black" color={color} />
                }}
                />
    </Tab.Navigator>
  )
}

export default TabNavigation