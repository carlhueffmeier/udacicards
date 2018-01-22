import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export default function TextButton(props) {
  const { text, ...otherProps } = props;
  return (
    <TouchableOpacity>
      <Text {...otherProps}>{text}</Text>
    </TouchableOpacity>
  );
}
