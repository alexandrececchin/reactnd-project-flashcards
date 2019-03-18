import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import Explore from './screens/Explore';
import NewDeck from './screens/NewDeck';
import Game from './screens/Game';
import DeckDetails from './screens/DeckDetails';
import NewCard from './screens/NewCard';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Constants } from 'expo';
import { purple, white, blue } from './utils/colors';
import { Provider } from 'react-redux';
import store from './state';

function FlashStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = createBottomTabNavigator(
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
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="cards-outline"
            color={tintColor}
            size={24}
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
        fontSize: 14
      },
      style: {
        activeTintColor: purple,
        inactiveTintColor: 'grey',
        backgroundColor: white,
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
);

const MainNavigator = createAppContainer(
  createStackNavigator({
    Home: {
      screen: Tabs
    },
    NewCard: {
      screen: NewCard,
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
    },
    DeckDetails: {
      screen: DeckDetails,
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
      <Provider store={store}>
        <FlashStatusBar backgroundColor={purple} barStyle="light-content" />
        <MainNavigator />
      </Provider>
    );
  }
}
