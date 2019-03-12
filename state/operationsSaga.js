import { call, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import Actions from './actions';
import Types from './types';

const KEY = '@ReactNDFlashcards:decks';
const FIRST_ACCESS = '@ReactNDFlashcards:firstAccess';

export function* retrieveInitialData() {
  try {
    const data = yield call([AsyncStorage, 'getItem'], FIRST_ACCESS);
    const isFirstAccess = JSON.parse(data);

    if (!isFirstAccess) {
      yield call([AsyncStorage, 'setItem'], FIRST_ACCESS, JSON.stringify(true));
      const decks = {};

      yield call([AsyncStorage, 'setItem'], key, JSON.stringify({ ...decks }));
      yield put(Actions.retrieveDecksSuccess(decks));
    }

    yield put(Actions.retrieveDecksRequest());
  } catch (error) {}
}

export function* retrieveDecks() {
  try {
    const data = yield call([AsyncStorage, 'getItem'], KEY);
    const decks = JSON.parse(data);
    yield put(Actions.retrieveDecksSuccess(decks));
  } catch (error) {}
}

export function* addDeck() {}

export function* deleteDeck() {}

export function* addCard() {}

export function* deleteCard() {}

export default function* rootSaga() {
  yield all([
    takeLatest(Types.ADD_INITIAL_DATA_REQUEST, addInitialData),
    takeLatest(Types.RETRIEVE_DECKS_REQUEST, retrieveDecks),
    takeLatest(Types.ADD_DECK_REQUEST, addDeck),
    takeLatest(Types.DELETE_DECK_REQUEST, deleteDeck),
    takeLatest(Types.ADD_CARD_REQUEST, addCard),
    takeLatest(Types.DELETE_CARD_REQUEST, deleteCard)
  ]);
}