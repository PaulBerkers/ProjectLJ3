import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from "./context";
import Icon from "react-native-vector-icons/FontAwesome";
import DropDownPicker from 'react-native-dropdown-picker';
import externalStyle from "../style/externalStyle";

const AddExcercise = (props) => {
  const [categorie, setCategorie] = useState("");
  const [responsestatus, setResponsestatus] = useState("");
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [herhalingen, setHerhalingen] = useState("");
  const [beschrijving, setBeschrijving] = useState("");
  const [kilo, setKilo] = useState("");
  const test = useContext(AuthContext);

  useEffect(() => {
  }, []);

  const addexcercise = async () => {
    console.log(categorie.value, name, sets, herhalingen, beschrijving, kilo);
    if (categorie.value != "" && name != "" && sets != "" && herhalingen != "" && beschrijving != "" && kilo != "") {
      fetch("https://suvei-app.azurewebsites.net/projectAPI/insertWorkout.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category_id: categorie.value,
          name: name,
          sets: sets,
          times_repeat: herhalingen,
          description: beschrijving,
          weight: kilo
        }),
      })
        .then((response) =>
          response.status == 201
            ?
              Alert.alert(
                "Gelukt!",
                "Trainingschema is succesvol toegevoegd",
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
              "Trainingschema is mislukt toegevoegd",
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
        // .then((data) => setApiData(data))
        .catch((error) => console.log(error.message));
      // const response = await fetch(
      //   "http://192.168.2.7/lj2/projectAPI/insertUsers.php",

      // );
      // const data = await response.json();
    } else {
      Alert.alert("Toevoegen mislukt", "Alles moet ingevuld zijn");
    }
  };

  return (
    <ScrollView>
    <View style={externalStyle.container}>
    <Text style={externalStyle.subheadertext}>Categorie</Text>
    <DropDownPicker style={externalStyle.dropdown}
      items={[
          {label: 'Basiskracht', value: '1', icon: () => <Icon name="flag" size={18} color="#900" />},
          {label: 'Kracht uihoudingsvermogen', value: '2', icon: () => <Icon name="flag" size={18} color="#900" />},
          {label: 'Lichaamsgewicht', value: '5', icon: () => <Icon name="flag" size={18} color="#900" />},
          {label: 'Uithoudingsvermogen', value: '6', icon: () => <Icon name="flag" size={18} color="#900" />}
      ]}

      containerStyle={{height: 40}}
      itemStyle={{
          justifyContent: 'flex-start'
      }}
      onChangeItem={(item) => setCategorie(item)}
    />
    <Text style={externalStyle.subheadertextNO} 
          placeholder="Naam"
          value={name}>Naam oefening</Text>
    <TextInput style={externalStyle.inputfield} onChangeText={(name) => setName(name)}></TextInput>

    <Text style={externalStyle.subheadertext} 
          placeholder="Sets"
          value={sets}>Sets</Text>
    <TextInput style={externalStyle.inputfield} onChangeText={(sets) => setSets(sets)}></TextInput>

    <Text style={externalStyle.subheadertext}>Herhalingen</Text>
    <TextInput style={externalStyle.inputfield} 
          value={herhalingen} onChangeText={(herhalingen) => setHerhalingen(herhalingen)}></TextInput>

    <Text style={externalStyle.subheadertext}>Kilo's</Text>
    <TextInput style={externalStyle.inputfield} 
          value={kilo} onChangeText={(kilo) => setKilo(kilo)}></TextInput>

    <Text style={externalStyle.subheadertext}>Beschrijving</Text>
    <TextInput style={externalStyle.inputfield} onChangeText={(beschrijving) => setBeschrijving(beschrijving)}
          placeholder="beschrijving"
          value={beschrijving}></TextInput>

    <TouchableOpacity>
      <View style={externalStyle.boxBlue}>
        <Text style={externalStyle.text}>Video uploaden</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={addexcercise}>
      <View style={externalStyle.boxPurple}>
        <Text style={externalStyle.text}>Trainingschema Toevoegen</Text>
      </View>
    </TouchableOpacity>
  </View>
  </ScrollView>
  );
};

export default AddExcercise;
