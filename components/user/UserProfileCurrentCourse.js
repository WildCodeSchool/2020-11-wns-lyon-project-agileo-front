import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Card,
  Button,
  Paragraph,
  Title,
  ProgressBar,
} from "react-native-paper";

const UserProfileCurrentCourse = () => {
  const [progress, setProgress] = React.useState(0.63);
  const [displayParcours, setDisplayParcours] = React.useState("flex");
  const [chevronParcours, setChevronParcours] = React.useState("chevron-up");

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
    <Card style={styles.card}>
        <Card.Title
          title="Parcours"
          left={(props) => <Avatar.Icon {...props} icon="rocket-launch" />}
        />
      <Card.Cover
        source={{
          uri:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcoursedrive.org%2Fwp-content%2Fuploads%2F2019%2F02%2FThe-Complete-Junior-to-Senior-Web-Developer-Roadmap-2019.jpg&f=1&nofb=1",
        }}
      />
      <Card.Content>
        <Title>Développeur web</Title>
        <Paragraph>
          Apprendre et concevoir des applications web en utilisant le HTML, CSS
          et Javascript.
        </Paragraph>
        <View style={styles.row}>
          <Paragraph>En cours (64%)</Paragraph>
          <ProgressBar progress={progress} />
        </View>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => {}}>Voir</Button>
        <Button onPress={() => {}}>Changer de parcours</Button>
      </Card.Actions>
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
});

export default UserProfileCurrentCourse;
