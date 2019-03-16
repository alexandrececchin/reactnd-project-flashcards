import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as Actions } from '../state/actions';
import { Selectors } from '../state/reducers';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Picker,
  KeyboardAvoidingView
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import uuid from 'uuid';
import Loader from './components/Loader/loader';
import { white, purple, black } from '../utils/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const INITIAL_STATE = {
  question: '',
  question_valid: true,
  answer: '',
  answer_valid: true,
  deckId: ''
};
class NewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }

  emptyInput(text) {
    var re = /^\s+$|^$/;
    return !re.test(text);
  }

  validateAndSubmit() {
    const { question, answer } = this.state;
    this.setState(
      {
        question_valid: this.emptyInput(question),
        answer_valid: this.emptyInput(answer)
      },
      function a() {
        if (this.state.question_valid && this.state.answer_valid) {
          this.addNewCard();
        }
      }
    );
  }

  addNewCard() {
    const { addCardRequest, goBack } = this.props;
    const { question, answer, deckId } = this.state;

    let newCard = {
      id: uuid.v4().replace(/-/g, ''),
      timestamp: Date.now(),
      question,
      answer
    };

    addCardRequest(newCard, deckId);

    this.setState({ ...INITIAL_STATE }, function a() {
      goBack();
    });
  }
  render() {
    const { decks, loading } = this.props;
    const { question, question_valid, answer, answer_valid } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Loader loading={loading} />
        <View style={styles.formView}>
          <View style={styles.title}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.titleText}>ADD CARD</Text>
              <Text style={styles.plusText}>+</Text>
            </View>
          </View>
          <View style={styles.Input}>
            <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>
              Select a Deck
            </Text>
            <View style={styles.pickerText}>
              <Picker
                selectedValue={this.state.deckId}
                onValueChange={itemValue =>
                  this.setState({ deckId: itemValue })
                }
              >
                {decks.map(deck => {
                  return (
                    <Picker.Item
                      key={deck.id}
                      label={deck.name}
                      value={deck.id}
                    />
                  );
                })}
              </Picker>
            </View>
            <Input
              containerStyle={{ marginVertical: 5 }}
              onChangeText={question => this.setState({ question })}
              value={question}
              inputStyle={{
                marginLeft: 10,
                color: black,
                overflow: 'visible'
              }}
              keyboardAppearance="light"
              placeholder="Card question"
              autoFocus={true}
              autoCapitalize="none"
              autoCorrect={true}
              returnKeyType="next"
              ref={input => (this.questionInput = input)}
              onSubmitEditing={() => {
                this.setState({ question_valid: this.emptyInput(question) });
              }}
              placeholderTextColor={black}
              errorStyle={{ textAlign: 'center', fontSize: 12 }}
              errorMessage={
                question_valid ? null : 'Please enter a valid deck question'
              }
            />
            <Input
              containerStyle={{ marginVertical: 5 }}
              onChangeText={answer => this.setState({ answer })}
              value={answer}
              inputStyle={{
                marginLeft: 10,
                color: black,
                overflow: 'scroll'
              }}
              keyboardAppearance="light"
              placeholder="Card answer"
              autoFocus={false}
              autoCapitalize="none"
              autoCorrect={true}
              returnKeyType="next"
              ref={input => (this.answerInput = input)}
              onSubmitEditing={() => {
                this.setState({ answer_valid: this.emptyInput(answer) });
              }}
              placeholderTextColor={black}
              errorStyle={{ textAlign: 'center', fontSize: 12 }}
              errorMessage={answer_valid ? null : 'Please enter a valid answer'}
            />
          </View>
          <Button
            title="Add card"
            activeOpacity={1}
            underlayColor="transparent"
            onPress={this.validateAndSubmit.bind(this)}
            loading={loading}
            loadingProps={{ size: 'small', color: white }}
            disabled={!question_valid || !answer_valid}
            buttonStyle={{
              height: 50,
              width: 250,
              borderWidth: 2,
              borderColor: white,
              borderRadius: 30,
              backgroundColor: purple
            }}
            containerStyle={{ marginVertical: 10 }}
            titleStyle={{ fontWeight: 'bold', color: white }}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white
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
    width: 250,
    height: 400
  },
  pickerText: {
    color: black,
    marginLeft: 10,
    height: 50,
    width: 250
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
    decks: Selectors.getDecks(state),
    navigation
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCard);
