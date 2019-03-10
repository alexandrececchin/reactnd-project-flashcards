import React from 'react';
import { Image } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import Explore from './screens/Explore';
import NewDeck from './screens/NewDeck';
import Game from './screens/Game';
import { Ionicons } from '@expo/vector-icons';

const tabs = createAppContainer(
  createBottomTabNavigator({
    Explore: {
      screen: Explore,
      navigationOptions: {
        tabBarLabel: 'Explore',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-search" color={tintColor} size={24} />
        )
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'Create a Deck',
        tabBarIcon: () => (
          <Image
            source={require('./assets/new-deck.png')}
            style={{ height: 24, width: 24, tintColor: 'black' }}
          />
        )
      }
    }
  })
);

export default createAppContainer(
  createStackNavigator({
    Home: {
      screen: tabs
    },
    Game: {
      screen: Game,
      navigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#292477'
        }
      }
    }
  })
);
