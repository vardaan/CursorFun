import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

type FrequencyType = 'daily' | 'weekly' | 'custom';

interface AddHabitScreenViewProps {
    habitName: string;
    onHabitNameChange: (name: string) => void;
    frequency: FrequencyType;
    onFrequencyChange: (frequency: FrequencyType) => void;
    onSubmit: () => void;
    onClose: () => void;
}

const AddHabitScreenView = ({
    habitName,
    onHabitNameChange,
    frequency,
    onFrequencyChange,
    onSubmit,
    onClose,
}: AddHabitScreenViewProps) => {
    const frequencyOptions: FrequencyType[] = ['daily', 'weekly', 'custom'];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}>
                    <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <Text style={styles.title}>Create New Habit</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Habit Name</Text>
                        <TextInput
                            style={styles.input}
                            value={habitName}
                            onChangeText={onHabitNameChange}
                            placeholder="Enter habit name"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Frequency</Text>
                        <View style={styles.frequencyContainer}>
                            {frequencyOptions.map(option => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.frequencyOption,
                                        frequency === option && styles.frequencyOptionSelected,
                                    ]}
                                    onPress={() => onFrequencyChange(option)}>
                                    <Text
                                        style={[
                                            styles.frequencyText,
                                            frequency === option && styles.frequencyTextSelected,
                                        ]}>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, !habitName && styles.buttonDisabled]}
                        onPress={onSubmit}
                        disabled={!habitName}>
                        <Text style={styles.buttonText}>Create Habit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    frequencyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    frequencyOption: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    frequencyOptionSelected: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    frequencyText: {
        color: '#333',
        fontSize: 14,
        fontWeight: '500',
    },
    frequencyTextSelected: {
        color: '#fff',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    closeButton: {
        padding: 5,
    },
    closeButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default AddHabitScreenView; 