import React, { Component } from 'react';
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
import { SimpleButton } from 'src/components';
import { white, black, red } from 'src/helper/colors';
import { getNumberOfCardsString } from '../../helper/utils';
import Swipeout from 'react-native-swipeout';

class DeckListScreen extends Component {
  renderDeckListItem({ item: currentDeck }) {
    const { navigate } = this.props.navigation;
    const subtitle = getNumberOfCardsString(currentDeck);
    const swipeButtons = [
      {
        text: `Delete`,
        backgroundColor: red,
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
    if (this.props.decks) {
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
            textStyle={{ color: black }}
            buttonStyle={{ backgroundColor: white }}
            onPress={() => navigate(`NewDeck`)}
          />
        </View>
      );
    } else {
      // Loading
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    flexDirection: `column`,
    backgroundColor: white
  },
  list: {
    alignSelf: `stretch`,
    marginBottom: 10
  }
});

function mapStateToProps(state) {
  return {
    decks: getAllDecks(state.decks)
  };
}

export default connect(mapStateToProps, { removeDeck })(DeckListScreen);
