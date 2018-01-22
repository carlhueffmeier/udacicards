import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { blue } from 'src/helper/colors';

export default function MyStatusBar(props) {
  return (
    <View>
      <StatusBar barStyle="light-content" translucent />
    </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: `#555`,
    height: 23
  }
});
