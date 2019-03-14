import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Deck from './Deck';

export default function DeckList({ decks, onPressDeck, width }) {
  renderDeckItem = deck => {
    return (
      <TouchableOpacity onPress={() => onPressDeck(deck.id)} key={deck.id}>
        <Deck name={deck.name} width={width} key={deck.id} />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}
    >
      {decks.map(deck => this.renderDeckItem(deck))}
    </View>
  );
}
