import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from '../screens/Dashboard';
import AddHabitScreen from '../screens/AddHabit';

export type RootStackParamList = {
    Dashboard: undefined;
    AddHabit: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Dashboard"
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen
                    name="AddHabit"
                    component={AddHabitScreen}
                    options={{
                        presentation: 'modal',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator; 