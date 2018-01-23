import { omit } from 'ramda';
import { createAction, handleActions } from 'redux-actions';

const defaultData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

// Actions

export const createDeck = createAction(`DECK_CREATE`);
export const removeDeck = createAction(`DECK_REMOVE`);
export const addCard = createAction(`DECK_ADD_CARD`, (deck, card) => ({
  deck,
  card
}));

// Reducer
export default handleActions(
  {
    [createDeck]: (state, { payload: title }) => ({
      ...state,
      [title]: createEmptyDeck(title)
    }),
    [removeDeck]: (state, { payload: title }) => omit([title], state),
    [addCard]: (state, { payload: { deck, card } }) => ({
      ...state,
      [deck]: {
        ...state[deck],
        questions: [...state[deck].questions, card]
      }
    })
  },
  defaultData
);

function createEmptyDeck(title) {
  return {
    title,
    questions: []
  };
}

// Selectors

export function getAllDecks(state) {
  return Object.keys(state).map(key => state[key]);
}

export function getDeck(state, id) {
  return state[id];
}
