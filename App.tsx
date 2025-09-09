import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './navigation/app.navigation';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}
