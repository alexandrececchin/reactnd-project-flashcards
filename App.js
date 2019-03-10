import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Explore from './screens/Explore';
import NewDeck from './screens/NewDeck';
import { Ionicons } from '@expo/vector-icons';

export default createAppContainer(
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
