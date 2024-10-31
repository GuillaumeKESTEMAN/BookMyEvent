import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { EventClickCard } from '../../shared/components/EventClickCard/EventClickCard';
import { ScreenView } from '../../shared/components/ScreenView';
import { fetchEvents } from './Home.helpers';
import { styles } from './Home.styles';

export const Home = ({ navigation }) => {
	const isFocused = useIsFocused();
	const [events, setEvents] = useState([]);

	useEffect(() => {
		fetchEvents(setEvents);
	}, [isFocused, setEvents]);

	const handlePressCard = (event) => {
		navigation.navigate('Event', { event });
	};

	return (
		<ScreenView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>
					Welcome to our booking app. Don't miss any event by
					registering now!
				</Text>
				<Text style={styles.subtitle}>
					Do you want to register yours?
				</Text>
			</View>
			<View style={styles.addButtonContainer}>
				<TouchableOpacity style={styles.addButton} onPress={() => {}}>
					<IconButton icon="plus-circle-outline" size={30} />
					<Text style={styles.addButtonText}>Add a new event</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.category}>Events</Text>
			{events.length === 0 ? (
				<Text style={styles.noEvents}>
					No events available at this time.
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
	);
};
