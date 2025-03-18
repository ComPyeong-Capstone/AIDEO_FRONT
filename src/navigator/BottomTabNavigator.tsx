import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddScreenModal from '../screens/bottomtab/3000-AddScreen';
import { COLORS } from '../styles/colors'; // 🎨 색상 파일 가져오기

// ✅ 스크린 가져오기
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

const BottomTabNavigator: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            let iconName = '';
            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Search':
                iconName = focused ? 'search' : 'search-outline';
                break;
              case 'Add':
                iconName = 'add';
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
          tabBarStyle: { backgroundColor: COLORS.background, paddingBottom: 5 },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />

        {/* ✅ + 버튼을 누르면 모달 띄우기 */}
        <Tab.Screen
          name="Add"
          component={View} // ✅ 빈 View 사용
          options={{
            tabBarButton: () => (
              <TouchableOpacity
                style={styles.customButton}
                onPress={() => setModalVisible(true)}
              >
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

      {/* ✅ 모달 추가 */}
      <AddScreenModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

// ✅ 스타일 정의
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  innerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#51BCB4',
    borderRadius: 30,
  },
});

export default BottomTabNavigator;
