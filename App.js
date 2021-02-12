import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screen/HomeScreen'
import AddCityScreen from './screen/AddCityScreen'
import ChangeName from './components/ChangeName'
import {init} from '@rematch/core'
import {user} from './model/nameModel'
import {meteo} from './model/meteoModel'
import {Provider} from 'react-redux'
import 'redux';

const store = init({
  models:{user, meteo} 
});


const Tab = createBottomTabNavigator();

export default function App() {
  return (

    <Provider store={store}>

      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="HomeScreen" component={HomeScreen} />
          <Tab.Screen name="AddCityScreen" component={AddCityScreen} />
          <Tab.Screen name="ChangeName" component={ChangeName} />
        </Tab.Navigator>
      </NavigationContainer>

    </Provider>
  );
}