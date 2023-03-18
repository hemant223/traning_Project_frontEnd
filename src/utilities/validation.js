import { Keyboard } from "react-native";
import { storeData } from "../components/storage/projectAsyncStorage";


// Validation of Registration page
export function validate(handleError, inputs,navigation) {
  Keyboard.dismiss();
  let isValid = true;

  if (!inputs.firstName) {
    handleError('Please input First Name', 'firstName');
    isValid = false;
  }
  if (!inputs.lastName) {
    handleError('Please input Last Name', 'lastName');
    isValid = false;
  }

  if (!inputs.mobileNumber || !inputs.mobileNumber.match(/\d{10}/)) {
    handleError('Please input phone number', 'mobileNumber');
    isValid = false;
  }

  if (!inputs.emailId) {
    handleError('Please input emailId', 'emailId');
    isValid = false;
  } else if (!inputs.emailId.match(/\S+@\S+\.\S+/)) {
    handleError('Please input a valid emailId', 'emailId');
    isValid = false;
  }

  if (!inputs.password) {
    handleError('Please input password', 'password');
    isValid = false;
  } else if (inputs.password.length < 5) {
    handleError('Min Prassword length of 5', 'password');
    isValid = false;
  }
  else if (!inputs.password.match(/^[0-9a-zA-Z]+$/)) {
    handleError('No special character allowed', 'password');
    isValid = false;
  }


  if (isValid) {
     storeData('userData', inputs)
     alert('Data Submitted...')
     console.log('validationnnnnnnn=', inputs)
     navigation.navigate('Login')
  }
};
