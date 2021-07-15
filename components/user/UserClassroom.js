import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import {
  Avatar,
  Card,
  Divider,
  List,
} from "react-native-paper";
import { useAuth } from "../../contexts/AuthContext";

const UserClassroom = () => {
  const {
    colors: { background },
  } = useTheme();

  const { allUsers } = useAuth();

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

            {allUsers && allUsers.map((u, i) =>
              <List.Item
                key={i}
                left={(props) => <List.Icon {...props} icon="account" />}
                title={u.firstName}
              />
            )}

          </List.Section>
          <Divider />
          <List.Section>
            <List.Subheader>Professeurs :</List.Subheader>
            <List.Item
              left={(props) => <List.Icon {...props} icon="account" />}
              title="Aurélien Leygues"
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
