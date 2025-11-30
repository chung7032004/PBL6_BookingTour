import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeStack from './app.home';
import SearchStack from './app.search';
import BookingStack from './app.booking';
import WishListStack from './app.wishlist';
import ProfileStack from './app.profile';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 14 },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="homeTab"
        component={HomeStack}
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="searchTab"
        component={SearchStack}
        options={{
          title: 'Tìm kiếm',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="bookingTab"
        component={BookingStack}
        options={{
          title: 'Booking',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="calendar-month" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="wishListTab"
        component={WishListStack}
        options={{
          title: 'Yêu thích',
          unmountOnBlur: true,
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="favorite-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profileTab"
        component={ProfileStack}
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;
