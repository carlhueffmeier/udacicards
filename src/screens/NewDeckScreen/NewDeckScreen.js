import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createDeck } from 'src/redux/modules/decks';
import { StyleSheet, Text, View } from 'react-native';
import { SimpleButton, SingleLineTextInput } from 'src/components';
import { white } from 'src/utils/colors';

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
          placeholder="name for your deck"
          onChangeText={newDeckTitle => this.setState({ newDeckTitle })}
        />
        <SimpleButton text="Create" onPress={this.onCreateDeck.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: `center`
  }
});

export default connect(null, { createDeck })(NewDeckScreen);
