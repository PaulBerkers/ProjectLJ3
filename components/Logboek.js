import React, { useContext, useEffect, useState, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";
import externalStyle from "../style/externalStyle";
import { AuthContext } from "./context";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { DataTable } from "react-native-paper";
import { ScrollView } from "react-native";

// LOGBOEK PAGE

const Logboek = () => {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateCompleted, setDateCompleted] = useState([]);
  const context = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(false);
    apiData != null
      ? apiData.map((item) =>
          setDateCompleted((oldArray) => [...oldArray, item.date_completed])
        )
      : "";
  }, [apiData]);

  useEffect(() => {}, [dateCompleted]);

  useFocusEffect(
    useCallback(() => {
      onLoad();
    }, [])
  );

  const onLoad = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: context.getId() }),
    };

    const url =
      "https://suvei-app.azurewebsites.net/projectAPI/getLogItems.php";
    let json;
    let response = await fetch(url, requestOptions);
    try {
      json = await response.json();
    } catch (error) {
      console.log(error);
    }
    // console.log(json);
    setApiData(json);
  };

  if (!apiData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView>
    <View>
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Oefeningen</DataTable.Title>
            <DataTable.Title style={externalStyle.dateCompleted}>
              Datum afgerond
            </DataTable.Title>
          </DataTable.Header>
          <FlatList
            data={apiData}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({ item }) => <ShowDataTableRow log={item} />}
          />
        </DataTable>
      </View>
    </View>
</ScrollView>
  );
};

const ShowDataTableRow = (props) => {
  return (
    <DataTable.Row>
      <DataTable.Cell>{props.log.name}</DataTable.Cell>
      <DataTable.Cell style={externalStyle.dateCompleted}>
        {props.log.date_completed}
      </DataTable.Cell>
    </DataTable.Row>
  );
};

export default Logboek;