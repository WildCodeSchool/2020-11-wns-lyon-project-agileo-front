import React from "react";
import { StyleSheet } from "react-native";
import {
  Avatar,
  Card,
  Paragraph,
  Button,
} from "react-native-paper";

const LeftContent = (props) => (
  <Avatar.Image {...props} source={require("./../../assets/lucas.jpeg")} />
);

const UserPost = () => {
  return (
    <Card style={styles.card}>
      <Card.Title
        title="Lucas Charnay"
        subtitle="Développeur web"
        left={LeftContent}
      />
      <Card.Content>
          <Paragraph>Blablabla</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => {}}>Commenter</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 4,
  },
});

export default UserPost;
