import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

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
