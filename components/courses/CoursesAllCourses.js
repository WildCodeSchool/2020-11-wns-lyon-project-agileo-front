import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Card,
  Button,
  Paragraph,
  Title,
  useTheme,
} from "react-native-paper";

const CoursesAllCourses = () => {
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
                  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimconseilservice.fr%2Fimages%2FAPI_REST.png&f=1&nofb=1",
              }}
            />
            <Card.Content>
              <Title>Créer une API Rest</Title>
              <Paragraph>
                Comprendre le principe des API et créer sa propre API Rest.
              </Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Cover
              source={{
                uri:
                  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.programarya.com%2Fimg%2FCursos%2FJava%2FJava-header.png&f=1&nofb=1",
              }}
            />
            <Card.Content>
              <Title>Utiliser Java J2EE pour le web</Title>
              <Paragraph>
                Créer un site web dynamique avec Java J2EE.
              </Paragraph>
            </Card.Content>
          </Card>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => {}}>Voir plus</Button>
        </Card.Actions>
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
                  "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Flapizgrafico.com%2Fwp-content%2Fuploads%2F2018%2F09%2Findesign-logo.jpg&f=1&nofb=1",
              }}
            />
            <Card.Content>
              <Title>InDesign basiques</Title>
              <Paragraph>
                Appréhender la création de contenu avec InDesign.
              </Paragraph>
            </Card.Content>
          </Card>
        </Card.Content>
        <Card.Actions>
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