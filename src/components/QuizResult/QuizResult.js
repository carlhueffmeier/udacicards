import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function QuizResult({ result }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Result:</Text>
      <Text style={styles.result}>{result.toFixed(2)} %</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: `center`,
    alignItems: `center`
  },
  text: {
    fontSize: 20
  },
  result: {
    fontSize: 48,
    fontWeight: `bold`
  }
});
