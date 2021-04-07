import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import UserProfileCurrentCourse from "./UserProfileCurrentCourse";
import UserCourseProgression from "./UserCourseProgression";
import UserCourseLastResults from "./UserCourseLastResults";

const UserCourse = () => {
  const {
    colors: { background },
  } = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: background }}
      contentContainerStyle={styles.content}
    >
      <UserProfileCurrentCourse />
      <UserCourseProgression />
      <UserCourseLastResults />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 4,
  },
});

export default UserCourse;
