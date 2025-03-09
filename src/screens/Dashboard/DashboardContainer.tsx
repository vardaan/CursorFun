import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toggleHabit } from '../../store/habitSlice';
import DashboardView from './DashboardView';

type DashboardContainerProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
};

const DashboardContainer = ({ navigation }: DashboardContainerProps) => {
    const dispatch = useAppDispatch();
    const { habits, isLoading, error } = useAppSelector(state => state.habits);
    const completedHabits = habits.filter(habit => habit.completed).length;

    const handleToggleHabit = (id: string) => {
        dispatch(toggleHabit(id));
    };

    const handleAddHabit = () => {
        navigation.navigate('AddHabit');
    };

    return (
        <DashboardView
            habits={habits}
            completedHabits={completedHabits}
            onToggleHabit={handleToggleHabit}
            onAddHabit={handleAddHabit}
            isLoading={isLoading}
            error={error}
        />
    );
};

export default DashboardContainer; 