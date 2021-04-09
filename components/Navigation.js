import React,{useEffect} from 'react';
import color from 'color';
import { useTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { gql, useQuery } from '@apollo/client';
import overlay from '../scripts/overlay';

import DashboardScreen from '../screens/DashboardScreen';
import CoursesScreen from '../screens/CoursesScreen';
import MessageScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/UserScreen';
import CourseScreen from '../screens/CourseScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ParametersScreen from '../screens/ParametersScreen';
import Header from '../components/Header';
import Login from '../components/Login';

const AUTHENTICATED_USER = gql`
  query authenticatedUser {
    authenticatedUser {
      id 
    }
  }
`;

const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  const theme = useTheme();
  const tabBarColor = theme.dark
    ? (overlay(6, theme.colors.surface))
    : theme.colors.surface;

  return (
    <Tab.Navigator 
      initialRouteName="Dashboard"
      backBehavior="initialRoute"
      shifting={true}
      activeColor={theme.colors.primary}
      inactiveColor={color(theme.colors.text)
        .alpha(0.6)
        .rgb()
        .string()}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: 'view-dashboard',
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
      <Tab.Screen 
        name="Calendrier" 
        component={CalendarScreen} 
        options={{
          tabBarIcon: 'calendar',
          tabBarColor,
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

const Navigation = () => {
  const {data} = useQuery(AUTHENTICATED_USER)
  useEffect(() => { console.log(data) }, [data])

  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
    {/* {(data === undefined || data.authenticatedUser === null )  
    ? <Stack.Screen
        name="Login"
        component={Login}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Login';
          return { headerTitle: routeName };
        }}
      />
    : <> */}
        <Stack.Screen
          name="Dashboard"
          component={BottomTabs}
          options={({ route }) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? 'Dashboard';
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
          name="Parameters"
          component={ParametersScreen}
          options={{ headerTitle: 'Préférences' }}
        />
      {/* </>
    } */}
    </Stack.Navigator>
  );
};

export default Navigation;