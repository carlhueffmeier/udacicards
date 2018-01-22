import { AsyncStorage } from 'react-native';

let decks = null;

const DECKS_KEY = `decks`;

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

// Return empty deck
function createDeck(title) {
  return {
    title,
    questions: []
  };
}

export async function getData() {
  const userData = await AsyncStorage.getItem(DECKS_KEY);
  decks = JSON.parse(userData) || defaultData;
  return decks;
}

export async function clearData() {
  await AsyncStorage.removeItem(DECKS_KEY);
}

// Return all of the decks along with their titles, questions, and answers
export async function getDecks() {
  const allDecks = await getData();
  return convertHashToList(allDecks);
}

function convertHashToList(hash) {
  return Object.keys(hash).map(key => hash[key]);
}

// Take in a single id argument and return the deck associated with that id
export async function getDeck(id) {
  const allDecks = await getData();
  return allDecks[id] || null;
}

// Take in a single title argument and add it to the decks
export async function saveDeckTitle(title) {
  const allDecks = await getData();
  allDecks[title] = createDeck(title);
  await saveToAsyncStorage();
  return allDecks[title];
}

// Take in two arguments, title and card, and will add the card to the
// list of questions for the deck with the associated title
export async function addCardToDeck(title, card) {
  const deck = getDeck(title);
  deck.questions.push(card);
  await saveToAsyncStorage();
  return card;
}

export async function saveToAsyncStorage() {
  await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
}
