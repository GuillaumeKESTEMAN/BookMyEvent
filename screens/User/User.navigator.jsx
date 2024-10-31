import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { User } from './User';
import { UserUpdateForm } from './UserUpdateForm';

export const UserNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName="User">
            <Stack.Screen
                name="User"
                component={User}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UserUpdateForm"
                component={UserUpdateForm}
                options={{
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#212121'
                    },
                    headerTintColor: '#fff'
                }} />
        </Stack.Navigator>
    );
};
