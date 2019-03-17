import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Button,
  LayoutAnimation,
  UIManager
} from 'react-native';
import { connect } from 'react-redux';
import { Creators as Actions } from '../state/actions';
import { Selectors } from '../state/reducers';
import { bindActionCreators } from 'redux';
import Loader from './components/Loader/loader';
import { white, purple } from '../utils/colors';
import CardTile from './components/Game/CardTile';
import Swiper from 'react-native-deck-swiper/Swiper';

export class Game extends Component {
  state = {
    currentIndex: 0
  };

  handleCardAnwser = option => {
    console.log(option);
  };

  getKey = card => card.id

  renderCardFlip = (card, cardIndex) => {
    return (
      <CardTile handleAnswer={() => this.handleCardAnwser()} card={card} cardIndex={cardIndex} />
    );
  };

  render() {
    const { loading } = this.props;
    const { deck } = this.props;
    const { currentIndex } = this.state;
    return (
      <View style={styles.container}>
        <Loader loading={loading} />
        <Swiper
          ref={swiper => {
            this.swiper = swiper;
          }}
          cards={deck.cards}
          keyExtractor={this.getKey}
          renderCard={this.renderCardFlip}
          onSwiped={currentIndex => {
            if (currentIndex + 1 < deck.cards.length) {
              this.setState(prevState => ({
                currentIndex: prevState.currentIndex + 1
              }));
            }
          }}
          cardIndex={currentIndex}
          backgroundColor={white}
          stackSize={3}
          pointerEvents="box-none"
          disableBottomSwipe
          disableTopSwipe
          stackAnimationFriction={100}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: white,
    borderRadius: 3,
    elevation: 4,
  }
});

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
)(Game);
