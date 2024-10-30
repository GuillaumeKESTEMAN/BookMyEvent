import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUsers = async () => {
	const currentUsersList = await AsyncStorage.getItem('users');
	return currentUsersList ? JSON.parse(currentUsersList) : [];
};
