import React, { useEffect, useState, useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AuthContext } from "./context";
import externalStyle from "../style/externalStyle";

// HOMEPAGE

const AdminPanel = (props) => {
  const [apiData, setApiData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const test = useContext(AuthContext);

  useEffect(() => {
  }, []);

  return (
    <View>  
      <TouchableOpacity onPress={() => props.navigation.navigate("AddExcercises")}>
        <View style={externalStyle.boxBlue}>
          <Text style={externalStyle.text}>Trainingsschema's toevoegen</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => props.navigation.navigate("EditExcercises")}>
        <View style={externalStyle.boxPurple}>
          <Text style={externalStyle.text}>Trainingsschema's bewerken</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => props.navigation.navigate("ControlStudents")}>
        <View style={externalStyle.boxBlue}>
          <Text style={externalStyle.text}>Klassenlijst</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AdminPanel;