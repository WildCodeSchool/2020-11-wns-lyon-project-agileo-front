import React from "react";
import { StyleSheet } from "react-native";
import {
  Avatar,
  Card,
  Paragraph,
  Button,
} from "react-native-paper";

const LeftContent = (props) => (
  <Avatar.Image
    {...props}
    source={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrmfbI1rQtzAgFe7h7G3vjSDyvZuGRsp-DxxtPd1cw_n0EP3Qd4koC_rUccNM_2O55ZYU&usqp=CAU"} />
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
        <Button onPress={() => { }}>Commenter</Button>
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
