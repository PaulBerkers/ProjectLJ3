import React, { useEffect, useState } from "react";
import {View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Alert} from "react-native";
import externalStyle from "../style/externalStyle";

const EditDeleteExcercise = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    // console.log(props.route.params.test);
    onLoad();
  }, []);

  const onLoad = async () => {
    const url =
      "https://suvei-app.azurewebsites.net/projectAPI/getExcercises.php?id=" +
      props.route.params.category_id;
    let json;
    // const response = await fetch(
    //   "http://192.168.2.7/lj2/projectAPI/getExcercises.php?id=" +
    //     props.route.params.test
    // );
    // const data = await response;
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

  const verwijder = (verwijderid) => {
    if (verwijderid != null) {
      console.log(verwijderid);
      fetch("https://suvei-app.azurewebsites.net/projectAPI/deleteWorkout.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: verwijderid,
        }),
      })
      .then((response) =>
      response.status == 202
        ?
          Alert.alert(
            "Gelukt!",
            "Trainingschema is succesvol verwijderd",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK" }
            ],
            { cancelable: false }
          )
        : Alert.alert(
          "Mislukt!",
          "Trainingschema verwijderen is mislukt",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            { text: "OK" }
          ],
          { cancelable: false }
        )
    )
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={externalStyle.containerMain}>
      <FlatList
        contentContainerstyle={externalStyle.container2}
        data={apiData}
        keyExtractor={(x, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={externalStyle.container}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("EditExcercise", {
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
            <TouchableOpacity onPress={() => verwijder(item.id)}>
              <View style={externalStyle.boxPurple}>
                <Text style={externalStyle.text}>X</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default EditDeleteExcercise;
