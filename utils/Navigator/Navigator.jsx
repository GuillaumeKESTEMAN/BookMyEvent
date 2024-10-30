import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Home } from '../../screens/Homescreen';
import { SignIn } from '../../screens/SignIn';
import { SignUp } from '../../screens/SignUp';
import { User } from '../../screens/User';
import { useAppContext } from '../../shared/context/AppContext';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export const Navigator = () => {
	const { user } = useAppContext();

	return (
		<NavigationContainer>
			{user ? (
				<Tab.Navigator
					initialRouteName="Home"
					screenOptions={{
						headerShown: false,
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
						name="Home"
						component={Home}
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
						}}
					/>
					<Tab.Screen
						name="User"
						component={User}
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
