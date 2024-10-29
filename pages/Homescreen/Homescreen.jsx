import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { styles } from "./Homescreen.styles"
import { EventClickCard } from '../../shared/components/EventClickCard/EventClickCard';

const events = [
    { id: '1', title: 'Évènement 1', location: 'Paris', date: '01-11-2024', image: 'https://picsum.photos/400' },
    { id: '2', title: 'Évènement 2', location: 'Lille', date: '15-12-2024', image: 'https://picsum.photos/400' },
    { id: '3', title: 'Évènement 3', location: 'Marseille', date: '10-01-2025', image: 'https://picsum.photos/400' },
    { id: '4', title: 'Évènement 4', location: 'Bordeaux', date: '15-02-2025', image: 'https://picsum.photos/400' },
    { id: '5', title: 'Évènement 5', location: 'Lyon', date: '08-03-2025', image: 'https://picsum.photos/400' },
    { id: '6', title: 'Évènement 6', location: 'Nice', date: '17-04-2025', image: 'https://picsum.photos/400' },
    { id: '7', title: 'Évènement 7', location: 'Toulouse', date: '2-05-2025', image: 'https://picsum.photos/400' },
    { id: '8', title: 'Évènement 8', location: 'Strasbourg', date: '9-05-2025', image: 'https://picsum.photos/400' },
];

export const Homescreen = () => {
    const handlePressCard = (title) => { }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    {`Bienvenue sur notre appli de réservation.\nNe manque aucun évènement en t'inscrivant dès maintenant !\n\nTu veux inscrire le tiens ?`}
                </Text>
            </View>
            <View style={styles.addButtonContainer}>
                <TouchableOpacity style={styles.addButton} onPress={() => { }}>
                    <IconButton
                        icon="plus-circle-outline"
                        size={30}
                    />
                    <Text style={styles.addButtonText}>Ajoute un nouvel évènement</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.category}>Évènements</Text>
            <FlatList
                data={events}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <EventClickCard title={item.title} location={item.location} date={item.date} image={item.image} pressAction={() => handlePressCard(item.title)} />
                    </View>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
}