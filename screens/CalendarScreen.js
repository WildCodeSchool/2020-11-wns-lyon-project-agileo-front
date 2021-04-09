import React from "react";
import { ScrollView } from "react-native";
import CalendarComponent from "../components/calendarComponent/CalendarComponent";

const CalendarRoute = () => {
  return (
    <ScrollView
      // style={{ backgroundColor }}
      // contentContainerStyle={[styles.scrollViewContent, { backgroundColor }]}
    >
      <CalendarComponent />
    </ScrollView>
  );
};

export default CalendarRoute;
