import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Game extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Play Game - Deck -> {this.props.navigation.state.params.entryId}
        </Text>
      </View>
    );
  }
}
export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
