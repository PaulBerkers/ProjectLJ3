import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {
  const [apiData, setApiData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    const response = await fetch(
      "http://192.168.2.24/lj2/projectAPI/getExcercises.php"
    );
    const data = await response.json();
    // fetch("http://192.168.2.24/lj2/projectAPI/getExcercises.php", {
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((response) => response.json())
    //   .then((data) => setApiData(data));
    // .catch((error) => console.log(error.message));
    //   .then((data) => console.log(data));
    setApiData(data);
    setIsLoading(false);
    // console.log(apiData);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={apiData}
        keyExtractor={(x, i) => i.toString()}
        renderItem={({ item }) => (
          <Button mode="contained" style={styles.btnButton} color="#F4F3F8">
            {item.name}
          </Button>
        )}
      />
      {/* <Button>test</Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btnButton: {
    padding: 10,
    margin: 10,
  },
});

export default App;
