import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function SingleLineTextInput(props) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
    margin: 20
  },
  input: {
    fontSize: 30
  }
});
