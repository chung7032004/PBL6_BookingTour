import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigation from './app.navigation';
import LoginScreen from '../Auth/LoginScreen';
import SignUpScreen from '../Auth/SignUpScreen';
import ForgotPasswordScreen from '../Auth/ForgetPasswordScreen';
import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';
import VerifyCodeScreen from '../Auth/VerifyCodeScreen';
import ResetPasswordScreen from '../Auth/ResetPasswordScreen';
export const navigationRef = createNavigationContainerRef<RootStackParamList>();
const Root = createNativeStackNavigator();

const RootNavigator = () => (
  <Root.Navigator screenOptions={{ headerShown: false }}>
    <Root.Screen name="AppTabs" component={AppNavigation} />

    <Root.Screen
      name="login"
      component={LoginScreen}
      options={{ title: 'Login', headerShown: false }}
    />
    <Root.Screen
      name="signup"
      component={SignUpScreen}
      options={{ title: 'Sign Up', headerShown: false }}
    />
    <Root.Screen
      name="forgotPassword"
      component={ForgotPasswordScreen}
      options={{ title: 'Forgot Password', headerShown: false }}
    />
    <Root.Screen
      name="verifyCode"
      component={VerifyCodeScreen}
      options={{ title: 'Forgot Password', headerShown: false }}
    />
    <Root.Screen
      name="resetPassword"
      component={ResetPasswordScreen}
      options={{ title: 'Forgot Password', headerShown: false }}
    />
  </Root.Navigator>
);

export default RootNavigator;
