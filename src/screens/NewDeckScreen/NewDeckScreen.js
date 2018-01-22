import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createDeck } from 'src/redux/modules/decks';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { green } from 'src/helper/colors';
import { SingleLineTextInput } from 'src/components';

class NewDeckScreen extends Component {
  state = {
    newDeckTitle: ``
  };

  onCreateDeck() {
    const { newDeckTitle } = this.state;
    console.log(createDeck('test'));
    this.props.createDeck(newDeckTitle);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View>
        <SingleLineTextInput
          placeholder="Name of new deck"
          onChangeText={newDeckTitle => this.setState({ newDeckTitle })}
        />
        <Button
          raised
          icon={{ name: 'add' }}
          title="CREATE DECK"
          backgroundColor={green}
          onPress={this.onCreateDeck.bind(this)}
        />
      </View>
    );
  }
}

export default connect(null, { createDeck })(NewDeckScreen);
