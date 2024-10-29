import { Card, IconButton } from "react-native-paper";
import { View, Text } from "react-native";
import { styles } from "./EventClickCard.styles"

export const EventClickCard = ({ title, location, date, image, pressAction }) => (
    <Card style={styles.card} onPress={pressAction}>
        <Card.Title
            style={styles.title}
            title={title}
            titleVariant="titleLarge"
            subtitle={
                <View style={styles.subtitle}>
                    <Text>{location} | {date}</Text>
                </View>
            }
            left={() => <Card.Cover source={{ uri: image }} style={styles.photo} />}
            right={() => 
                <IconButton
                    icon="chevron-right"
                    size={40}
                />
            }
        />
    </Card>
);