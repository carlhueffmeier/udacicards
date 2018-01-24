import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDeck } from 'src/redux/modules/decks';
import { StyleSheet, Text, View } from 'react-native';
import { SimpleButton, TextButton, QuizResult } from 'src/components';
import { buttonStyles } from 'src/utils/commonStyles';
import {
  clearLocalNotification,
  setLocalNotification
} from 'src/utils/notifications';
import styles from './styles';

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

  isQuizCompleted() {
    return this.state.currentCardIndex === this.getTotalNumberOfCards();
  }

  getPercentageOfCorrectAnswers() {
    return (
      this.state.numberOfCorrectAnswers / this.getTotalNumberOfCards() * 100
    );
  }

  getTotalNumberOfCards() {
    return this.props.deck.questions.length;
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
        <View style={styles.buttonContainer}>
          <SimpleButton
            text="Correct"
            {...buttonStyles.correct}
            onPress={this.onCorrect.bind(this)}
          />
          <SimpleButton
            text="Incorrect"
            {...buttonStyles.incorrect}
            onPress={this.onIncorrect.bind(this)}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { deckId } = ownProps.navigation.state.params;
  return {
    deck: getDeck(state.decks, deckId)
  };
}

export default connect(mapStateToProps)(QuizScreen);
