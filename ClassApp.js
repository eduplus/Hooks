import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, Button, Keyboard, TextInput, Picker} from 'react-native';

export default class App extends Component<{}> {

  state = {
    clicks: 0,
    keyboardOpen: false,
    text: '',
    id: "2",
    name: ''
  }

  async componentDidMount() {
    const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow'
    const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide'
    this._listeners = [
      Keyboard.addListener(updateListener, this.updateKeyboardSpace),
      Keyboard.addListener(resetListener, this.resetKeyboardSpace),
    ]
    this.fetchMovieName(this.state.id)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.id !== prevState.id) {
      this.setState({ name: ''})
      this.fetchMovieName(this.state.id)
    }
  }

  componentWillUnmount() {
    this._listeners.forEach((listener) => listener.remove())
  }

  fetchMovieName = async (id) => {
    try {
      const result = await fetch(`https://f0ef6998-3b05-4bca-9b85-99cb74e5cbca.mock.pstmn.io/get?id=${id}`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      const json = await result.json()
      this.setState({ name: json.name })
    } catch (e) {
      this.setState({ name: 'Error fetching movie'})
    }
  }

  handleClick = () => {
    this.setState({
      clicks: this.state.clicks + 1
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Number of clicks: {this.state.clicks}</Text>
        <Button onPress={this.handleClick} title={'click'}/>
        <TextInput
          style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Text style={styles.instructions}>Keyboard open: {this.state.keyboardOpen ? 'Yes' : 'No'}</Text>
        <Picker
          selectedValue={this.state.id}
          style={{ height: 300, width: 100 }}
          onValueChange={(itemValue, itemIndex) => this.setState({id: itemValue})}>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="8" value="8" />
        </Picker>
        <Text style={styles.instructions}>
          {this.state.name !== null ?
            this.state.name : null
          }
        </Text>
      </View>
    );
  }

  updateKeyboardSpace = () => {
    this.setState({keyboardOpen: true})
  }

  resetKeyboardSpace = () => {
    this.setState({keyboardOpen: false})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
