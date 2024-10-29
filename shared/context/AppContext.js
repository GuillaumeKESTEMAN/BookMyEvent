import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useState } from 'react';
import uuid from 'react-native-uuid';

const AppContext = createContext({ user: null });

export const AppContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const createUser = useCallback(
		async (newUser) => {
			const currentUsersList = await AsyncStorage.getItem('users');
			const users = currentUsersList ? JSON.parse(currentUsersList) : [];
			newUser.name = newUser.name.trim();

			if (
				users.find(
					(user) =>
						user.name.toLowerCase() === newUser.name.toLowerCase()
				)
			) {
				return 'User name already exists';
			}

			newUser.id = uuid.v4();

			users.push(newUser);
			await AsyncStorage.setItem('users', JSON.stringify(users));

			setUser(newUser);
		},
		[setUser]
	);

	const login = useCallback(
		({ userName }) => {
			// TODO:
		},
		[setUser]
	);

	const logout = useCallback(() => {
		setUser(null);
	}, [setUser]);

	return (
		<AppContext.Provider value={{ user, login, logout, createUser }}>
			{children}
		</AppContext.Provider>
	);
};

export function useAppContext() {
	return useContext(AppContext);
}
