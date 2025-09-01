import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import { Colors, Fonts, Spacing } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../constants";
import { useApp } from "../context/AppContext";

const screenWidth = Dimensions.get("window").width;

const LoginForm = () => {
  const navigation = useNavigation();
  const { login, loading } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields");
      return;
    }

    try {
      await login(email, password);
      Alert.alert("Login Successful", "Welcome back!");
    } catch (err: any) {
      Alert.alert("Login Failed", err.message || "Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://picsum.photos/480/270" }}
        style={styles.image}
      />
      <Text style={styles.title}>Welcome!</Text>

      <FormInput
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
      />
      <FormInput
        placeholder="Password"
        hide
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(SCREENS.FORGOT as never)
        }
      >
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      <FormButton
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
      />

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Not a member?</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: SCREENS.REGISTER as never }],
            })
          }
        >
          <Text style={styles.registerLink}>Register now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: Spacing.md,
  },
  image: {
    width: screenWidth,
    height: screenWidth * (9 / 16),
    alignSelf: "center",
    marginBottom: Spacing.md,
  },
  title: {
    fontFamily: Fonts.inter,
    fontWeight: "700",
    fontSize: 24,
  },
  forgotPassword: {
    fontFamily: Fonts.inter,
    fontWeight: "700",
    fontSize: 12,
    color: Colors.blue["500"],
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.xs,
  },
  registerText: {
    fontFamily: Fonts.inter,
    fontSize: 12,
    color: Colors.dark["500"],
  },
  registerLink: {
    fontFamily: Fonts.inter,
    fontWeight: "700",
    fontSize: 12,
    color: Colors.blue["500"],
  },
});

export default LoginForm;
