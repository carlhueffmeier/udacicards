import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { black, white } from 'src/helper/colors';

export default function SimpleButton(props) {
  const { text, textStyle = {}, buttonStyle = {}, ...buttonProps } = props;
  return (
    <TouchableOpacity
      style={[styles.defaultButtonStyle, buttonStyle]}
      {...buttonProps}
    >
      <Text style={[styles.defaultTextStyle, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultButtonStyle: {
    backgroundColor: black,
    padding: 20,
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    justifyContent: `center`,
    alignItems: `center`,
    margin: 5
  },
  defaultTextStyle: {
    color: white,
    fontSize: 20,
    fontWeight: `bold`
  }
});
