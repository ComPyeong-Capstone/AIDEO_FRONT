import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddScreenModal from '../screens/bottomtab/3000-AddScreen';
import {COLORS} from '../styles/colors';
import {scaleSize} from '../styles/responsive';

import HomeScreen from '../screens/bottomtab/1000-HomeScreen';
import SearchScreen from '../screens/bottomtab/2000-SearchScreen';
import NotificationsScreen from '../screens/bottomtab/4000-NotificationsScreen';
import ProfileScreen from '../screens/bottomtab/5000-ProfileScreen';
import {BottomTabParamList} from '../types/navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const getTabBarIcon = (
  routeName: keyof BottomTabParamList,
  focused: boolean,
  color: string,
  size: number,
) => {
  let iconName: string;

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
    default:
      iconName = 'ellipse';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const AddTabBarButton: React.FC<{onPress: () => void}> = ({onPress}) => (
  <TouchableOpacity style={styles.customButton} onPress={onPress}>
    <View style={styles.innerButton}>
      <Ionicons name="add" size={scaleSize(30)} color="#fff" />
    </View>
  </TouchableOpacity>
);

const BottomTabNavigator: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) =>
          ({
            headerShown: false,
            tabBarIcon: ({color, size, focused}) =>
              getTabBarIcon(
                route.name as keyof BottomTabParamList,
                focused,
                color,
                size,
              ),
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: '#aaa',
            tabBarStyle: styles.tabBarStyle,
          } as BottomTabNavigationOptions)
        }>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen
          name="Add"
          component={() => <></>}
          options={{
            tabBarButton: () => (
              <AddTabBarButton onPress={() => setModalVisible(true)} />
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
    top: Platform.OS === 'ios' ? -scaleSize(20) : -scaleSize(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(35),
    backgroundColor: '#FFFFFF',
    width: scaleSize(70),
    height: scaleSize(70),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  innerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleSize(60),
    height: scaleSize(60),
    backgroundColor: COLORS.primary,
    borderRadius: scaleSize(30),
  },
  tabBarStyle: {
    height: scaleSize(60),
    paddingBottom: Platform.OS === 'ios' ? scaleSize(10) : scaleSize(5),
  },
});

export default BottomTabNavigator;
