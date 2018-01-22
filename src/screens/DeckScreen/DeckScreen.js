import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDeck } from 'src/redux/modules/decks';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { getNumberOfCardsString } from 'src/helper/utils';
import { grey, blue, green } from 'src/helper/colors';

function DeckScreen(props) {
  const { deckId } = props.navigation.state.params;
  const { navigate } = props.navigation;
  const subtitle = props.deck ? getNumberOfCardsString(props.deck) : ``;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{deckId}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Button
        raised
        icon={{ name: 'add' }}
        title="ADD CARD"
        backgroundColor={green}
        onPress={() => navigate(`NewCard`, { deckId })}
      />
      <Button
        raised
        title="START QUIZ"
        backgroundColor={blue}
        onPress={() => navigate(`Quiz`, { deckId })}
      />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 36
  },
  subtitle: {
    fontSize: 24,
    color: grey
  }
});
