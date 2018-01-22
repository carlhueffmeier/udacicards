import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { UdaciCardsNavigator } from 'src/containers';

export default function Root(props) {
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
