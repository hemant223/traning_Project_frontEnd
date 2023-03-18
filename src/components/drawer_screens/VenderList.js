import React, { useEffect, useState } from 'react'
import { Text, View,Dimensions ,TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { ReadAll} from '../sqlite/Sql';
import MI from 'react-native-vector-icons/MaterialIcons'
const width = Dimensions.get('window').width;
const VenderList = (props) => {
    const [dataaa, setDataaa] = useState([])
     
   // Send the setter State state in the function
    useEffect(function(){
        ReadAll(setDataaa)
     
    },[])
    
    
    //Show the  Vendor List Data when data available in SQLite
     let getDta= dataaa.map((item,index)=>{
    return(
        <View style={{padding:15,backgroundColor:'#fff'}} key={index}>
        <View  style={{backgroundColor:'gray',alignItems:'center',padding:10}}>
        <Text>Vendor Id:  {item.vendor_id}</Text>
        <Text>Vendor Name:  {item.vendor_name}</Text>
        <Text>Demand: {item.demand}</Text>
        <Text>Demand Date: {item.demand_date}</Text>
        <Text>Remark: {item.remark}</Text>
        </View>
        </View>
       
    )
  })
 

  return (<View style={{backgroundColor:'#fff',height:'100%'}}> 
   
  <View style={{padding:15,marginLeft:2,flexDirection:'row'}}>
    <TouchableOpacity  onPress={() => props.navigation.goBack()}>
  <MI color="#000" name="keyboard-backspace" size={30} />
  </TouchableOpacity>
 
  <Text style={{fontSize:25,fontWeight:500,marginLeft:80}}>Vendor List</Text>
  </View>
  
  <ScrollView> 
      {getDta}
      </ScrollView> 
    </View>

  )
}

export default VenderList