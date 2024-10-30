import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { Home } from './screens/Homescreen';
import { SignIn } from './screens/SignIn';
import { SignUp } from './screens/SignUp';
import { User } from './screens/User';
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
					{user ? (
						<Tab.Navigator
							initialRouteName="Home"
							screenOptions={{
								headerShown: false,
							}}
						>
							<Tab.Screen name="Home" component={Home} />
							<Tab.Screen name="User" component={User} />
						</Tab.Navigator>
					) : (
						<Stack.Navigator
							initialRouteName="sign-in"
							screenOptions={{
								headerShown: false,
							}}
						>
							<Stack.Screen name="sign-in" component={SignIn} />
							<Stack.Screen name="sign-up" component={SignUp} />
						</Stack.Navigator>
					)}
				</NavigationContainer>
			</AppContextProvider>
		</PaperProvider>
	);
}

AppRegistry.registerComponent(appName, () => App);
