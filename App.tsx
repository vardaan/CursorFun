/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import { useHabitsPersistence } from './src/hooks/useHabitsPersistence';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const theme = {
  ...DefaultTheme,
  // You can customize your theme here if needed
};

const AppContent = () => {
  useHabitsPersistence();
  return <AppNavigator />;
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PaperProvider
        theme={theme}
        settings={{
          icon: props => <MaterialCommunityIcons {...props} />,
        }}>
        <AppContent />
      </PaperProvider>
    </Provider>
  );
}

export default App;
