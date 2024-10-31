import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Snackbar, Text, Button } from 'react-native-paper';
import { EventClickCard } from '../../shared/components/EventClickCard/EventClickCard';
import { ScreenView } from '../../shared/components/ScreenView';
import { fetchEvents } from './Home.helpers';
import { styles } from './Home.styles';

export const Home = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const [events, setEvents] = useState([]);
    const [visible, setVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

	useEffect(() => {
		fetchEvents(setEvents);
		if (route.params?.message) {
			setVisible(true);
		}
	}, [isFocused, setEvents, route.params]);

    const handlePressCard = (event) => {
        navigation.navigate('Event', { event });
    };

    return (
        <>
            <ScreenView style={styles.container}>
                <View style={styles.header}>
                    <Text variant="titleMedium" style={styles.title}>
                        Welcome to our booking app. Don't miss any event by
                        registering now!
                    </Text>
                    <Text variant="titleMedium" style={styles.subtitle}>
                        Tu veux inscrire le tiens ?
                    </Text>
                </View>
                <View style={styles.addButtonContainer}>
                    <Button
                        mode="contained"
                        icon="plus-circle-outline"
                        onPress={() => { navigation.navigate('NewEvent') }}
                        style={styles.addButton}
                    >
                        Do you want to register yours?
                    </Button>
                </View>
                <Text variant="headlineLarge" style={styles.category}>
                    Évènements
                </Text>
                {events.length === 0 ? (
                    <Text variant="bodyMedium" style={styles.noEvents}>
                        Aucun évènement disponible pour le moment.
                    </Text>
                ) : (
                    <FlatList
                        data={events}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <EventClickCard
                                    title={item.title}
                                    location={item.location}
                                    date={item.date}
                                    image={item.image}
                                    pressAction={() => handlePressCard(item)}
                                />
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                    />
                )}
            </ScreenView>
            <Snackbar
                visible={visible}
                duration={10000}
                onDismiss={() => {
                    setVisible(false);
                    setSnackbarMessage('');
                }}
                action={{
                    label: 'OK',
                    onPress: () => {
                        setVisible(false);
                        setSnackbarMessage('');
                    },
                    textColor: '#000'
                }}
                style={styles.snackbarWrapper}
            >
                <Text>{snackbarMessage}</Text>
            </Snackbar>
        </>
    );
};