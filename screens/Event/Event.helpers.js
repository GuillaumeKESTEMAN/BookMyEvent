import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const fetchData = async (setUsers, setEvents) => {
  try {
    const value = await AsyncStorage.getItem("data");
    if (value != null) {
      const data = JSON.parse(value);
      setUsers(data.users);
      setEvents(data.events);
    }
  } catch (e) {
    Alert.alert(
      "Erreur",
      "Une erreur s'est produite lors du chargement des données."
    );
  }
};

export const getUsernameById = (id, users) => {
  const user = users.find((user) => user.id === id);
  return user ? user.username : "Unknown";
};

export const updateEvents = (events, eventId, userId) => {
  return events.map((event) => {
    if (event.id === eventId) {
      if (!event.participants.includes(userId)) {
        return { ...event, participants: [...event.participants, userId] };
      }
    }
    return event;
  });
};

export const updateUsers = (users, eventId, userId) => {
  return users.map((user) => {
    if (user.id === userId) {
      if (!user.joinedEvents.includes(eventId)) {
        return { ...user, joinedEvents: [...user.joinedEvents, eventId] };
      }
    }
    return user;
  });
};

export const removeEventFromUsers = (users, eventId, userId) => {
  return users.map((user) => {
    if (user.id === userId) {
      return {
        ...user,
        joinedEvents: user.joinedEvents.filter((id) => id !== eventId),
      };
    }
    return user;
  });
};

export const removeUserFromEvents = (events, eventId, userId) => {
  return events.map((event) => {
    if (event.id === eventId) {
      return {
        ...event,
        participants: event.participants.filter((id) => id !== userId),
      };
    }
    return event;
  });
};
