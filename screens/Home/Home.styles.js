import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	header: {
		paddingVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 16,
		textAlign: 'center',
		paddingBottom: 5,
	},
	subtitle: {
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
		backgroundColor: 'orange',
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
		paddingVertical: 10,
	},
    snackbarWrapper: { 
        position: 'absolute', 
        bottom: 0,
        left: 0, 
        right: 0, 
        zIndex: 1, 
    }
});
