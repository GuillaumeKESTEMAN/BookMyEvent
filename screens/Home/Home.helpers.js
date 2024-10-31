import { Alert } from 'react-native';
import { getEvents } from '../../utils/getEvents';

export const fetchEvents = async (setEvents) => {
	try {
		setEvents(await getEvents());
	} catch (e) {
		Alert.alert(
			'Erreur',
			"Une erreur s'est produite lors du chargement des données."
		);
	}
};
