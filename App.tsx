import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { DefaultTheme, DarkTheme, Provider as PaperProvider } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./components/DrawerContent";
import Navigation from './components/Navigation';
import Login from './components/Login';

const client = new ApolloClient({
  uri: 'http://192.168.1.11:4000/admin/api',
  cache: new InMemoryCache(),
})

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
const ko = true
export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={navigationTheme}>

      <div >
      {ko ?
        <Login />
        :
        <NavigationContainer>
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Navigation} />
          </Drawer.Navigator>
        </NavigationContainer>
      }
      </div>
      </PaperProvider>
    </ApolloProvider>
  )
}
