import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { purple } from '../../../utils/colors';

const ScoreTile = ({ score, total, returnDeck, restartGame }) => {
  return (
    <View>
      <View style={styles.container}>
        <Text h2>
          You anwser correctley <Text style={{color: purple}}>{score}</Text> of {total} questions
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={'Return to deck'}
          onPress={() => returnDeck('wrong')}
          icon={{
            name: 'arrow-circle-left',
            type: 'font-awesome',
            size: 15,
            color: 'white'
          }}
          iconRight
          iconContainerStyle={{ marginLeft: 10 }}
          buttonStyle={{
            backgroundColor: purple,
          }}
        />
        <Button
          title={'Play again'}
          onPress={() => restartGame()}
          icon={{
            name: 'play-circle',
            type: 'font-awesome',
            size: 15,
            color: 'white'
          }}
          iconRight
          iconContainerStyle={{ marginLeft: 10 }}
          buttonStyle={{
            backgroundColor: purple,
            marginTop: 10
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ScoreTile;
