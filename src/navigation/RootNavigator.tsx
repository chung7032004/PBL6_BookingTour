import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigation from './app.navigation';
import LoginScreen from '../Auth/LoginScreen';
import SignUpScreen from '../Auth/SignUpScreen';
import ForgotPasswordScreen from '../Auth/ForgotPasswordScreen';
import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';
import VerifyCodeScreen from '../Auth/VerifyCodeScreen';
import ResetPasswordScreen from '../Auth/ResetPasswordScreen';
import NoticeScreen from '../Home/NoticeScreen';
export const navigationRef = createNavigationContainerRef<RootStackParamList>();
const Root = createNativeStackNavigator();

const RootNavigator = () => (
  <Root.Navigator screenOptions={{ headerShown: false }}>
    <Root.Screen name="AppTabs" component={AppNavigation} />

    <Root.Screen
      name="login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Root.Screen
      name="signup"
      component={SignUpScreen}
      options={{ headerShown: false }}
    />
    <Root.Screen
      name="forgotPassword"
      component={ForgotPasswordScreen}
      options={{ headerShown: false }}
    />
    <Root.Screen
      name="verifyCode"
      component={VerifyCodeScreen}
      options={{ headerShown: false }}
    />
    <Root.Screen
      name="resetPassword"
      component={ResetPasswordScreen}
      options={{ headerShown: false }}
    />
    <Root.Screen
      name="notice"
      component={NoticeScreen}
      options={{ title: 'Thông báo', headerShown: true }}
    />
  </Root.Navigator>
);

export default RootNavigator;
