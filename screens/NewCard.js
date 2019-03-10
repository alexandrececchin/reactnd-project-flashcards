import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class NewCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>NewCard</Text>
      </View>
    );
  }
}
export default NewCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
