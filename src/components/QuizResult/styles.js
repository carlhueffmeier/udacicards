import { StyleSheet } from 'react-native';
import { backgroundColor } from 'src/utils/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: `space-around`,
    alignItems: `center`,
    backgroundColor: backgroundColor
  },
  text: {
    fontSize: 20
  },
  result: {
    fontSize: 48,
    fontWeight: `bold`
  }
});
