/* @flow */

import React, {
  PropTypes,
  Component,
} from 'react';
import {
  Animated,
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import color from 'color';
import TouchableRipple from './TouchableRipple';
import withTheme from '../core/withTheme';
import type { Theme } from '../types/Theme';

type Props = {
  checked: boolean;
  disabled?: boolean;
  onPress?: Function;
  color?: string;
  theme: Theme;
}

type State = {
  borderAnim: Animated.Value;
  radioAnim: Animated.Value;
}

const BORDER_WIDTH = 2;

/**
 * Radio buttons allow the selection of a single option from a set
 */
class RadioButton extends Component <void, Props, State> {
  static propTypes = {
    /**
     * Whether radio is checked
     */
    checked: PropTypes.bool.isRequired,
    /**
     * Whether radio is disabled
     */
    disabled: PropTypes.bool,
    /**
     * Function to execute on press
     */
    onPress: PropTypes.func,
    /**
     * Custom color for radio
     */
    color: PropTypes.string,
    theme: PropTypes.object.isRequired,
  };

  state = {
    borderAnim: new Animated.Value(BORDER_WIDTH),
    radioAnim: new Animated.Value(1),
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.checked !== this.props.checked) {
      if (Platform.OS === 'android') {
        if (nextProps.checked) {
          this.state.radioAnim.setValue(1.2);
          Animated.timing(this.state.radioAnim, {
            toValue: 1,
            duration: 150,
          }).start();
        } else {
          this.state.borderAnim.setValue(10);
          Animated.timing(this.state.borderAnim, {
            toValue: BORDER_WIDTH,
            duration: 150,
          }).start();
        }
      }
    }
  }

  render() {
    const {
      disabled,
      onPress,
      checked,
      theme,
    } = this.props;

    const checkedColor = this.props.color || theme.colors.accent;
    const uncheckedColor = 'rgba(0, 0, 0, .54)';

    let rippleColor, radioColor;

    if (disabled) {
      rippleColor = 'rgba(0, 0, 0, .16)';
      radioColor = 'rgba(0, 0, 0, .26)';
    } else {
      rippleColor = color(checkedColor).clearer(0.32).rgbaString();
      radioColor = checked ? checkedColor : uncheckedColor;
    }

    return (
      <TouchableRipple
        {...this.props}
        borderless
        rippleColor={rippleColor}
        onPress={disabled ? undefined : onPress}
        style={styles.container}
      >
        <Animated.View style={[ styles.radio, { borderColor: radioColor, borderWidth: this.state.borderAnim } ]}>
          {this.props.checked ?
            <View style={[ StyleSheet.absoluteFill, styles.radioContainer ]}>
              <Animated.View
                style={[
                  styles.dot,
                  {
                    backgroundColor: radioColor,
                    transform: [ { scale: this.state.radioAnim } ],
                  },
                ]}
              />
            </View> : null}
        </Animated.View>
      </TouchableRipple>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
  },

  radioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    margin: 8,
  },

  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
});

export default withTheme(RadioButton);
