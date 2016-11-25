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
    text: '',
    text2: '',
    text3: '',
    text4: '',
    text5: '',
  };
  validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          containerStyle={styles.inputContainerStyle}
          placeholder='Hint text'
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
        <TextInput
          containerStyle={styles.inputContainerStyle}
          placeholder='Hint text'
          floatingLabelText='Primary Color'
          value={this.state.text2}
          onChangeText={text2 => this.setState({ text2 })}
        />
        <TextInput
          containerStyle={styles.inputContainerStyle}
          secureTextEntry
          placeholder='Hint text'
          floatingLabelText='Custom Color'
          value={this.state.text3}
          onChangeText={text3 => this.setState({ text3 })}
          floatingLabelColor={Colors.amber500}
          underlineColor={Colors.amber500}
        />
        <TextInput
          containerStyle={styles.inputContainerStyle}
          floatingLabelFixed
          errorText={this.validateEmail(this.state.text4) ? '' : 'Please enter a valid email'}
          placeholder='Hint text'
          floatingLabelText='Floating Label Fixed'
          value={this.state.text4}
          onChangeText={text4 => this.setState({ text4 })}
          floatingLabelColor={Colors.pink500}
          underlineColor={Colors.pink500}
        />
        <TextInput
          containerStyle={styles.inputContainerStyle}
          editable={false}
          placeholder='Disabled'
          floatingLabelFixed
          floatingLabelText='Floating Label Fixed'
          floatingLabelColor={Colors.pinkA700}
          underlineColor={Colors.pinkA700}
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
