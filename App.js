import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';

export default function App() {
	return (
		<PaperProvider>
			<View style={styles.container}>
				<Text>Open up App.js to start working on your app!</Text>
			</View>
		</PaperProvider>
	);
}

AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
