import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Colors,
  ProgressBar,
  Paragraph,
  Card,
  Avatar,
  Title,
  List,
} from "react-native-paper";
import tailwind from "tailwind-rn";

const UserCourseProgression = () => {
  const [progress, setProgress] = React.useState(0.68);
  const [courses, setCourses] = React.useState(0.35);
  const [exercices, setExercices] = React.useState(0.22);

  return (
    <Card style={styles.card}>
      <Card.Title
        title="Progression"
        left={(props) => <Avatar.Icon {...props} icon="chart-line-variant" />}
      />
      <Card.Content>
        <View style={styles.row, styles.badges}>
          <Title>Moyenne générale :</Title>
          <Avatar.Text
            size={35}
            label="14"
            color="white"
            style={[styles.avatar, { backgroundColor: Colors.green300 }]}
          />
        </View>
        <View style={styles.row}>
          <Paragraph>Réussite globale (68%)</Paragraph>
          <ProgressBar
            progress={progress}
            color={Colors.green400}
            style={{ backgroundColor: Colors.red400, height: 10 }}
          />
        </View>
        <View style={styles.row}>
          <Paragraph>Cours complétés (35%)</Paragraph>
          <ProgressBar
            progress={courses}
            style={{ height: 10 }}
          />
        </View>
        <View style={styles.row}>
          <Paragraph>Exercices terminés (22%)</Paragraph>
          <ProgressBar
            progress={exercices}
            style={{ height: 10 }}
          />
        </View>
        <View style={styles.row}>
          <List.Section style={styles.badges}>
            <List.Icon
              icon="run-fast"
              color="white"
              style={tailwind("bg-green-400 rounded-full")}
            />
            <List.Icon
              icon="anchor"
              color="white"
              style={tailwind("bg-blue-600 rounded-full")}
            />
            <List.Icon
              icon="asterisk"
              color="white"
              style={tailwind("bg-yellow-400 rounded-full")}
            />
          </List.Section>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  row: {
    marginVertical: 10,
  },
  card: {
    margin: 4,
  },
  badges: {
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    margin: 8,
  },
});

export default UserCourseProgression;
