import Types from './types';

export const Creators = {
  retrieveInitialDataRequest: () => ({
    type: Types.RETRIEVE_INITIAL_DATA_REQUEST
  }),
  retrieveDecksRequest: () => ({
    type: Types.RETRIEVE_DECKS_REQUEST
  }),
  retrieveDecksSuccess: data => ({
    type: Types.RETRIEVE_DECKS_SUCCESS,
    payload: { data }
  }),
  addDeckRequest: (deck, deckId) => ({
    type: Types.ADD_DECK_REQUEST,
    payload: { deck, deckId }
  }),
  addDeckSuccess: (data, deckId) => ({
    type: Types.ADD_DECK_SUCCESS,
    payload: { data, deckId }
  }),
  deleteDeckRequest: deckId => ({
    type: Types.DELETE_DECK_REQUEST,
    payload: { deckId }
  }),
  deleteDeckSuccess: deckId => ({
    type: Types.DELETE_DECK_SUCCESS,
    payload: { deckId }
  }),
  addCardRequest: (card, deckId) => ({
    type: Types.ADD_CARD_REQUEST,
    payload: { card, deckId }
  }),
  addCardSuccess: (card, deckId) => ({
    type: Types.ADD_CARD_SUCCESS,
    payload: { card, deckId }
  }),
  deleteCardRequest: (deckId, id) => ({
    type: Types.DELETE_CARD_REQUEST,
    payload: { deckId, id }
  }),
  deleteCardSuccess: (deckId, id) => ({
    type: Types.DELETE_CARD_SUCCESS,
    payload: { deckId, id }
  })
};
