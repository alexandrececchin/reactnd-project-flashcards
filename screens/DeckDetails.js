import React, { Component } from 'react';
import {
  View,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
  Animated,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Selectors } from '../state/reducers';
import { Creators as Actions } from '../state/actions';
import { bindActionCreators } from 'redux';
import { Button, Text } from 'react-native-elements';
import Loader from './components/Loader/loader';
import { purple } from '../utils/colors';
import CardList from './components/DeckDetail/CardList';
import EmptyCardList from './components/DeckDetail/EmptyCardList';

export class DeckDetails extends Component {
  state = { loading: false };
  componentWillMount() {
    this.scrollY = new Animated.Value(0);
    this.startHeaderHeight = 80;
    this.endHeaderHeight = 50;
    if (Platform.OS == 'android') {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
      this.endHeaderHeight = 20 + StatusBar.currentHeight;
    }
    this.animatedHeaderHeight = this.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [this.startHeaderHeight, this.endHeaderHeight],
      extrapolate: 'clamp'
    });
  }

  deleteCard = (deckId, cardId) => {
    const { deleteCardRequest } = this.props;
    deleteCardRequest(deckId, cardId);
  };

  deleteDeck = deckId => {
    const { deleteDeckRequest, goBack } = this.props;
    deleteDeckRequest(deckId);
    goBack();
  };

  onPressPlay = id => {
    this.props.navigation.navigate('Game', {
      entryId: id
    });
  };

  onPressAddCard = id => {
    this.props.navigation.navigate('NewCard', {
      entryId: id
    });
  };

  render() {
    const { deck, loading } = this.props;

    if (!deck) {
      return (
        <View style={{ flex: 1 }}>
          <Text>Deck Delete</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
        <Animated.View
          style={{
            height: this.animatedHeaderHeight,
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderBottomColor: '#dddddd'
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'
            }}
          >
            <Button
              icon={{
                name: 'play-circle',
                type: 'font-awesome',
                size: 15,
                color: 'white'
              }}
              onPress={() => this.onPressPlay(deck.id)}
              iconRight
              iconContainerStyle={{ marginLeft: 10 }}
              buttonStyle={{
                backgroundColor: purple,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30
              }}
              containerStyle={{ width: 100 }}
            />
            <Button
              icon={{
                name: 'trash',
                type: 'font-awesome',
                size: 15,
                color: 'white'
              }}
              iconRight
              iconContainerStyle={{ marginLeft: 10 }}
              onPress={() => this.deleteDeck(deck.id)}
              buttonStyle={{
                backgroundColor: purple,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
                marginLeft: 10
              }}
              containerStyle={{ width: 100 }}
            />
            <Button
              icon={{
                name: 'plus-circle',
                type: 'font-awesome',
                size: 15,
                color: 'white'
              }}
              iconRight
              iconContainerStyle={{ marginLeft: 10 }}
              onPress={() => this.onPressAddCard(deck.id)}
              buttonStyle={{
                backgroundColor: purple,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
                marginLeft: 10
              }}
              containerStyle={{ width: 100 }}
            />
          </View>
        </Animated.View>

        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.scrollY } } }
          ])}
        >
          <View style={{ marginTop: 40 }}>
            <Text
              h3
              style={{
                fontSize: 24,
                fontWeight: '700',
                paddingHorizontal: 20,
                alignSelf: 'center'
              }}
            >
              {deck.name}
              {deck.cards.length > 0 && -deck.cards.length}
            </Text>
            {!deck.cards || deck.cards.length <= 0 ? (
              <EmptyCardList />
            ) : (
              <CardList deckId={deck.id} cards={deck.cards} />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const bindedActions = bindActionCreators(Actions, dispatch);
  return {
    goBack: () => navigation.goBack(),
    ...bindedActions
  };
};

const mapStateToProps = (state, { navigation }) => {
  const { entryId } = navigation.state.params;
  const deck = Selectors.getDeck(state, entryId);
  return {
    deck,
    loading: Selectors.isLoading(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetails);
