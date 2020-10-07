import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import externalStyle from "../style/externalStyle";

const Excercises = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [status, setStatus] = useState(null);
  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    const url =
      "https://suvei-app.azurewebsites.net/projectAPI/getExcercises.php?id=" +
      props.route.params.category_id;
    let json;
    let response = await fetch(url);
    try {
      json = await response.json();
    } catch (error) {
      console.log(error);
    }
    // console.log(json);
    setApiData(json);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={apiData}
        keyExtractor={(x, i) => i.toString()}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Excercise", {
                  workout_id: item.id,
                  name: item.name,
                  category_id: props.route.params.category_id,
                })
              }
            >
              <View style={externalStyle.boxBlue}>
                <Text style={externalStyle.text}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Excercises;
