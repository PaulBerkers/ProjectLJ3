import React, { useEffect, useState, useContext } from 'react';
import {StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import externalStyle from "../style/externalStyle";
import { AuthContext } from "./context";

const EditExcercises = (props) => {
    const context = useContext(AuthContext);
    const [apiData, setApiData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const test = useContext(AuthContext);
  
    useEffect(() => {
        onLoad();
    }, []);
    
    const onLoad = async () => {
        const response = await fetch(
          "https://suvei-app.azurewebsites.net/projectAPI/getCategories.php"
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
        <View style={externalStyle.container}>
          <FlatList
            contentContainerstyle={externalStyle.container2}
            data={apiData}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({ item }) => (
              // <Button
              //   mode="contained"
              //   style={externalStyle.btnButton}
              //   color="#F4F3F8"
              //   onPress={() =>
              //     props.navigation.navigate("Excercises", { test: item.id })
              //   }
              // >
              //   {item.name}
              // </Button>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("EditDeleteExcercise", {
                    category_id: item.id,
                    name: item.name,
                  })
                }
              >
                <View style={externalStyle.boxBlue}>
                  <Text style={externalStyle.text}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      );
    };

  export default EditExcercises;
