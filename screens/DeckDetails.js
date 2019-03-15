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

const { width } = Dimensions.get('window');

export class DeckDetails extends Component {
  state = { loading: false };
  componentWillMount() {
    this.scrollY = new Animated.Value(0);
    this.startHeaderHeight = 80;
    this.endHeaderHeight = 50;
    if (Platform.OS == 'android') {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
      this.endHeaderHeight = 65 + StatusBar.currentHeight;
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

  render() {
    const { deck, loading } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
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
                        backgroundColor="#03A9F4"
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

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const mapStateToProps = (state, { navigation }) => {
  const { entryId } = navigation.state.params;
  return {
    deck: Selectors.getDeck(state, entryId),
    loading: Selectors.isLoading(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetails);
