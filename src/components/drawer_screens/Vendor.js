import { Text, View,Dimensions,ScrollView,Keyboard} from 'react-native'
import React,{useEffect,useState} from 'react'
import Input from '../Input';
import { postData1 } from '../../assets/services/NodeServices';
import { createTable,insertRecord,ReadAll,deleteTable ,deleteTableRows} from '../sqlite/Sql';
import NetInfo from "@react-native-community/netinfo";
import Button from '../Button';
import moment from 'moment/moment';
const width = Dimensions.get('window').width;

const Vendor = (props) => {

    const [inputs, setInputs] = React.useState({
        vendor_id:'',
        vendor_name: '',
        demand: '',
        remark:''
    });
    var dmy = moment().format('MM/DD/YYYY');
    
    const [demand_date, setDate] = useState('')
    const [dateErr, setDateErr] = useState('')

    const handleChangeDate = () => {
        setDate(dmy)
        setDateErr(null)
    }

    const [refreshing, setRefreshing] = useState(false);
    const [netInfo, setNetInfo] = useState();
  

 

    useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetInfo(state.isConnected)  
    });
    return () => {
      // Unsubscribe to network state updates
      unsubscribe()
    };
  }, []);

  
 
    const [dataaa, setDataaa] = useState([])


  //this funtion send SQLite data on MSQL database when internet turn on
   const netData=()=>{
   dataaa.map((itm)=>{
          {itm}
    if(netInfo==true){
        postData1('adddata/add_new_vendor',itm) 
        setRefreshing(!refreshing); 
    }
  })
    }

 
   
     //In  this function deleteTableRows after 2 second
      useEffect(() => {
        setRefreshing(!refreshing);
        if(netInfo==true){
            setTimeout(() => {  
                deleteTableRows()
                setRefreshing(!refreshing)
            },2000)
        }
        netData()
      }, [dataaa])
   
     
      // this function create SQLite Table
    useEffect(function(){ 
        ReadAll(setDataaa) 
        createTable()
    },[])

 

    const [errors, setErrors] = React.useState({});
    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

   
    
   

   // submission of data as per the internet condition
   //  when internet turn on then data submit on MSQL database and turn off then data submit on SQLite
    const validation = async () => {
        Keyboard.dismiss();
        let isValid = true;
       
        if (!inputs.vendor_id) {
            handleError('Please input Vendor id', 'vendor_id');
            isValid = false;
        }

        if (!inputs.vendor_name) {
            handleError('Please input Vendor name', 'vendor_name');
            isValid = false;
        }

        if (!inputs.demand) {
            handleError('Please input Demand', 'demand');
            isValid = false;
        }

        // if (!inputs.demand_date) {
        //     handleError('Please input Demand date', 'demand_date');
        //     isValid = false;
        // }
        if (demand_date == '') {
            setDateErr('Please input Demand date')
            isValid = false;
        }

        if (!inputs.remark) {
            handleError('Please input Remark', 'remark');
            isValid = false;
        }

        if(isValid){
           
           var body={vendor_id:inputs.vendor_id,vendor_name:inputs.vendor_name,demand:inputs.demand,demand_date:demand_date,remark:inputs.remark}
           
           if(netInfo==false){
               insertRecord(body) 
               alert('Submit Data in SQLite')
               props.navigation.push('VenderList')

           }

         else if(netInfo==true){
           var result = await postData1('adddata/add_new_vendor', body)
            if (result.status) {
                alert('Submitted Data in Database')
            
            }
        
           }
        }

    }



       
    
 
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#487eb0', }}>

            <View style={{ backgroundColor: '#487eb0', width: width * 0.90 }}>
                <Text style={{ fontSize: 30, fontWeight: '700', letterSpacing: 3, color: '#ffff' }}>Vendor Details</Text>
            </View>
            <ScrollView>
                <View style={{ marginVertical: 5, padding: 20, width: width * 0.9, backgroundColor: '#fff' }}>
                
                    <Input
                        onChangeText={text => handleOnchange(text, 'vendor_id')}
                        onFocus={() => handleError(null, 'vendor_id')}
                        iconName="dots-grid"
                        label="Vendor Id"
                        placeholder="Vendor Id"
                        error={errors.vendor_id}
                    />
                  
                    <Input
                        onChangeText={text => handleOnchange(text, 'vendor_name')}
                        onFocus={() => handleError(null, 'vendor_name')}
                        iconName="dots-grid"
                        label="Vendor name"
                        placeholder="Vendor name"
                        error={errors.vendor_name}

                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'demand')}
                        onFocus={() => handleError(null, 'demand')}
                        iconName="basket-outline"
                        label="demand"
                        placeholder="damand"
                        error={errors.demand}

                    />
                    <Input
                         onFocus={() => {
                            handleChangeDate();
                        }}
                        value={demand_date}
                        error={dateErr}
                        iconName="update"
                        label="demand date"
                        placeholder="demand date"
                

                    />

                    <Input
                        onChangeText={text => handleOnchange(text, 'remark')}
                        onFocus={() => handleError(null, 'remark')}
                        iconName="dots-grid"
                        label="remark"
                        placeholder="remark"
                        error={errors.remark}

                    />
                    <Button bordered color='#487eb0' text="Submit" type='filled' onPress={() => validation()} />

                </View>

            </ScrollView>
        </View>

  )
}

export default Vendor

