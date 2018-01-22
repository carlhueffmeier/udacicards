import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCard } from 'src/redux/modules/decks';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { green } from 'src/helper/colors';
import { SingleLineTextInput } from 'src/components';

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
      <View>
        <SingleLineTextInput
          placeholder="Question"
          onChangeText={question => this.setState({ question })}
        />
        <SingleLineTextInput
          placeholder="Answer"
          onChangeText={answer => this.setState({ answer })}
        />
        <Button
          raised
          icon={{ name: 'add' }}
          title="ADD CARD"
          backgroundColor={green}
          onPress={this.onAddCard.bind(this)}
        />
      </View>
    );
  }
}

export default connect(null, { addCard })(NewCardScreen);
