import { View, Text, Dimensions, StyleSheet, ScrollView, Image, Keyboard } from 'react-native'
import React, { useState, createRef } from 'react'
import Input from '../Input';
import Button1 from '../Button1';
import MultipleButton from '../MultipleButton';
import moment from 'moment/moment';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import SignatureCapture from 'react-native-signature-capture';
import FilePicker, { types } from 'react-native-document-picker';
import { postData } from '../../assets/services/NodeServices';
const width = Dimensions.get('window').width;


const Products = () => {

    const [inputs, setInputs] = React.useState({

        name_of_product: '',
        batch_no: '',
        batch_size: '',
        premix_no: '',
        water_premix_kg: '',
        oil_premix_kg: '',
        pasterurization_temp: '',
        homogenation_presure: '',
        ageing_tank_no: '',
        ageing_temp: '',
        ageing_chilling_temp: '',
        ageing_filling_temp: '',
        filling_start_temp: '',
        filling_start_weight_of_box: '',
        filling_start_top_temp: '',
        filling_start_bottom_temp: '',
        filling_end_end_temp: '',
        filling_end_total_packing_time: '',
        mental_detector__ss: '',
        mental_detector__non_ferous: '',
        mental_detector_ferous: '',
        mental_detector_total_damage: '',
        blast_freezing_blast_room_no: '',
        oprp_time: '',
        oprp_product_core_temp: '',
        oprp_cartoon_packed: '',
        oprp_total_kg: '',
        oprp_reference_sample: '',
        oprp_total_recovery: '',
        oprp_remarks: '',
    });
    const [errors, setErrors] = React.useState({});
    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    var hms = moment().format('h:mm:ss');
    var dmy = moment().format('MM/DD/YYYY');
    
    const [date, setDate] = useState('')
    const [dateErr, setDateErr] = useState('')

    const [batch_start_time, setBatchStartTime] = useState('')
    const [batchStartErr, setBatchStartErr] = useState('')

    const [pasterurization_from, setFrom] = useState('')
    const [fromErr, setFromErr] = useState('')

    const [pasterurization_to, setTo] = useState('')
    const [toErr, setToErr] = useState('')

    const [magnetic_filteration_checkedAt, setCheckedAt] = useState('')
    const [checkedAtErr, setCheckedAtErr] = useState('')

    const [homogenation_start_time, setHomoStartTime] = useState('')
    const [homoStartTimeErr, setHomoStartTimeErr] = useState('')

    const [homogenation_end_time, setHomoEndTime] = useState('')
    const [homoEndTimeErr, setHomoEndTimeErr] = useState('')

    const [filling_start_time, setFillStartTime] = useState('')
    const [fillStartTimeErr, setFillStartTimeErr] = useState('')

    const [filling_end_end_time, setFillEndTime] = useState('')
    const [fillEndTimeErr, setFillEndTimeErr] = useState('')

    const [mental_detector_checked_at, setMCheckedAt] = useState('')
    const [mCheckedAtErr, setMCheckedAtErr] = useState('')

    const [blast_freezing_start_time, setblfStartTime] = useState('')
    const [blfStartTimeErr, setblfStartTimeErr] = useState('')

    const [blast_freezing_end_time, setblfEndTime] = useState('')
    const [blfEndTimeErr, setblfEndTimeErr] = useState('')

   

    const [imageUri, setImageUri] = useState([])


    //Open Camera  when click on Camera Button
    const openCamera = () => {

        let options = {
            storageOption: {
                path: 'images',
                mediaType: 'photo'
            },
            includeBase64: true,
        };

        launchCamera(options, (response => {
            console.log('Response', response)
            if (response.didCancel) {
                console.log('User Cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button', response.customButton);
            } else {
                const source = { base64: 'data:image/jpeg;base64,' + response.assets[0].base64, name: response.assets[0].fileName, type: response.assets[0].type, uri: response.assets[0].uri }
                setImageUri([...imageUri, source])
            }

        }));
    }


    //Open Gallery  when click on Camera Button
    const openGallery = () => {
        let options = {
            storageOption: {
                path: 'images',
                mediaType: 'photo'
            },
            includeBase64: true,
        };
        launchImageLibrary(options, (response => {
            console.log('Response', response);
            if (response.didCancel) {
                console.log('User Cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button', response.customButton);
            } else {
                const source = { base64: 'data:image/jpeg;base64,' + response.assets[0].base64, name: response.assets[0].fileName, type: response.assets[0].type, uri: response.assets[0].uri }
                setImageUri([...imageUri, source])
            }
        }))

    }



//  handle the states for automatic fill date when onfocus
    const handleChangeDate = () => {
        setDate(dmy)
        setDateErr(null)
    }
    const handleChangeBatchStartTime = () => {
        setBatchStartTime(hms)
        setBatchStartErr(null)
    }

    const handleChangeFrom = () => {
        setFrom(hms)
        setFromErr(null)
    }

    const handleChangeTo = () => {
        setTo(hms)
        setToErr(null)
    }
    const handleChangeCheckedAt = () => {
        setCheckedAt(hms)
        setCheckedAtErr(null)
    }
    const handleChangeHomoStartTime = () => {
        setHomoStartTime(hms)
        setHomoStartTimeErr(null)
    }
    const handleChangeHomoEndTime = () => {
        setHomoEndTime(hms)
        setHomoEndTimeErr(null)
    }
    const handleChangeFillStartTime = () => {
        setFillStartTime(hms)
        setFillStartTimeErr(null)
    }
    const handleChangeFillEndTime = () => {
        setFillEndTime(hms)
        setFillEndTimeErr(null)
    }
    const handleChangeMCheckedAt = () => {
        setMCheckedAt(hms)
        setMCheckedAtErr(null)
    }
    const handleChangeblfStartTime = () => {
        setblfStartTime(hms)
        setblfStartTimeErr(null)
    }
    const handleChangeblfEndTime = () => {
        setblfEndTime(hms)
        setblfEndTimeErr(null)
    }




    const [fileData, setFileData] = useState([])
   
    //Handle button of Attachment file
    const handleFilePicker = async () => {
        try {
            const response = await FilePicker.pick({
                presentationStyle: 'fullScreen',
                allowMultiSelection: true,
                type: [types.images, types.video, types.pdf]
            })
            setFileData(response)
            console.log(response);

        } catch (err) {
            console.log(err);
        }
    }


    const [blast_freezing_supervisior_sign, setBlast_freezing_supervisior_sign] = useState({})

    const sign = createRef()

    const saveSign = () => {
        sign.current.saveImage()
    }

    const resetSign = () => {
        sign.current.resetImage()
    }


    const _onSaveEvent = (result) => {
        //result.encoded -  for the base64 encoded png
        //result.pathName -  for the fill path name
        console.log(result.encoded);
        setBlast_freezing_supervisior_sign({ name: "signature" + Date.now() + ".png", type: "image/png", uri: "data:image/jpeg;base64," + result.encoded })
    }

    const _onDragEvent = () => {
        //This callback will be called ehen the user enters signature
        console.log("dragged");
    }



//  This function for check the validation and Submission of data 
    const validation = async () => {
        Keyboard.dismiss();
        let isValid = true;

        if (date == '') {
            setDateErr('please input Time')
            isValid = false;
        }
        if (batch_start_time == '') {
            setBatchStartErr('please input any batch Start Time')
            isValid = false;
        }
        if (pasterurization_from == '') {
            setFromErr('please input From')
            isValid = false;
        }
        if (pasterurization_to == '') {
            setToErr('please input to')
            isValid = false;
        }
        if (magnetic_filteration_checkedAt == '') {
            setCheckedAtErr('please input Checked At')
            isValid = false;
        }
        if (homogenation_start_time == '') {
            setHomoStartTimeErr('please input Start Time')
            isValid = false;
        }
        if (homogenation_end_time == '') {
            setHomoEndTimeErr('please input End Time')
            isValid = false;
        }
        if (filling_start_time == '') {
            setFillStartTimeErr('please input Start Time')
            isValid = false;
        }
        if (filling_end_end_time == '') {
            setFillEndTimeErr('please input End Time')
            isValid = false;
        }

        if (mental_detector_checked_at == '') {
            setMCheckedAtErr('please input Checked At')
            isValid = false;
        }
        if (blast_freezing_start_time == '') {
            setblfStartTimeErr('please input Start Time')
            isValid = false;
        }
        if (blast_freezing_end_time == '') {
            setblfEndTimeErr('please input End Time')
            isValid = false;
        }


        if (!inputs.name_of_product) {
            handleError('Please input Name of Product', 'name_of_product');
            isValid = false;
        }
        if (!inputs.batch_no) {
            handleError('Please input Batch No', 'batch_no');
            isValid = false;
        }

        if (!inputs.batch_size) {
            handleError('Please input Batch Size', 'batch_size');
            isValid = false;
        }
        if (!inputs.premix_no) {
            handleError('Please input Premix No', 'premix_no');
            isValid = false;
        }

        if (!inputs.water_premix_kg) {
            handleError('Please input Water Premix kg', 'water_premix_kg');
            isValid = false;
        }

        if (!inputs.oil_premix_kg) {
            handleError('Please input Oil Premix kg', 'oil_premix_kg');
            isValid = false;
        }
        
        if (!inputs.pasterurization_temp) {
            handleError('Please input Temp', 'pasterurization_temp');
            isValid = false;
        }

      

        if (!inputs.homogenation_presure) {
            handleError('Please input Pressure', 'homogenation_presure');
            isValid = false;
        }

        if (!inputs.ageing_tank_no) {
            handleError('Please input Pressure', 'ageing_tank_no');
            isValid = false;
        }

        if (!inputs.ageing_temp) {
            handleError('Please input Temp', 'ageing_temp');
            isValid = false;
        }

        if (!inputs.ageing_chilling_temp) {
            handleError('Please input chilling Temp', 'ageing_chilling_temp');
            isValid = false;
        }

        if (!inputs.ageing_filling_temp) {
            handleError('Please input filling Temp', 'ageing_filling_temp');
            isValid = false;
        }
       

        if (!inputs.filling_start_temp) {
            handleError('Please input filling Temp', 'filling_start_temp');
            isValid = false;
        }

        if (!inputs.filling_start_weight_of_box) {
            handleError('Please input Weight of Box', 'filling_start_weight_of_box');
            isValid = false;
        }

        if (!inputs.filling_start_top_temp) {
            handleError('Please input Top Temp', 'filling_start_top_temp');
            isValid = false;
        }

        if (!inputs.filling_start_bottom_temp) {
            handleError('Please input Top Temp', 'filling_start_bottom_temp');
            isValid = false;
        }

    

        if (!inputs.filling_end_end_temp) {
            handleError('Please input End Temp', 'filling_end_end_temp');
            isValid = false;
        }

        if (!inputs.filling_end_total_packing_time) {
            handleError('Please input Total Time Packing', 'filling_end_total_packing_time');
            isValid = false;
        }


        if (!inputs.mental_detector__ss) {
            handleError('Please input SS', 'mental_detector__ss');
            isValid = false;
        }

        if (!inputs.mental_detector__non_ferous) {
            handleError('Please input NOn Ferous', 'mental_detector__non_ferous');
            isValid = false;
        }

        if (!inputs.mental_detector_ferous) {
            handleError('Please input  Ferous', 'mental_detector_ferous');
            isValid = false;
        }

        if (!inputs.mental_detector_total_damage) {
            handleError('Please input  Total Damage', 'mental_detector_total_damage');
            isValid = false;
        }

        if (!inputs.blast_freezing_blast_room_no) {
            handleError('Please input  Blast Room No', 'blast_freezing_blast_room_no');
            isValid = false;
        }

      

        if (!inputs.oprp_time) {
            handleError('Please input  OPRP-2', 'oprp_time');
            isValid = false;
        }

        if (!inputs.oprp_product_core_temp) {
            handleError('Please input Product Core Temp', 'oprp_product_core_temp');
            isValid = false;
        }

        if (!inputs.oprp_cartoon_packed) {
            handleError('Please input C. Packed', 'oprp_cartoon_packed');
            isValid = false;
        }

        if (!inputs.oprp_total_kg) {
            handleError('Please input Total kg', 'oprp_total_kg');
            isValid = false;
        }

        if (!inputs.oprp_reference_sample) {
            handleError('Please input Reference Sample', 'oprp_reference_sample');
            isValid = false;
        }

        if (!inputs.oprp_total_recovery) {
            handleError('Please input Total Recovery', 'oprp_total_recovery');
            isValid = false;
        }

        if (!inputs.oprp_remarks) {
            handleError('Please input remarks', 'oprp_remarks');
            isValid = false;
        }

        if (isValid) {
           
            var formData = new FormData()
            formData.append('date', date)
            formData.append('name_of_product', inputs.name_of_product)
            formData.append('batch_no', inputs.batch_no)
            formData.append('batch_size', inputs.batch_size)
            formData.append('premix_no', inputs.premix_no)
            formData.append('water_premix_kg', inputs.water_premix_kg)
            formData.append('oil_premix_kg', inputs.oil_premix_kg)
            formData.append('batch_start_time', batch_start_time)
            formData.append('pasterurization_from', pasterurization_from)
            formData.append('pasterurization_to', pasterurization_to)
            formData.append('pasterurization_temp', inputs.pasterurization_temp)
            formData.append('magnetic_filteration_checkedAt', magnetic_filteration_checkedAt)
            formData.append('homogenation_start_time', homogenation_start_time)
            formData.append('homogenation_end_time', homogenation_end_time)
            formData.append('homogenation_presure', inputs.homogenation_presure)
            formData.append('ageing_tank_no', inputs.ageing_tank_no)
            formData.append('ageing_temp', inputs.ageing_temp)
            formData.append('ageing_chilling_temp', inputs.ageing_chilling_temp)
            formData.append('ageing_filling_temp', inputs.ageing_filling_temp)
            formData.append('filling_start_time', filling_start_time)
            formData.append('filling_start_temp', inputs.filling_start_temp)
            formData.append('filling_start_weight_of_box', inputs.filling_start_weight_of_box)
            formData.append('filling_start_top_temp', inputs.filling_start_top_temp)
            formData.append('filling_start_bottom_temp', inputs.filling_start_bottom_temp)
            formData.append('filling_end_end_time', filling_end_end_time)
            formData.append('filling_end_end_temp', inputs.filling_end_end_temp)
            formData.append('filling_end_total_packing_time', inputs.filling_end_total_packing_time)
            formData.append('mental_detector_checked_at', mental_detector_checked_at)
            formData.append('mental_detector__ss', inputs.mental_detector__ss)
            formData.append('mental_detector__non_ferous', inputs.mental_detector__non_ferous)
            formData.append('mental_detector_ferous', inputs.mental_detector_ferous)
            formData.append('mental_detector_total_damage', inputs.mental_detector_total_damage)
            formData.append('blast_freezing_blast_room_no', inputs.blast_freezing_blast_room_no)
            formData.append('blast_freezing_start_time', blast_freezing_start_time)
            formData.append('blast_freezing_end_time', blast_freezing_end_time)
            formData.append('oprp_time', inputs.oprp_time)
            formData.append('oprp_product_core_temp', inputs.oprp_product_core_temp)
            formData.append('oprp_cartoon_packed', inputs.oprp_cartoon_packed)
            formData.append('oprp_total_kg', inputs.oprp_total_kg)
            formData.append('oprp_reference_sample', inputs.oprp_reference_sample)
            formData.append('oprp_total_recovery', inputs.oprp_total_recovery)
            formData.append('oprp_remarks', inputs.oprp_remarks)

            imageUri.map((item, i) => {
                console.log('mapitem_line no580', item);
                formData.append('pictures', {
                    name: item.name,
                    type: item.type,
                    uri: item.uri,
                })
            })

            fileData.map(item => {
                formData.append('attachments', {
                    ...item,
                })
            })

            if (blast_freezing_supervisior_sign) {
                formData.append(
                    'blast_freezing_supervisior_sign',
                    blast_freezing_supervisior_sign
                )
            }
                   console.log('formDataaaa',formData);
            var result = await postData('adddata/add', formData)
            if (result.status) {
                alert('Submitted Data')
            }
        }

    }



    return (<>
        <View style={{ width: width, height: 100, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <Image source={require('../../assets/images/procuctlogo.png')} style={{ width: 300, height: 150, resizeMode: 'contain' }} />
        </View>


        <ScrollView>
            <Text style={{ fontSize: 20, fontWeight: '600', paddingLeft: 15, paddingBottom: 5 }}>Products Detail</Text>
            <View style={{ alignItems: 'center' }}>
                <View style={[styles.box, styles.boxShadow, styles.elevation]}>
                    <Input
                        onFocus={() => {
                            handleChangeDate();
                        }}
                        value={date}
                        error={dateErr}
                        iconName="update"
                        label="Date"
                        placeholder="Date"
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'name_of_product')}
                        onFocus={() => handleError(null, 'name_of_product')}
                        error={errors.name_of_product}
                        iconName="basket-outline"
                        label="Name of Product"
                        placeholder="Name of Product"
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'batch_no')}
                        onFocus={() => handleError(null, 'batch_no')}
                        error={errors.batch_no}
                        iconName="badge-account"
                        label="Batch  Number"
                        placeholder="Batch Number"
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: width * 0.43 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'batch_size')}
                                onFocus={() => handleError(null, 'batch_size')}
                                error={errors.batch_size}
                                iconName="badge-account"
                                label="Batch  Size"
                                placeholder="Batch Size"
                            />
                        </View>
                        <View style={{ width: width * 0.43, marginLeft: 5 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'premix_no')}
                                onFocus={() => handleError(null, 'premix_no')}
                                error={errors.premix_no}
                                iconName="bat"
                                label="Premix  Number"
                                placeholder="Premix No."
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: width * 0.43 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'water_premix_kg')}
                                onFocus={() => handleError(null, 'water_premix_kg')}
                                error={errors.water_premix_kg}
                                iconName="weight-kilogram"
                                label="Water Premix kg"
                                placeholder="W. Premix kg"
                            />
                        </View>
                        <View style={{ width: width * 0.43, marginLeft: 5 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'oil_premix_kg')}
                                onFocus={() => handleError(null, 'oil_premix_kg')}
                                error={errors.oil_premix_kg}
                                iconName="weight-kilogram"
                                label="Oil Premix kg"
                                placeholder="Oil Premix kg"
                            />
                        </View>
                    </View>
                    <Input
                        onFocus={() => handleChangeBatchStartTime()}
                        value={batch_start_time}
                        error={batchStartErr}
                        iconName="update"
                        label="Batch Start Time"
                        placeholder="Batch Start Time"
                    />

                </View>
            </View>



            <Text style={{ fontSize: 20, fontWeight: '600', paddingLeft: 15, paddingBottom: 5, paddingTop: 10 }}>Pasterurization</Text>
            <View style={{ alignItems: 'center' }}>
                <View style={[styles.box, styles.boxShadow, styles.elevation]}>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: width * 0.43 }}>
                            <Input
                                onFocus={() => handleChangeFrom()}
                                value={pasterurization_from}
                                iconName="update"
                                label="From"
                                error={fromErr}
                                placeholder="From"
                            />
                        </View>
                        <View style={{ width: width * 0.43, marginLeft: 5 }}>
                            <Input
                                onFocus={() => handleChangeTo()}
                                value={pasterurization_to}
                                error={toErr}
                                iconName="update"
                                label="To"
                                placeholder="To"
                            />
                        </View>
                    </View>
                    <Input
                        onChangeText={text => handleOnchange(text, 'pasterurization_temp')}
                        onFocus={() => handleError(null, 'pasterurization_temp')}
                        error={errors.pasterurization_temp}
                        iconName="oil-temperature"
                        label="Temp"
                        placeholder="Temp"
                    />

                </View>
            </View>




            <Text style={{ fontSize: 20, fontWeight: '600', paddingLeft: 15, paddingBottom: 5, paddingTop: 10 }}>Magnetic Filteration</Text>
            <View style={{ alignItems: 'center' }}>
                <View style={[styles.box, styles.boxShadow, styles.elevation]}>


                    <Input
                        onFocus={() => handleChangeCheckedAt()}
                        value={magnetic_filteration_checkedAt}
                        error={checkedAtErr}
                        iconName="update"
                        label="Checked At"
                        placeholder="Checked At"
                    />

                </View>
            </View>


            <Text style={{ fontSize: 20, fontWeight: '600', paddingLeft: 15, paddingBottom: 5, paddingTop: 10 }}>Magnet Present</Text>
            <View style={{ alignItems: 'center' }}>
                <View style={[styles.box1, styles.boxShadow, styles.elevation]}>


                    <MultipleButton
                        canShow

                        btn1OnPress={() => { alert('Yes') }}
                        btn2OnPress={() => { alert('No') }}
                        btntext1='Yes'
                        btntext2='No'
                        type='outlined'
                        bordered
                  

                    />
                </View>
            </View>


            <Text style={{ fontSize: 20, fontWeight: '600', paddingLeft: 15, paddingBottom: 5, paddingTop: 10 }}>Strainer Condition</Text>
             <View style={{ alignItems: 'center' }}>
                <View style={[styles.box1, styles.boxShadow, styles.elevation]}>


                    <MultipleButton
                        canShow
                        btn1OnPress={ () => { alert('Ok') } }
                        btn2OnPress={ () => { alert('Not Ok') } }
                        btntext1='Ok'
                        btntext2='Not Ok'
                        type='outlined'
                        bordered
                    />
                </View>
            </View>





            <Text style={{ fontSize: 20, fontWeight: '600', paddingLeft: 15, paddingBottom: 5, paddingTop: 10 }}>Homogenation</Text>
            <View style={{ alignItems: 'center' }}>
                <View style={[styles.box, styles.boxShadow, styles.elevation]}>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: width * 0.43 }}>
                            <Input
                                onFocus={() => handleChangeHomoStartTime()}
                                value={homogenation_start_time}
                                error={homoStartTimeErr}
                                iconName="update"
                                label="Start time"
                                placeholder="Start time"
                            />
                        </View>
                        <View style={{ width: width * 0.43, marginLeft: 5 }}>
                            <Input
                                onFocus={() => handleChangeHomoEndTime()}
                                value={homogenation_end_time}
                                error={homoEndTimeErr}
                                iconName="update"
                                label="End time"
                                placeholder="End time"
                            />
                        </View>
                    </View>
                    <Input
                        onChangeText={text => handleOnchange(text, 'homogenation_presure')}
                        onFocus={() => handleError(null, 'homogenation_presure')}
                        error={errors.homogenation_presure}
                        iconName="car-brake-low-pressure"
                        label="Pressure"
                        placeholder="Pressure"
                    />

                </View>
            </View>





            <Text style={{ fontSize: 20, fontWeight: '600', paddingLeft: 15, paddingBottom: 5, paddingTop: 10 }}>Ageing</Text>
            <View style={{ alignItems: 'center' }}>
                <View style={[styles.box, styles.boxShadow, styles.elevation]}>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: width * 0.43 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'ageing_tank_no')}
                                onFocus={() => handleError(null, 'ageing_tank_no')}
                                error={errors.ageing_tank_no}
                                iconName="bat"
                                label="Tank No."
                                placeholder="Tank No."
                            />
                        </View>
                        <View style={{ width: width * 0.43, marginLeft: 5 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'ageing_temp')}
                                onFocus={() => handleError(null, 'ageing_temp')}
                                error={errors.ageing_temp}
                                iconName="oil-temperature"
                                label="Temp"
                                placeholder="Temp"
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: width * 0.43 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'ageing_chilling_temp')}
                                onFocus={() => handleError(null, 'ageing_chilling_temp')}
                                error={errors.ageing_chilling_temp}
                                iconName="oil-temperature"
                                label="Chilling Temp"
                                placeholder="Chilling Temp"
                            />
                        </View>
                        <View style={{ width: width * 0.43, marginLeft: 5 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'ageing_filling_temp')}
                                onFocus={() => handleError(null, 'ageing_filling_temp')}
                                error={errors.ageing_filling_temp}
                                iconName="oil-temperature"
                                label="Filling Temp"
                                placeholder="Filling Temp"
                            />
                        </View>
                    </View>

                </View>
            </View>





            <Text style={{ fontSize: 20, fontWeight: '600', paddingLeft: 15, paddingBottom: 5, paddingTop: 10 }}>Filling Start</Text>
            <View style={{ alignItems: 'center' }}>
                <View style={[styles.box, styles.boxShadow, styles.elevation]}>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: width * 0.43 }}>
                            <Input
                                onFocus={() => handleChangeFillStartTime()}
                                value={filling_start_time}
                                error={fillStartTimeErr}
                                iconName="update"
                                label="Time"
                                placeholder="Time"
                            />
                        </View>
                        <View style={{ width: width * 0.43, marginLeft: 5 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'filling_start_temp')}
                                onFocus={() => handleError(null, 'filling_start_temp')}
                                error={errors.filling_start_temp}
                                iconName="oil-temperature"
                                label="Temp"
                                placeholder="Temp"
                            />
                        </View>
                    </View>
                    <Input
                        onChangeText={text => handleOnchange(text, 'filling_start_weight_of_box')}
                        onFocus={() => handleError(null, 'filling_start_weight_of_box')}
                        error={errors.filling_start_weight_of_box}
                        iconName="dots-grid"
                        label="Weight of Box"
                        placeholder="Weight of Box"
                    />

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: width * 0.43 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'filling_start_top_temp')}
                                onFocus={() => handleError(null, 'filling_start_top_temp')}
                                error={errors.filling_start_top_temp}
                                iconName="oil-temperature"
                                label="Top Temp"
                                placeholder="Top Temp"
                            />
                        </View>
                        <View style={{ width: width * 0.43, marginLeft: 5 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'filling_start_bottom_temp')}
                                onFocus={() => handleError(null, 'filling_start_bottom_temp')}
                                error={errors.filling_start_bottom_temp}
                                iconName="oil-temperature"
                                label="Bottom Temp"
                                placeholder="Bottom Temp"
                            />
                        </View>
                    </View>

                </View>
            </View>





            <Text style={{ fontSize: 20, fontWeight: '600', paddingLeft: 15, paddingBottom: 5, paddingTop: 10 }}>Filling End</Text>
            <View style={{ alignItems: 'center' }}>
                <View style={[styles.box, styles.boxShadow, styles.elevation]}>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: width * 0.43 }}>
                            <Input
                                onFocus={() => handleChangeFillEndTime()}
                                value={filling_end_end_time}
                                error={fillEndTimeErr}
                                iconName="update"
                                label="End time"
                                placeholder="End time"
                            />
                        </View>
                        <View style={{ width: width * 0.43, marginLeft: 5 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'filling_end_end_temp')}
                                onFocus={() => handleError(null, 'filling_end_end_temp')}
                                error={errors.filling_end_end_temp}
                                iconName="update"
                                label="End Temp"
                                placeholder="End Temp"
                            />
                        </View>
                    </View>
                    <Input
                        onChangeText={text => handleOnchange(text, 'filling_end_total_packing_time')}
                        onFocus={() => handleError(null, 'filling_end_total_packing_time')}
                        error={errors.filling_end_total_packing_time}
                        iconName="dots-grid"
                        label="Total Packing Time"
                        placeholder="Total Packing Time"
                    />

                </View>
            </View>






            <Text style={{ fontSize: 20, fontWeight: '600', paddingLeft: 15, paddingBottom: 5, paddingTop: 10 }}>Metal Detector</Text>
            <View style={{ alignItems: 'center' }}>
                <View style={[styles.box, styles.boxShadow, styles.elevation]}>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: width * 0.43 }}>
                            <Input
                                onFocus={() => handleChangeMCheckedAt()}
                                value={mental_detector_checked_at}
                                error={mCheckedAtErr}
                                iconName="update"
                                label="Checked At"
                                placeholder="Checked At"
                            />
                        </View>
                        <View style={{ width: width * 0.43, marginLeft: 5 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'mental_detector__ss')}
                                onFocus={() => handleError(null, 'mental_detector__ss')}
                                error={errors.mental_detector__ss}
                                iconName="bat"
                                label="SS"
                                placeholder="SS"
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: width * 0.43 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'mental_detector__non_ferous')}
                                onFocus={() => handleError(null, 'mental_detector__non_ferous')}
                                error={errors.mental_detector__non_ferous}
                                iconName="bat"
                                label="Non Ferous"
                                placeholder="Non Ferous"
                            />
                        </View>
                        <View style={{ width: width * 0.43, marginLeft: 5 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'mental_detector_ferous')}
                                onFocus={() => handleError(null, 'mental_detector_ferous')}
                                error={errors.mental_detector_ferous}
                                iconName="bat"
                                label="Ferous"
                                placeholder="Ferous"
                            />
                        </View>
                    </View>

                    <Input
                        onChangeText={text => handleOnchange(text, 'mental_detector_total_damage')}
                        onFocus={() => handleError(null, 'mental_detector_total_damage')}
                        error={errors.mental_detector_total_damage}
                        iconName="dots-grid"
                        label="Total Damage"
                        placeholder="Total Damage"
                    />

                </View>
            </View>





            <Text style={{ fontSize: 20, fontWeight: '600', paddingLeft: 15, paddingBottom: 5, paddingTop: 10 }}>Blast Freezing</Text>
            <View style={{ alignItems: 'center' }}>
                <View style={[styles.box, styles.boxShadow, styles.elevation]}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'blast_freezing_blast_room_no')}
                        onFocus={() => handleError(null, 'blast_freezing_blast_room_no')}
                        error={errors.blast_freezing_blast_room_no}
                        iconName="dots-grid"
                        label="Blast Room No."
                        placeholder="Blast Room No."
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: width * 0.43 }}>
                            <Input
                                onFocus={() => handleChangeblfStartTime()}
                                value={blast_freezing_start_time}
                                error={blfStartTimeErr}                     
                                iconName="update"
                                label="Start time"
                                placeholder="Start time"
                            />
                        </View>
                        <View style={{ width: width * 0.43, marginLeft: 5 }}>
                            <Input
                                onFocus={() => handleChangeblfEndTime()}
                                value={blast_freezing_end_time}
                                error={blfEndTimeErr}
                                iconName="update"
                                label="End time"
                                placeholder="End time"
                            />
                        </View>
                    </View>


                </View>
            </View>





            <Text style={{ fontSize: 20, fontWeight: '600', paddingLeft: 15, paddingBottom: 5, paddingTop: 10 }}>OPRP-2</Text>
            <View style={{ alignItems: 'center' }}>
                <View style={[styles.box, styles.boxShadow, styles.elevation]}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'oprp_time')}
                        onFocus={() => handleError(null, 'oprp_time')}
                        error={errors.oprp_time}
                        iconName="update"
                        label="Time"
                        placeholder="Time"
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'oprp_product_core_temp')}
                        onFocus={() => handleError(null, 'oprp_product_core_temp')}
                        error={errors.oprp_product_core_temp}
                        iconName="dots-grid"
                        label="Product Core Temperature"
                        placeholder="Product Core Temperature"
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: width * 0.43 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'oprp_cartoon_packed')}
                                onFocus={() => handleError(null, 'oprp_cartoon_packed')}
                                error={errors.oprp_cartoon_packed}
                                iconName="bat"
                                label="Cartoon Packed"
                                placeholder="C. Packed"
                            />
                        </View>
                        <View style={{ width: width * 0.43, marginLeft: 5 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'oprp_total_kg')}
                                onFocus={() => handleError(null, 'oprp_total_kg')}
                                error={errors.oprp_total_kg}
                                iconName="bat"
                                label="Total Kg"
                                placeholder="Total Kg"
                            />
                        </View>
                    </View>
                    <Input
                        onChangeText={text => handleOnchange(text, 'oprp_reference_sample')}
                        onFocus={() => handleError(null, 'oprp_reference_sample')}
                        error={errors.oprp_reference_sample}
                        iconName="dots-grid"
                        label="Reference Sample"
                        placeholder="Reference Sample"
                    />

                    <Input
                        onChangeText={text => handleOnchange(text, 'oprp_total_recovery')}
                        onFocus={() => handleError(null, 'oprp_total_recovery')}
                        error={errors.oprp_total_recovery}
                        iconName="dots-grid"
                        label="Total Recovery"
                        placeholder="Total Recovery"
                    />

                    <Input
                        onChangeText={text => handleOnchange(text, 'oprp_remarks')}
                        onFocus={() => handleError(null, 'oprp_remarks')}
                        error={errors.oprp_remarks}
                        iconName="dots-grid"
                        label="Remarks"
                        placeholder="Remarks"
                    />


                </View>
            </View>





            <Text style={{ fontSize: 20, fontWeight: '600', paddingLeft: 15, paddingBottom: 5, paddingTop: 10 }}>Upload Image...</Text>
            <View style={{ alignItems: 'center' }}>
                <View style={[styles.box, styles.boxShadow, styles.elevation]}>

                    <View style={{ flexDirection: 'row' }}>

                        <View>
                            <Button1
                                onPress={() => { openCamera() }}
                                size='small'
                                color='#487eb0'
                                text="Take"
                                type='filled'
                            />
                        </View>



                        <View style={{ marginLeft: 10 }}>
                            <Button1
                                onPress={() => openGallery()}
                                color='#487eb0'
                                text="Gallery"
                                type='filled'
                                size='small'
                            />
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        {imageUri.map((item, index) => {
                            return (
                                <Image
                                    source={{ uri: item.base64 }}
                                    style={{ height: 80, width: 80, borderRadius: 100, borderWidth: 1, borderColor: 'black', marginRight: (index + 1) % 4 == 0 ? 0 : 28, marginTop: (index + 1) > 4 == 0 ? 0 : 28 }}
                                />)
                        })

                        }
                    </View>
                </View>
            </View>






            <Text style={{ fontSize: 20, fontWeight: '600', paddingLeft: 15, paddingBottom: 5, paddingTop: 10 }}>Signature Here...</Text>
            <View style={{ alignItems: 'center' }}>
                <View style={[styles.box, styles.boxShadow, styles.elevation]}>
                    <View style={{
                        width: width * 0.87,
                        height: 500,
                        borderColor: '#000',
                        borderWidth: 3,
                        marginBottom: 10
                    }}>

                        <SignatureCapture
                            style={{ flex: 1, borderColor: '#000', borderWidth: 3, width: width * 0.80, height: 500 }}
                            ref={sign}
                            onSaveEvent={_onSaveEvent}
                            onDragEvent={_onDragEvent}
                            showNativeButtons={false}

                            showTitleLabel={false}
                            //   backgroundColor="#fff"
                            //   strokeColor="#000"
                            minStrokeWidth={4}
                            maxStrokeWidth={4}
                            viewMode={"portrait"}
                        />




                    </View>


                    <View style={{ flexDirection: 'row' }}>

                        <View>
                            <Button1
                                onPress={() => { saveSign() }}
                                size='small'
                                color='#487eb0'
                                text="Save"
                                type='filled'
                            />
                        </View>


                        <View style={{ marginLeft: 10 }}>
                            <Button1
                                onPress={() => { resetSign() }}
                                color='#487eb0'
                                text="Reset"
                                type='filled'
                                size='small'
                            />
                        </View>

                    </View>
                </View>
            </View>





            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <View style={[styles.box, styles.boxShadow, styles.elevation]}>


                    <View style={{ marginLeft: 20 }}>
                        <Button1
                            onPress={() => { handleFilePicker() }}
                            color='#487eb0'
                            text="Attachment"
                            type='filled'
                        />
                    </View>
                    <View>
                        {fileData.length > 0 ? fileData.map((ls, index) => {
                            return (
                                <View style={{ alignItems: 'center', marginTop: 10 }} key={index}>
                                    <Text>
                                        FileName:{ls.name}
                                    </Text>
                                </View>
                            )
                        }) : null}
                    </View>

                </View>
            </View>




            <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 5 }}>
                <View style={[styles.box, styles.boxShadow, styles.elevation]} >


                    <View style={{ marginLeft: 20 }}>
                        <Button1
                            onPress={() => { validation() }}
                            color='#487eb0'
                            text="Submit"
                            type='filled'
                        />
                    </View>

                </View>
            </View>


        </ScrollView>
    </>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 13,
    },
    box: {
        backgroundColor: 'white',
        borderRadius: 8,
        height: 'auto',
        width: width * 0.95,
        padding: 15

    },
    box1: {
        backgroundColor: 'white',
        borderRadius: 8,
        height: 'auto',
        width: width * 0.95,
        //   padding:15

    },
    elevation: {
        shadowColor: 'grey',
        elevation: 20,
    },
});

export default Products