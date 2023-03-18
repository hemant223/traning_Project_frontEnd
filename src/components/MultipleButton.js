import React from 'react';
import { Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useState } from 'react';
const width = Dimensions.get('window').width;

const MultipleButton = ({
  btntext1,
  btntext2,
  type = 'filled',
  bordered = false,
  canShow,
  btn1OnPress,
  btn2OnPress,
 
}) => {

const [bgColorBtn1, setbgColorBtn1] = useState('#000')
const [bgColorBtn2, setbgColorBtn2] = useState('#fff')

const handleBtn1=()=>{
    setbgColorBtn1('#000')
    setbgColorBtn2('#fff')
}

const handleBtn2=()=>{
    setbgColorBtn2('#000')
    setbgColorBtn1('#fff')
   
}

 
  const btnTextColor = type === 'filled' ? '#ffffff' : '#6371c2';
  const btnBorderRadius = bordered ? 30 : 5;



  const containerCommonStyle = {
    backgroundColor: bgColorBtn1,
    paddingVertical: 10,
    borderRadius: btnBorderRadius,
  };
  const containerCommonStyle1 = {
    paddingVertical: 10,
    borderRadius: btnBorderRadius,
    backgroundColor: bgColorBtn2,

  };

  const textCommonStyle = {
    color: btnTextColor,
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
  };

  const border = type === 'outlined' && {
    borderColor: '#e7e7e7',
    borderWidth: 2,
  };



  const ContainerDir = {
    padding: 5,
    flex:2
  }; 

  
  



  return (
    <View>
      <ScrollView>
        <View style={{  
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: 'center',
          width: width*0.95,
          height: '100%',
          flex:1
        }}>

         
              <View style={[ContainerDir]}  >
                <TouchableOpacity onPress={() => {
                  btn1OnPress();
                  handleBtn1();  }} activeOpacity={0.7}>
                  <View  style={[containerCommonStyle, border]}>
                    <Text style={[textCommonStyle]}> {btntext1} </Text>
                  </View>
                </TouchableOpacity>
              </View>
          
          {canShow && <View style={[ContainerDir]} >
                <TouchableOpacity  onPress={() => {handleBtn2(); btn2OnPress();}} activeOpacity={0.7}>
                  <View  style={[containerCommonStyle1, border]}>
                    <Text style={[textCommonStyle]}> {btntext2} </Text>
                  </View>
                </TouchableOpacity>
              </View>}
        </View>
      </ScrollView>
    </View>

  );
};

export default MultipleButton;

MultipleButton.defaultProps={
  btntext1:'btntext1',
  btntext2:'btntext2',
  canShow:false,
  btn1OnPress:()=>{},
  btn2OnPress:()=>{}
}


