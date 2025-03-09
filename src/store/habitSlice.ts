import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Habit {
  id: string;
  name: string;
  completed: boolean;
  frequency: 'daily' | 'weekly' | 'custom';
  streak: number;
}

interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  error: string | null;
  lastSynced: string | null;
}

const initialState: HabitState = {
  habits: [],
  isLoading: false,
  error: null,
  lastSynced: null,
};

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    startLoading: state => {
      state.isLoading = true;
      state.error = null;
    },
    loadingFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    habitsLoaded: (state, action: PayloadAction<Habit[]>) => {
      state.habits = action.payload;
      state.isLoading = false;
      state.error = null;
      state.lastSynced = new Date().toISOString();
    },
    addHabit: (
      state,
      action: PayloadAction<Omit<Habit, 'id' | 'completed' | 'streak'>>,
    ) => {
      const newHabit: Habit = {
        ...action.payload,
        id: Date.now().toString(), // Simple ID generation
        completed: false,
        streak: 0,
      };
      state.habits.push(newHabit);
      state.lastSynced = new Date().toISOString();
    },
    toggleHabit: (state, action: PayloadAction<string>) => {
      const habit = state.habits.find(h => h.id === action.payload);
      if (habit) {
        habit.completed = !habit.completed;
        state.lastSynced = new Date().toISOString();
      }
    },
    updateStreak: (state, action: PayloadAction<string>) => {
      const habit = state.habits.find(h => h.id === action.payload);
      if (habit) {
        habit.streak += 1;
        state.lastSynced = new Date().toISOString();
      }
    },
    deleteHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter(habit => habit.id !== action.payload);
      state.lastSynced = new Date().toISOString();
    },
  },
});

export const {
  startLoading,
  loadingFailed,
  habitsLoaded,
  addHabit,
  toggleHabit,
  updateStreak,
  deleteHabit,
} = habitSlice.actions;
export default habitSlice.reducer;
