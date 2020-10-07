import React, { useEffect, useState, useMemo } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import EditDeleteExcercise from "./components/EditDeleteExcercise";
import EditExcercise from "./components/EditExercise";
import Categories from "./components/Categories";
import Excercises from "./components/Excercises";
import AddExcercise from "./components/AddExcercise";
import ErrorBoundary from "./components/ErrorBoundary";
import AdminPanel from "./components/AdminPanel";
import EditExcercises from "./components/EditExcercises";
import ControlStudents from "./components/ControlStudents";
import LogboekDetails from "./components/LogboekDetails";
import Logboek from "./components/Logboek";
import AccountInfo from "./components/AccountInfo";
import Excercise from "./components/Excercise";
import AuthLoadingScreen from "./components/AuthLoadingScreen";
import { AuthContext } from "./components/context";
import RootStackScreen from "./components/RootStackScreen";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function Oefeningen() {
  return (
    <Stack.Navigator
      initialRouteName={AuthLoadingScreen}
      screenOptions={{  
        headerTitleAlign: 'center',     
        headerStyle: {
          backgroundColor: '#fff',
          borderBottomColor: '#D70096',
          borderBottomWidth: 3
        },
        headerTintColor: '#24126E',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25
        }
      }}
    >
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Excercises" component={Excercises} />
      <Stack.Screen name="Excercise" component={Excercise} />
    </Stack.Navigator>
  );
}

function AdminPanelStack() {
  return (
    <Stack.Navigator 
    initialRouteName={AuthLoadingScreen}
    screenOptions={{
      headerTitleAlign: 'center',   
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomColor: '#D70096',
        borderBottomWidth: 3
      },
      headerTintColor: '#24126E',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 25
      },
    }}>
      <Stack.Screen name="AdminPanel" component={AdminPanel}/>
      <Stack.Screen name="AddExcercises" component={AddExcercise}/>
      <Stack.Screen name="EditExcercises" component={EditExcercises}/>

      <Stack.Screen name="EditDeleteExcercise" component={EditDeleteExcercise}/>
      <Stack.Screen name="EditExcercise" component={EditExcercise}/>

      <Stack.Screen name="ControlStudents" component={ControlStudents}/>
    </Stack.Navigator>
  )
}

function LogBoekFunction() {
  return (
    <Stack.Navigator 
    initialRouteName={AuthLoadingScreen}
    screenOptions={{
      headerTitleAlign: 'center',   
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomColor: '#D70096',
        borderBottomWidth: 3
      },
      headerTintColor: '#24126E',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 25
      },
    }}>
      <Stack.Screen name="Logboek" component={Logboek}/>
      <Stack.Screen name="Logboek Details" component={LogboekDetails}/>
    </Stack.Navigator>
  )
}

function AccountFunction() {
  return (
    <Stack.Navigator 
    initialRouteName={AuthLoadingScreen}
    screenOptions={{
      headerTitleAlign: 'center',   
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomColor: '#D70096',
        borderBottomWidth: 3
      },
      headerTintColor: '#24126E',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 25
      },
    }}>
      <Stack.Screen name="Account" component={AccountInfo}/>
    </Stack.Navigator>
  )
}

const App = () => {
  const [userId, setUserId] = useState(null);
  const [permissionId, setPermissionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => ({
    getId: () => {
      return userId;
    },
    getPermissionId: () => {
      return permissionId
    },
    signIn: (id, permissionid) => {
      setUserId(id);
      setPermissionId(permissionid);
      setUserToken("logged");
      setIsLoading(false);
    },
    signOut: () => {
      setUserId(null);
      setUserToken(null);
      setIsLoading(false);
    },
    signUp: (id) => {
      setUserId(id);
      setUserToken("logged");
      setIsLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator
          size="large"
          style={{ justifyContent: "center", alignItems: "center" }}
        />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <PaperProvider theme={DefaultTheme}>
        <ErrorBoundary>
          <NavigationContainer>
            {userToken != null ? (
              <Tab.Navigator
                activeColor="#ffffff"
                inactiveColor="#ffffff"
                barStyle={{ backgroundColor: "#694fad" }}
              >
                <Tab.Screen
                  name="Page2"
                  component={Oefeningen}
                  options={{
                    tabBarLabel: "Oefeningen",
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons
                        name="dumbbell"
                        color={color}
                        size={26}
                      />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Page3"
                  component={LogBoekFunction}
                  options={{
                    tabBarLabel: "Logboek",
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons
                        name="book"
                        color={color}
                        size={26}
                      />
                    ),
                  }}
                />
                {permissionId == "1" ? 
                <Tab.Screen
                  name="Page1"
                  component={AdminPanelStack}
                  options={{
                    tabBarLabel: "Admin Panel",
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons
                        name="account-edit"
                        color={color}
                        size={26}
                      />
                    ),
                  }}
                />
                : null}
                <Tab.Screen
                  name="Page4"
                  component={AccountFunction}
                  options={{
                    tabBarLabel: "Account",
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons
                        name="account-circle"
                        color={color}
                        size={26}
                      />
                    ),
                  }}
                />
              </Tab.Navigator>
            ) : (
              <RootStackScreen />
            )}
          </NavigationContainer>
        </ErrorBoundary>
      </PaperProvider>
    </AuthContext.Provider>
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
