import React, { useState, useContext, useEffect } from "react";
import {StyleSheet, Text, View, Alert, TextInput, TouchableOpacity,} from "react-native";
import { AuthContext } from "./context";
import { ScrollView } from "react-native-gesture-handler";
import externalStyle from "../style/externalStyle";

const Login = (props) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [statusLogin, setStatusLogin] = useState({
    status: "",
    userId: "",
    permissionId: "",
  });
  const [statusRegister, setStatusRegister] = useState();
  const [loggedId, setLoggedId] = useState(null);

  const { signIn } = useContext(AuthContext);
  // let status;
  useEffect(() => {
    // if (statusLogin !== { status: "", userId: "" }) {
    (statusLogin == emailAddress) == "" && password == "" ? "" : checkAuth();
    // }
  }, [statusLogin]);

  const signin = async () => {
    if (emailAddress != "" && password != "") {
      fetch("https://suvei-app.azurewebsites.net/projectAPI/getLogin.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailAddress,
          password: password,
        }),
      })
        .then((response) =>
          response.status == 202
            ? response.json().then((data) =>
                setStatusLogin({
                  status: response.status,
                  userId: data.melding,
                  permissionId: data.permission,
                })
              )
            : setStatusLogin({ status: response.status })
        )
        // .then((data) => console.log(data))
        .catch((error) => console.log(error.message));
    } else {
      Alert.alert("Login mislukt", "Alles moet ingevuld zijn");
    }
  };

  const checkAuth = async () => {
    console.log("test");
    if (statusLogin.status == 202) {
      {
        console.log(statusLogin.userId);
        console.log(statusLogin.permissionId);
        signIn(statusLogin.userId, statusLogin.permissionId);
      }
    } else {
      Alert.alert("Login mislukt", "Geen geldige invoer");
    }
  };
  const register = async () => {
    if (emailAddress != "" || !password != "") {
      fetch("https://suvei-app.azurewebsites.net/projectAPI/insertUsers.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailAddress,
          password: password,
        }),
      })
        .then((response) => setStatusRegister(response.status))
        // .then((data) => setApiData(data))
        .catch((error) => console.log(error.message));
      // .then(console.log(statusRegister));
      // const response = await fetch(
      //   "http://192.168.2.7/lj2/projectAPI/insertUsers.php",

      // );
      // const data = await response.json();
    }
  };

  return (
    <ScrollView>
    <View style={externalStyle.container}>
      <View>
        <Text style={externalStyle.headertext}>Summa Veiligheid</Text>
        <View style={externalStyle.cleanline}></View>
      </View>
        <View style={externalStyle.buttonContent}>

          <Text style={externalStyle.subheadertext}>Gebruikersnaam</Text>
          <TextInput
            style={externalStyle.inputfield}
            placeholder="Email adres"
            onChangeText={(mail) => setEmailAddress(mail)}
            value={emailAddress}
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
          ></TextInput>
        </View>

        <View>
          <Text style={externalStyle.subheadertext}>Wachtwoord</Text>
          <TextInput
            style={externalStyle.inputfield}
            placeholder="Wachtwoord"
            secureTextEntry={true}
            onChangeText={(wachtwoord) => setPassword(wachtwoord)}
            value={password}
            textContentType="password"
          ></TextInput>
        </View>
        <TouchableOpacity onPress={signin}>
          <View style={externalStyle.boxBlue}>
            <Text style={externalStyle.text}>Inloggen</Text>
          </View>
        </TouchableOpacity>
        <View style={externalStyle.flexbox}>
          <Text style={externalStyle.subtext}>Nog geen account?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("Register")}>
            <View style={externalStyle.boxBlueSmall}>
              <Text style={externalStyle.text}>Registreren</Text>
            </View>
          </TouchableOpacity>
        </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  boxBlue:{
    backgroundColor:'#24126E',
    height:50,
    margin:10,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    opacity: .8,
  },

  boxPurple:{
    backgroundColor:'#D70096',
    height:70,
    margin:10,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    opacity: .8
  },

  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  headertext: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    alignContent: "center",
    marginBottom: 10,
    color: "#24126E"
  },

  subheadertext: {
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
    color: "#24126E"
  },

  subheadertextNO: {
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
    color: "#24126E",
    marginTop: 10,
  },

  inputfield:{
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    height:40,
    margin:10,
    borderColor: "#D70096",
    paddingLeft: 10,
    borderWidth: 2,
  },

  inputfieldnote:{
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    height:120,
    margin:10,
    borderColor: "#D70096",
    // backgroundColor:'#24126E',
    borderWidth: 2,
  },

  inputfieldSets:{
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    height:40,
    margin: 10,
    borderColor: "#D70096",
    // backgroundColor:'#24126E',
    borderWidth: 2,
    width: 70
  },


  videocontainer:{
    height:210,
    margin:10,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#24126E",
    borderWidth: 2,
    opacity: .8
  },

  descbox:{
    margin:10,
    alignItems: "center",
    },

  desctext:{
    marginBottom: 10,
    fontStyle: "italic",
  },

  dropdown:{

  },

  cleanline:{
    margin: 50,
    marginTop: 0,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderColor: "#D70096",
  },

  flexbox:{
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 20,
    marginTop: 0,
  },

  boxBlueSmall:{
    backgroundColor:'#24126E',
    height:30,
    margin:10,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    opacity: .8,
    width: 120
  },

  subtext: {
    fontWeight: "bold",
  }
});
//#7A7FA3
export default Login;
