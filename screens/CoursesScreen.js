import React from 'react';
import color from 'color';
import { Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import overlay from '../scripts/overlay';
import CoursesStartedCourses from "../components/courses/CoursesStartedCourses";
import CoursesAllCourses from "../components/courses/CoursesAllCourses";

const initialLayout = { width: Dimensions.get('window').width };

const Started = () => <CoursesStartedCourses />;
const All = () => <CoursesAllCourses />;

const CoursesScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "started", title: "Commencés" },
    { key: "all", title: "Tous" },
  ]);

  const renderScene = SceneMap({
    started: Started,
    all: All,
  });

  const theme = useTheme();

  const tabBarColor = theme.dark
    ? (overlay(4, theme.colors.surface))
    : theme.colors.primary;

  const rippleColor = theme.dark
    ? color(tabBarColor).lighten(0.5)
    : color(tabBarColor).darken(0.2);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.colors.primary }}
      style={{ backgroundColor: tabBarColor, shadowColor: theme.colors.text }}
      labelStyle={{ color: theme.colors.primary }}
      pressColor={rippleColor}
    />
  );

  return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
  );
};

export default CoursesScreen;
