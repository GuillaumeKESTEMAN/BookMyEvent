import React, { useState } from 'react';
import {
	Image,
	Keyboard,
	ScrollView,
	TouchableWithoutFeedback,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { ScreenView } from '../../shared/components/ScreenView/ScreenView';
import { UserDataForm } from '../../shared/components/UserDataForm';
import { useAppContext } from '../../shared/context/AppContext';
import { styles } from './SignUp.styles';

export const SignUp = ({ navigation }) => {
	const { createUser } = useAppContext();
	const [error, setError] = useState(undefined);

	const onSubmit = async (newUser) => {
		const userCreationError = await createUser(newUser);

		if (userCreationError) {
			setError(userCreationError);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<ScreenView parent={ScrollView} contentContainerStyle={styles.container}>
				<Image
					source={require('../../assets/logo.png')}
					style={styles.img}
				/>
				<Text variant="displaySmall" style={styles.title}>
					BookMyEvent
				</Text>
				<UserDataForm
					submitLabel="Sign Up"
					onSubmit={onSubmit}
					error={error}
					setError={setError}
				/>
				<Button
					mode="outlined"
					textColor="#DF621E"
					style={styles.button}
					onPress={() => navigation.navigate('SignIn')}
				>
					Sign In
				</Button>
			</ScreenView>
		</TouchableWithoutFeedback>
	);
};
