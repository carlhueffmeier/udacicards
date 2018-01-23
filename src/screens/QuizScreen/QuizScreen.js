import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDeck } from 'src/redux/modules/decks';
import { StyleSheet, Text, View } from 'react-native';
import { SimpleButton, TextButton, QuizResult } from 'src/components';
import { blue, green, red, white } from 'src/helper/colors';

class QuizScreen extends Component {
  state = {
    currentCardIndex: 0,
    numberOfCorrectAnswers: 0,
    showAnswer: false
  };

  onToggleAnswer() {
    this.setState({ showAnswer: !this.state.showAnswer });
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

    const totalNumberOfCards = deck.questions.length;
    if (currentCardIndex === totalNumberOfCards) {
      const percentageOfCorrectAnswers =
        numberOfCorrectAnswers / totalNumberOfCards * 100;
      return <QuizResult result={percentageOfCorrectAnswers} />;
    }

    const currentCard = deck.questions[currentCardIndex];
    return (
      <View style={styles.container}>
        <Text style={styles.progressIndicator}>
          {currentCardIndex + 1} / {totalNumberOfCards}
        </Text>
        <View style={styles.cardContainer}>
          <Text style={styles.cardText}>
            {showAnswer ? currentCard.answer : currentCard.question}
          </Text>
          <TextButton
            style={styles.cardToggleAnswerButton}
            text={showAnswer ? `Question` : `Answer`}
            onPress={this.onToggleAnswer.bind(this)}
          />
        </View>
        <View style={styles.buttons}>
          <SimpleButton
            text="Correct"
            textStyle={{ color: white }}
            buttonStyle={{ backgroundColor: green, borderColor: green }}
            onPress={this.onCorrect.bind(this)}
          />
          <SimpleButton
            text="Incorrect"
            textStyle={{ color: white }}
            buttonStyle={{ backgroundColor: red, borderColor: red }}
            onPress={this.onIncorrect.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: `space-between`,
    alignItems: `center`
  },
  progressIndicator: {
    alignSelf: `flex-start`,
    fontSize: 20
  },
  cardContainer: {
    alignItems: `center`,
    marginHorizontal: 20
  },
  cardText: {
    fontSize: 28,
    textAlign: `center`
  },
  cardToggleAnswerButton: {
    color: red,
    fontSize: 24,
    marginTop: 24
  },
  buttons: {
    marginVertical: 40
  }
});

function mapStateToProps(state, ownProps) {
  const { deckId } = ownProps.navigation.state.params;
  return {
    deck: getDeck(state.decks, deckId)
  };
}

export default connect(mapStateToProps)(QuizScreen);
