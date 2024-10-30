import React, { useState, useEffect } from 'react';
import { View, Image, Alert } from 'react-native';
import { Dialog, Portal, Text, Button } from 'react-native-paper';
import { styles } from "./Event.styles";
import { fetchData, getUsernameById, updateEvents, updateUsers, removeEventFromUsers, removeUserFromEvents } from './Event.helpers';
import { useAppContext } from '../../shared/context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Event = ({ route }) => {
    const { event } = route.params;
    const { user } = useAppContext();
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [booked, setBooked] = useState(false);
    const [visible, setVisible] = useState(false);

    const loadData = async () => {
        try {
            await fetchData(setUsers, setEvents);
        } catch (e) {
            Alert.alert("Error", "An error occurred while loading the data.");
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        const currentEvent = events.find(evt => evt.id === event.id);
        const isBooked = currentEvent?.participants.includes(user.id) || false;
        setBooked(isBooked);
    }, [events, event, user.id]);

    const creatorName = getUsernameById(event.creator, users);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const handleBooking = async () => {
        try {
            const updatedEvents = updateEvents(events, event.id, user.id);
            const updatedUsers = updateUsers(users, event.id, user.id);
            const updatedData = { users: updatedUsers, events: updatedEvents };

            await AsyncStorage.setItem('data', JSON.stringify(updatedData));

            setEvents(updatedEvents);
            setUsers(updatedUsers);
            setBooked(true);
        } catch (e) {
            Alert.alert("Error", "An error occurred during the booking.");
        }
    };

    const handleCancel = async () => {
        setVisible(false);
        try {
            const updatedEvents = removeUserFromEvents(events, event.id, user.id);
            const updatedUsers = removeEventFromUsers(users, event.id, user.id);
            const updatedData = { users: updatedUsers, events: updatedEvents };

            await AsyncStorage.setItem('data', JSON.stringify(updatedData));

            setEvents(updatedEvents);
            setUsers(updatedUsers);
            setBooked(false);
        } catch (e) {
            Alert.alert("Error", "An error occurred during the cancellation.");
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
                <Text variant="bodyLarge" style={styles.text}>Added by: {creatorName}</Text>
                <View style={styles.buttons}>
                    {booked ? (
                        <>
                            <Button
                                icon="cancel"
                                mode="outlined"
                                textColor='#DF621E'
                                onPress={showDialog}>
                                Cancel
                            </Button>
                            <Portal>
                                <Dialog visible={visible} onDismiss={hideDialog}>
                                    <Dialog.Title>Confirmation</Dialog.Title>
                                    <Dialog.Content>
                                        <Text>Are you sure you want to cancel your booking?</Text>
                                    </Dialog.Content>
                                    <Dialog.Actions style={styles.dialogButtons}>
                                        <Button mode="contained" buttonColor="#DF621E" onPress={handleCancel}>Yes</Button>
                                        <Button mode="outlined" textColor='#DF621E' onPress={hideDialog}>No</Button>
                                    </Dialog.Actions>
                                </Dialog>
                            </Portal>
                        </>
                    ) : (
                        <Button icon="calendar" mode="contained" buttonColor="#DF621E" onPress={handleBooking}>Register</Button>
                    )}
                </View>
            </View>
        </View>
    );
};