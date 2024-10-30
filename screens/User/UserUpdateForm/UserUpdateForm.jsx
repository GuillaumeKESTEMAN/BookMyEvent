import React, { useCallback } from 'react';
import { ScreenView } from '../../../shared/components/ScreenView';
import { UserDataForm } from '../../../shared/components/UserDataForm';
import { useAppContext } from '../../../shared/context/AppContext';

export const UserUpdateForm = ({ navigation }) => {
	const { user, updateUser } = useAppContext();

	const onSubmit = useCallback(
		async (updatedUser) => {
			await updateUser({ ...user, ...updatedUser });
			navigation.goBack();
		},
		[user, navigation]
	);

	return (
		<ScreenView>
			<UserDataForm
				submitLabel="Update"
				isPasswordRequired={false}
				defaultName={user.name}
				defaultBio={user.bio}
				onSubmit={onSubmit}
			/>
		</ScreenView>
	);
};
