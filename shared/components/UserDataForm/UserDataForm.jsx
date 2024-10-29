import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { getHashedPassword } from './UserDataForm.helpers';
import { styles } from './UserDataForm.styles';

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
				style={styles.input}
				mode="outlined"
				label="Name"
				value={name}
				onChangeText={setName}
			/>
			<TextInput
				style={styles.input}
				mode="outlined"
				label="Biography"
				multiline
				numberOfLines={4}
				value={biography}
				onChangeText={setBiography}
			/>
			{!isHidingPassword && (
				<TextInput
					style={styles.input}
					mode="outlined"
					label="Password"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
			)}
			<Button
				style={styles.button}
				mode="outlined"
				textColor='#000000'
				buttonColor='#DF621E'
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
