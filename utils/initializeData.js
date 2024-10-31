import AsyncStorage from '@react-native-async-storage/async-storage';
import initialData from '../data/initialData.json';

const checkIfAsyncStorageIsEmpty = async () => {
	try {
		const keys = await AsyncStorage.getAllKeys();
		return keys.length === 0;
	} catch (error) {
		return false;
	}
};

const initializeData = async () => {
	const isEmpty = await checkIfAsyncStorageIsEmpty();
	if (isEmpty) {
		for (let key in initialData) {
			await AsyncStorage.setItem(key, JSON.stringify(initialData[key]));
		}
	}
};

export { initializeData };

