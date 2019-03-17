import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Card, Button } from 'react-native-elements';
const { width } = Dimensions.get('window');
import { purple } from '../../../utils/colors';

const CardList = ({ deckId, cards }) => {
  return (
    <View
      style={{
        alignSelf: 'center',
        marginTop: 20,
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}
    >
      {cards.map(card => {
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
                onPress={() => this.deleteCard(deckId, card.id)}
              />
            </View>
          </Card>
        );
      })}
    </View>
  );
};

export default CardList;
