import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet } from 'react-native';
import styles from './styles';

SingleLineTextInput.propTypes = {
  textStyle: PropTypes.object,
  containerStyle: PropTypes.object
};

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
