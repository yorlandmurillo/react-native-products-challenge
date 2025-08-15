import AsyncStorage from '@react-native-async-storage/async-storage';

//object
export const storeData = async (name, value, isString) => {
  try {
    const jsonValue = isString ? value : JSON.stringify(value);
    await AsyncStorage.setItem(name, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getData = async (name, isString) => {
  try {
    const jsonValue = await AsyncStorage.getItem(name);
    return jsonValue !== null
      ? isString
        ? jsonValue
        : JSON.parse(jsonValue)
      : null;
  } catch (e) {
    // error reading value
  }
};

export const clearStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();

    const filteredKeys = keys.filter(item => item !== '@storage_key_new');
    await AsyncStorage.multiRemove(filteredKeys);
    //alert('Storage successfully cleared!');
  } catch (e) {
    alert('Failed to clear the async storage.');
  }
};
