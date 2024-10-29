import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { hash } from '../../helpers/hash';

export const createUserHelper = async (newUser, setUser) => {
	try {
		const currentUsersList = await AsyncStorage.getItem('users');
		const users = currentUsersList ? JSON.parse(currentUsersList) : [];
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

		setUser(newUser);
	} catch (error) {
		return 'An error occurred while signing up.';
	}
};

export const loginHelper = async (userName, password, setUser) => {
	try {
		const storedUsers = await AsyncStorage.getItem('users');
		const users = storedUsers ? JSON.parse(storedUsers) : [];

		const hashedPassword = await hash(password);

		const storedUser = users.find((user) => user.name === userName.trim());

		if (!storedUser) {
			return 'User not found.';
		}

		if (storedUser.password !== hashedPassword) {
			return 'Incorrect password.';
		}

		delete storedUser.password;

		setUser(storedUser);
	} catch (error) {
		return 'An error occurred while signing in.';
	}
};
