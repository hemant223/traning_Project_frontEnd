import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/components/screens/SplashScreen';
import Login from './src/components/screens/Login';
import HomeScreen from './src/components/screens/HomeScreen';
import ForgetPassword from './src/components/screens/ForgetPassword';
import AddVechile from './src/components/drawer_screens/AddVechile';
import ListOfVehicle from './src/components/drawer_screens/ListOfVehicle';
import List from './src/components/List';
import Vendor from './src/components/drawer_screens/Vendor';
import { View, Text, } from "react-native";
import { LogBox ,Dimensions} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Products from './src/components/drawer_screens/Products';
import Registration from './src/components/screens/Registration';

import VenderList from './src/components/drawer_screens/VenderList';

const Stack=createNativeStackNavigator()
const App=()=>{
  const [netInfo, setNetInfo] = useState();


    useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetInfo(state.isConnected)
    });
    return () => {
      // Unsubscribe to network state updates
      unsubscribe()
    };
  }, []);
  

  useEffect(() => {
    LogBox.ignoreAllLogs()
  }, [])
  

  return (
    <>
    {/* {netInfo==false?
    <View style={{display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'#fff',height:'100%'}}>
    <Text style={{fontSize:22,fontWeight:500}}>
      No Internet Connection...</Text>
      </View>
      : */}
    <NavigationContainer>
        <Stack.Navigator
        initialRouteName={'splashscreen'}
        screenOptions={{headerShown:false}} >

        <Stack.Screen  name="splashscreen" component={SplashScreen}/>     
        <Stack.Screen  name="Registration" component={Registration}/>     
        <Stack.Screen  name="Login" component={Login}/>     
        <Stack.Screen  name="HomeScreen" component={HomeScreen}/>     
        <Stack.Screen  name="ForgetPassword" component={ForgetPassword}/>     
        <Stack.Screen  name="VenderList" component={VenderList}/>     
        <Stack.Screen  name="AddVechile" component={AddVechile}/>     
        <Stack.Screen  name="ListOfVehicle" component={ListOfVehicle}/>     
        <Stack.Screen  name="List" component={List}/>     
        <Stack.Screen  name="Products" component={Products}/>     
        <Stack.Screen  name="Vendor" component={Vendor}/>     
  
        </Stack.Navigator>
      </NavigationContainer>
   
  {/* } */}
   
    </>
    
      );
    }

export default App;