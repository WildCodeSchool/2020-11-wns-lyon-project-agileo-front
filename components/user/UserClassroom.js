import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import {
  Avatar,
  Card,
  Divider,
  List,
} from "react-native-paper";

const UserClassroom = () => {
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
            title="Développement web (Lyon)"
            left={(props) => <Avatar.Icon {...props} icon="account-group" />}
          />
        <Card.Content>
          <List.Section>
            <List.Item
              left={(props) => <List.Icon {...props} icon="account" />}
              title="Marine Machin"
            />
            <List.Item
              left={(props) => <List.Icon {...props} icon="account" />}
              title="Valentin Bidule"
            />
            <List.Item
              left={(props) => <List.Icon {...props} icon="account" />}
              title="Marine Machin"
            />
            <List.Item
              left={(props) => <List.Icon {...props} icon="account" />}
              title="Valentin Bidule"
            />
            <List.Item
              left={(props) => <List.Icon {...props} icon="account" />}
              title="Marine Machin"
            />
            <List.Item
              left={(props) => <List.Icon {...props} icon="account" />}
              title="Valentin Bidule"
            />
            <List.Item
              left={(props) => <List.Icon {...props} icon="account" />}
              title="Marine Machin"
            />
          </List.Section>
          <Divider />
          <List.Section>
            <List.Subheader>Professeurs :</List.Subheader>
            <List.Item
              left={(props) => <List.Icon {...props} icon="account" />}
              title="Lisa TrucMuche"
            />
            <List.Item
              left={(props) => <List.Icon {...props} icon="account" />}
              title="Renaud Dupont"
            />
          </List.Section>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 4,
  },
});

export default UserClassroom;
