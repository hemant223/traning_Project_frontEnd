import { View, Text, StyleSheet,  Dimensions, Keyboard} from "react-native";
import Button from "../Button";
import { useState} from "react";
import Input from "../Input";
import { storeData, getStoreData } from '../storage/projectAsyncStorage';
import React from 'react';


const { width, height } = Dimensions.get("window")
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

export default function ForgetPassword(props) {
    const [inputs, setInputs] = React.useState({ mobileNumber: '', otp: '', newPassword: '', reEnterPassword: '' });
    const [errors, setErrors] = React.useState({});
    const [otpp, setOtpp] = useState('')
    const [show, setShow] = useState(false)
   

//  Chech the Validation and Update the new Password
    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.mobileNumber || !inputs.mobileNumber.match(/\d{10}/)) {
            handleError('Please input phone number', 'mobileNumber');
            isValid = false;
        }

        if (!inputs.otp) {
            handleError('Please input  Otp', 'otp');
            isValid = false;
        }

        else if (inputs.otp != otpp) {
            handleError('Please input correct Otp', 'otp');
            isValid = false;
        }


        if (!inputs.newPassword) {
            handleError('Please input password', 'newPassword');
            isValid = false;
        } else if (inputs.newPassword.length < 5) {
            handleError('Min Prassword length of 5', 'newPassword');
            isValid = false;
        }
        else if (!inputs.newPassword.match(/^[0-9a-zA-Z]+$/)) {
            handleError('No special character allowed', 'newPassword');
            isValid = false;
        }
        if (!inputs.reEnterPassword) {
            handleError('Please input password', 'reEnterPassword');
            isValid = false;
        } else if (inputs.reEnterPassword.length < 5) {
            handleError('Min Prassword length of 5', 'reEnterPassword');
            isValid = false;
        }
        else if (!inputs.reEnterPassword.match(/^[0-9a-zA-Z]+$/)) {
            handleError('No special character allowed', 'reEnterPassword');
            isValid = false;
        }

        else if (inputs.newPassword != inputs.reEnterPassword) {
            handleError('password must be same', 'reEnterPassword');
            isValid = false;
        }


        if (isValid) {
            let userData = await getStoreData('userData')
            storeData(
                'userData',
                { ...userData, password: inputs.newPassword },
            );
            props.navigation.navigate('Login')
        }

    };



    // To genrate the otp
    const generateOtp = () => {
        var otpp = parseInt(Math.random() * 8999) + 1000
        alert(otpp)
        setOtpp(otpp)
    }


    // Otp Get When mobile no. is Correct 
    const otp = async () => {
        Keyboard.dismiss();
        let userData = await getStoreData('userData')
        if (inputs.mobileNumber == userData.mobileNumber) {
            generateOtp()
        }
        else {
            alert('please input correct no.')
        }

    };



    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };


    // alert show if inputs wrong detail
    const handleSubmitMob = () => {
        Keyboard.dismiss();
        let isValid = true;
        if (!inputs.otp) {
            handleError('Please input  Otp', 'otp');
            isValid = false;
        }
        if (!inputs.mobileNumber) {
            handleError('Please input  Mobile No', 'mobileNumber');
            isValid = false;
        }
        else if (inputs.otp != otpp) {
            handleError('Please input correct Otp', 'otp');
            isValid = false;
        }
        if (isValid) {
            setShow(!show)
        }
    }
   



   


    return (
        <View style={styles.container}>

            <View style={{ width: width * 0.8, alignSelf: 'center', marginTop: 20, marginBottom: 8 }}>
                <Text style={{ fontSize: 40, color: '#fff', fontWeight: 'bold' }}>
                    Forget Password
                </Text>
            </View>
            <View style={{ width: width * 0.8, justifyContent: 'center', alignSelf: 'center' }}>
                <View style={{ width: width * 0.80, height: 'auto', backgroundColor: '#fff', borderTopRightRadius: 5, borderBottomLeftRadius: 5, borderTopLeftRadius: 5, borderBottomRightRadius: 5 }}>

                {show?<></>: <View style={{ marginTop: 20, width: width * 0.78, paddingLeft: 5 }}>
                        <Input
                            keyboardType="numeric"
                            onChangeText={text => handleOnchange(text, 'mobileNumber')}
                            iconName="dots-grid"
                            onFocus={() => handleError(null, 'mobileNumber')}
                            placeholder='Enter your Mobile Number'
                            label="Mobile Number"
                            error={errors.mobileNumber}
                        />
                    </View>}
                    {show?<></>:   <View style={{ marginTop: 2, width: width * 0.60, paddingLeft: 60, }}>
                        <Button onPress={otp} size="small" bordered color='#51cbcc' text="Genrate otp" type='filled' />
                    </View>}


                    {show?<></>: <View style={{ marginTop: 2, width: width * 0.78, paddingLeft: 5 }}>
                        <Input
                            keyboardType="numeric"
                            onChangeText={text => handleOnchange(text, 'otp')}
                            iconName="dots-grid"
                            onFocus={() => handleError(null, 'otp')}
                            placeholder='Enter Otp'
                            label=" Otp"
                            error={errors.otp}
                        />
                    </View>}
                     
                    {show?<></>:<View style={{ marginTop: 2, width: width * 0.60, paddingLeft:5,marginBottom:20 }}>
                        <Button onPress={handleSubmitMob} bordered color='#51cbcc' text="submit" type='filled' />
                    </View>}

                    {show ? <View style={{ marginTop: 20, width: width * 0.78, paddingLeft: 5 }}>
                        <Input
                            onChangeText={text => handleOnchange(text, 'newPassword')}
                            onFocus={() => handleError(null, 'newPassword')}
                            iconName="lock-outline"
                            label="New Password"
                            placeholder="Enter your new Password"
                            password
                            error={errors.newPassword}


                        />
                    </View> : <></>}

                    {show ? <View style={{ marginTop: 20, width: width * 0.78, paddingLeft: 5 }}>
                        <Input
                            onChangeText={text => handleOnchange(text, 'reEnterPassword')}
                            onFocus={() => handleError(null, 'reEnterPassword')}
                            iconName="lock-outline"
                            label="Re-Enter new Password"
                            placeholder="Re-Enter your new Password"
                            password
                            error={errors.reEnterPassword}


                        />
                    </View> : <></>}

                    {show ? <View style={{ marginTop: 20, width: width * 0.60, paddingLeft: 60, marginBottom: 50 }}>
                        <Button onPress={validate} size="small" bordered color='#51cbcc' text="Update Password" type='filled' />
                    </View> : <></>}

                </View>
            </View>





        </View>
    )
}