import React, { useState } from 'react';
import { UserDataForm } from '../../shared/components/UserDataForm';
import { useAppContext } from '../../shared/context/AppContext';

export const SignUp = ({ navigation }) => {
	const { createUser } = useAppContext();
	const [error, setError] = useState(undefined);

	const onSubmit = async (newUser) => {
		const userCreationError = await createUser(newUser);

		if (userCreationError) {
			setError(userCreationError);
		} else {
			navigation.navigate('home');
		}
	};

	return (
		<UserDataForm
			submitLabel="Sign Up"
			onSubmit={onSubmit}
			error={error}
			setError={setError}
		/>
	);
};
