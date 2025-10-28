import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './components/navigation/RootNavigator';
import RootNavigator from './components/navigation/RootNavigator';

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
}
