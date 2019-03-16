import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as Actions } from '../state/actions';
import { Selectors } from '../state/reducers';

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import uuid from 'uuid';
import Loader from './components/Loader/loader';
import { purple, white, black } from '../utils/colors';

const BG_IMAGE = require('../assets/10-code-deck.jpg');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const INITIAL_STATE = {
  name: '',
  name_valid: true
};

class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }

  validateName(name) {
    var re = /^\s+$|^$/;
    return !re.test(name);
  }

  validateAndSubmit() {
    const { name } = this.state;
    this.setState({ name_valid: this.validateName(this.state.name) });
    this.setState(
      {
        name_valid: this.validateName(name)
      },
      function a() {
        if (this.state.name_valid) {
          this.addNewDeck();
        }
      }
    );
  }

  addNewDeck() {
    const { addDeckRequest, goBack } = this.props;
    let newDeck = {
      id: uuid.v4().replace(/-/g, ''),
      timestamp: Date.now(),
      name: this.state.name,
      cards: []
    };
    addDeckRequest(newDeck, newDeck.id);
    this.setState({ ...INITIAL_STATE }, function a() {
      goBack();
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Loader loading={this.props.loading} />
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <View style={styles.formView}>
            <View style={styles.title}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.titleText}>ADD DECK</Text>
                <Text style={styles.plusText}>+</Text>
              </View>
            </View>
            <View style={styles.input}>
              <Input
                containerStyle={{ marginVertical: 10 }}
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
                inputStyle={{ marginLeft: 10, color: white }}
                keyboardAppearance="light"
                placeholder="Deck Name"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                ref={input => (this.NameInput = input)}
                onSubmitEditing={() => {
                  this.setState({
                    name_valid: this.validateName(this.state.name)
                  });
                }}
                blurOnSubmit={false}
                placeholderTextColor={white}
                errorStyle={{ textAlign: 'center', fontSize: 12 }}
                errorMessage={
                  this.state.name_valid
                    ? null
                    : 'Please enter a valid deck name'
                }
              />
            </View>
            <Button
              title="Create Deck"
              activeOpacity={1}
              underlayColor="transparent"
              onPress={this.validateAndSubmit.bind(this)}
              loading={this.props.loading}
              loadingProps={{ size: 'small', color: white }}
              disabled={!this.state.name_valid}
              buttonStyle={{
                height: 50,
                width: 250,
                backgroundColor: purple,
                borderWidth: 2,
                borderColor: white,
                borderRadius: 30
              }}
              containerStyle={{ marginVertical: 10 }}
              titleStyle={{ fontWeight: 'bold', color: white }}
            />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    color: black,
    fontSize: 30
  },
  plusText: {
    color: black,
    fontSize: 30
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formView: {
    backgroundColor: 'transparent',
    width: 250,
    height: 400
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
  return {
    loading: Selectors.isLoading(state),
    navigation
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDeck);
