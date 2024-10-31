import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { ScreenView } from '../../shared/components/ScreenView';
import { useAppContext } from '../../shared/context/AppContext';
import { styles } from './NewEvent.styles';

export const NewEvent = ({ navigation }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [location, setLocation] = useState('');
	const [image, setImage] = useState('');
	const [error, setError] = useState(undefined);
	const { user } = useAppContext();

	const onTextChange = useCallback(() => {
		if (error) {
			setError(undefined);
		}
	}, [error]);

	const handleCreateEvent = useCallback(async () => {
		if (!title || !description || !date || !location || !image) {
			setError('All fields are required');
			return;
		}

		const datePattern = /^\d{4}-\d{2}-\d{2}$/;
		if (!datePattern.test(date)) {
			setError('Date must be in the format YYYY-MM-DD');
			return;
		}

		const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
		if (image && !urlPattern.test(image)) {
			setError('Image URL is invalid');
			return;
		}

		const newEvent = {
			id: uuid.v4(),
			title,
			description,
			date,
			location,
			image,
			creator: user.id,
			participants: [],
		};

		try {
			// replace data key by events when its ready
			const value = await AsyncStorage.getItem('data');
			const data = value ? JSON.parse(value) : { events: [], users: [] };
			data.events.push(newEvent);
			await AsyncStorage.setItem('data', JSON.stringify(data));

			navigation.navigate('Home', {
				message: 'Event created successfully!',
			});
		} catch (e) {
			Alert.alert('Error', 'An error occurred while creating the event.');
		}
	}, [
		title,
		description,
		date,
		location,
		image,
		user.id,
		setError,
		navigation,
	]);

	return (
		<ScreenView>
			<Text variant="titleLarge" style={styles.title}>
				Create an event
			</Text>
			<TextInput
				label="Title"
				value={title}
				onChangeText={(newTitle) => {
					setTitle(newTitle);
					onTextChange();
				}}
				style={styles.input}
				mode="outlined"
			/>
			<TextInput
				label="Description"
				value={description}
				onChangeText={(newDescription) => {
					setDescription(newDescription);
					onTextChange();
				}}
				style={styles.input}
				mode="outlined"
				multiline
			/>
			<TextInput
				label="Date (YYYY-MM-DD)"
				value={date}
				onChangeText={(newDate) => {
					setDate(newDate);
					onTextChange();
				}}
				style={styles.input}
				mode="outlined"
			/>
			<TextInput
				label="Location"
				value={location}
				onChangeText={(newLocation) => {
					setLocation(newLocation);
					onTextChange();
				}}
				style={styles.input}
				mode="outlined"
			/>
			<TextInput
				label="Image URL"
				value={image}
				onChangeText={(newImage) => {
					setImage(newImage);
					onTextChange();
				}}
				style={styles.input}
				mode="outlined"
			/>
			{Boolean(error) && <Text style={styles.error}>{error}</Text>}
			<Button
				mode="contained"
				buttonColor="#DF621E"
				textColor="#FFF"
				onPress={handleCreateEvent}
				style={styles.button}
			>
				Create
			</Button>
		</ScreenView>
	);
};
