import React from 'react';
import { StyleSheet, View } from 'react-native';
import TabNavigation from './navigation/Tab';
import StackMain from './navigation/Stack';
const App = () => {
  fetch('https://webhook.site/da53c660-a365-4084-bfc6-66da2db1b145',{
    method:'post',
    mode:'no-cors',
    headers:{
      'Accept':'appliaction/json',
      'Content-Type':'aplication/json'
    },
    body:JSON.stringify({
      username:'Hoai Nam1',
      id:'1',
      monAn:'Ngon',
    })
  })
  return(
    <View style={{flex: 1}}>
    <StackMain />
    
  </View>
  )
}

export default App
