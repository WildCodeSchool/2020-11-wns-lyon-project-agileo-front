import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React from 'react';
import { ApolloClient, ApolloProvider,createHttpLink, InMemoryCache } from '@apollo/client';
import { DefaultTheme, DarkTheme, Provider as PaperProvider } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./components/DrawerContent";
import Navigation from './components/Navigation';

const link = createHttpLink({ uri: 'http://192.168.43.159:4000/admin/api', credentials: 'include' }); 
const client = new ApolloClient({ cache: new InMemoryCache(), link, });

const Drawer = createDrawerNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#0cada6",
    accent: "#92dedb",
  },
};
const navigationTheme = theme.dark ? DarkTheme : theme;

export default function App() {

  return (
    <ApolloProvider client= { client } >
      <PaperProvider theme={ navigationTheme }>
        <NavigationContainer>
          <Drawer.Navigator drawerContent={ props => <DrawerContent { ...props } />}>
            <Drawer.Screen name="Home" component = { Navigation } />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  )
}
