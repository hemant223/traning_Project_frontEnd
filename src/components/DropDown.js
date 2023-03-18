import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import COLORS from '../assets/colors';
import DropDownPicker from 'react-native-dropdown-picker';
const width = Dimensions.get('window').width;
const DropDown = ({
  items,
  error,
  label,
  placeholder,
  setDropValue,
  
}) => {

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [isFocused, setIsFocused] = React.useState(false);




  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
                ? '#51cbcc'
                : COLORS.light,
            alignItems: 'center',
          },
        ]}>
        <DropDownPicker
          placeholder={placeholder}
          textStyle={{
            fontSize: 15
          }}
          disabledStyle={{
            opacity: 0.9
          }}
          onChangeValue={(val) => {
            setDropValue(val)
          }}
          style={{ borderColor: error ? 'red' : '#000', color: COLORS.darkBlue, flex: 1, width: width * 0.80, justifyContent: 'center', backgroundColor: COLORS.light }}

          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
        />
      </View>
      {error && (
        <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>
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

export default DropDown;
