import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Keyboard } from "react-native";
import Button from "../Button";
import Input from "../Input";
import { storeData, getStoreData } from '../storage/projectAsyncStorage';
import React from 'react';

const { width, height } = Dimensions.get("window")


export default function Login({ navigation }) {
    const [inputs, setInputs] = React.useState({ mobileNumber: '', password: '' });
    const [errors, setErrors] = React.useState({});


    //check the validation
    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;
        if (!inputs.mobileNumber) {
            handleError('Please input Product Id', 'mobileNumber');
            isValid = false;
        }
        if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
        }
        if (isValid) {
            login();
        }
    };


    // Login Conditions after login go to HomeScreen Page
    const login = async () => {
        let userData = await getStoreData('userData')
        if (userData) {
            if (
                inputs.mobileNumber == userData.mobileNumber &&
                inputs.password == userData.password
            ) {
                navigation.navigate('HomeScreen', { userData });
                storeData(
                    'userData',
                    { ...userData, loggedIn: true },
                );
            } else {
                alert('Fail to Login', 'Invalid Details');
            }
        } else {
            alert('Hemu', 'User does not exist');
        }
    };

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };


    return (
        <View style={styles.container}>


            <View style={{ marginTop: 60 }}>
            {/* <Image style={{width:250,height:50}} source={require('../../assets/images/login.png')}/> */}
            </View>
            <View style={{ width: width * 0.8, alignSelf: 'center', marginTop: 20 }}>
                <Text style={{ fontSize: 55, color: '#fff', fontWeight: 'bold' }}>
                    Welcome Back !
                </Text>
            </View>
            <View style={{ width: width * 0.8, justifyContent: 'center', alignSelf: 'center' }}>
                <View style={{ width: width * 0.80, height: 'auto', backgroundColor: '#fff', borderTopRightRadius: 5, borderBottomLeftRadius: 5, borderTopLeftRadius: 5, borderBottomRightRadius: 5 }}>

                    <View style={{ marginTop: 20, width: width * 0.78, paddingLeft: 5 }}>
                        <Input
                            onChangeText={text => handleOnchange(text, 'mobileNumber')}
                            iconName="dots-grid"
                            onFocus={() => handleError(null, 'mobileNumber')}
                            placeholder='Enter your Mobile Number'
                            label="Mobile Number"
                            error={errors.mobileNumber}
                        />
                    </View>
                    <View style={{ marginTop: 20, width: width * 0.78, paddingLeft: 5 }}>
                        <Input
                            onChangeText={text => handleOnchange(text, 'password')}
                            onFocus={() => handleError(null, 'password')}
                            iconName="lock-outline"
                            label="Password"
                            placeholder="Enter your Password"
                            password
                            error={errors.password}
                            

                        />
                    </View>


                    <View style={{ marginTop: 20, width: width * 0.60, paddingLeft: 60 }}>
                        <Button onPress={validate} size="small" bordered color='#51cbcc' text="Login" type='filled' />

                    </View>

                    <View style={{ marginTop: 25,marginBottom:10, width: width * 0.8, alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity>
                            <Text onPress={() => navigation.navigate('Registration')} style={{ fontSize: 16, fontWeight: 'bold', color: '#51cbcc', marginLeft: 40 }}>
                                Sinup
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text onPress={() => navigation.navigate('ForgetPassword')} style={{ fontSize: 16, fontWeight: 'bold', color: '#51cbcc', marginRight: 25 }}>
                                Forgot Password
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>





        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor: 'linear-gradient(90deg, rgba(0,0,0,1) 14%, rgba(11,18,16,1) 89%)'
    },
    backgroundImage: {
        width: width,
        height: height
    }

});