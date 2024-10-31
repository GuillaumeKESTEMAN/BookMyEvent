import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchEvents = async () => {
    const value = await AsyncStorage.getItem("data");
    const data = JSON.parse(value);
    return data.events || [];
};