import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { hash } from '../../helpers/hash';
import { styles } from './UserDataForm.styles';

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
			{!isHidingPassword && (
				<TextInput
					label="Password"
					secureTextEntry
					value={password}
					onChangeText={(newPassword) => {
						setPassword(newPassword);
						onTextChange();
					}}
					style={styles.textInput}
				/>
			)}
			{Boolean(error) && <Text style={styles.error}>{error}</Text>}
			<Button
				mode="contained"
				buttonColor="#DF621E"
				textColor="#000000"
				style={styles.button}
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
