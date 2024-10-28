import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { getHashedPassword } from './UserDataForm.helpers';

export const UserDataForm = ({
	submitLabel,
	isHidingPassword = false,
	onSubmit,
}) => {
	const [name, setName] = useState('');
	const [biography, setBiography] = useState('');
	const [password, setPassword] = useState('');

	return (
		<View>
			<TextInput
				mode="outlined"
				label="Name"
				value={name}
				onChangeText={setName}
			/>
			<TextInput
				mode="outlined"
				label="Biography"
				multiline
				numberOfLines={4}
				value={biography}
				onChangeText={setBiography}
			/>
			{!isHidingPassword && (
				<TextInput
					mode="outlined"
					label="Password"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
			)}
			<Button
				mode="outlined"
				onPress={async () => {
					const result = {
						name,
						biography,
					};

					if (!isHidingPassword) {
						result.password = await getHashedPassword(password);
					}

					onSubmit(result);
				}}
			>
				{submitLabel}
			</Button>
		</View>
	);
};
