import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleHabit } from '../store/habitSlice';
import DashboardScreenView from './DashboardScreenView';

type DashboardScreenContainerProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
};

const DashboardScreenContainer = ({ navigation }: DashboardScreenContainerProps) => {
    const dispatch = useAppDispatch();
    const habits = useAppSelector(state => state.habits.habits);
    const completedHabits = habits.filter(habit => habit.completed).length;

    const handleToggleHabit = (id: string) => {
        dispatch(toggleHabit(id));
    };

    const handleAddHabit = () => {
        navigation.navigate('AddHabit');
    };

    return (
        <DashboardScreenView
            habits={habits}
            completedHabits={completedHabits}
            onToggleHabit={handleToggleHabit}
            onAddHabit={handleAddHabit}
        />
    );
};

export default DashboardScreenContainer; 