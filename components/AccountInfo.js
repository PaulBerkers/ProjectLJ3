import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View,TouchableOpacity, } from "react-native";
import { AuthContext } from "./context";
import externalStyle from "../style/externalStyle";

// ACCOUNT PAGE

const AccountInfo = () => {
  const [apiData, setApiData] = useState();
  const [isLoading, setIsLoading] = useState();
  const { signOut } = useContext(AuthContext);
  const context = useContext(AuthContext);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    const url =
      "https://suvei-app.azurewebsites.net/projectAPI/getUserDetails.php?id=" +
      context.getId();
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
    // console.log(json[0].sets);
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
    <View style={externalStyle.containerMain}>
      <View style={externalStyle.container2}></View>
      <View style={externalStyle.container3}>
        <TouchableOpacity>
          <View style={externalStyle.buttonContent}>
            <Text style={externalStyle.buttonContentText}>
              Gebruikersnaam: {apiData == null ? "" : apiData[0].username}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={externalStyle.buttonContent}>
            <Text style={externalStyle.buttonContentText}>
              Email: {apiData == null ? "" : apiData[0].email}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={externalStyle.buttonContent}>
            <Text style={externalStyle.buttonContentText}>
              Lengte: {apiData == null ? "" : apiData[0].length}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={externalStyle.buttonContent}>
            <Text style={externalStyle.buttonContentText}>
              Gewicht: {apiData == null ? "" : apiData[0].weight} kg
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          signOut();
        }}
      >
        <View style={externalStyle.buttonContent}>
          <Text style={externalStyle.buttonContentText}>Uitloggen</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AccountInfo;
