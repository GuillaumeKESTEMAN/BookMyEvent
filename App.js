import { useEffect } from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { AppContextProvider } from './shared/context/AppContext';
import { initializeData } from './utils/initializeData';
import { Navigator } from './utils/Navigator';
import { HalloweenTheme } from './halloweenTheme';

export default function App() {
	useEffect(() => {
		initializeData();
	}, []);

	return (
		<PaperProvider theme={HalloweenTheme}>
			<AppContextProvider>
				<Navigator />
			</AppContextProvider>
		</PaperProvider>
	);
}

AppRegistry.registerComponent(appName, () => App);
