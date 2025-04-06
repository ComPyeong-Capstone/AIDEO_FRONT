import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddScreenModal from '../screens/bottomtab/3000-AddScreen';
import {COLORS} from '../styles/colors';

import HomeScreen from '../screens/bottomtab/1000-HomeScreen';
import SearchScreen from '../screens/bottomtab/2000-SearchScreen';
import NotificationsScreen from '../screens/bottomtab/4000-NotificationsScreen';
import ProfileScreen from '../screens/bottomtab/5000-ProfileScreen';

type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Add: undefined;
  Notifications: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

// ✅ tabBarIcon 외부 함수로 분리
const getTabBarIcon = (
  routeName: keyof BottomTabParamList,
  focused: boolean,
  color: string,
  size: number,
) => {
  let iconName = '';

  switch (routeName) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Search':
      iconName = 'search';
      break;
    case 'Add':
      iconName = 'add';
      break;
    case 'Notifications':
      iconName = 'notifications';
      break;
    case 'Profile':
      iconName = 'person';
      break;
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const BottomTabNavigator: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, size, focused}) =>
            getTabBarIcon(route.name, focused, color, size),
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: '#aaa',
          tabBarStyle: styles.tabBarStyle,
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />

        <Tab.Screen
          name="Add"
          component={View} // 빈 View
          options={{
            tabBarButton: () => (
              <TouchableOpacity
                style={styles.customButton}
                onPress={() => setModalVisible(true)}>
                <View style={styles.innerButton}>
                  <Ionicons name="add" size={30} color="#fff" />
                </View>
              </TouchableOpacity>
            ),
          }}
        />

        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>

      <AddScreenModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  customButton: {
    top: -15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    backgroundColor: '#FFFFF',
    width: 70,
    height: 70,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  innerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
  },
  tabBarStyle: {
    height: 60,
  },
});

export default BottomTabNavigator;
