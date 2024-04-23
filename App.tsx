/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Text} from 'react-native';

// TODO: import firebase pods here
// this pod is not found, nor listed in package.json
// .....
// import auth from '@react-native-firebase/auth';

function App(): React.JSX.Element {
  const user = {email: 'test@email.com'};
  // const user = auth().currentUser;
  // if (!user) {
  //   return <Text>Please login</Text>;
  // }
  return <Text>Welcome {user.email}</Text>;
}

export default App;
