import * as React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import COLORS from '../assets/colors';
import Social from 'react-native-vector-icons/FontAwesome';
const CheckBox = (props) => {
  const [checked, setChecked] = React.useState(false);
  const [checkedFb, setCheckedFb] = React.useState(false);
  const [checkedInsta, setCheckedInsta] = React.useState(false);

  return (<View style={{marginBottom:20}}>
       <Text style={style.label}>{props.label}</Text>
      <View style={{flexDirection:'row'}}> 
         <View style={{flexDirection:'row',alignItems:'center',marginLeft:5}}>
            <Social
             name='whatsapp'
             size={24}
             color='black'
            />
     <Checkbox
    
      status={checked ? 'checked' : 'unchecked'}
      
      onPress={() => {
          setChecked(!checked);
          props.setCheckedWhatsapp(checked?'':'whatapp')
      }}
    />
    </View>
    <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
            <Social
            name='facebook'
             size={24}
             color='black'
            />
     <Checkbox
    
      status={checkedFb ? 'checked' : 'unchecked'}
      
      onPress={() => {
        setCheckedFb(!checkedFb);
          props.setCheckedFb(checkedFb?'':'fb')
      }}
    />
    </View>
   
     <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
            <Social
            name='instagram'
             size={24}
             color='black'
            />
     <Checkbox
    
      status={checkedInsta ? 'checked' : 'unchecked'}
      
      onPress={() => {
        setCheckedInsta(!checkedInsta);
          props.setCheckedInsta(checkedInsta?'':'insta')
      }}
    />
    </View>
    </View>
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
    
    
    zIndex:2
  },
});



export default CheckBox;