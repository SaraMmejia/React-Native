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
import StarShip from "./Starship";
import { block } from "react-native-reanimated";
import { BorderlessButton } from "react-native-gesture-handler";

const Stack = createStackNavigator();

export default function Post({ route, navigation }) {
  const [value, setValue] = useState({
    title: "",
    opening_crawl: "",
    starships: [],
    episode_id: "",
  });
  const getValue = async () => {
    const result = await axios("https://swapi.dev/api/films/1/");
    setValue({
      title: result.data.title,
      opening_crawl: result.data.opening_crawl,
      starships: result.data.starships,
      episode_id: result.data.episode_id,
    });
  };
  useEffect(() => {
    getValue();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.pageTitle}>Star Wars Episode #1 </Text>
        <Text style={styles.title}>{value.title}</Text>
        <Text style={styles.opening}>{value.opening_crawl}</Text>
        <FlatList
          style={styles.list}
          data={value.starships}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.item}>{item}</Text>
              <Button
                style={styles.button}
                title="See More"
                onPress={() => navigation.navigate("StarShip", { url: item })}
              />
            </View>
          )}
          keyExtractor={(item) => item}
        ></FlatList>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: 25,
    marginVertical: 20,
    color: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 10,
    color: "white",
  },
  opening: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  item: {
    marginVertical: 15,
    color: "white",
  },
  list: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: "yellow",
    width: 100,
    height: 20,
  },
});
