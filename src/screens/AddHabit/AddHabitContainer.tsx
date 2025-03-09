import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useAppDispatch } from '../../store/hooks';
import { addHabit } from '../../store/habitSlice';
import AddHabitView from './AddHabitView';

type AddHabitContainerProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'AddHabit'>;
};

type FrequencyType = 'daily' | 'weekly' | 'custom';

const AddHabitContainer = ({ navigation }: AddHabitContainerProps) => {
    const dispatch = useAppDispatch();
    const [habitName, setHabitName] = useState('');
    const [frequency, setFrequency] = useState<FrequencyType>('daily');

    const handleSubmit = () => {
        dispatch(addHabit({
            name: habitName,
            frequency: frequency,
        }));
        navigation.goBack();
    };

    const handleClose = () => {
        navigation.goBack();
    };

    return (
        <AddHabitView
            habitName={habitName}
            onHabitNameChange={setHabitName}
            frequency={frequency}
            onFrequencyChange={setFrequency}
            onSubmit={handleSubmit}
            onClose={handleClose}
        />
    );
};

export default AddHabitContainer; 