import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useAppContext } from '../../shared/context/AppContext';
import { getEvents } from '../../utils/getEvents';
import { getUsers } from '../../utils/getUsers';

export const useEvent = (givenEvent) => {
	const { user: currentUser } = useAppContext();
	const [isLoading, setIsLoading] = useState(true);
	const [event, setEvent] = useState();

	const booking = async () => {
		setEvent((oldEvent) => {
			const newParticipants = [...oldEvent.participants, currentUser.id];
			const newEvent = {
				...oldEvent,
				participants: newParticipants,
				isBooked: true,
			};
			updateEvents(newEvent);
			return newEvent;
		});
	};

	const cancelBooking = async () => {
		setEvent((oldEvent) => {
			const newParticipants = oldEvent.participants.filter(
				(participant) => participant !== currentUser.id
			);
			const newEvent = {
				...oldEvent,
				participants: newParticipants,
				isBooked: false,
			};
			updateEvents(newEvent);
			return newEvent;
		});
	};

	const updateEvents = async (updatedEvent) => {
		const events = await getEvents();

		await AsyncStorage.setItem(
			'events',
			JSON.stringify(
				events.map((currentEvent) => {
					if (currentEvent.id === updatedEvent.id) {
						return {
							...updatedEvent,
							creator: updatedEvent.creator.id,
							isBooked: undefined,
						};
					}
					return currentEvent;
				})
			)
		);
	};

	useEffect(() => {
		(async function () {
			try {
				setIsLoading(true);
				const users = await getUsers();

				const creator = users.find(
					(user) => user.id === givenEvent.creator
				);

				if (!creator) {
					throw new Error('Creator not found');
				}

				setEvent({
					...givenEvent,
					creator,
					isBooked:
						givenEvent.participants.find(
							(participantId) => participantId === currentUser.id
						) ?? false,
				});
			} catch (err) {
				Alert.alert(
					'Error',
					'An error occurred while loading the event data.'
				);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	return { isLoading, event, booking, cancelBooking };
};
