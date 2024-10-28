import { Card, IconButton } from "react-native-paper";
import { View, Text } from "react-native";
import { styles } from "./EventClickCard.styles"

function handlePress() {}

export const EventClickCard = ({ params }) => (
    <Card style={styles.card} onPress={handlePress}>
        <Card.Title
            style={styles.title}
            title={params.title}
            titleVariant="titleLarge"
            subtitle={<View style={styles.subtitle}>
                <Text>{params.place}</Text>
                <Text>|</Text>
                <Text>{params.date}</Text>
            </View>}
            left={() => <Card.Cover source={{ uri: params.image }} style={styles.image} />}
            right={() => <IconButton
                icon="chevron-right"
                size={40}
            />}
        />
    </Card>
);