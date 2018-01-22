import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDeck } from 'src/redux/modules/decks';
import { StyleSheet, Text, View } from 'react-native';
import { SimpleButton } from 'src/components';
import { getNumberOfCardsString } from 'src/helper/utils';
import { grey, black, white } from 'src/helper/colors';

function DeckScreen(props) {
  const { deckId } = props.navigation.state.params;
  const { navigate } = props.navigation;
  const subtitle = props.deck ? getNumberOfCardsString(props.deck) : ``;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{deckId}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View>
        <SimpleButton
          text="Add Card"
          textStyle={{ color: black }}
          buttonStyle={{ backgroundColor: white }}
          onPress={() => navigate(`NewCard`, { deckId })}
        />
        <SimpleButton
          text="Start Quiz"
          textStyle={{ color: white }}
          buttonStyle={{ backgroundColor: black }}
          onPress={() => navigate(`Quiz`, { deckId })}
        />
      </View>
    </View>
  );
}

function mapStateToProps(state, ownProps) {
  const { deckId } = ownProps.navigation.state.params;
  return {
    deck: getDeck(state.decks, deckId)
  };
}

export default connect(mapStateToProps)(DeckScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: `center`,
    justifyContent: `space-around`
  },
  titleContainer: {
    alignItems: `center`
  },
  title: {
    fontSize: 64
  },
  subtitle: {
    fontSize: 24,
    color: grey
  }
});
