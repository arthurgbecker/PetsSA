import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Context, Provider } from './src/context/authContext';

// import Home from './src/screens/Home';
import Routes from './src/screens/Routes';
import Login from './src/screens/Login';
import RegisterUser from './src/screens/RegisterUser';
import ValidateToken from './src/screens/ValidateToken';


const Stack = createNativeStackNavigator();

const App = () => {
  const { state } = useContext(Context);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        {/* esta logado? */}
        {state.Loading ? (
          <Stack.Screen name="ValidateToken" component={ValidateToken} />
        // caso contrario
        ) : (
          /* esta logado? */
          state.isLogged ? (
            <>
              <Stack.Screen name="Routes" component={Routes} />
            </>
          // caso contrario
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="RegisterUser" component={RegisterUser} />
            </>
          )
        )
        }


      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  App: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default () => {
  return (
    <Provider>
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    </Provider>
  );
};
