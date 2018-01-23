import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCard } from 'src/redux/modules/decks';
import { StyleSheet, Text, View } from 'react-native';
import { white } from 'src/helper/colors';
import { SimpleButton, SingleLineTextInput } from 'src/components';

class NewCardScreen extends Component {
  state = {
    question: ``,
    answer: ``
  };

  onAddCard() {
    const { goBack } = this.props.navigation;
    const { deckId } = this.props.navigation.state.params;
    const { question, answer } = this.state;

    const newCard = { question, answer };
    this.props.addCard(deckId, newCard);
    goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <SingleLineTextInput
          placeholder="question"
          onChangeText={question => this.setState({ question })}
          containerStyle={{ marginBottom: 0 }}
        />
        <SingleLineTextInput
          placeholder="answer"
          onChangeText={answer => this.setState({ answer })}
        />
        <SimpleButton text="Add Card" onPress={this.onAddCard.bind(this)} />
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

export default connect(null, { addCard })(NewCardScreen);
