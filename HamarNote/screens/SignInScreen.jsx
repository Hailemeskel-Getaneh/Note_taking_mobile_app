import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons'; 

export default function SignInScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSignIn = async () => {
    const storedUsername = await AsyncStorage.getItem("username");
    const storedPassword = await AsyncStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
      Alert.alert("Success", "You are logged in!");
      navigation.navigate("Note");
    } else {
      Alert.alert("Error", "Invalid credentials!");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../images/mobileLoginImage.png")} style={styles.logo} />
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? "eye-off" : "eye"}
            size={24}
            color="#4A90E2"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.linkText}>Don't have an account? <Text style={styles.signUpButton}>Sign Up</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  logo: {
    width: "75%",
    height: 220,
    marginBottom: 20,
    borderRadius: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  inputPassword: {
    flex: 1,
   
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#7360DF",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "black",
    fontSize: 16,
    marginTop: 15,
  },
  signUpButton: {
    color: "#7360DF",
    fontWeight: "bold",
  },
});
