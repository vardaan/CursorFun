import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Habit} from '../store/habitSlice';

const HABITS_STORAGE_KEY = '@habits_data';

export const StorageService = {
  saveHabits: async (habits: Habit[]): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(habits);
      await AsyncStorage.setItem(HABITS_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving habits:', error);
      throw error;
    }
  },

  loadHabits: async (): Promise<Habit[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(HABITS_STORAGE_KEY);
      return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error loading habits:', error);
      throw error;
    }
  },

  clearHabits: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(HABITS_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing habits:', error);
      throw error;
    }
  },
};
