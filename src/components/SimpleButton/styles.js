import { StyleSheet } from 'react-native';
import { primaryColor, backgroundColor } from 'src/utils/colors';

export default StyleSheet.create({
  defaultButtonStyle: {
    backgroundColor: primaryColor,
    padding: 20,
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    justifyContent: `center`,
    alignItems: `center`,
    margin: 5
  },
  defaultTextStyle: {
    color: backgroundColor,
    fontSize: 20,
    fontWeight: `bold`
  }
});
