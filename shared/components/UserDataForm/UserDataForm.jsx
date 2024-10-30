import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { hash } from '../../helpers/hash';
import { styles } from './UserDataForm.styles';

export const UserDataForm = ({
	submitLabel,
	onSubmit,
	error,
	setError,
	isPasswordRequired = true,
	defaultName = '',
	defaultBio = '',
}) => {
	const [name, setName] = useState(defaultName);
	const [bio, setBio] = useState(defaultBio);
	const [password, setPassword] = useState('');

	const onTextChange = useCallback(() => {
		if (error) {
			setError(undefined);
		}
	}, [error, setError]);

	const handleSubmit = useCallback(async () => {
		if (!name || !bio || (isPasswordRequired && !password)) {
			setError('All fields are required');
			return;
		}

		const result = {
			name,
			bio,
			password: await hash(password),
		};

		await onSubmit(result);
	}, [setError, name, bio, password, onSubmit]);

	return (
		<View style={styles.container}>
			<TextInput
				label="Name"
				value={name}
				onChangeText={(newName) => {
					setName(newName);
					onTextChange();
				}}
				style={styles.textInput}
			/>
			<TextInput
				label="Biography"
				multiline
				numberOfLines={4}
				value={bio}
				onChangeText={(newBiography) => {
					setBio(newBiography);
					onTextChange();
				}}
				style={styles.textInput}
			/>
			<TextInput
				label="Password"
				secureTextEntry
				value={password}
				onChangeText={(newPassword) => {
					setPassword(newPassword);
					onTextChange();
				}}
				onSubmitEditing={handleSubmit}
				style={styles.textInput}
			/>
			{Boolean(error) && <Text style={styles.error}>{error}</Text>}
			<Button
				mode="contained"
				buttonColor="#DF621E"
				textColor="#000000"
				style={styles.button}
				onPress={handleSubmit}
			>
				{submitLabel}
			</Button>
		</View>
	);
};
