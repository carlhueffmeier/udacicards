import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDeck } from 'src/redux/modules/decks';
import { StyleSheet, Text, View } from 'react-native';
import { SimpleButton } from 'src/components';
import { buttonStyles } from 'src/utils/commonStyles';
import { getNumberOfCardsString } from 'src/utils/helpers';
import styles from './styles';

DeckScreen.propTypes = {
  deck: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

function DeckScreen(props) {
  const { deckId } = props.navigation.state.params;
  const { navigate } = props.navigation;
  const subtitle = getNumberOfCardsString(props.deck);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{deckId}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View>
        <SimpleButton
          text="Add Card"
          {...buttonStyles.secondary}
          onPress={() => navigate(`NewCard`, { deckId })}
        />
        {props.deck.questions.length > 0 && (
          <SimpleButton
            text="Start Quiz"
            {...buttonStyles.primary}
            onPress={() => navigate(`Quiz`, { deckId })}
          />
        )}
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
