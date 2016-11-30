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
import type { Theme } from '../types/Theme';


const AnimatedText = Animated.createAnimatedComponent(Text);

type Props = {
  disabled?: boolean;
  errorText?: string;
  errorTextColor?: string;
  floatingLabelColor?: string;
  floatingLabelFixed?: boolean;
  floatingLabelText?: string;
  inputStyle?: any;
  onChangeText?: Function;
  underlineColor?: string;
  onFocus?: Function;
  onBlur?: Function;
  style?: any;
  value?: string;
  theme: Theme;
}

type DefaultProps = {
  disabled: boolean;
  errorTextColor: string;
}

type State = {
  animatedVal: any;
  focused: boolean;
  text: string;
}

/**
 * TextInputs allow users to input text.
 * **Usage:**
 * ```
 * class MyComponent extends React.Component {
 *   state = {
 *    text: ''
 *   };
 *   render(){
 *    return (
 *     <TextInput
 *      floatingLabelText='Email'
 *      value={this.state.text}
 *      onChangeText={text => this.setState({ text })}
 *    />
      );
    }
  }
 * ```
 *
 * @extends TextInput props https://facebook.github.io/react-native/docs/textinput.html#props
 *
 */

class TextInput extends Component<DefaultProps, Props, State> {

  static propTypes = {
    /**
    * If true, user won't be able to interact with the component. The default value is false
    */
    disabled: PropTypes.bool,
    /**
    * The error string to display
    */
    errorText: PropTypes.string,
    /**
    * The color to use for the error text
    */
    errorTextColor: PropTypes.string,
    /**
    * The color to use for the floating label element
    */
    floatingLabelColor: PropTypes.string,
    /**
    * If true, the floating label will float even when there is no value entered
    */
    floatingLabelFixed: PropTypes.bool,
    /**
    * The text to use for the floating label element
    */
    floatingLabelText: PropTypes.string,
    /**
    * Define the style of the underlying TextInput element
    */
    inputStyle: View.propTypes.style,
    /**
    * Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler
    */
    onChangeText: PropTypes.func,
    /**
    * The color to use for the underline element
    */
    underlineColor: PropTypes.string,
    /**
    * The style of the container element
    */
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    style: View.propTypes.style,
    value: PropTypes.string,
    theme: PropTypes.object.isRequired,
  }

  static defaultProps = {
    disabled: false,
    errorTextColor: red500,
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      animatedVal: new Animated.Value(0),
      focused: false,
      text: props.value || '',
    };
  }

  state: State;

  componentDidMount() {
    if (this.props.value !== '') {
      this._startFocusAnimation();
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.focused !== this.state.focused) {
      if (this.state.focused) {
        this._startFocusAnimation();
      } else {
        if (this.state.text === '') {
          this._startBlurAnimation();
        }
      }
    }
  }

  _root: any;
  _setRef = (c: Object) => (this._root = c);

  _startFocusAnimation = () => Animated.timing(this.state.animatedVal,
    {
      toValue: 1,
      duration: 180,
      easing: Easing.easing,
    }).start();

  _startBlurAnimation = () => Animated.timing(this.state.animatedVal,
    {
      toValue: 0,
      duration: 180,
      easing: Easing.easing,
    }).start();

  _handleFocus = () => {
    this.setState({ focused: true });
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  _handleBlur = () => {
    this.setState({ focused: false });
    if (this.props.onBlur) {
      this.props.onBlur();
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

  focus(...args) {
    return this._root.focus(...args);
  }

  blur(...args) {
    return this._root.blur(...args);
  }

  render() {
    const {
      style,
      disabled,
      errorText,
      errorTextColor,
      floatingLabelColor,
      floatingLabelFixed,
      floatingLabelText,
      inputStyle,
      underlineColor,
      theme,
    } = this.props;
    const { focused } = this.state;
    const { colors, fonts } = theme;
    const fontFamily = fonts.regular;
    const primaryColor = colors.primary;
    const inactiveColor = colors.disabled;
    const floating = floatingLabelText && floatingLabelText !== '';
    // FIXME: Handle if the user sends rgba or hex value
    const underlineShow = underlineColor !== 'transparent';
    let inputTextColor, labelColor, bottomLineColor, bottomLineComponent;

    if (!disabled) {
      inputTextColor = colors.text;
      labelColor = floatingLabelColor || primaryColor;
      bottomLineColor = focused ? (underlineColor || primaryColor) : inactiveColor;
    } else {
      inputTextColor = labelColor = bottomLineColor = inactiveColor;
    }

    const labelColorAnimation = this.state.animatedVal.interpolate({
      inputRange: [ 0, 1 ],
      outputRange: [ inactiveColor, (errorText && errorText !== '') ? errorTextColor : labelColor ],
    });
    const translateYAnimation = this.state.animatedVal.interpolate({
      inputRange: [ 0, 1 ],
      outputRange: [ 4, -12 ],
    });
    const fontSizeAnimation = this.state.animatedVal.interpolate({
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
      transform: [ { scaleX: (errorText && errorText !== '') ? 1 : this.state.animatedVal } ],
    };

    if (Platform.OS === 'android') {
      bottomLineComponent = underlineShow ? (
        <Animated.View style={[ styles.bottomLineContainer, bottomLineStyle, { transform: [], height: 1.3 } ]}/>
      ) : null;
    } else {
      bottomLineComponent = (
        <View style={[ styles.bottomLineContainer, { backgroundColor: inactiveColor } ]}>
            {underlineShow && !disabled &&
              <Animated.View
                style={[ styles.bottomLine, bottomLineStyle ]}
              />}
        </View>
      );
    }

    return (
      <View style={[ style ]}>
          {floating && <AnimatedText style={[ styles.label, labelStyle ]}>
            {floatingLabelText}
          </AnimatedText>}
          <View style={styles.container}>
            <NativeTextInput
              {...this.props}
              editable={!disabled}
              ref={this._setRef}
              selectionColor={labelColor}
              placeholder={''}
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
  container: {
    marginHorizontal: 2,
  },
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
