import { View, Text, Dimensions, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Input from '../Input';
import Button from '../Button';
import DropDown from '../DropDown';
import { getStoreData, storeData } from '../storage/projectAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';




const width = Dimensions.get('window').width;

export default function AddVechile (props) {
    const [inputs, setInputs] = React.useState({
        vehicleId: '',
        price: '',
        offer: '',
         image: '',
    });

    console.log('imputssssss', inputs);

    const [vehicleCompany, setVehicleCompany] = useState('')
    const [model, setModel] = useState('')
    const [data12, setData12] = useState([]);
    

    const [errors, setErrors] = React.useState({});

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };


   //dummy Data
   const itemsOfCompany = ([
       { label: 'verna', value: 'verna' },
       { label: 'ciaz', value: 'ciaz' },
    ]);
    
    //dummy Data
    const itemsOfModel = ([
        { label: 'vernaSX', value: 'vernaSX', comp: 'verna' },
        { label: 'vernaIVT', value: 'vernaIVT', comp: 'verna' },
        { label: 'ciazSuv', value: 'ciazSuv', comp: 'ciaz' },
        { label: 'ciazSigma', value: 'ciazSigma', comp: 'ciaz' },

    ]);


// Filter car  thru compny
    const filteredData = (key) => {
        try {
            return itemsOfModel.filter((i) => {
                return i.comp == key
            })
        } catch (err) {
          
            console.log("Catch Error in line 57", err)
        }
    }



    useEffect(() => {
        try {
            const d = filteredData(vehicleCompany)
            setData12(d)
        } catch (err) {
            console.log("Catch Errror", err)
        }


    }, [vehicleCompany])



     // Check Validation  and store data in Asyncstorage
    const validateVehicle = async () => {
        inputs['vehicleCompany'] = vehicleCompany
        inputs['model'] = model
        console.log("inputs Data", inputs)
        try {
            const oldData = await getStoreData('vData');
            if (!oldData) {
                if (inputs.vehicleId == '') {
                    alert('please select first')
                } else {
                    await storeData('vData', [inputs])
                }
            }
            else if(  inputs.vehicleId == ''|| inputs.vehicleCompany == '' || inputs.model == '' || inputs.price == ''|| inputs.offer == '' ){
                alert('please input Details')
            }
            
            else  {
                oldData.push(inputs)
                await storeData('vData', oldData);
                alert(JSON.stringify(oldData))
            }
            
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#487eb0',zIndex:-1 }}>

            <View style={{ backgroundColor: '#487eb0', width: width * 0.90 }}>
                <Text style={{ fontSize: 30, fontWeight: '700', letterSpacing: 3, color: '#ffff' }}>Add vechicle</Text>
            </View>
            <ScrollView>
                <View style={{ marginVertical: 5, padding: 20, width: width * 0.9, backgroundColor: '#fff' }}>
                    <Input
                        keyboardType="numeric"
                        onChangeText={text => handleOnchange(text, 'vehicleId')}
                        onFocus={() => handleError(null, 'vehicleId')}
                        iconName="dots-grid"
                        label="vehicle Id"
                        placeholder="vehicle Id"
                        error={errors.vehicleId}
                    />
                      <View style={{zIndex:2}}>
                    <DropDown
                    
                        setDropValue={setVehicleCompany}
                        // filterfun={filterfun}
                        placeholder="Select car Compaany"
                        label="Car Company"
                        items={itemsOfCompany}
                    />

                        </View>
                    <Input
                        onChangeText={text => handleOnchange(text, 'price')}
                        onFocus={() => handleError(null, 'price')}
                        iconName="dolly"
                        label="Price"
                        placeholder="Price"
                        error={errors.price}
                    />
                     <View style={{zIndex:2}}>
                    <DropDown
                        setDropValue={setModel}
                        vehicleCompany={vehicleCompany}
                        placeholder="Select Model"
                        label="Model"
                        items={data12}

                    />
                    </View>
                    <Input
                        onChangeText={text => handleOnchange(text, 'offer')}
                        onFocus={() => handleError(null, 'offer')}
                        iconName="offer"
                        label="Offer"
                        placeholder="Enter your Offer"
                        error={errors.password}

                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'image')}
                        onFocus={() => handleError(null, 'image')}
                        iconName="image-area"
                        label="Image"
                        placeholder="Enter your Image"
                        error={errors.image}

                    />


                    <Button bordered color='#487eb0' text="Add Vehicle Data" type='filled' onPress={() => validateVehicle()} />

                </View>

            </ScrollView>
        </View>
    )
}

