import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { white, purple } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import UdaciSlider from './components/UdaciSlider';
import UdaciSteppers from './components/UdaciSteppers';
import EntryDetail from './components/EntryDetail'
import Live from './components/Live'



function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tab = createBottomTabNavigator()

function NavTab() {
  return (
    <Tab.Navigator initialRouteName="History"
      tabBarOptions={{
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
          backgroundColor: Platform.OS === 'ios' ? white : purple,
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1
        }
      }}>

      <Tab.Screen name="History" component={History} options={{
        tabBarLabel: 'History',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        ),
      }} />
      <Tab.Screen name="AddEntry" component={AddEntry} options={{
        tabBarLabel: 'AddEntry',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        ),
      }} />
      <Tab.Screen name="Live" component={Live} options={{
        tabBarLabel: 'Live',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-speedometer" size={30} color={tintColor} />
        ),
      }} />

    </ Tab.Navigator >
  )
}

const Stack = createStackNavigator()

function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={NavTab} />
      <Stack.Screen name='EntryDetail' component={EntryDetail} options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        }
      }} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }} >
        <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
        <NavigationContainer>
          <StackNav />
        </NavigationContainer>
      </View>
    </Provider>
  );
}



