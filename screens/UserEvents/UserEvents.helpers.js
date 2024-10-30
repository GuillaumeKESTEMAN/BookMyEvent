import AsyncStorage from "@react-native-async-storage/async-storage";
import { getEvents } from "../../utils/getEvents";

export const getUserCreatedPaginatedEventsHelper = async (requiredLength, userId) => {
  try {
    const events = getEvents();
    const filteredEvents = events.filter((event) => event.creator === userId);
    return [filteredEvents.slice(0, requiredLength), filteredEvents.length];
  } catch (error) {
    return "An error occurred while getting events.";
  }
}

export const getUserSubscribedPaginatedEventsHelper = async (requiredLength, userId) => {
  try {
    const events = getEvents();
    const filteredEvents = events.filter((event) => event.participants.includes(userId));
    return [filteredEvents.slice(0, requiredLength), filteredEvents.length];
  } catch (error) {
    return "An error occurred while getting events.";
  }
}
