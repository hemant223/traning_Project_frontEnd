import React from 'react';
import {Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AddVechile from '../drawer_screens/AddVechile';
import DrawerContent from '../drawer_screens/DrawerContent';
import ListOfVehicle from '../drawer_screens/ListOfVehicle';
import Products from '../drawer_screens/Products';
import Vendor from '../drawer_screens/Vendor';

import VenderList from '../drawer_screens/VenderList';

// After Login come on this page
// Screen Will open thru drawer conditions
const HomeScreen = (props) => {
 
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
    screenOptions={{
      drawerStyle: {
        width: Dimensions.get('window').width / 1.9,
      },
    }}
    initialRouteName='Vendor'  drawerContent={(props) => <DrawerContent {...props} />} >
      <Drawer.Screen
        name="AddVechile"
        component={AddVechile}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="ListOfVehicle"
        component={ListOfVehicle}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name="Products"
        component={Products}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Vendor"
        component={Vendor}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="VenderList"
        component={VenderList}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  )
};

export default HomeScreen;
