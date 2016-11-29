/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Colors,
  Title,
  Button,
  BottomSheet,
  Divider,
} from 'react-native-paper';

export default class BottomSheetExample extends Component {
  static title = 'Bottom sheet';

  state = {
    visible: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <Title style={styles.heading}>
          Bottom sheet is {this.state.visible ? 'shown' : 'hidden'}
        </Title>
        <Button
          raised
          primary
          onPress={() => this.setState({ visible: true })}
        >
          Show
        </Button>
        <BottomSheet visible={this.state.visible} onRequestClose={() => this.setState({ visible: false })}>
          <BottomSheet.List title='Create'>
            <BottomSheet.ListItem image={require('../assets/icons/google-docs.png')} label='Document' />
            <BottomSheet.ListItem image={require('../assets/icons/google-sheets.png')} label='Spreadsheet' />
            <BottomSheet.ListItem icon='folder' label='Folder' />
          </BottomSheet.List>
          <Divider />
          <BottomSheet.List>
            <BottomSheet.ListItem icon='share' label='Share' />
            <BottomSheet.ListItem icon='backup' label='Upload' />
            <BottomSheet.ListItem icon='content-copy' label='Copy' />
            <BottomSheet.ListItem icon='print' label='Print this page' />
          </BottomSheet.List>
        </BottomSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    marginVertical: 16,
  },
});
