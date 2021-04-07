import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Card,
  Button,
  Paragraph,
  Title,
  ProgressBar,
  TouchableRipple,
  IconButton,
  useTheme,
} from "react-native-paper";

const CoursesCurrentCourse = () => {
  const [progress, setProgress] = React.useState(0.64);
  const [displayParcours, setDisplayParcours] = React.useState("flex");
  const [chevronParcours, setChevronParcours] = React.useState("chevron-up");

  const {
    colors: { background },
  } = useTheme();

  const handlePressParcours = () => {
    if (displayParcours == "none") {
      setDisplayParcours("flex");
      setChevronParcours("chevron-up");
    } else if (displayParcours == "flex") {
      setDisplayParcours("none");
      setChevronParcours("chevron-down");
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: background }}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.card}>
        <TouchableRipple
          onPress={handlePressParcours}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <Card.Title
            title="Mon Parcours"
            left={(props) => <Avatar.Icon {...props} icon="rocket-launch" />}
            right={(props) => <IconButton {...props} icon={chevronParcours} />}
          />
        </TouchableRipple>
        <Card.Content style={{ display: displayParcours }}>
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
                <ProgressBar progress={progress} />
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
                <ProgressBar progress={progress} />
              </View>
            </Card.Content>
          </Card>
        </Card.Content>
        <Card.Actions style={{ display: displayParcours }}>
          <Button onPress={() => {}}>Voir plus</Button>
        </Card.Actions>
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

export default CoursesCurrentCourse;
