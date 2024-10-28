import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { name as appName } from './app.json';

import SignIn from './pages/SignIn';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<PaperProvider>
			<NavigationContainer>
				<Tab.Navigator
					initialRouteName='login'
				>
					<Stack.Screen
						name='login'
						component={SignIn}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}

AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
});
