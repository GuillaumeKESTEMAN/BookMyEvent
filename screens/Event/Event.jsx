import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, Alert } from 'react-native';
import { Dialog, Portal, Text, Button } from 'react-native-paper';
import { styles } from "./Event.styles";
import { fetchData, getUsernameById, updateEvents, updateUsers, removeEventFromUsers, removeUserFromEvents } from './Event.helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Event = ({ route }) => {
    const { event } = route.params;
    const currentUser = { id: "337a1254-c51c-455b-8898-37ea2e03d245" }; //jeanclaude
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [booked, setBooked] = useState(false);
    const [visible, setVisible] = useState(false);

    const loadData = async () => {
        await fetchData(setUsers, setEvents);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        const currentEvent = events.find(evt => evt.id === event.id);
        const isBooked = currentEvent?.participants.includes(currentUser.id) || false;
        setBooked(isBooked);
    }, [events, event, currentUser.id]);

    const creatorName = getUsernameById(event.creator, users);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const handleBooking = async () => {
        try {
            const updatedEvents = updateEvents(events, event.id, currentUser.id);
            const updatedUsers = updateUsers(users, event.id, currentUser.id);
            const updatedData = { users: updatedUsers, events: updatedEvents };

            await AsyncStorage.setItem('data', JSON.stringify(updatedData));

            setEvents(updatedEvents);
            setUsers(updatedUsers);
            setBooked(true);
        } catch (e) {
            Alert.alert("Erreur", "Une erreur s'est produite lors de la réservation.");
        }
    };

    const handleCancel = async () => {
        setVisible(false);
        try {
            const updatedEvents = removeUserFromEvents(events, event.id, currentUser.id);
            const updatedUsers = removeEventFromUsers(users, event.id, currentUser.id);
            const updatedData = { users: updatedUsers, events: updatedEvents };

            await AsyncStorage.setItem('data', JSON.stringify(updatedData));

            setEvents(updatedEvents);
            setUsers(updatedUsers);
            setBooked(false);
        } catch (e) {
            Alert.alert("Erreur", "Une erreur s'est produite lors de l'annulation.");
        }
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: event.image }} style={styles.image} />
            <View style={styles.informations}>
                <View style={styles.primary}>
                    <Text variant="headlineLarge" style={styles.text}>{event.title}</Text>
                    <Text variant="bodyLarge" style={styles.text}>{event.description}</Text>
                </View>
                <Text variant="bodyLarge" style={styles.text}>{event.date}</Text>
                <Text variant="bodyLarge" style={styles.text}>{event.location}</Text>
                <Text variant="bodyLarge" style={styles.text}>Ajouté par: {creatorName}</Text>
                <View style={styles.buttons}>
                    {booked ? (
                        <>
                            <Button
                                icon="cancel"
                                mode="outlined"
                                textColor='#DF621E'
                                onPress={showDialog}>
                                Annuler
                            </Button>
                            <Portal>
                                <Dialog visible={visible} onDismiss={hideDialog}>
                                    <Dialog.Title>Confirmation</Dialog.Title>
                                    <Dialog.Content>
                                        <Text>Es-tu sûr de vouloir annuler ta réservation ?</Text>
                                    </Dialog.Content>
                                    <Dialog.Actions style={styles.dialogButtons}>
                                        <Button mode="contained" buttonColor="#DF621E" onPress={handleCancel}>Oui</Button>
                                        <Button mode="outlined" textColor='#DF621E' onPress={hideDialog}>Non</Button>
                                    </Dialog.Actions>
                                </Dialog>
                            </Portal>
                        </>
                    ) : (
                        <Button icon="calendar" mode="contained" buttonColor="#DF621E" onPress={handleBooking}>S'inscrire</Button>
                    )}
                </View>
            </View>
        </View>
    );
};