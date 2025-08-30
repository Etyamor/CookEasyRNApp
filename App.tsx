import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import MainTab from './src/navigations/MainTab';
import { useState } from 'react';
import LoginPage from './src/pages/LoginPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

enableScreens(false);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isLoggedIn ? <MainTab /> : <LoginPage />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
