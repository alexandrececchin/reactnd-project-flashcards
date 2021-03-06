import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import CardFlip from 'react-native-card-flip';
import { Button } from 'react-native-elements';
import { white, purple, black } from '../../../utils/colors';

const CardTile = ({ handleAnswer, card, cardIndex }) => {
  onPressAnswer = option => {
    handleAnswer(option);
  };

  onPressCard = () => {
    this.card.flip();
  };

  createRef = card => (this.card = card);
  return (
    <View style={styles.container}>
      <CardFlip style={styles.cardContainer} ref={this.createRef}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.card, styles.card1]}
          onPress={this.onPressCard}
        >
          <Text style={[styles.label, { color: white }]}>{card.question}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.card, styles.card2]}
          onPress={this.onPressCard}
        >
          <Text style={[styles.label, { color: black }]}>{card.answer}</Text>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => this.onPressAnswer('wrong')}
              icon={{
                name: 'times-circle',
                type: 'font-awesome',
                size: 15,
                color: 'white'
              }}
              iconRight
              iconContainerStyle={{ marginLeft: 10 }}
              buttonStyle={{
                backgroundColor: purple,
                borderColor: 'transparent',
                borderWidth: 0,
                marginLeft: 10
              }}
              containerStyle={{ width: 100 }}
            />
            <Button
              onPress={() => this.onPressAnswer('correct')}
              icon={{
                name: 'check-circle',
                type: 'font-awesome',
                size: 15,
                color: 'white'
              }}
              iconRight
              iconContainerStyle={{ marginLeft: 10 }}
              buttonStyle={{
                backgroundColor: purple,
                borderColor: 'transparent',
                borderWidth: 0,
                marginLeft: 10
              }}
              containerStyle={{ width: 100 }}
            />
          </View>
        </TouchableOpacity>
      </CardFlip>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    width: 320,
    height: 470
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
    height: 370,
    backgroundColor: purple,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5
  },
  card1: {
    backgroundColor: purple
  },
  card2: {
    backgroundColor: white
  },
  label: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'System',
    backgroundColor: 'transparent'
  },
  buttonContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
export default CardTile;
