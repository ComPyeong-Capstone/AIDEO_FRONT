import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ✅ 스크린 가져오기
import HomeScreen from '../screens/bottomtab/1000-HomeScreen';
import SearchScreen from '../screens/bottomtab/2000-SearchScreen';
import AddScreen from '../screens/bottomtab/3000-AddScreen';
import NotificationsScreen from '../screens/bottomtab/4000-NotificationsScreen';
import ProfileScreen from '../screens/bottomtab/5000-ProfileScreen';

// ✅ Tab Navigator 생성
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size, focused}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Search':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Add':
              iconName = focused ? 'add-circle' : 'add-circle-outline';
              break;
            case 'Notifications':
              iconName = focused ? 'notifications' : 'notifications-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#51BCB4',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: {backgroundColor: '#1F2C3D', paddingBottom: 5}, // ✅ iOS 하단 문제 해결
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
