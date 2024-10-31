import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { useEvent } from './Event.hook';
import { styles } from './Event.styles';

export const Event = ({ route }) => {
	const { isLoading, event, booking, cancelBooking } = useEvent(
		route.params.event
	);
	const [isShowingCancelModal, setIsShowingCancelModal] = useState(false);

	const showDialog = () => setIsShowingCancelModal(true);
	const hideDialog = () => setIsShowingCancelModal(false);

	if (isLoading) return null;

	return (
		<View style={styles.container}>
			<Image source={{ uri: event.image }} style={styles.image} />
			<View style={styles.informations}>
				<View style={styles.primary}>
					<Text variant="headlineLarge" style={styles.text}>
						{event.title}
					</Text>
					<Text variant="bodyLarge" style={styles.text}>
						{event.description}
					</Text>
				</View>
				<Text variant="bodyLarge" style={styles.text}>
					{event.date}
				</Text>
				<Text variant="bodyLarge" style={styles.text}>
					{event.location}
				</Text>
				<Text variant="bodyLarge" style={styles.text}>
					Added by: {event.creator.name}
				</Text>
				<View style={styles.buttons}>
					{event.isBooked ? (
						<View>
							<Button
								icon="cancel"
								mode="outlined"
								textColor="#DF621E"
								onPress={showDialog}
							>
								Cancel
							</Button>
							<Portal>
								<Dialog
									visible={isShowingCancelModal}
									onDismiss={hideDialog}
								>
									<Dialog.Title>Confirmation</Dialog.Title>
									<Dialog.Content>
										<Text>
											Are you sure you want to cancel your
											booking?
										</Text>
									</Dialog.Content>
									<Dialog.Actions
										style={styles.dialogButtons}
									>
										<Button
											mode="contained"
											buttonColor="#DF621E"
											onPress={cancelBooking}
										>
											Yes
										</Button>
										<Button
											mode="outlined"
											textColor="#DF621E"
											onPress={hideDialog}
										>
											No
										</Button>
									</Dialog.Actions>
								</Dialog>
							</Portal>
						</View>
					) : (
						<Button
							icon="calendar"
							mode="contained"
							buttonColor="#DF621E"
							onPress={booking}
						>
							Register
						</Button>
					)}
				</View>
			</View>
		</View>
	);
};
