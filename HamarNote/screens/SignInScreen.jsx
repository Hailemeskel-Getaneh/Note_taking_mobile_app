import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);  // Track password visibility

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
      <Text style={styles.title}>Sign In</Text>
      <TextInput 
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.passwordContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!passwordVisible}  // Toggle password visibility
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
          <Text style={styles.eyeText}>{passwordVisible ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.link}>
        <Text style={styles.linkText}>Don't have an account? </Text>
        <Text style={styles.signUpButton}>Sign Up</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#4A90E2",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: "black",
    fontSize: 16,
    padding: 10,
  },
  signUpButton: {
    backgroundColor: "#4A90E2",
    fontSize: 18,
    color: 'white',
    marginLeft: '50%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",  // To align the text input and eye icon
    alignItems: "center", 
    justifyContent: "space-between", 
  },
  eyeIcon: {
    paddingLeft: 10,
  },
  eyeText: {
    fontSize: 16,
    color: "#4A90E2",
  },
});
