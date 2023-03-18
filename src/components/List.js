import React,{useState} from "react";
import {  
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image
} from "react-native";


// definition of the Item, which will be rendered in the FlatList
const Item = (props) => {


  return (
    <ScrollView>
      <View style={styles.item}>
        <Text style={styles.title}>Company of Vehicle {props.item.vehicleCompany}</Text>
        <Text style={styles.details}>Price of Vehicle= {props.item.price}</Text>
        <Text style={styles.details}>Offer of Vehicle= {props.item.offer}</Text>
        {/* <Image style={{ width: 250, height: 50 }} source={props.item.image} /> */}
        <Image style={{width:120,height:40}} source={require('../assets/images/verna1.png')}/>
      </View>
    </ScrollView>
  )
};

const RenderItem = ({ item,searchPhrase }) => {
  
  if (searchPhrase === "") {
    return <Item item={item} />;
  }
  
  // filter of the vehicleCompany
  if (item.vehicleCompany.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
    return <Item item={item} />;
  }


  // filter of the model
  if (item.model.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
    return <Item item={item} />;
  }
};



const List = (props) => {
  
const [refresh, setRefresh] = useState(false);


  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          props.setClicked(false);
        }}
      >
        <FlatList
          data={props.data}
          renderItem={({item})=><RenderItem item={item} refresh={refresh} setRefersh={setRefresh} searchPhrase={props.searchPhrase}  />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey"
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});
