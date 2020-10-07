import React, { Component } from 'react';
import { View, ActivityIndicator,FlatList } from 'react-native';
import { DataTable, DarkTheme } from 'react-native-paper'; 
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import page1 from './components/page1';
import page2 from './components/page2';
import page3 from './components/page3';
import page4 from './components/page4';
import ErrorBoundary from './components/ErrorBoundary';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';


const Tab = createMaterialBottomTabNavigator();


export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
      };
  }

  render() {
    return (
     
    <PaperProvider theme={DarkTheme}>
      <ErrorBoundary>
        <NavigationContainer> 
          <Tab.Navigator activeColor="#ffffff" inactiveColor="#ffffff" barStyle={{ backgroundColor: '#694fad' }} >
            <Tab.Screen name="Page1" component={page1}  options={{ tabBarLabel: 'Home',  tabBarIcon: ({ color }) => (  <MaterialCommunityIcons name="home" color={color} size={26} />  ),  }}  />
            <Tab.Screen name="Page2" component={page2}  options={{ tabBarLabel: 'Oefeningen',  tabBarIcon: ({ color }) => (  <MaterialCommunityIcons name="dumbbell" color={color} size={26} />  ),  }}  />
            <Tab.Screen name="Page3" component={page3}  options={{ tabBarLabel: 'Logboek',  tabBarIcon: ({ color }) => (  <MaterialCommunityIcons name="book" color={color} size={26} />  ),  }}  />
            <Tab.Screen name="Page4" component={page4}  options={{ tabBarLabel: 'Account',  tabBarIcon: ({ color }) => (  <MaterialCommunityIcons name="account-circle" color={color} size={26} />  ),  }}  />
          </Tab.Navigator>
        </NavigationContainer> 
      </ErrorBoundary>
    </PaperProvider>

    );

  }
}

