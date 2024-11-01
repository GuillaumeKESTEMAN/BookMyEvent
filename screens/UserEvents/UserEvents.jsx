import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, FlatList } from 'react-native';
import { useAppContext } from '../../shared/context/AppContext';
import { getUserCreatedPaginatedEventsHelper, getUserSubscribedPaginatedEventsHelper } from './UserEvents.helpers';
import { Button, Text, Card } from 'react-native-paper';
import { EventClickCard } from '../../shared/components/EventClickCard';
import { ScreenView } from '../../shared/components/ScreenView';
import { styles } from './UserEvents.styles';

const ShowMoreButton = ({ eventsListLength, eventsList, onShowMore }) => {
    if (eventsListLength <= eventsList.length) {
        return null;
    }
    return (
        <Button
            icon="plus-circle"
            mode="contained"
            onPress={onShowMore}
            style={styles.button}
        >
            Show More
        </Button>
    );
};

export const UserEvents = ({ navigation }) => {
    const { user } = useAppContext();
    const isFocused = useIsFocused();
    const [userCreatedEvents, setUserCreatedEvents] = useState([]);
    const [userSubscribedEvents, setUserSubscribedEvents] = useState([]);
    const [userCreatedEventsLength, setUserCreatedEventsLength] = useState(0);
    const [userSubscribedEventsLength, setUserSubscribedEventsLength] = useState(0);

    const handlePressCard = (event) => {
        navigation.navigate('Event', { event });
    };

    const getUserCreatedEvents = async (requiredLength) => {
        const [filteredUserCreatedEvents, length] = await getUserCreatedPaginatedEventsHelper(requiredLength, user.id);
        setUserCreatedEvents(filteredUserCreatedEvents);
        setUserCreatedEventsLength(length);
    }

    const getUserSubscribedEvents = async (requiredLength) => {
        const [filteredUserSubscribedEvents, length] = await getUserSubscribedPaginatedEventsHelper(requiredLength, user.id);
        setUserSubscribedEvents(filteredUserSubscribedEvents);
        setUserSubscribedEventsLength(length);
    }

    useEffect(() => {
        getUserCreatedEvents(3);
        getUserSubscribedEvents(3);
    }, [isFocused]);

    return (
        <ScreenView>
            <View style={styles.eventsContainer}>
                <Text style={styles.title}>Created Events</Text>
                <View style={styles.eventsList}>
                    {userCreatedEvents.length > 0 ? (
                        <FlatList
                            data={userCreatedEvents}
                            renderItem={({ item }) => (
                                <Card style={[styles.item, { backgroundColor: 'transparent' }]}>
                                    <EventClickCard
                                        title={item.title}
                                        location={item.location}
                                        date={item.date}
                                        image={item.image}
                                        pressAction={() => handlePressCard(item)}
                                    />
                                </Card>
                            )}
                            keyExtractor={item => item.id}
                            scrollEnabled={false}
                        />
                    ) : (
                        <Text style={{ color: '#FFF' }}>No events created yet.</Text>
                    )}
                </View>
                <ShowMoreButton
                    eventsListLength={userCreatedEventsLength}
                    eventsList={userCreatedEvents}
                    onShowMore={() => getUserCreatedEvents(userCreatedEvents.length + 3)}
                />
            </View>
            <View style={styles.secondEventsContainer}>
                <Text style={styles.title}>Subscribed Events</Text>
                <View style={styles.eventsList}>
                    {userSubscribedEvents.length > 0 ? (
                        <FlatList
                            data={userSubscribedEvents}
                            renderItem={({ item }) => (
                                <Card style={[styles.item, { backgroundColor: 'transparent' }]}>
                                    <EventClickCard
                                        title={item.title}
                                        location={item.location}
                                        date={item.date}
                                        image={item.image}
                                        pressAction={() => handlePressCard(item)}
                                    />
                                </Card>
                            )}
                            keyExtractor={item => item.id}
                            scrollEnabled={false}
                        />
                    ) : (
                        <Text style={{ color: '#FFF' }}>No events subscribed yet.</Text>
                    )}
                </View>
                <ShowMoreButton
                    eventsListLength={userSubscribedEventsLength}
                    eventsList={userSubscribedEvents}
                    onShowMore={() => getUserSubscribedEvents(userSubscribedEvents.length + 3)}
                />
            </View>
        </ScreenView>
    );
};