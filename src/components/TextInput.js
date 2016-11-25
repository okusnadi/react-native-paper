/* @flow */

import React, {
    Component,
    PropTypes,
} from 'react';
import {
    View,
    Animated,
    TextInput as NativeTextInput,
    Easing,
    StyleSheet,
    Platform,
} from 'react-native';
import Text from './Typography/Text';
import withTheme from '../core/withTheme';
import { red500 } from '../styles/colors';

const AnimatedText = Animated.createAnimatedComponent(Text);

type Props = {
  containerStyle?: any;
  editable?: boolean;
  errorText?: string;
  errorTextColor?: string;
  floatingLabelColor?: string;
  floatingLabelFixed?: boolean;
  floatingLabelText?: string;
  inputStyle?: any;
  onChangeText?: Function;
  underlineShow?: boolean;
  underlineColor?: string;
  value?: string;
  placeholder: string;
  placeholderTextColor: string;
  theme: any;
}

type DefaultProps = {
  editable: boolean;
  errorTextColor: string;
  underlineShow: boolean;
}

type State = {
  focused: boolean;
  text: string;
}

/**
 * TextInputs allow users to input text.
 * **Usage:**
 * ```
 * const MyComponent = () => (
 *  <TextInput
 *    placeholder='Hint text'
 *    floatingLabelText='Email'
 *    value={this.state.text}
 *    onChangeText={text => this.setState({ text })}
 *  />
 * );
 * ```
 *
 * @extends TextInput props https://facebook.github.io/react-native/docs/textinput.html#props
 *
 */

class TextInput extends Component<DefaultProps, Props, State> {

  static propTypes = {
    /**
    * The style of the container element.
    */
    containerStyle: View.propTypes.style,
    /**
    * If false, text is not editable. The default value is true.
    */
    editable: PropTypes.bool,
    /**
    * The error string to display.
    */
    errorText: PropTypes.string,
    /**
    * The color to use for the error text.
    */
    errorTextColor: PropTypes.string,
    /**
    * The color to use for the floating label element.
    */
    floatingLabelColor: PropTypes.string,
    /**
    * If true, the floating label will float even when there is no value entered.
    */
    floatingLabelFixed: PropTypes.bool,
    /**
    * The text to use for the floating label element.
    */
    floatingLabelText: PropTypes.string,
    /**
    * Define the style of the underlying TextInput element.
    */
    inputStyle: View.propTypes.style,
    /**
    * Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler.
    */
    onChangeText: PropTypes.func,
    /**
    * If true, shows the underline for the text input.
    */
    underlineShow: PropTypes.bool,
    /**
    * The color to use for the underline element.
    */
    underlineColor: PropTypes.string,
    value: PropTypes.string,
    /**
    * The hint string to display.
    */
    placeholder: PropTypes.string,
    /**
    * The text color of the placeholder string.
    */
    placeholderTextColor: PropTypes.string,
    theme: PropTypes.object.isRequired,
  }

  static defaultProps = {
    editable: true,
    errorTextColor: red500,
    underlineShow: true,
  }

  constructor(props: Props) {
    super(props);
    this.animatedVal = new Animated.Value(0);
    this.animationTimingStart = Animated.timing(this.animatedVal,
      {
        toValue: 1,
        duration: 180,
        easing: Easing.easing,
      });
    this.animationTimingEnd = Animated.timing(this.animatedVal,
      {
        toValue: 0,
        duration: 180,
        easing: Easing.easing,
      });

    this.state = {
      focused: false,
      text: props.value || '',
    };
  }

  state: State;

  componentDidMount() {
    const text = this.props.value;
    if (text || text !== '') {
      this._handleFocus();
    }
  }

  animatedVal: Object;

  animationTimingStart: Function;

  animationTimingEnd: Function;

  _root: any;

  _setRef = (c: Object) => (this._root = c);

  _handleFocus = () => {
    this.setState({ focused: true }, () => {
      global.requestAnimationFrame(() => this.animationTimingStart.start());
    });
  }

  _handleBlur = () => {
    if (!this.state.text || this.state.text === '') {
      this.setState({ focused: false }, () => {
        global.requestAnimationFrame(() => this.animationTimingEnd.start());
      });
    } else {
      this.setState({ focused: false });
    }
  }

  _handleChangeText = (text: string) => {
    this.setState({ text });
    if (this.props.onChangeText) {
      this.props.onChangeText(text);
    }
  }

