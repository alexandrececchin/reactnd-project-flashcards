import Types from './types';

export const Creators = {
  retrieveInitialDataRequest: () => ({
    type: Types.RETRIEVE_INITIAL_DATA_REQUEST
  }),
  retrieveDecksRequest: () => {
    console.log('retrieveDecksRequest ');
    return {
      type: Types.RETRIEVE_DECKS_REQUEST
    };
  },
  retrieveDecksSuccess: data => ({
    type: Types.RETRIEVE_DECKS_SUCCESS,
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
  addCardRequest: (data, deckId) => ({
    type: Types.ADD_CARD_REQUEST,
    payload: { data, deckId }
  }),
  addCardSuccess: (data, deckId) => ({
    type: Types.ADD_CARD_SUCCESS,
    payload: { data, deckId }
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
