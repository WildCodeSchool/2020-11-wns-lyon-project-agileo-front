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

const CoursesAllCourses = () => {
  const [progress, setProgress] = React.useState(0.07);
  const [displayParcours, setDisplayParcours] = React.useState("none");
  const [chevronParcours, setChevronParcours] = React.useState("chevron-down");

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
            title="Tous les cours"
            left={(props) => <Avatar.Icon {...props} icon="file-multiple" />}
            right={(props) => <IconButton {...props} icon={chevronParcours} />}
          />
        </TouchableRipple>
        <Card.Content style={{ display: displayParcours }}>
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

export default CoursesAllCourses;
