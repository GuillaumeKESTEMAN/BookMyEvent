import React, { useState } from 'react';
import {
	Alert,
	Image,
	Keyboard,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { ScreenView } from '../../shared/components/ScreenView';
import { useAppContext } from '../../shared/context/AppContext';
import { styles } from './SignIn.styles';

export const SignIn = ({ navigation }) => {
	const { login } = useAppContext();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSignIn = async () => {
		if (!username.trim() || !password) {
			Alert.alert('Error', 'Username and password are required');
			return;
		}

		const loginError = await login(username, password);

		if (loginError) {
			Alert.alert('Error', loginError);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<ScreenView>
				<Image
					source={require('../../assets/logo.png')}
					style={styles.img}
				/>

				<Text variant="displaySmall" style={styles.title}>
					BookMyEvent
				</Text>

				<View style={styles.inputsContainer}>
					<TextInput
						style={styles.textInput}
						label="Username"
						value={username}
						onChangeText={setUsername}
					/>
					<TextInput
						style={styles.textInput}
						label="Password"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>
					<Button
						mode="contained"
						buttonColor="#DF621E"
						textColor="#000000"
						style={styles.button}
						onPress={handleSignIn}
					>
						Sign In
					</Button>
				</View>

				<Button
					mode="outlined"
					textColor="#DF621E"
					style={{ ...styles.button, ...styles.signUpButton }}
					onPress={() => navigation.navigate('SignUp')}
				>
					Sign Up
				</Button>
			</ScreenView>
		</TouchableWithoutFeedback>
	);
};
