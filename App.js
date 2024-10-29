import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { SignUp } from './screens/SignUp';
import { initializeData } from './services/AddInitialData';
import { AppContextProvider, useAppContext } from './shared/context/AppContext';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export default function App() {
	const { user } = useAppContext();

	useEffect(() => {
		initializeData();
	}, []);

	return (
		<PaperProvider>
			<AppContextProvider>
				<NavigationContainer>
					<Tab.Navigator initialRouteName="signup">
						{user ? (
							<></>
						) : (
							<Stack.Screen name="signup" component={SignUp} />
						)}
					</Tab.Navigator>
				</NavigationContainer>
			</AppContextProvider>
		</PaperProvider>
	);
}

AppRegistry.registerComponent(appName, () => App);
