import { styles } from './UserEvents.styles';
import { Text, View, FlatList } from 'react-native';
import { useAppContext } from '../../shared/context/AppContext';
import { getUserCreatedPaginatedEventsHelper, getUserSubscribedPaginatedEventsHelper } from './UserEvents.helpers';
import { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';

import { EventClickCard } from '../../shared/components/EventClickCard';
import { ScreenView } from '../../shared/components/ScreenView';

const ShowMoreButton = ({ eventsListLength, eventsList, onShowMore }) => {
  if (eventsListLength <= eventsList.length) {
    return null;
  }
  
    return (
      <Button 
        icon="plus-circle"
        mode="contained"
        buttonColor="#DF621E"
        textColor="#000000"
        onPress={onShowMore}
        style={styles.button}
      >
        Show More
      </Button>
    );
};

export const UserEvents = () => {
  const { user } = useAppContext();
  const [userCreatedEvents, setUserCreatedEvents] = useState([]);
  const [userSubscribedEvents, setUserSubscribedEvents] = useState([]);
  const [userCreatedEventsLength, setUserCreatedEventsLength] = useState(0);
  const [userSubscribedEventsLength, setUserSubscribedEventsLength] = useState(0);

  const handlePressCard = (eventId) => { 

  }

  const getUserCreatedEvents = async (requiredLength) => {
    if (!user) {
      return "User not found.";
    } 

    const [filteredUserCreatedEvents, length] = await getUserCreatedPaginatedEventsHelper(requiredLength, user.id);
    setUserCreatedEvents(filteredUserCreatedEvents);
    setUserCreatedEventsLength(length);
  }

  const getUserSubscribedEvents = async (requiredLength) => {
    if (!user) {
      return "User not found.";
    }

    const [filteredUserSubscribedEvents, length] = await getUserSubscribedPaginatedEventsHelper(requiredLength, user.id);
    setUserSubscribedEvents(filteredUserSubscribedEvents);
    setUserSubscribedEventsLength(length);
  }

  useEffect(() => {
    getUserCreatedEvents(3);
    getUserSubscribedEvents(3);
  }, []);

  return (
    <ScreenView>
      <View style={styles.eventsContainer}>
        <Text style={styles.title}>Created Events</Text>
        <View style={styles.eventsList}>
          {userCreatedEvents.length > 0 ? (
            <FlatList
              data={userCreatedEvents}
              renderItem={({item}) => 
                <EventClickCard
                  title={item.title}
                  location={item.location}
                  date={item.date}
                  image={item.image}
                />
              }
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          ) : (
            <Text style={{ color: "white" }}>No events created yet.</Text>
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
              renderItem={({item}) => 
                <EventClickCard
                  title={item.title}
                  location={item.location}
                  date={item.date}
                  image={item.image}
                />
              }
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          ) : (
            <Text style={{ color: "white" }}>No events subscribed yet.</Text>
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
