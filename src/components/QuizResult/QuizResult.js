import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { SimpleButton } from 'src/components';
import { buttonStyles } from 'src/utils/commonStyles';
import styles from './styles';

QuizResult.propTypes = {
  result: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired
};

export default function QuizResult({ result, onBack, onRestart }) {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: `center` }}>
        <Text style={styles.text}>Your Result:</Text>
        <Text style={styles.result}>{result.toFixed(2)} %</Text>
      </View>
      <View>
        <SimpleButton
          {...buttonStyles.secondary}
          text="Restart"
          onPress={onRestart}
        />
        <SimpleButton {...buttonStyles.primary} text="Back" onPress={onBack} />
      </View>
    </View>
  );
}
