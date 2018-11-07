import React, { useState, useEffect } from 'react'
import {Platform, StyleSheet, Text, View, Button, TextInput, Keyboard, Picker} from 'react-native';

export default function App() {
  const [clicks, setClicks] = useState(0)
  const [text, setText] = useState('')
  const keyboardOpen = useKeyboardState()
  const [id, setId] = useState('1')
  const [name, setName] = useStarWarsName(id)

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Number of clicks: {clicks}</Text>
      <Button onPress={() => setClicks(clicks + 1)} title={'click'} />
      <TextInput
        style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <Text style={styles.instructions}>Keyboard open: {keyboardOpen ? 'Yes' : 'No'}</Text>
      <Picker
        selectedValue={id}
        style={{ height: 300, width: 100 }}
        onValueChange={(itemValue, itemIndex) => {
          setName('')
          setId(itemValue)
        }}>
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
        {name !== null ?
          name : null
        }
      </Text>

    </View>
  );
}

export const useStarWarsName = (id) => {
  const [name, setName] = useState('')
  useEffect(async () => {
    try {
      const result = await fetch(`https://f0ef6998-3b05-4bca-9b85-99cb74e5cbca.mock.pstmn.io/get?id=${id}`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      const json = await result.json()
      setName(json.name)
    } catch (e) {
      setName('Error fetching movie')
    }
  }, [id])
  return [name, setName]
}

export const useKeyboardState = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(false)

  useEffect(() => {
    const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow'
    const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide'
    const listeners = [
      Keyboard.addListener(updateListener, () => setKeyboardOpen(true)),
      Keyboard.addListener(resetListener, () => setKeyboardOpen(false)),
    ]
    return () => {
      listeners.forEach((listener) => listener.remove())
    }
  }, [])
  return keyboardOpen
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
