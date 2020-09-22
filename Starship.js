import { StatusBar, setStatusBarBackgroundColor } from "expo-status-bar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function StarShip({ route, navigation }) {
  const [starship, setStarship] = useState({
    model: "",
    name: "",
    passengers: 0,
  });

  const getStarship = async () => {
    const { url } = route.params;
    const result = await axios.get(url);
    setStarship({
      model: result.data.model,
      name: result.data.name,
      passengers: result.data.passengers,
    });
  };
  useEffect(() => {
    getStarship();
  }, []);
  return (
    <View style={styles.container}>
      <Button
        style={styles.back}
        title="Back to Post"
        onPress={() => navigation.navigate("Post")}
      />
      <ScrollView>
        <Text style={styles.model}>{starship.model}</Text>
        <Text style={styles.name}>{starship.name}</Text>
        <Text style={styles.passengers}>{starship.passengers}</Text>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  back: {
    marginVertical: 20,
  },
  model: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  name: {
    flex: 1,
    justifyContent: "center",
    color: "white",
    fontSize: 18,
  },
  passengers: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 16,
    marginVertical: 20,
  },
});
