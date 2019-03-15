import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity
} from 'react-native';
import DeckList from './components/Explore/DeckList';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as Actions } from '../state/actions';
import { Selectors } from '../state/reducers';

const { width, height } = Dimensions.get('window');

class Explore extends Component {
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

  componentDidMount() {
    const { retrieveInitialDataRequest } = this.props;
    retrieveInitialDataRequest();
  }

  onPressDeck = id => {
    this.props.navigation.navigate('DeckDetails', {
      entryId: id
    });
  };

  render() {
    const { decks } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Animated.View
            style={{
              height: this.animatedHeaderHeight,
              backgroundColor: 'white',
              borderBottomWidth: 1,
              borderBottomColor: '#dddddd'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                backgroundColor: 'white',
                marginHorizontal: 20,
                shadowOffset: { width: 0, height: 0 },
                shadowColor: 'black',
                shadowOpacity: 0.2,
                elevation: 1,
                marginTop: Platform.OS == 'android' ? 30 : null
              }}
            >
              <Ionicons name="ios-search" size={24} />
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Search deck"
                placeholderTextColor="grey"
                style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
              />
            </View>
          </Animated.View>
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
                  paddingHorizontal: 20
                }}
              >
                My Decks
              </Text>
              <DeckList decks={decks} onPressDeck={this.onPressDeck} width={width}/>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

function mapStateToProps(state) {
  return {
    decks: Selectors.getDecks(state)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);
