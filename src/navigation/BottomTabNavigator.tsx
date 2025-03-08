import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ✅ 스크린 가져오기 (ShortsVideoScreen 제거)
import HomeScreen from '../bottomtab/HomeScreen';
import SearchScreen from '../bottomtab/SearchScreen';
import AddScreen from '../bottomtab/AddScreen';
import NotificationsScreen from '../bottomtab/NotificationsScreen';
import ProfileScreen from '../bottomtab/ProfileScreen';

// ✅ Tab Navigator 생성
const Tab = createBottomTabNavigator();

// 📌 ✅ 아이콘 반환 함수 (렌더링 최적화)
const getTabBarIcon = (routeName, color, size) => {
  let iconName;

  if (routeName === 'Home') {
    iconName = 'home-outline';
  } else if (routeName === 'Search') {
    iconName = 'search-outline';
  } else if (routeName === 'Add') {
    iconName = 'add-circle-outline';
  } else if (routeName === 'Notifications') {
    iconName = 'notifications-outline';
  } else if (routeName === 'Profile') {
    iconName = 'person-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => getTabBarIcon(route.name, color, size), // ✅ 함수 호출
        tabBarActiveTintColor: '#51BCB4',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: {backgroundColor: '#1F2C3D'},
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
