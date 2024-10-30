import { useEffect } from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { initializeData } from './services/AddInitialData';
import { AppContextProvider } from './shared/context/AppContext';
import { Navigator } from './utils/Navigator';

export default function App() {
	useEffect(() => {
		initializeData();
	}, []);

	return (
		<PaperProvider>
			<AppContextProvider>
				<Navigator />
			</AppContextProvider>
		</PaperProvider>
	);
}

AppRegistry.registerComponent(appName, () => App);
