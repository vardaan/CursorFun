import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {
    Surface,
    Text,
    TouchableRipple,
    FAB,
    Checkbox,
    useTheme,
    Card,
    ActivityIndicator,
    Banner,
} from 'react-native-paper';
import type { Habit } from '../../store/habitSlice';

interface DashboardScreenViewProps {
    habits: Habit[];
    completedHabits: number;
    onToggleHabit: (id: string) => void;
    onAddHabit: () => void;
    isLoading: boolean;
    error: string | null;
}

const DashboardView = ({
    habits,
    completedHabits,
    onToggleHabit,
    onAddHabit,
    isLoading,
    error,
}: DashboardScreenViewProps) => {
    const theme = useTheme();

    const renderHabit = ({ item }: { item: Habit }) => (
        <Card style={styles.habitItem} mode="elevated">
            <TouchableRipple onPress={() => onToggleHabit(item.id)}>
                <View style={styles.habitContent}>
                    <View style={styles.habitInfo}>
                        <Text variant="titleMedium" style={styles.habitName}>
                            {item.name}
                        </Text>
                        <Text variant="bodyMedium" style={styles.habitStreak}>
                            <Text>🔥</Text> {item.streak} days
                        </Text>
                    </View>
                    <Checkbox
                        status={item.completed ? 'checked' : 'unchecked'}
                        onPress={() => onToggleHabit(item.id)}
                        color={theme.colors.primary}
                    />
                </View>
            </TouchableRipple>
        </Card>
    );

    if (isLoading) {
        return (
            <Surface style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" />
                <Text variant="titleMedium" style={styles.loadingText}>
                    Loading habits...
                </Text>
            </Surface>
        );
    }

    return (
        <Surface style={styles.container}>
            {error && (
                <Banner
                    visible={true}
                    icon="alert-circle"
                    actions={[{ label: 'Dismiss', onPress: () => { } }]}>
                    {error}
                </Banner>
            )}
            <Surface style={styles.header} elevation={1}>
                <Text variant="headlineMedium" style={styles.title}>
                    Today's Habits
                </Text>
                <Text variant="titleMedium" style={styles.subtitle}>
                    {completedHabits}/{habits.length} completed
                </Text>
            </Surface>
            <FlatList
                data={habits}
                renderItem={renderHabit}
                keyExtractor={item => item.id}
                style={styles.list}
                contentContainerStyle={[
                    styles.listContent,
                    habits.length === 0 && styles.emptyList,
                ]}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text variant="titleMedium">No habits yet</Text>
                        <Text variant="bodyMedium">
                            Tap the + button to create your first habit
                        </Text>
                    </View>
                }
            />
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={onAddHabit}
                label="Add Habit"
            />
        </Surface>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
    },
    header: {
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
    },
    subtitle: {
        marginTop: 5,
        opacity: 0.7,
    },
    list: {
        flex: 1,
    },
    listContent: {
        padding: 16,
    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        alignItems: 'center',
    },
    habitItem: {
        marginBottom: 12,
    },
    habitContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    habitInfo: {
        flex: 1,
    },
    habitName: {
        fontWeight: '500',
    },
    habitStreak: {
        marginTop: 4,
        opacity: 0.7,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default DashboardView; 