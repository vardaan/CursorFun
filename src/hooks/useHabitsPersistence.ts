import {useEffect} from 'react';
import {useAppDispatch} from '../store/hooks';
import {startLoading, loadingFailed, habitsLoaded} from '../store/habitSlice';
import {StorageService} from '../services/storage';

export const useHabitsPersistence = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadHabits = async () => {
      dispatch(startLoading());
      try {
        const habits = await StorageService.loadHabits();
        dispatch(habitsLoaded(habits));
      } catch (error) {
        dispatch(
          loadingFailed(
            error instanceof Error ? error.message : 'Failed to load habits',
          ),
        );
      }
    };

    loadHabits();
  }, [dispatch]);
};
