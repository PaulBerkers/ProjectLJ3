import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import externalStyle from "../style/externalStyle";
import { AuthContext } from "./context";

// HOMEPAGE

const LogboekDetails = (props) => {
  const [apiData, setApiData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const test = useContext(AuthContext);

  useEffect(() => {
  }, []);

  /*if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }*/

  return (
    <View style={externalStyle.container}>  
      <TouchableOpacity>
        <View style={externalStyle.boxBlue}>
          <Text style={externalStyle.text}>Trainingsschema's toevoegen</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={externalStyle.boxPurple}>
          <Text style={externalStyle.text}>Trainingsschema's bewerken</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={externalStyle.boxBlue}>
          <Text style={externalStyle.text}>Klassenlijst</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LogboekDetails;