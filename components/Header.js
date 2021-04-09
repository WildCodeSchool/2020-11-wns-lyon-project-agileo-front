import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Appbar, Avatar, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Header = ({ scene, previous, navigation }) => {
  const theme = useTheme();
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
          source={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrmfbI1rQtzAgFe7h7G3vjSDyvZuGRsp-DxxtPd1cw_n0EP3Qd4koC_rUccNM_2O55ZYU&usqp=CAU"}
        />
      </TouchableOpacity>
    )}
    <Appbar.Content
      title={
        title === 'Accueil' ? (
          <MaterialCommunityIcons
            style={{ marginRight: 10 }}
            name="bell"
            size={30}
            color={theme.colors.primary}
          />
        ) : (
          title
        )
      }
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