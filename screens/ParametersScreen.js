import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors, Card, Switch, Paragraph, Text, TouchableRipple } from "react-native-paper";

const ParametersScreen = () => {
  const [showStatistics, setShowStatistics] = React.useState(false);
  const [showCustomColor, setShowCustomColor] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  return (
    <Card>
      <TouchableRipple onPress={() => {setShowNotifications(!showNotifications)}}>
        <View style={styles.row}>
          <Text>Désactiver les notifications</Text>
          <View pointerEvents="none">
            <Switch value={showNotifications} />
          </View>
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={() => {setShowStatistics(!showStatistics)}}>
        <View style={styles.row}>
          <Text>Désactiver les statistiques</Text>
          <View pointerEvents="none">
            <Switch value={showStatistics} />
          </View>
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={() => {setShowCustomColor(!showCustomColor)}}>
        <View style={styles.row}>
          <Text>Couleur personnalisée</Text>
          <View pointerEvents="none">
            <Switch value={showCustomColor} />
          </View>
        </View>
      </TouchableRipple>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 28,
  },
});

export default ParametersScreen;
