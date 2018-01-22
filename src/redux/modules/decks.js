const DECKS_CREATE = `DECKS_CREATE`;
const DECKS_ADD_CARD = `DECKS_ADD_CARD`;

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

export function createDeck(title) {
  return {
    type: DECKS_CREATE,
    payload: {
      title
    }
  };
}

export function addCard(deck, card) {
  return {
    type: DECKS_ADD_CARD,
    payload: {
      deck,
      card
    }
  };
}

// Reducer

export default function decks(state = defaultData, action) {
  switch (action.type) {
    case DECKS_CREATE:
      const { title } = action.payload;
      return {
        ...state,
        [title]: createEmptyDeck(title)
      };
    case DECKS_ADD_CARD:
      const { deck, card } = action.payload;
      return {
        ...state,
        [deck]: {
          ...state[deck],
          questions: [...state[deck].questions, card]
        }
      };
    default:
      return state;
  }
}

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
