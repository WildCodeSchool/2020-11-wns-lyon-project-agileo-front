import React from 'react';
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import UserProfileCurrentCourse from "./../components/user/UserProfileCurrentCourse";
import UserCourseProgression from "./../components/user/UserCourseProgression";
import UserCourseLastResults from "./../components/user/UserCourseLastResults";

const CourseScreen = () => {
  const {
    colors: { background },
  } = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: background }}
      contentContainerStyle={styles.content}
    >

      <UserCourseProgression />
      <UserProfileCurrentCourse />
      <UserCourseLastResults />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 4,
  },
});

export default CourseScreen;
