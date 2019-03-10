import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class Deck extends Component {
  render() {
    return (
      <View
        style={{
          width: this.props.width / 2 - 40,
          height: this.props.width / 2 - 40,
          borderWidth: 1,
          borderColor: '#dddddd',
          marginLeft: 5,
          marginTop: 5
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={require('../../../assets/deck-icon-2.png')}
            style={{
              flex: 1,
              width: 80,
              marginTop: 5,
              alignSelf: 'center'
            }}
          />
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'space-evenly',
              paddingLeft: 10
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: 'blue',
                fontWeight: '400',
                alignSelf: 'center'
              }}
            >
              {this.props.name}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
export default Deck;