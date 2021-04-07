import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import {
  Avatar,
  Card,
  Colors,
  Button,
  Divider,
  List,
} from "react-native-paper";

const UserProfile = () => {
  const {
    colors: { background },
  } = useTheme();

  const LeftContent = (props) => (
    <Avatar.Image {...props} source={require("./../../../assets/lucas.jpeg")} />
  );

  return (
    <ScrollView
      style={{ backgroundColor: background }}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.card}>
        <Card.Title
          title="Lucas Charnay"
          subtitle="Développeur web"
          left={LeftContent}
        />
        <Card.Content>
          <List.Section>
            <List.Item
              left={(props) => <List.Icon {...props} icon="map-marker" />}
              title="Lyon"
            />
            <List.Item
              left={(props) => <List.Icon {...props} icon="email" />}
              title="lucas.charnay@gmail.com"
            />
          </List.Section>
          <Divider />
          <List.Subheader>Intérêts :</List.Subheader>
          <List.Section>
            <List.Item
              left={(props) => (
                <List.Icon {...props} icon="language-javascript" color={Colors.yellow600} />
              )}
              title="Javascript"
            />
            <List.Item
              left={(props) => <List.Icon {...props} icon="language-php" color={Colors.blue600} />}
              title="PHP"
            />
            <List.Item
              title="Java"
              left={(props) => <List.Icon {...props} icon="language-java" color={Colors.red800} />}
            />
          </List.Section>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => {}}>Modifier</Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 4,
  },
  card: {
    margin: 4,
  },
});

export default UserProfile;
