import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';

TextButton.propTypes = {
  text: PropTypes.string.isRequired
};

export default function TextButton(props) {
  const { text, ...otherProps } = props;
  return (
    <TouchableOpacity>
      <Text {...otherProps}>{text}</Text>
    </TouchableOpacity>
  );
}
