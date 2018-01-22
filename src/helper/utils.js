export function getNumberOfCards(deck) {
  return deck.questions.length;
}

export function getNumberOfCardsString(deck) {
  const numberOfCards = getNumberOfCards(deck);
  return `${numberOfCards} card${numberOfCards != 1 ? `s` : ``}`;
}
