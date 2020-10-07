import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Categories from "./components/Categories";
import Excercises from "./components/Excercises";
import Excercise from "./components/Excercise";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import ErrorBoundary from "./components/ErrorBoundary";

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider theme={DefaultTheme}>
      <ErrorBoundary>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen name="Excercises" component={Excercises} />
            <Stack.Screen name="Ecercise" component={Excercise} />
          </Stack.Navigator>
        </NavigationContainer>
      </ErrorBoundary>
    </PaperProvider>
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
