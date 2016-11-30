/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Colors,
  TextInput,
} from 'react-native-paper';


export default class TextInputExample extends Component {

  static title = 'TextInput';

  state = {
    text2: 'React Native Paper',
    text3: '',
    text4: '',
    text5: '',
  };

  _validateEmail = email => /\S+@\S+/.test(email);
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputContainerStyle}
          floatingLabelText='Primary Color'
          value={this.state.text2}
          onChangeText={text2 => this.setState({ text2 })}
        />
        <TextInput
          style={styles.inputContainerStyle}
          secureTextEntry
          floatingLabelText='Custom Color'
          value={this.state.text3}
          onChangeText={text3 => this.setState({ text3 })}
          floatingLabelColor={Colors.amber500}
          underlineColor={Colors.amber500}
        />
        <TextInput
          style={styles.inputContainerStyle}
          floatingLabelFixed
          errorText={this._validateEmail(this.state.text4) ? '' : 'Please enter a valid email'}
          floatingLabelText='Floating Label Fixed'
          value={this.state.text4}
          onChangeText={text4 => this.setState({ text4 })}
          floatingLabelColor={Colors.pink500}
          underlineColor={Colors.pink500}
        />
        <TextInput
          disabled
          style={styles.inputContainerStyle}
          floatingLabelFixed
          floatingLabelText='Floating Label Fixed'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 8,
  },
  inputContainerStyle: {
    marginVertical: 4,
  },
});
