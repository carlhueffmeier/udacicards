import { StyleSheet } from 'react-native';
import { backgroundColor } from 'src/utils/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    flexDirection: `column`,
    backgroundColor: backgroundColor
  },
  list: {
    alignSelf: `stretch`,
    marginBottom: 10
  }
});
