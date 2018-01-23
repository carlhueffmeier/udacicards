import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createDeck } from 'src/redux/modules/decks';
import { StyleSheet, Text, View } from 'react-native';
import { white } from 'src/helper/colors';
import { SimpleButton, SingleLineTextInput } from 'src/components';

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
      <View style={styles.container}>
        <SingleLineTextInput
          placeholder="new deck's name"
          onChangeText={newDeckTitle => this.setState({ newDeckTitle })}
        />
        <SimpleButton text="Create" onPress={this.onCreateDeck.bind(this)} />
      </View>
    );
  }
}

export default connect(null, { createDeck })(NewDeckScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: `center`
  }
});
