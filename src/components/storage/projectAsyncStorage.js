import AsyncStorage from "@react-native-async-storage/async-storage";

   // Get the Data From Async storage
export async function getStoreData(key) {
   try {
      const value = await AsyncStorage.getItem(key);
     
      if (value !== null) {
         var userData = JSON.parse(value);
         return userData;
      } else {
         return null;
      }
   } catch (e) {
      console.log('Async Data Error', e);
      return null;
   }
}


// Store the Data in AsyncStorage
export async function storeData(key, body) {
   try {
      await AsyncStorage.setItem(`${key}`, JSON.stringify(body));
   } catch (e) {
      console.log('Error in saving data');
   }
}


// Remove data from AsyncStorage
export const removeStoreData = (key) => {
   try {
      AsyncStorage.removeItem(key)

   } catch (e) {
      console.log("Error for " + key, e)
   }

}
