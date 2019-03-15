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
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { black } from '../utils/colors';
const { width } = Dimensions.get('window');

export class DeckDetails extends Component {
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
  render() {
    const { deck } = this.props;
    return (
      <View style={{ flex: 1 }}>
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
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
              }}
            >
              {deck.cards.map(card => {
                return (
                  <View
                    key={card.id}
                    style={{
                      width: width / 2 - 30,
                      borderWidth: 2,
                      borderColor: '#dddddd',
                      marginLeft: 5,
                      marginTop: 5
                    }}
                  >
                    <Text>{card.question}</Text>
                    <Text>{card.answer}</Text>
                    <View style={{ alignSelf: 'center' }}>
                      {Platform.OS === 'ios' ? (
                        <Ionicons name="ios-trash" color={black} size={22} />
                      ) : (
                        <MaterialIcons
                          name="delete-forever"
                          color={black}
                          size={22}
                        />
                      )}
                    </View>
                  </View>
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
    deck: Selectors.getDeck(state, entryId)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetails);
