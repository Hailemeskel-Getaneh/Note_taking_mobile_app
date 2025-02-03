import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert , Image
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (username && password) {
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("SignIn");
    } else {
      Alert.alert("Error", "Please fill in both fields.");
    }
  };

  return (
    <View style={styles.container}>
           <Image source={require("../images/signUpImage.png")} style={styles.logo} />
      
      <Text style={styles.title}>Sign Up</Text>
      <TextInput 
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput 
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")} style={styles.link}>
     <Text style={styles.linkText}>Already have an account? <Text style={styles.signInButton}>Sign in</Text></Text>

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
  logo:{
    width:"80%",
    height:200,
    marginHorizontal:60,
    borderRadius:30,

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
    backgroundColor: "#7360DF",
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
  },

  signInButton: {
    // backgroundColor: "#7360DF",
    fontSize: 18,
    color: 'white',
    marginLeft: '50%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    textDecorationLine: 'underline',
  },
});
