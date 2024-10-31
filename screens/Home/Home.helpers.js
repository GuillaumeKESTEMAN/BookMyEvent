import { Alert } from 'react-native';
import { getEvents } from '../../utils/getEvents';

export const fetchEvents = async (setEvents) => {
	try {
		setEvents(await getEvents());
	} catch (e) {
		Alert.alert('Erreur', 'An error occurred while loading the events.');
	}
};
