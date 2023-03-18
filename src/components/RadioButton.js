import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import COLORS from '../assets/colors';
import Gender from 'react-native-vector-icons/FontAwesome';



const Radiobutton = ({inputs,setInputs,error, label,onFocus = () => { }}) => {
  return (
    <View style={{ marginBottom: 10 }}>
    <Text style={style.label}>{label}</Text>
       <View style={{ flexDirection: 'row', alignItems: 'center' }} >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
          <Gender
            name='male'
            size={24}
            color='black'
           />
          <RadioButton
            value="male"
            status={inputs.gender === 'male' ? 'checked' : 'unchecked'}
            onPress={() => {onFocus();
              setInputs((prev) => ({ ...prev, ['gender']: 'male' })) }}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
          <Gender
            name='female'
            size={24}
            color='black'
          />
          <RadioButton
           
            value="female"
            status={inputs.gender === 'female' ? 'checked' : 'unchecked'}
            onPress={() => {onFocus();
              setIsFocused(true);setInputs((prev) => ({ ...prev, ['gender']: 'female' })) }}
          />
        </View>
      </View>
      {error && (
        <Text style={{ marginTop: 7, color: 'red', fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: 55,
    backgroundColor: '#fff',
    flexDirection: 'row',


    zIndex: 2
  },
});

export default Radiobutton;
