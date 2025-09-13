import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import MainTab from "./src/navigations/MainTab";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthStack from "./src/navigations/AuthStack";
import { AppProvider, useApp } from "./src/context/AppContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { store } from "./src/store";

enableScreens(false);

function RootNavigator() {
  const { user, initializing } = useApp();

  if (initializing) {
    return null;
  }

  return user ? <MainTab /> : <AuthStack />;
}

function App() {
  //AsyncStorage.removeItem("user");

  return (
    <Provider store={store}>
      <AppProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </AppProvider>
    </Provider>
  );
}

export default App;
