import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {
  DeckListScreen,
  DeckScreen,
  QuizScreen,
  NewDeckScreen,
  NewCardScreen
} from 'src/screens';
import { black, white } from 'src/helper/colors';

export default StackNavigator(
  {
    Home: {
      screen: DeckListScreen,
      navigationOptions: ({ navigation }) => ({
        title: `Decks`
      })
    },
    Deck: {
      screen: DeckScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.deckId
      })
    },
    Quiz: {
      screen: QuizScreen,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.deckId} Quiz`
      })
    },
    NewDeck: {
      screen: NewDeckScreen,
      navigationOptions: { title: `New Deck` }
    },
    NewCard: { screen: NewCardScreen, navigationOptions: { title: `Add Card` } }
  },
  {
    headerMode: `screen`,
    navigationOptions: {
      headerStyle: {
        backgroundColor: black
      },
      headerTintColor: white
    }
  }
);
