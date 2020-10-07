import React, { useState, useEffect, useContext } from "react";
import externalStyle from "../style/externalStyle";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { Video } from "expo-av";
import Excercises from "./Excercises";
import { ActivityIndicator } from "react-native-paper";
import { AuthContext } from "./context";
import Icon from "react-native-vector-icons/FontAwesome";
// OEFENING PAGE

const EditExcercise = (props) => {
  const [isLoading, setIsLoading] = useState();
  const [apiData, setApiData] = useState(null);
  const [status, setStatus] = useState(null);
  
  const [id, SetId] = useState(null);
  const [repeats, setRepeats] = useState(null);
  const [sets, setSets] = useState(null);
  const [description, setDescription] = useState(null);
  const [kilo, setKilo] = useState(null);
  const [name, setName] = useState(null);

  const context = useContext(AuthContext);

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {}, [status]);

  const onLoad = async () => {
    const url =
      "https://suvei-app.azurewebsites.net/projectAPI/getExcercise.php?id=" +
      props.route.params.workout_id;
      SetId(props.route.params.workout_id);
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
    
    setRepeats(json[0].times_repeat);
    setSets(json[0].sets);
    setDescription(json[0].desc);
    setKilo(json[0].weight);
    setName(json[0].name);
    setIsLoading(false);
  };

  const update = () => {
    if (name != null) {
      console.log(sets, repeats, description, name, kilo, id);
      fetch("https://suvei-app.azurewebsites.net/projectAPI/updateWorkout.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sets: sets,
          times_repeat: repeats,
          description: description,
          name: name,
          weight: kilo,
          id: id,
        }),
      })
      .then((response) =>
      response.status == 201
        ?
          Alert.alert(
            "Gelukt!",
            "Updaten is succesvol",
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
          "Updaten is mislukt",
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
<ScrollView>
    <View style={externalStyle.container}>
        <Text style={externalStyle.headertext}>Naam oefening:</Text>        
        <TextInput style={externalStyle.inputfield} onChangeText={(invoer) => setName(invoer)}>
            {apiData == null ? "" : apiData[0].name.replace(/=/g, "\n")}
        </TextInput>
        <Text style={externalStyle.headertext}>Beschrijving:</Text>
        <TextInput multiline={true} style={externalStyle.inputfieldnote} onChangeText={(invoer) => setDescription(invoer)}>
            {apiData == null ? "" : apiData[0].desc.replace(/=/g, "\n")}
        </TextInput>
        <Text style={externalStyle.subheadertext}>Sets</Text>
        <TextInput style={externalStyle.inputfield} onChangeText={(invoer) => setSets(invoer)} >
            {apiData == null ? "" : apiData[0].sets}
        </TextInput>
        <Text style={externalStyle.subheadertext}>Herhalingen</Text>
        <TextInput style={externalStyle.inputfield} onChangeText={(invoer) => setRepeats(invoer)} >
            {apiData == null ? "" : apiData[0].times_repeat}          
        </TextInput>
        <Text style={externalStyle.subheadertext}>Kilo's </Text>
        <TextInput style={externalStyle.inputfield} onChangeText={(invoer) => setKilo(invoer)}>
            {apiData == null ? "" : apiData[0].weight}
        </TextInput>
        <View style={externalStyle.cleanline}></View>
        <TouchableOpacity onPress={() => update()}>
          <View style={externalStyle.boxBlue}>
              <Text style={externalStyle.text}>Update Gegevens</Text>
          </View>
        </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default EditExcercise;
