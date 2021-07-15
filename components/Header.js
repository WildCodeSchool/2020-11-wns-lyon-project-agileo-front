import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Appbar, Avatar, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from "../contexts/AuthContext";

const Header = ({ scene, previous, navigation }) => {
  const theme = useTheme();
  const {currentUser} = useAuth();
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;
      
  return (
    <Appbar.Header
      theme={{ colors: { primary: theme.colors.surface } }}
    >
    {previous ? (
      <Appbar.BackAction
        onPress={navigation.goBack}
        color={theme.colors.primary}
      />
    ) : (
      <TouchableOpacity
        style={{ marginLeft: 10 }}
        onPress={() => {
          ((navigation )).openDrawer();
        }}
      >
        <Avatar.Image
          size={40}
         source={currentUser && currentUser.avatar}
        />
      </TouchableOpacity>
    )}
    <Appbar.Content
      title={"Agileo"}
      titleStyle={{
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.primary,
      }}
    />
  </Appbar.Header>
  );
};

export default Header;