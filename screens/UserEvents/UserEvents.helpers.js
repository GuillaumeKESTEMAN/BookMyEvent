import { getEvents } from "../../utils/getEvents";

const getFilteredEvents = async (requiredLength, userId, filterFn) => {
    const events = await getEvents();
    if (!events || events.length === 0) {
        return [[], 0];
    }
    const filteredEvents = events.filter(filterFn);
    return [filteredEvents.slice(0, requiredLength), filteredEvents.length];
};

export const getUserCreatedPaginatedEventsHelper = (requiredLength, userId) => {
    return getFilteredEvents(requiredLength, userId, (event) => event.creator === userId);
};

export const getUserSubscribedPaginatedEventsHelper = (requiredLength, userId) => {
    return getFilteredEvents(requiredLength, userId, (event) => event.participants.includes(userId));
};