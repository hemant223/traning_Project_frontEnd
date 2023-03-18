import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { getStoreData } from '../storage/projectAsyncStorage';

const SplashScreen = (props) => {

    // For check the auth of user
    const authUser = async () => {
        const userData = await getStoreData('userData');
        if (userData) {
            if (userData.loggedIn) {
                props.navigation.navigate('HomeScreen');
            }
            else {
                
                props.navigation.navigate('Login')
            }
        }
        else {
            props.navigation.navigate('Registration')
        }
    }

    //Set Timer of Slpash Screen
    useEffect(() => {
        setTimeout(() => {
            authUser();
        }, 1000);
    }, [])
    
    

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
            <Text>Hello SplashScreen</Text>
        </View>
    )
}

export default SplashScreen