import React, { Component } from 'react';
import {
  View,
  Text,
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
import { Card, Button } from 'react-native-elements';
import Loader from './components/Loader/loader';
import { purple } from '../utils/colors';
const { width } = Dimensions.get('window');

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

  render() {
    const { deck, loading } = this.props;
    if (!deck) {
      return <Loader loading={loading} />;
    }
    return (
      <View style={{ flex: 1 }}>
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
              onPress={() => console.log("let's Play baby")}
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
                name: 'minus-circle',
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
              style={{
                fontSize: 24,
                fontWeight: '700',
                paddingHorizontal: 20,
                alignSelf: 'center'
              }}
            >
              {deck.name}
            </Text>
            <View
              style={{
                alignSelf: 'center',
                marginTop: 20,
                flexWrap: 'wrap',
                justifyContent: 'space-between'
              }}
            >
              {deck.cards.map(card => {
                if (!card || !card.id) {
                  return <Text>Card with problem {JSON.stringify(card)}</Text>;
                }
                return (
                  <Card key={card.id} containerStyle={{ borderWidth: 2 }}>
                    <View
                      style={{
                        width: width / 2
                      }}
                    >
                      <Text style={{ marginBottom: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>Question:</Text>{' '}
                        {card.question}
                      </Text>
                      <Text style={{ marginBottom: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>Answer:</Text>{' '}
                        {card.answer}
                      </Text>
                      <Button
                        title={'Delete'}
                        buttonStyle={{
                          backgroundColor: purple
                        }}
                        onPress={() => this.deleteCard(deck.id, card.id)}
                      />
                    </View>
                  </Card>
                );
              })}
            </View>
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
  console.log('Deck Delete', deck)
  return {
    deck,
    loading: Selectors.isLoading(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetails);
