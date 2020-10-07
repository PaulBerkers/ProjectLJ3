import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./Login";
import SignUp from "./Register";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="Login" component={SignIn}></RootStack.Screen>
    <RootStack.Screen name="Register" component={SignUp}></RootStack.Screen>
  </RootStack.Navigator>
);

export default RootStackScreen;
