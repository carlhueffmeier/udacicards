import { StyleSheet } from 'react-native';
import { backgroundColor, negativeColor } from 'src/utils/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: `space-around`,
    alignItems: `center`,
    backgroundColor: backgroundColor
  },
  progressIndicator: {
    alignSelf: `flex-start`,
    flex: 1,
    fontSize: 20
  },
  cardContainer: {
    flex: 1,
    alignItems: `center`,
    marginHorizontal: 20
  },
  cardText: {
    fontSize: 28,
    textAlign: `center`
  },
  cardToggleAnswerButton: {
    color: negativeColor,
    fontSize: 24,
    marginTop: 24
  },
  buttonContainer: {
    flex: 2,
    justifyContent: `center`
  }
});
