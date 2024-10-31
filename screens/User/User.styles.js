import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	userScreenTexts: {
		marginStart: 20,
		color: '#FFFFFF',
	},
	avatar: {
		backgroundColor: '#DF621E',
		borderRadius: 50,
		width: 50,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 20,
	},
	secondLevelContainer: {
		flex: 1,
	},
	userBio: {
		color: '#FFFFFF',
		marginTop: 10,
		marginStart: 20,
		marginEnd: 20,
	},
	divider: {
		color: '#000000',
		backgroundColor: '#000000',
	},
    buttonsContainer: {
        marginTop: 50
    },
	button: {
		marginHorizontal: 20,
        marginVertical: 5,
		padding: 5,
	},
});