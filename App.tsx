import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigation/RootNavigator';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
}
