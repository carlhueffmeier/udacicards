import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function SingleLineTextInput(props) {
  const { textStyle = {}, containerStyle = {}, ...otherProps } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input, textStyle]}
        {...otherProps}
        underlineColorAndroid="transparent"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    margin: 30,
    alignSelf: `stretch`
  },
  input: {
    fontSize: 20
  }
});
