import React, { createContext, useCallback, useContext, useState } from 'react';
import { createUserHelper, loginHelper } from './helpers/User.helpers';

const AppContext = createContext({ user: null });

export const AppContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const createUser = useCallback(
		async (newUser) => createUserHelper(newUser, setUser),
		[setUser]
	);

	const login = useCallback(
		async (userName, password) => loginHelper(userName, password, setUser),
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
