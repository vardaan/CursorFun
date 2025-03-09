import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import type { Habit } from '../store/habitSlice';

interface DashboardScreenViewProps {
    habits: Habit[];
    completedHabits: number;
    onToggleHabit: (id: string) => void;
    onAddHabit: () => void;
}

const DashboardScreenView = ({
    habits,
    completedHabits,
    onToggleHabit,
    onAddHabit,
}: DashboardScreenViewProps) => {
    const renderHabit = ({ item }: { item: Habit }) => (
        <TouchableOpacity
            style={[styles.habitItem, item.completed && styles.habitItemCompleted]}
            onPress={() => onToggleHabit(item.id)}>
            <View style={styles.habitInfo}>
                <Text style={styles.habitName}>{item.name}</Text>
                <Text style={styles.habitStreak}>🔥 {item.streak} days</Text>
            </View>
            <View
                style={[styles.checkbox, item.completed && styles.checkboxCompleted]}
            />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Today's Habits</Text>
                <Text style={styles.subtitle}>
                    {completedHabits}/{habits.length} completed
                </Text>
            </View>
            <FlatList
                data={habits}
                renderItem={renderHabit}
                keyExtractor={item => item.id}
                style={styles.list}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={onAddHabit}>
                <Text style={styles.addButtonText}>+ Add New Habit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    list: {
        flex: 1,
    },
    habitItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginHorizontal: 15,
        marginVertical: 8,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    habitItemCompleted: {
        backgroundColor: '#f8f8f8',
    },
    habitInfo: {
        flex: 1,
    },
    habitName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    habitStreak: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ddd',
        marginLeft: 10,
    },
    checkboxCompleted: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        margin: 15,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default DashboardScreenView; 