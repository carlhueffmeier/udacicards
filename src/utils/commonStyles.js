import {
  primaryColor,
  backgroundColor,
  negativeColor,
  positiveColor
} from 'src/utils/colors';

export const buttonStyles = {
  primary: {
    textStyle: { color: backgroundColor },
    buttonStyle: { backgroundColor: primaryColor }
  },

  secondary: {
    textStyle: { color: primaryColor },
    buttonStyle: { backgroundColor: backgroundColor }
  },

  correct: {
    textStyle: { color: backgroundColor },
    buttonStyle: {
      backgroundColor: positiveColor,
      borderColor: positiveColor
    }
  },

  incorrect: {
    textStyle: { color: backgroundColor },
    buttonStyle: {
      backgroundColor: negativeColor,
      borderColor: negativeColor
    }
  }
};
