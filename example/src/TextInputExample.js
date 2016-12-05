/* @flow */

import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Colors,
  TextInput,
} from 'react-native-paper';


export default class TextInputExample extends Component {

  static title = 'TextInput';

  state = {
    text: 'React Native Paper',
    text2: '',
    text3: '',
    text4: '',
    text5: '',
  };

  _validateEmail = email => /\S+@\S+/.test(email);
  render() {
    return (
      <ScrollView keyboardShouldPersistTaps style={styles.container}>
        <TextInput
          style={styles.inputContainerStyle}
          floatingLabelText='Primary Color'
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
        <TextInput
          style={styles.inputContainerStyle}
          floatingLabelText='Custom Color'
          value={this.state.text2}
          onChangeText={text2 => this.setState({ text2 })}
          floatingLabelColor={Colors.purple500}
          underlineColor={Colors.purple500}
        />
        <TextInput
          style={styles.inputContainerStyle}
          secureTextEntry
          floatingLabelText='Custom Error Color'
          value={this.state.text4}
          onChangeText={text4 => this.setState({ text4 })}
          errorText={this.state.text4.length <= 8 ? 'Password should be longer than 8 characters' : ''}
          errorTextColor={Colors.amber500}
          floatingLabelColor={Colors.purple500}
          underlineColor={Colors.purple500}
        />
        <TextInput
          style={styles.inputContainerStyle}
          floatingLabelFixed
          errorText={this._validateEmail(this.state.text5) ? '' : 'Please enter a valid email'}
          floatingLabelText='Floating Label Fixed'
          value={this.state.text5}
          onChangeText={text5 => this.setState({ text5 })}
          floatingLabelColor={Colors.teal500}
          underlineColor={Colors.teal500}
        />
        <TextInput
          disabled
          style={styles.inputContainerStyle}
          floatingLabelText='Disabled Input'
        />
      </ScrollView>
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
    margin: 8,
  },
});
