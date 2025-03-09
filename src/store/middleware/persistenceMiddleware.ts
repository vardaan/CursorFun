import {Middleware} from '@reduxjs/toolkit';
import {StorageService} from '../../services/storage';

// Actions that should trigger a save
const SAVE_TRIGGERS = [
  'habits/addHabit',
  'habits/toggleHabit',
  'habits/updateStreak',
  'habits/deleteHabit',
];

export const persistenceMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if (SAVE_TRIGGERS.includes(action.type)) {
    const state = store.getState();
    StorageService.saveHabits(state.habits.habits).catch(error => {
      console.error('Failed to save habits:', error);
      store.dispatch({type: 'habits/loadingFailed', payload: error.message});
    });
  }

  return result;
};
