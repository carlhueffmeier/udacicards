import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDeck } from 'src/redux/modules/decks';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { blue, green, red } from 'src/helper/colors';

class QuizScreen extends Component {
  state = {
    currentCardIndex: 0,
    numberOfCorrectAnswers: 0,
    showAnswer: false
  };

  onShowAnswer() {
    this.setState({ showAnswer: true });
  }

  onCorrect() {
    const { numberOfCorrectAnswers } = this.state;
    this.setState({ numberOfCorrectAnswers: numberOfCorrectAnswers + 1 });
    this.nextCard();
  }

  onIncorrect() {
    this.nextCard();
  }

  nextCard() {
    const { deck } = this.props;
    const { currentCardIndex } = this.state;
    if (currentCardIndex < deck.questions.length) {
      this.setState({ showAnswer: false });
      this.advanceCardIndex();
    }
  }

  advanceCardIndex() {
    const { currentCardIndex } = this.state;
    this.setState({ currentCardIndex: currentCardIndex + 1 });
  }

  render() {
    const { currentCardIndex, showAnswer, numberOfCorrectAnswers } = this.state;
    const { deck } = this.props;

    console.log(`got some DECK here...`, deck);
    const totalNumberOfCards = deck.questions.length;
    if (currentCardIndex === totalNumberOfCards) {
      const percentageOfCorrectAnswers =
        numberOfCorrectAnswers / totalNumberOfCards * 100;
      return <Text>Result: {percentageOfCorrectAnswers} %</Text>;
    }

    const currentCard = deck.questions[currentCardIndex];
    return (
      <View style={styles.container}>
        <Text>
          {currentCardIndex + 1} / {totalNumberOfCards}
        </Text>
        <Text>{currentCard.question}</Text>
        {showAnswer ? (
          <Text>{currentCard.answer}</Text>
        ) : (
          <Button
            raised
            title="SHOW ANSWER"
            backgroundColor={blue}
            onPress={this.onShowAnswer.bind(this)}
          />
        )}
        <Button
          raised
          title="CORRECT"
          backgroundColor={green}
          onPress={this.onCorrect.bind(this)}
        />
        <Button
          raised
          title="INCORRECT"
          backgroundColor={red}
          onPress={this.onIncorrect.bind(this)}
        />
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { deckId } = ownProps.navigation.state.params;
  console.log(`mapping tooo `, deckId);
  return {
    deck: getDeck(state.decks, deckId)
  };
}

export default connect(mapStateToProps)(QuizScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: `column`
  }
});
