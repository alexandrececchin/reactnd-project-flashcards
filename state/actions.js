import Types from './types';

export const creators = {
  retrieveInitialDataRequest: () => ({
    type: Types.RETRIEVE_INITIAL_DATA_REQUEST
  }),
  retrieveDecksRequest: () => ({
    type: Types.RETRIEVE_DECKS_REQUEST
  }),
  retrieveDecksSuccess: (data) => ({
    type: Types.RETRIEVE_DECKS_REQUEST,
    payload: { data }
  }),
  addDeckRequest: (deck, id) => ({
    type: Types.ADD_DECK_REQUEST,
    payload: { deck, id }
  }),
  addDeckSuccess: (deck, id) => ({
    type: Types.ADD_DECK_SUCCESS,
    payload: { deck, id }
  }),
  deleteDeckRequest: id => ({
    type: Types.DELETE_DECK_REQUEST,
    payload: { id }
  }),
  deleteDeckSuccess: id => ({
    type: Types.DELETE_DECK_SUCCESS,
    payload: { id }
  }),
  addCardRequest: (card, id) => ({
    type: Types.ADD_CARD_REQUEST,
    payload: { card, id }
  }),
  addCardSuccess: (card, id) => ({
    type: Types.ADD_CARD_SUCCESS,
    payload: { card, id }
  }),
  deleteCardRequest: (deckId, id) => ({
    type: Types.ADD_DELETE_REQUEST,
    payload: { deckId, id }
  }),
  deleteCardSuccess: (deckId, id) => ({
    type: Types.ADD_DELETE_SUCCESS,
    payload: { deckId, id }
  })
};
