import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState,useEffect } from 'react'
import { storeData, getStoreData } from '../storage/projectAsyncStorage';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import MI from 'react-native-vector-icons/MaterialIcons'


//This function show the Drawer contents
const DrawerContent = (props) => {
    const [userDetails, setUserDetails] = useState({});
    
    useEffect(() => {
        getUserData();
    }, [props]);


    // To get the User Data from LocalStorage
    const getUserData = async () => {
        const userData = await getStoreData('userData');
       
        if (userData) {
            setUserDetails(userData);
        }
    };


    //Logout the app and back to Login Screen
    const logout = () => {
        storeData(
            'userData',
            ({ ...userDetails, loggedIn: false }),
        );
          props.navigation.navigate('Login');
    };

    return (
        <DrawerContentScrollView
        style={{
            backgroundColor:'#487eb0'
           }}
         >
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'column' }}>
                <Image style={{width:100,height:100,borderRadius:50}} source={require('../../assets/images/verna1.png')} />
                <Text style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: 1, padding: 5, color: '#fff' }}>{userDetails.firstName} {userDetails.lastName}</Text>
                <Text style={{ fontSize: 12, letterSpacing: 1, padding: 5, color: '#fff' }}>{userDetails.emailId}</Text>
            </View>

            <TouchableOpacity  onPress={()=>props.navigation.navigate("AddVechile")}>
            <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 8, padding: 5 }}>
                <MI color="#fff" name="add" size={25} />
                <Text style={{ padding: 4, color: "#fff" }}>AddVechile</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity  onPress={()=>props.navigation.push("ListOfVehicle")}>
            <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 8, padding: 5 }}>
                <MI color="#fff" name="format-list-numbered-rtl" size={25} />
                <Text color="#fff" style={{ padding: 2, color: "#fff" }}>List Of Vehicle</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity  onPress={()=>props.navigation.push("Products")}>
            <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 8, padding: 5 }}>
                <MI color="#fff" name="add" size={25} />
                <Text color="#fff" style={{ padding: 2, color: "#fff" }}>Add Products Detail</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity  onPress={()=>props.navigation.push("Vendor")}>
            <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 8, padding: 5 }}>
                <MI color="#fff" name="add" size={25} />
                <Text color="#fff" style={{ padding: 2, color: "#fff" }}>Add Vendor Detail</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity  onPress={()=>props.navigation.push("VenderList")}>
            <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 8, padding: 5 }}>
                <MI color="#fff" name="format-list-numbered-rtl" size={25} />
                <Text color="#fff" style={{ padding: 2, color: "#fff" }}>Vendor List</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={logout}>
                <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 8, padding: 5 }}>
                    <MI color="#fff" name="logout" size={25} />
                    <Text color="#000" style={{ padding: 2, color: "#fff" }}>Logout</Text>
                </View>
            </TouchableOpacity>

        </DrawerContentScrollView>

    )
}

export default DrawerContent