import "react-native-gesture-handler";
import { 
  NavigationContainer, 
} from "@react-navigation/native";
import React from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider 
} from "react-native-paper";
import { I18nManager } from 'react-native';
import { Updates } from 'expo';
import { useColorScheme } from 'react-native-appearance';
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./components/DrawerContent";
import Navigation from './components/Navigation';
import { setContext } from '@apollo/client/link/context';
import { ProvideAuth } from "./contexts/AuthContext";
import PreferencesContext from './contexts/PreferencesContext';


const httpLink = createHttpLink({
  uri:'http://192.168.1.109:4000/admin/api',

});

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem("auth_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const Drawer = createDrawerNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState<'light' | 'dark'>(
    colorScheme === 'dark' ? 'dark' : 'light'
  );
  const [rtl] = React.useState<boolean>(I18nManager.isRTL);

  function toggleTheme() {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'));
  }

  const toggleRTL = React.useCallback(() => {
    I18nManager.forceRTL(!rtl);
    Updates.reloadFromCache();
  }, [rtl]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      toggleRTL,
      theme,
      rtl: (rtl ? 'right' : 'left') as 'right' | 'left',
    }),
    [rtl, theme, toggleRTL]
  );

    return (
      <ApolloProvider client={client} >
        <ProvideAuth>
          <PreferencesContext.Provider value={preferences}>
            <PaperProvider 
              theme={
                theme === 'light'
                  ? {
                      ...PaperDefaultTheme,
                      colors: { ...PaperDefaultTheme.colors, primary: "#0cada6", accent: "#92dedb" },
                    }
                  : {
                      ...PaperDarkTheme,
                      colors: { ...PaperDarkTheme.colors, primary: '#0cada6' },
                    }
              }
            >
              <NavigationContainer>
                <Drawer.Navigator drawerContent={ props => <DrawerContent { ...props } />}>
                  <Drawer.Screen name="Home" component = { Navigation } />
                </Drawer.Navigator>
              </NavigationContainer>
            </PaperProvider>
          </PreferencesContext.Provider>
        </ProvideAuth>
      </ApolloProvider>
    )
  }