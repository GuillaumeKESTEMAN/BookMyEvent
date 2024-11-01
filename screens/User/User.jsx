import { View } from 'react-native';
import { Button, Icon, Text } from 'react-native-paper';
import { ScreenView } from '../../shared/components/ScreenView';
import { useAppContext } from '../../shared/context/AppContext';
import { styles } from './User.styles';

export function User({ navigation }) {
	const { user, logout, deleteAccount } = useAppContext();

	return (
		<ScreenView>
			<View style={styles.infoRow}>
				<View style={styles.avatar}>
					<Icon source="account" size={40} color="#000000" />
				</View>
				<Text style={styles.userScreenTexts}>{user.name}</Text>
			</View>
			<View style={styles.secondLevelContainer}>
				<Text style={styles.userScreenTexts}>Bio :</Text>
				<Text style={styles.userBio}>{user.bio}</Text>
			</View>

			<View style={styles.buttonsContainer}>
				<Button
					icon="information"
					mode="contained"
					buttonColor="#DF621E"
					textColor="#000000"
					style={styles.button}
					onPress={() => {
						navigation.navigate('UserUpdateForm');
					}}
				>
					Update Info
				</Button>

				<Button
					icon="logout"
					mode="contained"
					buttonColor="#DF621E"
					textColor="#000000"
					style={styles.button}
					onPress={() => {
						logout();
					}}
				>
					Log Out
				</Button>

				<Button
					icon="account-remove"
					mode="contained"
					buttonColor="#DF621E"
					textColor="#000000"
					style={styles.button}
					onPress={() => {
						deleteAccount();
					}}
				>
					Delete Account
				</Button>
			</View>
		</ScreenView>
	);
}
