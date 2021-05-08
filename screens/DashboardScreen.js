import React from "react";

import { ImageBackground, StyleSheet, View, Text } from 'react-native';


const image = { uri: "https://i.pinimg.com/originals/15/77/82/15778268d5f682aebf53702548833526.jpg" };
const DashboardScreen = () => {
  return (
    <View style={styles.container}>
    <ImageBackground source={image} style={styles.image}>
      <Text style={styles.text}>Dashboard</Text>
    </ImageBackground>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#a0a0a0ad",
    margin:"auto",
    width :"80%"
  }
});

export default DashboardScreen;
