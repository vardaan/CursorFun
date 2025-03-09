import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
    Surface,
    Text,
    TextInput,
    Button,
    IconButton,
    SegmentedButtons,
    useTheme,
} from 'react-native-paper';

type FrequencyType = 'daily' | 'weekly' | 'custom';

interface AddHabitViewProps {
    habitName: string;
    onHabitNameChange: (name: string) => void;
    frequency: FrequencyType;
    onFrequencyChange: (frequency: FrequencyType) => void;
    onSubmit: () => void;
    onClose: () => void;
}

const AddHabitView = ({
    habitName,
    onHabitNameChange,
    frequency,
    onFrequencyChange,
    onSubmit,
    onClose,
}: AddHabitViewProps) => {
    const theme = useTheme();

    const frequencyButtons = [
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'custom', label: 'Custom' },
    ];

    return (
        <Surface style={styles.container}>
            <Surface style={styles.header} elevation={1}>
                <IconButton
                    icon="close"
                    size={24}
                    onPress={onClose}
                />
                <Text variant="headlineMedium" style={styles.title}>
                    Create New Habit
                </Text>
            </Surface>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <View style={styles.inputContainer}>
                        <Text variant="titleMedium" style={styles.label}>
                            Habit Name
                        </Text>
                        <TextInput
                            mode="outlined"
                            value={habitName}
                            onChangeText={onHabitNameChange}
                            placeholder="Enter habit name"
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text variant="titleMedium" style={styles.label}>
                            Frequency
                        </Text>
                        <SegmentedButtons
                            value={frequency}
                            onValueChange={value => onFrequencyChange(value as FrequencyType)}
                            buttons={frequencyButtons}
                        />
                    </View>

                    <Button
                        mode="contained"
                        onPress={onSubmit}
                        disabled={!habitName}
                        style={styles.button}>
                        Create Habit
                    </Button>
                </View>
            </ScrollView>
        </Surface>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 16,
    },
    title: {
        fontWeight: 'bold',
        marginTop: 8,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    inputContainer: {
        marginBottom: 24,
    },
    label: {
        marginBottom: 8,
    },
    input: {
        backgroundColor: 'transparent',
    },
    button: {
        marginTop: 16,
        padding: 4,
    },
});

export default AddHabitView; 