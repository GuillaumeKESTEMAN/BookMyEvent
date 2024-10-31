import AsyncStorage from '@react-native-async-storage/async-storage';

export const getEvents = async () => {
	const currentUsersList = await AsyncStorage.getItem('events');
	return currentUsersList ? JSON.parse(currentUsersList) : [];
};
