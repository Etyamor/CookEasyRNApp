import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import MainTab from './src/navigations/MainTab';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthStack from './src/navigations/AuthStack';

enableScreens(false);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isLoggedIn ? <MainTab /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
