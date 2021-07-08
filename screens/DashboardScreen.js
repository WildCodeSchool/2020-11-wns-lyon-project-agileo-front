import React from "react";

import { ImageBackground, StyleSheet, View, Text } from 'react-native';


const image =  require('../assets/dexempleDashboard.png') ;
const DashboardScreen = () => {
  return (
    <View style={styles.container}>
    <ImageBackground source={image} style={styles.image} resizeMode="contain" />
    
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
    resizeMode: "contain",
    justifyContent: "center",

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
