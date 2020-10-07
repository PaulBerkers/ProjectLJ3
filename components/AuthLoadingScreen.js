import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { Button } from "react-native-paper";
import externalStyle from "../style/externalStyle";

const AuthLoadingScreen = (props) => {
  const onLoad = async () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  };
  _loadData = async () => {
    const logged = await AsyncStorage.getItem("logged");
    props.navigation.navigate(logged !== true ? "Login" : "Home");
  };
};
export default AuthLoadingScreen;
