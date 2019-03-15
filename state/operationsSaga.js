import { call, put, all, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { Creators as Actions } from './actions';
import Types from './types';
import initialData from '../utils/initialData';
import { schema, normalize } from 'normalizr';

export const deckSchema = new schema.Entity('decks');

const KEY = '@ReactNDFlashcards:decks';
const FIRST_ACCESS = '@ReactNDFlashcards:firstAccess';

export function* retrieveInitialData() {
  try {
    const data = yield call([AsyncStorage, 'getItem'], FIRST_ACCESS);
    const isFirstAccess = JSON.parse(data);

    if (true) {
      yield call([AsyncStorage, 'setItem'], FIRST_ACCESS, JSON.stringify(true));

      yield call(
        [AsyncStorage, 'setItem'],
        KEY,
        JSON.stringify({ ...initialData })
      );
      yield put(
        Actions.retrieveDecksSuccess(normalize(initialData, [deckSchema]))
      );
    } else {
      yield put(Actions.retrieveDecksRequest());
    }
  } catch (error) {
    console.error(error);
  }
}

export function* retrieveDecks() {
  try {
    const data = yield call([AsyncStorage, 'getItem'], KEY);
    const decks = JSON.parse(data);
    yield put(Actions.retrieveDecksSuccess(normalize(decks, [deckSchema])));
  } catch (error) {
    console.error(error);
  }
}

export function* addDeck(action) {
  const { deck, deckId } = action.payload;

  try {
    const data = yield call([AsyncStorage, 'getItem'], KEY);
    const decks = JSON.parse(data);
    const newDecks = {
      ...decks,
      [deckId]: {
        ...deck
      }
    };

    yield call([AsyncStorage, 'setItem'], KEY, JSON.stringify({ ...newDecks }));

    yield put(Actions.addDeckSuccess(normalize(deck, deckSchema), deckId));
  } catch (error) {
    console.error(error);
  }
}

export function* deleteDeck(action) {}

export function* addCard(action) {
  const { deckId, card } = action.payload;

  try {
    const data = yield call([AsyncStorage, 'getItem'], KEY);
    const decks = JSON.parse(data);
    const newDecks = {
      ...decks,
      deckId: {
        ...decks[deckId],
        cards: [...decks[deckId].cards, card]
      }
    };
    yield call([AsyncStorage, 'setItem'], KEY, JSON.stringify({ ...newDecks }));

    yield put(Actions.addCardSuccess(data, deckId));
  } catch (error) {
    console.error(error);
  }
}

export function* deleteCard(action) {
  const { deckId, id } = action.payload;

  try {
    const data = yield call([AsyncStorage, 'getItem'], KEY);
    const decks = JSON.parse(data);
    const newDecks = {
      ...decks,
      deckId: {
        ...decks[deckId],
        cards: decks[deckId].cards.filter(card => card.id !== id)
      }
    };
    yield call([AsyncStorage, 'setItem'], KEY, JSON.stringify({ ...newDecks }));

    yield put(Actions.deleteCardSuccess(deckId, id));
  } catch (error) {
    console.error(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(Types.RETRIEVE_INITIAL_DATA_REQUEST, retrieveInitialData),
    takeLatest(Types.RETRIEVE_DECKS_REQUEST, retrieveDecks),
    takeLatest(Types.ADD_DECK_REQUEST, addDeck),
    takeLatest(Types.DELETE_DECK_REQUEST, deleteDeck),
    takeLatest(Types.ADD_CARD_REQUEST, addCard),
    takeLatest(Types.DELETE_CARD_REQUEST, deleteCard)
  ]);
}
