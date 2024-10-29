import React, { useState } from 'react';
import { UserDataForm } from '../../shared/components/UserDataForm';
import { useAppContext } from '../../shared/context/AppContext';

export const SignUp = () => {
	const { createUser } = useAppContext();
	const [error, setError] = useState(undefined);

	const onSubmit = async (newUser) => {
		const userCreationError = await createUser(newUser);
		setError(userCreationError);
		return !userCreationError;
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
