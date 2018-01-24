import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, StatusBar } from 'react-native';
import { UdaciCardsNavigator } from 'src/containers';

export default function Root() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent />
      <UdaciCardsNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
