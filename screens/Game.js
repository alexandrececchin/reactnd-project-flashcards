import React, { Component } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { Creators as Actions } from '../state/actions';
import { Selectors } from '../state/reducers';
import { bindActionCreators } from 'redux';
import Loader from './components/Loader/loader';
import { white, purple } from '../utils/colors';
import CardTile from './components/Game/CardTile';
import Swiper from 'react-native-deck-swiper';
import ScoreTile from './components/Game/ScoreTile';

export class Game extends Component {
  state = {
    currentIndex: 0,
    finishedGame: false,
    deck: this.props.deck,
    score: 0
  };

  restartGame = () => {
    this.setState({
      currentIndex: 0,
      finishedGame: false,
      score: 0
    });
  };

  handleCardAnwser = option => {
    const { deck, currentIndex, score } = this.state;
    let newScore = 0;
    if (option === 'correct') {
      newScore = score + 1;
      this.swiper.swipeRight();
    } else {
      newScore = score;
      this.swiper.swipeLeft();
    }
    let finishedGame = currentIndex + 1 >= deck.cards.length;
    this.setState({
      score: newScore,
      finishedGame
    });
  };

  onSwipedCard(currentIndex) {
    const { deck } = this.props;
    if (currentIndex + 1 < deck.cards.length) {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1
      }));
    } else {
      this.setState({
        finishedGame: true
      });
    }
  }

  onSwipedAllCards() {
    this.setState({
      finishedGame: true
    });
  }

  getKey = card => card.id;

  renderCardFlip = (card, cardIndex) => {
    return (
      <CardTile
        handleAnswer={this.handleCardAnwser}
        card={card}
        cardIndex={cardIndex}
      />
    );
  };

  render() {
    const { loading, goBack } = this.props;
    const { currentIndex, finishedGame, deck, score } = this.state;
    return (
      <View style={styles.container}>
        <Loader loading={loading} />
        {finishedGame ? (
          <ScoreTile
            score={score}
            total={deck.cards.length}
            restartGame={this.restartGame}
            returnDeck={() => goBack()}
          />
        ) : (
          <Swiper
            ref={swiper => {
              this.swiper = swiper;
            }}
            cards={deck.cards}
            keyExtractor={this.getKey}
            renderCard={this.renderCardFlip}
            cardIndex={currentIndex}
            onSwiped={index => {
              this.onSwipedCard(index);
            }}
            backgroundColor={white}
            stackSize={1}
            pointerEvents="box-none"
            disableBottomSwipe
            disableLeftSwipe
            disableRightSwipe
            disableTopSwipe
          />
        )}
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
    elevation: 4
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
