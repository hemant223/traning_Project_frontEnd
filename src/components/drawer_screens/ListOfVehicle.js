import React, {useState, useEffect} from 'react';
import {StyleSheet, View,Image, SafeAreaView, ActivityIndicator} from 'react-native';
import { getStoreData } from '../storage/projectAsyncStorage';
import SearchBar from '../SearchBar'
import List from '../List'



const ListOfVehicle = (props) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [vechileData, setVechileData] = useState();
  const [refresh, setRefresh] = useState(false)


  
  // Get data from local storage
  const getData = async () => {
    let getVehicleData = await getStoreData('vData')
    console.log("getVehicle Data ",getVehicleData)
    setVechileData(getVehicleData);
  };



  useEffect(() => {
    // AsyncStorage.removeItem('vData')
    setRefresh(!refresh)
    getData();
  }, [props]);

  return (
    <SafeAreaView style={styles.root}>
      <View
      style={{marginTop:50}}></View>
      {!clicked && <Image source={require('../../assets/images/logo.png')} style={{width:200,height:70,resizeMode:'contain'}} />}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {!vechileData ? (
        <ActivityIndicator size="large" />
      ) : (
        <List
          searchPhrase={searchPhrase}
          data={vechileData}
          setClicked={setClicked}
        />
      )}
    </SafeAreaView>
  );
};

export default ListOfVehicle;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '10%',
  },
});
