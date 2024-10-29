import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchEvents = async (setEvents) => {
    try {
        const value = await AsyncStorage.getItem('data');
        if (value != null) {
            const data = JSON.parse(value);
            setEvents(data.events);
        }
    } catch (e) {
        Alert.alert("Erreur", "Une erreur s'est produite lors du chargement des données.");
    }
}