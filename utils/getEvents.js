import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchEvents = async () => {
  const storedEvents = await AsyncStorage.getItem("events");
  return storedEvents ? JSON.parse(storedEvents) : [];
}