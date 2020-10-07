import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView,
} from "react-native";
import externalStyle from "../style/externalStyle";
import { AuthContext } from "./context";
import Icon from "react-native-vector-icons/FontAwesome";
// LOGIN TEST

const Login = (props) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [statusRegister, setStatusRegister] = useState({
    status: "",
    userId: "",
  });
  const [loggedId, setLoggedId] = useState("");

  const { signUp } = useContext(AuthContext);
  // let status;
  useEffect(() => {
    if (statusRegister !== { status: "", userId: "" }) {
      // console.log(statusRegister);
      checkAuth();
    }
  }, [statusRegister]);

  useEffect(() => {
    if (loggedId !== "") {
      console.log(loggedId);
    }
  }, [loggedId]);

  const register = async () => {
    if (emailAddress != "" && password != "") {
      fetch("https://suvei-app.azurewebsites.net/projectAPI/insertUsers.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailAddress,
          name: name,
          password: password,
        }),
      })
        .then((response) =>
          response.status == 201
            ? response.json().then((data) =>
                setStatusRegister({
                  status: response.status,
                  userId: data.melding,
                })
              )
            : setStatusRegister({ status: response.status })
        )
        // .then((data) => setApiData(data))
        .catch((error) => console.log(error.message));
      // const response = await fetch(
      //   "http://192.168.2.7/lj2/projectAPI/insertUsers.php",

      // );
      // const data = await response.json();
    } else {
      Alert.alert("Login mislukt", "Alles moet ingevuld zijn");
    }
  };

  const checkAuth = async () => {
    if (statusRegister.status == 201) {
      {
        signUp(loggedId);
      }
    }
  };

  return (
    <View style={externalStyle.containerMain}>
      <View style={externalStyle.container1}>
        <Text style={externalStyle.blue}>Registreren</Text>
      </View>
      <Icon
        name="arrow-circle-o-left"
        size={30}
        color="#24126E"
        style={externalStyle.icon}
        onPress={() => props.navigation.goBack()}
      ></Icon>
      <View style={externalStyle.container12}>
        <Text style={externalStyle.pink}>Summa Veiligheid</Text>
      </View>

      <View style={externalStyle.container3}>
        <View style={externalStyle.buttonContent}>
          <TextInput
            style={externalStyle.buttonContentText}
            placeholder="Email adres"
            onChangeText={(mail) => setEmailAddress(mail)}
            value={emailAddress}
          ></TextInput>
        </View>

        <View style={externalStyle.buttonContent}>
          <TextInput
            style={externalStyle.buttonContentText}
            placeholder="Naam"
            onChangeText={(name) => setName(name)}
            value={name}
          ></TextInput>
        </View>

        <View style={externalStyle.buttonContent}>
          <TextInput
            style={externalStyle.buttonContentText}
            placeholder="Wachtwoord"
            secureTextEntry={true}
            onChangeText={(wachtwoord) => setPassword(wachtwoord)}
            value={password}
          ></TextInput>
        </View>
        <TouchableOpacity onPress={register}>
          <View style={externalStyle.buttonContent222}>
            <Text style={externalStyle.buttonContentText2}>Registreren</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  container1: {
    marginTop: 60,
  },
  blue: {
    fontSize: 47,
    color: "#24126E",
  },
  pink: {
    fontSize: 40,
    color: "#D70096",
  },
  container2: {
    flexDirection: "row",
    flex: 8,
    width: 380,
    alignItems: "center",
    paddingLeft: 28,
  },
  container3: {
    marginTop: 50,
    flex: 40,
  },
  icon: {
    top: 80,
    width: 25,
    height: 30,
    position: "absolute",
    left: 10, // Keep some space between your left border and Image
  },
  buttonContent: {
    width: 250,
    alignItems: "center",
    backgroundColor: "#F4F3F8",
    marginRight: 10,
    marginBottom: 10,
  },
  buttonContentText: {
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 15,
    color: "#7A7FA3",
  },
  buttonContent2: {
    marginTop: 90,
    width: 250,
    alignItems: "center",
    backgroundColor: "#7A7FA3",
    marginRight: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  buttonContent222: {
    marginTop: 10,
    width: 250,
    alignItems: "center",
    backgroundColor: "#7A7FA3",
    marginRight: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  buttonContentText2: {
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 28,
    color: "#FFFFFF",
  },
});
//#7A7FA3
export default Login;
