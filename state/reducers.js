import Types from './types';
import { combineReducers } from 'redux';

export function decks(state = {}, action) {
  switch (action.type) {
    case Types.RETRIEVE_DECKS_SUCCESS:
      return { ...state, ...action.payload.data.entities.decks };
    case Types.ADD_DECK_SUCCESS:
      return {
        ...state,
        ...action.payload.data.entities.decks
      };
    case Types.DELETE_DECK_SUCCESS:
      const newState = { ...state };
      delete newState[action.payload.deckId];
      return newState;
    case Types.ADD_CARD_SUCCESS:
      return {
        ...state,
        [action.payload.deckId]: {
          ...state[action.payload.deckId],
          cards: [...state[action.payload.deckId].cards, action.payload.data]
        }
      };
    case Types.DELETE_CARD_SUCCESS:
      return {
        ...state,
        [action.payload.deckId]: {
          ...state[action.payload.deckId],
          cards: state[action.payload.deckId].cards.filter(
            card => card.id !== action.payload.id
          )
        }
      };
    default:
      return state;
  }
}

export function loading(state = {}, action) {
  switch (action.type) {
    case Types.RETRIEVE_DECKS_REQUEST:
    case Types.RETRIEVE_DECKS_REQUEST:
    case Types.ADD_DECK_REQUEST:
    case Types.DELETE_DECK_REQUEST:
    case Types.ADD_CARD_REQUEST:
    case Types.DELETE_CARD_REQUEST:
      return true;
    default:
      return false;
  }
}

export default combineReducers({ decks, loading });

const getDecks = state => (state.decks ? Object.values(state.decks) : []);

const getDeck = (state, id) => (state.decks[id] ? state.decks[id] : {});

const isLoading = state => state.loading;

export const Selectors = {
  getDeck: (state, id) => getDeck(state, id),
  getDecks: state => getDecks(state),
  isLoading: state => isLoading(state)
};
