import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDeck } from 'src/redux/modules/decks';
import { StyleSheet, Text, View } from 'react-native';
import { SimpleButton, TextButton, QuizResult } from 'src/components';
import { positiveColor, negativeColor, secondaryColor } from 'src/utils/colors';
import {
  clearLocalNotification,
  setLocalNotification
} from 'src/utils/notifications';

class QuizScreen extends Component {
  static propTypes = {
    deck: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  state = {
    currentCardIndex: 0,
    numberOfCorrectAnswers: 0,
    showAnswer: false,
    showResults: false
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
    } else {
      this.onQuizCompleted();
    }
  }

  onQuizCompleted() {
    // Cancel notification for today and set a new one tomorrow
    clearLocalNotification();
    setLocalNotification();
  }

  advanceCardIndex() {
    const { currentCardIndex } = this.state;
    this.setState({ currentCardIndex: currentCardIndex + 1 });
  }

  goBack() {
    this.props.navigation.goBack();
  }

  restartQuiz() {
    this.setState({ currentCardIndex: 0, numberOfCorrectAnswers: 0 });
  }

  getTotalNumberOfCards() {
    return this.props.deck.questions.length;
  }

  isQuizCompleted() {
    return this.state.currentCardIndex === this.getTotalNumberOfCards();
  }

  getPercentageOfCorrectAnswers() {
    return (
      this.state.numberOfCorrectAnswers / this.getTotalNumberOfCards() * 100
    );
  }

  render() {
    if (this.isQuizCompleted()) {
      return (
        <QuizResult
          result={this.getPercentageOfCorrectAnswers()}
          onBack={this.goBack.bind(this)}
          onRestart={this.restartQuiz.bind(this)}
        />
      );
    }

    const { currentCardIndex, showAnswer } = this.state;
    const currentCard = this.props.deck.questions[currentCardIndex];

    return (
      <View style={styles.container}>
        <Text style={styles.progressIndicator}>
          {currentCardIndex + 1} / {this.getTotalNumberOfCards()}
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
            textStyle={{ color: secondaryColor }}
            buttonStyle={{
              backgroundColor: positiveColor,
              borderColor: positiveColor
            }}
            onPress={this.onCorrect.bind(this)}
          />
          <SimpleButton
            text="Incorrect"
            textStyle={{ color: secondaryColor }}
            buttonStyle={{
              backgroundColor: negativeColor,
              borderColor: negativeColor
            }}
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
    justifyContent: `space-around`,
    alignItems: `center`,
    backgroundColor: secondaryColor
  },
  progressIndicator: {
    alignSelf: `flex-start`,
    flex: 1,
    fontSize: 20
  },
  cardContainer: {
    flex: 1,
    alignItems: `center`,
    marginHorizontal: 20
  },
  cardText: {
    fontSize: 28,
    textAlign: `center`
  },
  cardToggleAnswerButton: {
    color: negativeColor,
    fontSize: 24,
    marginTop: 24
  },
  buttons: {
    flex: 2,
    justifyContent: `center`
  }
});

function mapStateToProps(state, ownProps) {
  const { deckId } = ownProps.navigation.state.params;
  return {
    deck: getDeck(state.decks, deckId)
  };
}

export default connect(mapStateToProps)(QuizScreen);
