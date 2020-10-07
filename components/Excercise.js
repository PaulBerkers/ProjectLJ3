import React, { useState, useEffect, useContext } from "react";
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
import externalStyle from "../style/externalStyle";
import { ActivityIndicator } from "react-native-paper";
import { AuthContext } from "./context";
import Icon from "react-native-vector-icons/FontAwesome";
// OEFENING PAGE

const Excercise = (props) => {
  const [isLoading, setIsLoading] = useState();
  const [apiData, setApiData] = useState(null);
  const [repeats, setRepeats] = useState(null);
  const [sets, setSets] = useState(null);
  const [status, setStatus] = useState(null);

  const context = useContext(AuthContext);

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {}, [status]);

  const onLoad = async () => {
    const url =
      "https://suvei-app.azurewebsites.net/projectAPI/getExcercise.php?id=" +
      props.route.params.workout_id;
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

  const addToLog = () => {
    if (repeats != null && sets != null) {
      fetch("https://suvei-app.azurewebsites.net/projectAPI/insertLogboek.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sets: sets,
          repeats: repeats,
          category_id: props.route.params.category_id,
          workout_id: props.route.params.workout_id,
          user_id: context.getId(),
        }),
      })
        .then((response) => setStatus(response.status))
        // .then((data) => setApiData(data))
        .catch((error) => console.log(error.message));
      // .then(console.log(status));
    }
  };

  const showVideo = () => {
    return (
      <Video
        source={apiData[0].video_location}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="stretch"
        isLooping
        style={{ width: 200, height: 200 }}
        useNativeControls={true}
      />
    );
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
    <Text style={externalStyle.headertext}>Video instructie</Text>
    <View style={externalStyle.videocontainer}>
      <Icon name="play-circle-o" size={80} onPress={() =>
        apiData == null
        ? ""
        : apiData[0].video_location == null
        ? ""
        : showVideo()
        }></Icon>
    </View>
    <Text style={externalStyle.headertext}>Beschrijving</Text>
    <View style={externalStyle.descbox}>
      <Text style={externalStyle.desctext}>{apiData == null ? "" : apiData[0].desc.replace(/=/g, "\n")}</Text>
    </View>
    <View style={externalStyle.cleanline}></View>    
    <View style={externalStyle.flexbox}>
      <View>
        <Text style={externalStyle.subheadertext}>Sets</Text>
        <TextInput value={sets} onChangeText={(invoer) => setSets(invoer)} style={externalStyle.inputfield}>{apiData == null ? "" : apiData[0].sets}</TextInput>
      </View>
      <View>
        <Text style={externalStyle.subheadertext}>Herhalingen</Text>
        <TextInput value={repeats} onChangeText={(invoer) => setRepeats(invoer)} style={externalStyle.inputfield}>{apiData == null ? "" : apiData[0].times_repeat}</TextInput>
      </View>
      <View>
        <Text style={externalStyle.subheadertext}>Kilo's</Text>
        <TextInput style={externalStyle.inputfield}>{apiData == null ? "" : apiData[0].weight}</TextInput>
      </View>
    </View>
    <View style={externalStyle.cleanline}></View>
    <View>
        <Text style={externalStyle.subheadertext}>Opmerkingen</Text>
        <TextInput style={externalStyle.inputfieldnote}></TextInput>
      </View>
    <TouchableOpacity onPress={() => addToLog()}>
      <View style={externalStyle.boxBlue}>
        <Text style={externalStyle.text}>Rond opdracht af</Text>
      </View>
    </TouchableOpacity>
  </View>
</ScrollView>
  );
};

export default Excercise;
