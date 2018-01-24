import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllDecks, removeDeck } from 'src/redux/modules/decks';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { SimpleButton } from 'src/components';
import { buttonStyles } from 'src/utils/commonStyles';
import { getNumberOfCardsString } from 'src/utils/helpers';
import { negativeColor } from 'src/utils/colors';
import styles from './styles';

class DeckListScreen extends Component {
  static propTypes = {
    decks: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
    removeDeck: PropTypes.func.isRequired
  };

  renderDeckListItem({ item: currentDeck }) {
    const { navigate } = this.props.navigation;
    const subtitle = getNumberOfCardsString(currentDeck);
    const swipeButtons = [
      {
        text: `Delete`,
        backgroundColor: negativeColor,
        onPress: () => this.removeDeck(currentDeck.title)
      }
    ];
    return (
      <Swipeout right={swipeButtons} autoClose backgroundColor="transparent">
        <ListItem
          title={currentDeck.title}
          subtitle={subtitle}
          onPress={() => navigate(`Deck`, { deckId: currentDeck.title })}
        />
      </Swipeout>
    );
  }

  removeDeck(deckId) {
    this.props.removeDeck(deckId);
  }

  render() {
    const { decks, navigation: { navigate } } = this.props;
    if (!decks) {
      // Loading
      return null;
    }
    // Render list
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <List>
            <FlatList
              data={decks}
              renderItem={this.renderDeckListItem.bind(this)}
              keyExtractor={(item, index) => index}
            />
          </List>
        </View>
        <SimpleButton
          text="New Deck"
          {...buttonStyles.secondary}
          onPress={() => navigate(`NewDeck`)}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: getAllDecks(state.decks)
  };
}

export default connect(mapStateToProps, { removeDeck })(DeckListScreen);
