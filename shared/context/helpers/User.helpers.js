import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import uuid from 'react-native-uuid';
import { getUsers } from '../../../utils/getUsers';
import { hash } from '../../helpers/hash';

export const createUserHelper = async (newUser, setUser) => {
	try {
		const users = await getUsers();
		newUser.name = newUser.name.trim();

		if (
			users.find(
				(user) => user.name.toLowerCase() === newUser.name.toLowerCase()
			)
		) {
			return 'User name already exists';
		}

		newUser.id = uuid.v4();

		users.push(newUser);
		await AsyncStorage.setItem('users', JSON.stringify(users));

		delete newUser.password;

		await SecureStore.setItemAsync('userToken', newUser.id);
		setUser(newUser);
	} catch (error) {
		return 'An error occurred while signing up.';
	}
};

export const updateUserHelper = async (updatedUser, setUser) => {
	try {
		const users = await getUsers();

		const updatedUsers = users.map((user) =>
			user.id === updatedUser.id ? updatedUser : user
		);

		await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

		setUser(updatedUser);
	} catch (error) {
		return 'An error occurred while updating the user.';
	}
};

export const loginHelper = async (userName, password, setUser) => {
	try {
		const users = await getUsers();

		const hashedPassword = await hash(password);

		const storedUser = users.find((user) => user.name === userName.trim());

		if (!storedUser) {
			return 'User not found.';
		}

		if (storedUser.password !== hashedPassword) {
			return 'Incorrect password.';
		}

		delete storedUser.password;

		await SecureStore.setItemAsync('userToken', storedUser.id);
		setUser(storedUser);
	} catch (error) {
		return 'An error occurred while signing in.';
	}
};

export const loginFromCacheHelper = async (setUser) => {
	try {
		const storedUserToken = await SecureStore.getItemAsync('userToken');

		if (!storedUserToken) return;

		const storedUsers = await AsyncStorage.getItem('users');
		const users = storedUsers ? JSON.parse(storedUsers) : [];

		const storedUser = users.find((user) => user.id === storedUserToken);

		if (storedUser) {
			delete storedUser.password;
			setUser(storedUser);
		}
	} catch (error) {
		return;
	}
};

export const logoutHelper = async (setUser) => {
	setUser(null);
	await SecureStore.deleteItemAsync('userToken');
};

export const deleteAccountHelper = async (user, setUser) => {
	try {
		const users = await getUsers();

		const updatedUsers = users.filter(
			(storedUser) => storedUser.id !== user.id
		);

		await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
		await SecureStore.deleteItemAsync('userToken');

		setUser(null);
	} catch (error) {
		return 'An error occurred while deleting the account.';
	}
};
