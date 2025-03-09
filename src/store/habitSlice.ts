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
}

const initialState: HabitState = {
  habits: [
    {
      id: '1',
      name: 'Morning Exercise',
      completed: false,
      frequency: 'daily',
      streak: 3,
    },
    {
      id: '2',
      name: 'Read 30 minutes',
      completed: false,
      frequency: 'daily',
      streak: 5,
    },
  ],
};

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
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
    },
    toggleHabit: (state, action: PayloadAction<string>) => {
      const habit = state.habits.find(h => h.id === action.payload);
      if (habit) {
        habit.completed = !habit.completed;
      }
    },
    updateStreak: (state, action: PayloadAction<string>) => {
      const habit = state.habits.find(h => h.id === action.payload);
      if (habit) {
        habit.streak += 1;
      }
    },
    deleteHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter(habit => habit.id !== action.payload);
    },
  },
});

export const {addHabit, toggleHabit, updateStreak, deleteHabit} =
  habitSlice.actions;
export default habitSlice.reducer;
