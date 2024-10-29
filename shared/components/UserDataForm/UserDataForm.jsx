import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { hash } from '../../helpers/hash';

export const UserDataForm = ({
	submitLabel,
	isHidingPassword = false,
	onSubmit,
	error,
	setError,
}) => {
	const [name, setName] = useState('');
	const [bio, setBio] = useState('');
	const [password, setPassword] = useState('');

	const onTextChange = useCallback(() => {
		if (error) {
			setError(undefined);
		}
	}, [error, setError]);

	const resetValues = useCallback(() => {
		setName('');
		setBio('');
		setPassword('');
		setError(undefined);
	}, [setName, setBio, setPassword, setError]);

	return (
		<View>
			<TextInput
				mode="outlined"
				label="Name"
				value={name}
				onChangeText={(newName) => {
					setName(newName);
					onTextChange();
				}}
			/>
			<TextInput
				mode="outlined"
				label="Biography"
				multiline
				numberOfLines={4}
				value={bio}
				onChangeText={(newBiography) => {
					setBio(newBiography);
					onTextChange();
				}}
			/>
			{!isHidingPassword && (
				<TextInput
					mode="outlined"
					label="Password"
					secureTextEntry
					value={password}
					onChangeText={(newPassword) => {
						setPassword(newPassword);
						onTextChange();
					}}
				/>
			)}
			<Text>{error}</Text>
			<Button
				mode="outlined"
				onPress={async () => {
					if (!name || !bio || !password) {
						setError('All fields are required');
						return;
					}

					const result = {
						name,
						bio,
					};

					if (!isHidingPassword) {
						result.password = await hash(password);
					}

					await onSubmit(result);
				}}
			>
				{submitLabel}
			</Button>
		</View>
	);
};
