import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SimpleButton } from 'src/components';
import { black, white } from 'src/utils/colors';

export default function QuizResult({ result, onBack, onRestart }) {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: `center` }}>
        <Text style={styles.text}>Your Result:</Text>
        <Text style={styles.result}>{result.toFixed(2)} %</Text>
      </View>
      <View>
        <SimpleButton
          text="Restart"
          textStyle={{ color: black }}
          buttonStyle={{ backgroundColor: white }}
          onPress={onRestart}
        />
        <SimpleButton text="Back" onPress={onBack} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: `space-around`,
    alignItems: `center`,
    backgroundColor: white
  },
  text: {
    fontSize: 20
  },
  result: {
    fontSize: 48,
    fontWeight: `bold`
  }
});
