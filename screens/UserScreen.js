import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import UserProfile from "../components/user/UserProfile";
import UserClassroom from "../components/user/UserClassroom";

const UserProfileRoute = () => <UserProfile style={[styles.scene]} />;
const UserClassroomRoute = () => <UserClassroom style={[styles.scene]} />;

const initialLayout = { width: Dimensions.get("window").width };

const UserScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "userProfile", title: "Mon compte" },
    { key: "userClassroom", title: "Ma Promo" },
  ]);

  const renderScene = SceneMap({
    userProfile: UserProfileRoute,
    userClassroom: UserClassroomRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#92dedb" }}
      style={{ backgroundColor: "#0cada6" }}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export default UserScreen;
