import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Card,
  Paragraph,
  Title,
  ProgressBar,
  useTheme,
} from "react-native-paper";

const CoursesStartedCourses = () => {
  const [progressCourse, setProgress] = React.useState(0.64);
  const [progressAllCourses, setProgressAllCourses] = React.useState(0.07);

  const {
    colors: { background },
  } = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: background }}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.card}>
          <Card.Title
            title="Mon Parcours"
            left={(props) => <Avatar.Icon {...props} icon="rocket-launch" />}
          />
        <Card.Content>
          <Card style={styles.card}>
            <Card.Cover
              source={{
                uri:
                  "https://www.softfluent.fr/wp-content/uploads/2019/10/javascript.png",
              }}
            />
            <Card.Content>
              <Title>Apprendre à coder en Javascript</Title>
              <Paragraph>
                Apprendre les bases du langage Javascript à travers des
                exercices pratiques.
              </Paragraph>
              <View style={styles.row}>
                <Paragraph>En cours (64%)</Paragraph>
                <ProgressBar progress={progressCourse} />
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Cover
              source={{
                uri:
                  "https://codedesign.fr/wp-content/uploads/2018/08/php-leader1-880x450.png",
              }}
            />
            <Card.Content>
              <Title>Créer un site web en PHP</Title>
              <Paragraph>
                Créer un site web dynamique avec PHP et MySQL.
              </Paragraph>
              <View style={styles.row}>
                <Paragraph>En cours (64%)</Paragraph>
                <ProgressBar progress={progressCourse} />
              </View>
            </Card.Content>
          </Card>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
          <Card.Title
            title="Autres"
            left={(props) => <Avatar.Icon {...props} icon="file-multiple" />}
          />
        <Card.Content>
          <Card style={styles.card}>
            <Card.Cover
              source={{
                uri:
                  "https://i2.wp.com/ysnweb.net/wp-content/uploads/2020/06/photoshop.jpg?fit=960%2C640&ssl=1&resize=1280%2C720",
              }}
            />
            <Card.Content>
              <Title>Photoshop basiques</Title>
              <Paragraph>
                Appréhender la retouche d'image en manipulant les outils
                Photoshop.
              </Paragraph>
              <View style={styles.row}>
                <Paragraph>En cours (7%)</Paragraph>
                <ProgressBar progress={progressAllCourses} />
              </View>
            </Card.Content>
          </Card>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 4,
  },
  row: {
    marginVertical: 10,
  },
  card: {
    margin: 4,
  },
});

export default CoursesStartedCourses;
