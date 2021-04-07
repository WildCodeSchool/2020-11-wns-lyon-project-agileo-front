import React from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Card,
  Colors,
  Avatar,
  List,
  Divider,
} from "react-native-paper";

const UserCourseLastResults = () => {
  return (
    <Card style={styles.card}>
      <Card.Title
        title="Derniers résultats"
        left={(props) => <Avatar.Icon {...props} icon="file-document" />}
      />
      <Card.Content>
        <List.Section>
          <List.Item
            left={(props) => (
              <List.Icon
                {...props}
                icon="language-javascript"
                color={Colors.yellow600}
              />
            )}
            title="12/20"
            description="Utiliser les callback"
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
          />
          <Divider />
          <List.Item
            left={(props) => (
              <List.Icon
                {...props}
                icon="language-javascript"
                color={Colors.yellow600}
              />
            )}
            title="17/20"
            description="Manipuler le DOM"
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
          />
          <Divider />
          <List.Item
            left={(props) => (
              <List.Icon
                {...props}
                icon="language-java"
                color={Colors.red800}
              />
            )}
            title="16/20"
            description="Utiliser les annotations JPA"
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
          />
        </List.Section>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => {}}>Voir plus</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 4,
  },
});

export default UserCourseLastResults;
