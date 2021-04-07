import React from 'react';
import color from 'color';
import { useTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import overlay from './scripts/overlay';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import CoursesScreen from './screens/CoursesScreen';
import MessageScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/UserScreen';
import CourseScreen from './screens/CourseScreen';
import CalendarScreen from './screens/CalendarScreen';
import ParametersScreen from './screens/ParametersScreen';

const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  const theme = useTheme();
  const tabBarColor = theme.dark
    ? (overlay(6, theme.colors.surface))
    : theme.colors.surface;

  return (
    <Tab.Navigator 
      initialRouteName="Feed"
      backBehavior="initialRoute"
      shifting={true}
      activeColor={theme.colors.primary}
      inactiveColor={color(theme.colors.text)
        .alpha(0.6)
        .rgb()
        .string()}
    >
      <Tab.Screen 
        name="Accueil" 
        component={HomeScreen} 
        options={{
          tabBarIcon: 'home-account',
          tabBarColor,
        }}
      />
      <Tab.Screen 
        name="Cours" 
        component={CoursesScreen} 
        options={{
          tabBarIcon: 'school',
          tabBarColor,
        }} 
      />
      <Tab.Screen 
        name="Messages" 
        component={MessageScreen} 
        options={{
          tabBarIcon: 'message-text-outline',
          tabBarColor,
        }} 
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="FeedList"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen
        name="FeedList"
        component={BottomTabs}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
          return { headerTitle: routeName };
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: 'Profil' }}
      />
      <Stack.Screen
        name="Course"
        component={CourseScreen}
        options={{ headerTitle: 'Parcours' }}
      />
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ headerTitle: 'Calendrier' }}
      />
      <Stack.Screen
        name="Parameters"
        component={ParametersScreen}
        options={{ headerTitle: 'Préférences' }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;