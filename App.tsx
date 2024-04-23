/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';

import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';

function handleLogin() {
  auth()
    .createUserWithEmailAndPassword(
      'jane.doe@example.com',
      'SuperSecretPassword!',
    )
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
}
function handleLogout() {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Button title="Login" onPress={handleLogin} />
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <Button
        title="Analytics Test"
        // Logs in the firebase analytics console as "select_content" event
        // only accepts the two object properties which accept strings.
        onPress={async () =>
          await analytics().logSelectContent({
            content_type: 'clothing',
            item_id: 'abcd',
          })
        }
      />
      {/* <Button title="Logout" onPress={handleLogout} /> */}
    </View>
  );
}

// function App(): React.JSX.Element {
//   const user = null;
//   // const user = auth().currentUser;
//   if (!user) {
//     return <Text>Please login</Text>;
//   }
//   return <Text>Welcome {user}</Text>;
//   // return <Text>Welcome {user.email}</Text>;
// }

// USED THIS TO TEST THE ANALYTICS CONNECTION
// function App() {
//   return (
//     <View>
//       <Button
//         title="Press me"
//         // Logs in the firebase analytics console as "select_content" event
//         // only accepts the two object properties which accept strings.
//         onPress={async () =>
//           await analytics().logSelectContent({
//             content_type: 'clothing',
//             item_id: 'abcd',
//           })
//         }
//       />
//     </View>
//   );
// }

export default App;
