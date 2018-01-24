import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { primaryColor, secondaryColor } from 'src/utils/colors';

SimpleButton.propTypes = {
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.object,
  buttonStyle: PropTypes.object
};

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
    backgroundColor: primaryColor,
    padding: 20,
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    justifyContent: `center`,
    alignItems: `center`,
    margin: 5
  },
  defaultTextStyle: {
    color: secondaryColor,
    fontSize: 20,
    fontWeight: `bold`
  }
});
