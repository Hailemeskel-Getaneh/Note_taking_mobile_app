import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, Animated } from "react-native";

const getGreeting = () => {
  const ethiopianTime = new Date(new Date().getTime() + 3 * 60 * 60 * 1000);
  const hour = ethiopianTime.getHours();

  if (hour < 6) return "Good Morning";
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

export default function HomeScreen({ navigation }) {
  const [greeting, setGreeting] = useState(getGreeting());
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleGoToNotes = () => {
    if (isAuthenticated) {
      navigation.navigate("Note");
    } else {
      navigation.navigate("SignIn");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hamar Notes</Text>
        <Text style={styles.headerIcon}>📝</Text>
      </View>

      <Image style={styles.homeImage} source={require("../images/image1.jpg")} />

      <TouchableOpacity onPress={handleGoToNotes} style={styles.button}>
        <Text style={styles.buttonText}>Go to Notes</Text>
      </TouchableOpacity>

      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>
          "The best way to predict the future is to create it."
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerLinks}></View>
        <Text style={styles.footerText}>© 2025 Hamar Notes</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    marginTop: 20,
    backgroundColor: "#7360DF",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  headerIcon: {
    fontSize: 28,
    marginLeft: 10,
    color: "#fff",
  },
  homeImage: {
    width: 320,
    height: 450,
    borderRadius: 30,
    marginTop: 30,
  },
  button: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: "#7360DF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  quoteContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  quoteText: {
    fontStyle: "italic",
    fontSize: 19,
    color: "black",
    textAlign: "center",
    marginBottom: 10,
    marginHorizontal: 40,
  },
  footer: {
    width: "100%",
    padding: 10,
    backgroundColor: "#7360DF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
  },
  footerButton: {
    paddingVertical: 5,
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
});