  setNativeProps(...args) {
    return this._root.setNativeProps(...args);
  }

  isFocused(...args) {
    return this._root.isFocused(...args);
  }

  clear(...args) {
    return this._root.clear(...args);
  }

  render() {
    const {
      containerStyle,
      editable,
      errorText,
      errorTextColor,
      floatingLabelColor,
      floatingLabelFixed,
      floatingLabelText,
      inputStyle,
      underlineShow,
      underlineColor,
      placeholder,
      placeholderTextColor,
      theme,
    } = this.props;
    const { focused } = this.state;
    const { colors, fonts } = theme;
    const fontFamily = fonts.regular;
    const primaryColor = colors.primary;
    const inactiveColor = colors.disabled;
    const placeholderColor = placeholderTextColor || inactiveColor;
    const floating = floatingLabelText && floatingLabelText !== '';
    let inputTextColor, labelColor, bottomLineColor, placeholderText, bottomLineComponent;

    if (editable) {
      inputTextColor = colors.text;
      labelColor = floatingLabelColor || primaryColor;
      bottomLineColor = focused ? (underlineColor || primaryColor) : inactiveColor;
    } else {
      inputTextColor = labelColor = bottomLineColor = inactiveColor;
    }

    if (floating) {
      if (floatingLabelFixed) {
        placeholderText = placeholder;
      } else {
        placeholderText = focused ? placeholder : '';
      }
    } else {
      placeholderText = placeholder;
    }

    const labelColorAnimation = this.animatedVal.interpolate({
      inputRange: [ 0, 1 ],
      outputRange: [ inactiveColor, (errorText && errorText !== '') ? errorTextColor : labelColor ],
    });
    const translateYAnimation = this.animatedVal.interpolate({
      inputRange: [ 0, 1 ],
      outputRange: [ 4, -12 ],
    });
    const fontSizeAnimation = this.animatedVal.interpolate({
      inputRange: [ 0, 1 ],
      outputRange: [ 16, 12 ],
    });

    const labelStyle = {
      color: focused ? labelColorAnimation : inactiveColor,
      fontFamily,
      fontSize: floatingLabelFixed ? 12 : fontSizeAnimation,
      transform: [ { translateY: floatingLabelFixed ? -12 : translateYAnimation } ],
    };

    const bottomLineStyle = {
      backgroundColor: (errorText && errorText !== '') ? errorTextColor : bottomLineColor,
      transform: [ { scaleX: (errorText && errorText !== '') ? 1 : this.animatedVal } ],
    };

    if (Platform.OS === 'android') {
      bottomLineComponent = underlineShow ? (
        <Animated.View style={[ styles.bottomLineContainer, bottomLineStyle, { transform: [], height: 1.3 } ]}/>
      ) : null;
    } else {
      bottomLineComponent = (
        <View style={[ styles.bottomLineContainer, { backgroundColor: inactiveColor } ]}>
            {underlineShow && editable &&
              <Animated.View
                style={[ styles.bottomLine, bottomLineStyle ]}
              />}
        </View>
      );
    }

    return (
            <View style={[ containerStyle ]}>
                {floating && <AnimatedText style={[ styles.label, labelStyle ]}>
                  {floatingLabelText}
                </AnimatedText>}
                <View style={{ marginHorizontal: 2 }}>
                  <NativeTextInput
                    {...this.props}
                    ref={this._setRef}
                    selectionColor={labelColor}
                    placeholder={placeholderText}
                    placeholderTextColor={placeholderColor}
                    onFocus={this._handleFocus}
                    onBlur={this._handleBlur}
                    underlineColorAndroid='transparent'
                    style={[ styles.input, {
                      color: inputTextColor,
                      fontFamily,
                      marginTop: floating ? 8 : 0,
                    }, inputStyle ]}
                    onChangeText={this._handleChangeText}
                  />
                  {bottomLineComponent}
                  {(errorText && errorText !== '') ?
                  <Text style={[ styles.errorText, { fontFamily, color: errorTextColor } ]}>
                    {errorText}
                  </Text> : null}
                </View>
            </View>
        );
  }
}

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    left: 1,
    top: 15,
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    minHeight: 44,
    marginBottom: -8,
  },
  bottomLineContainer: {
    marginBottom: 4,
    height: 1.2,
  },
  bottomLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1.2,
  },
  errorText: {
    fontSize: 11,
  },
});

export default withTheme(TextInput);
