import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllDecks } from 'src/redux/modules/decks';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { green } from 'src/helper/colors';
import { getNumberOfCardsString } from '../../helper/utils';

class DeckListScreen extends Component {
  renderDeckListItem({ item: currentDeck }) {
    const { navigate } = this.props.navigation;
    const subtitle = getNumberOfCardsString(currentDeck);
    return (
      <ListItem
        title={currentDeck.title}
        subtitle={subtitle}
        onPress={() => navigate(`Deck`, { deckId: currentDeck.title })}
      />
    );
  }

  render() {
    const { decks, navigation: { navigate } } = this.props;
    if (this.props.decks) {
      // Render list
      return (
        <View style={styles.container}>
          <List style={styles.list}>
            <FlatList
              data={decks}
              renderItem={this.renderDeckListItem.bind(this)}
              keyExtractor={(item, index) => index}
            />
          </List>
          <Button
            raised
            icon={{ name: 'add' }}
            title="CREATE NEW DECK"
            backgroundColor={green}
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
    flexDirection: `column`
  },
  list: {
    marginBottom: 10
  }
});

function mapStateToProps(state) {
  return {
    decks: getAllDecks(state.decks)
  };
}

export default connect(mapStateToProps)(DeckListScreen);
