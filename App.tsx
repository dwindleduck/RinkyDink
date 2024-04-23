/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Text} from 'react-native';

// TODO: import firebase pods here

function App(): React.JSX.Element {
  const user = null;
  // const user = auth().currentUser;
  if (!user) {
    return <Text>Please login</Text>;
  }
  return <Text>Welcome {user}</Text>;
  // return <Text>Welcome {user.email}</Text>;
}

export default App;
