import { View, Text, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import Button from '../Button';
import Input from '../Input';
import { validate } from '../../utilities/validation';

const width = Dimensions.get('window').width;

// Register the account
const Registration = ({navigation}) => {
    const [inputs, setInputs] = React.useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        emailId: '',
        password: '',


    });
    const [errors, setErrors] = React.useState({});

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };



    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#487eb0' }}>

            <View style={{ backgroundColor: '#487eb0', width: width * 0.90 }}>
                <Text style={{ fontSize: 30, fontWeight: '700', letterSpacing: 3, color: '#ffff' }}>Register</Text>
            </View>
            <ScrollView>
                <View style={{ marginVertical: 5, padding: 20, width: width * 0.9, backgroundColor: '#fff' }}>
                    <Input

                        onChangeText={text => handleOnchange(text, 'firstName')}
                        onFocus={() => handleError(null, 'firstName')}
                        iconName="dots-grid"
                        label=" First Name"
                        placeholder="First Name"
                        error={errors.firstName}
                    />

                    <Input

                        onChangeText={text => handleOnchange(text, 'lastName')}
                        onFocus={() => handleError(null, 'lastName')}
                        iconName="dots-grid"
                        label="Last Name"
                        placeholder="Last Name"
                        error={errors.lastName}
                    />

                    <Input
                        keyboardType="numeric"
                        onChangeText={text => handleOnchange(text, 'mobileNumber')}
                        onFocus={() => handleError(null, 'mobileNumber')}
                        iconName="dots-grid"
                        label="Mobile Number"
                        placeholder="Mobile Number"
                        error={errors.mobileNumber}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'emailId')}
                        onFocus={() => handleError(null, 'emailId')}
                        iconName="email-outline"
                        label=" email address"
                        placeholder="Enter your email address"
                        error={errors.emailId}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'password')}
                        onFocus={() => handleError(null, 'password')}
                        iconName="lock-outline"
                        label="Password"
                        placeholder="Enter your Password"
                        error={errors.password}
                        password
                    />


                    <Button bordered color='#487eb0' text="Register" type='filled' onPress={() => validate(handleError, inputs,navigation)} />

                </View>

            </ScrollView>
        </View>
    )
}

export default Registration