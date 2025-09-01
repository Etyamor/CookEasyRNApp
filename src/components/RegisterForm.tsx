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

const RegisterForm = () => {
  const navigation = useNavigation();
  const { register, loading } = useApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await register(name, email, password, confirmPassword);
      Alert.alert("Success", "Account created!");
      navigation.reset({
        index: 0,
        routes: [{ name: SCREENS.LOGIN as never }],
      });
    } catch (err: any) {
      Alert.alert("Registration Failed", err.message || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://picsum.photos/480/270" }}
        style={styles.image}
      />
      <Text style={styles.title}>Sign up</Text>

      <FormInput placeholder="Your name" value={name} onChangeText={setName} />
      <FormInput
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
      />
      <FormInput
        placeholder="Password"
        hide
        value={password}
        onChangeText={setPassword}
      />
      <FormInput
        placeholder="Confirm password"
        hide
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <FormButton
        title={loading ? "Creating account..." : "Sign up"}
        onPress={handleRegister}
      />

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Already have account?</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: SCREENS.LOGIN as never }],
            })
          }
        >
          <Text style={styles.registerLink}>Login now</Text>
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

export default RegisterForm;
