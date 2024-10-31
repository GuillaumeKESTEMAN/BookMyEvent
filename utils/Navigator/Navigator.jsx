import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Event } from '../../screens/Event';
import { NewEvent } from '../../screens/NewEvent';
import { Home } from '../../screens/Home';
import { SignIn } from '../../screens/SignIn';
import { SignUp } from '../../screens/SignUp';
import { UserNavigator } from '../../screens/User';
import { UserEvents } from '../../screens/UserEvents';
import { useAppContext } from '../../shared/context/AppContext';

import { styles } from './Navigator.styles';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function HeaderComponent(title) {
	return (
		<View style={styles.container}>
			<Image
				source={require('../../assets/logo.png')}
				style={styles.img}
			/>

			<View style={styles.titleContainer}>
				<Text style={styles.title}>
					{title}
				</Text>
			</View>
		</View>
	)
}

const HomeStack = () => (
	<Stack.Navigator initialRouteName="Home">
		<Stack.Screen
			name="Home"
			component={Home}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="Event"
			component={Event}
			options={{ 
                headerTitle: '',
                headerStyle: {
                    backgroundColor: '#212121'
                },
                headerTintColor: '#fff'
            }}
		/>
        <Stack.Screen
			name="NewEvent"
			component={NewEvent}
			options={{ 
                headerTitle: '' ,
                headerStyle: {
                    backgroundColor: '#212121'
                },
                headerTintColor: '#fff'
            }}
		/>
	</Stack.Navigator>
);

export const Navigator = () => {
	const { user, loginFromCache } = useAppContext();

	useEffect(() => {
		loginFromCache();
	}, []);

	return (
		<NavigationContainer>
			{user ? (
				<Tab.Navigator
					initialRouteName="Home"
					screenOptions={{
						headerStyle: {
							backgroundColor: '#2D2A2A',
						},
						headerTintColor: '#fff',
						headerTitleStyle: {
							fontWeight: 'bold',
							textAlign: 'center',
						},
					}}
					tabBar={({ navigation, state, descriptors, insets }) => (
						<BottomNavigation.Bar
							navigationState={state}
							safeAreaInsets={insets}
							onTabPress={({ route, preventDefault }) => {
								const event = navigation.emit({
									type: 'tabPress',
									target: route.key,
									canPreventDefault: true,
								});

								if (event.defaultPrevented) {
									preventDefault();
								} else {
									navigation.dispatch({
										...CommonActions.navigate(
											route.name,
											route.params
										),
										target: state.key,
									});
								}
							}}
							renderIcon={({ route, focused, color }) => {
								const { options } = descriptors[route.key];
								if (options.tabBarIcon) {
									return options.tabBarIcon({
										focused,
										color,
										size: 24,
									});
								}

								return null;
							}}
							getLabelText={({ route }) => {
								const { options } = descriptors[route.key];
								const label =
									options.tabBarLabel !== undefined
										? options.tabBarLabel
										: options.title !== undefined
										? options.title
										: route.title;

								return label;
							}}
						/>
					)}
				>
					<Tab.Screen
						name="UserEvents"
						component={UserEvents}
						options={{
							tabBarLabel: 'My Events',
							tabBarIcon: ({ color, size }) => {
								return (
									<Icon
										name="account"
										size={size}
										color={color}
									/>
								);
							},
							headerTitle: () => HeaderComponent('User Events')
						}}
					/>
					<Tab.Screen
						name="HomeStack"
						component={HomeStack}
						options={{
							tabBarLabel: 'Home',
							tabBarIcon: ({ color, size }) => {
								return (
									<Icon
										name="home"
										size={size}
										color={color}
									/>
								);
							},
							headerTitle: () => HeaderComponent('Home')
						}}
					/>
					<Tab.Screen
						name="Account"
						component={UserNavigator}
						options={{
							tabBarLabel: 'Account',
							tabBarIcon: ({ color, size }) => {
								return (
									<Icon
										name="account"
										size={size}
										color={color}
									/>
								);
							},
							headerTitle: () => HeaderComponent('Account')
						}}
					/>
				</Tab.Navigator>
			) : (
				<Stack.Navigator
					initialRouteName="SignIn"
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="SignIn" component={SignIn} />
					<Stack.Screen name="SignUp" component={SignUp} />
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
};
