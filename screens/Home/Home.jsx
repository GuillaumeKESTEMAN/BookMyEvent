import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { EventClickCard } from '../../shared/components/EventClickCard/EventClickCard';
import { ScreenView } from '../../shared/components/ScreenView';
import { fetchEvents } from './Home.helpers';
import { styles } from './Home.styles';

export const Home = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		fetchEvents(setEvents);
	}, [setEvents]);

	const handlePressCard = (id) => {};

	return (
		<ScreenView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>
					Bienvenue sur notre appli de réservation. Ne manque aucun
					évènement en t'inscrivant dès maintenant !
				</Text>
				<Text style={styles.subtitle}>Tu veux inscrire le tiens ?</Text>
			</View>
			<View style={styles.addButtonContainer}>
				<TouchableOpacity style={styles.addButton} onPress={() => {}}>
					<IconButton icon="plus-circle-outline" size={30} />
					<Text style={styles.addButtonText}>
						Ajoute un nouvel évènement
					</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.category}>Évènements</Text>
			{events.length === 0 ? (
				<Text style={styles.noEvents}>
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
								pressAction={() => handlePressCard(item.id)}
							/>
						</View>
					)}
					keyExtractor={(item) => item.id}
				/>
			)}
		</ScreenView>
	);
};
