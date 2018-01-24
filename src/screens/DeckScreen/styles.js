import { StyleSheet } from 'react-native';
import { backgroundColor, secondaryColor } from 'src/utils/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    alignItems: `center`,
    justifyContent: `space-around`
  },
  titleContainer: {
    alignItems: `center`
  },
  title: {
    fontSize: 64
  },
  subtitle: {
    fontSize: 24,
    color: secondaryColor
  }
});
