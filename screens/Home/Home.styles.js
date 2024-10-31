import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	header: {
		paddingVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
        color: '#FFF',
		fontSize: 16,
		textAlign: 'center',
		paddingBottom: 5,
	},
	subtitle: {
        color: '#FFF',
		fontSize: 16,
	},
	addButtonContainer: {
		marginVertical: 10,
		paddingBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	addButton: {
		fontSize: 16,
		paddingRight: 15,
		borderRadius: 10,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	addButtonText: {
		fontSize: 16,
	},
	category: {
		fontSize: 24,
		fontWeight: 'bold',
		paddingBottom: 10,
	},
	item: {
		paddingVertical: 5,
	},
    noEvents: {
        color: '#FFF'
    },
    snackbarWrapper: { 
        position: 'absolute', 
        bottom: 0,
        left: 0, 
        right: 0, 
        zIndex: 1, 
        backgroundColor: 'white',
    },
    snackMessage: {
        color: '#000'
    }
});
