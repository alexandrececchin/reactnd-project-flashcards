import React from 'react';
import { View, Image, StatusBar, Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import Explore from './screens/Explore';
import NewDeck from './screens/NewDeck';
import Game from './screens/Game';
import NewCard from './screens/NewCard';
import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import { purple, white, blue } from './utils/colors';

function FlashStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = createAppContainer(
  createBottomTabNavigator(
    {
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
          tabBarIcon: ({tintColor}) => (
            <Image
              source={require('./assets/new-deck.png')}
              style={{ height: 24, width: 24 }}
            />
          )
        }
      },
      NewCard: {
        screen: NewCard,
        navigationOptions: {
          tabBarLabel: 'Add Card',
          tabBarIcon: ({tintColor}) => (
            <Image
              source={require('./assets/ace.png')}
              style={{ height: 24, width: 24,}}
            />
          )
        }
      }
    },
    {
      navigationOptions: {
        header: null
      },
      tabBarOptions: {
        labelStyle: {
            fontSize: 14,
        },
        styel: {
          height: 56,
          backgroundColor: Platform.OS === 'ios' ? white : purple,
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1
        }
      }
    }
  )
);

const MainNavigator = createAppContainer(
  createStackNavigator({
    Home: {
      screen: Tabs,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        }
      }
    },
    Game: {
      screen: Game,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        }
      }
    }
  })
);

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlashStatusBar backgroundColor={purple} barStyle="light-content" />
        <MainNavigator />
      </View>
    );
  }
}
