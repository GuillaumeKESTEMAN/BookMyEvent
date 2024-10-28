import { Card, IconButton } from "react-native-paper";
import { View, Text } from "react-native";
import { styles } from "./EventClickCard.styles"

export const EventClickCard = ({ title, place, date, image, onClick }) => (
    <Card style={styles.card} onPress={onClick}>
        <Card.Title
            style={styles.title}
            title={title}
            titleVariant="titleLarge"
            subtitle={
                <View style={styles.subtitle}>
                    <Text>{place} | {date}</Text>
                </View>
            }
            left={() => <Card.Cover source={{ uri: image }} style={styles.image} />}
            right={() => <IconButton
                icon="chevron-right"
                size={40}
            />}
        />
    </Card>
);