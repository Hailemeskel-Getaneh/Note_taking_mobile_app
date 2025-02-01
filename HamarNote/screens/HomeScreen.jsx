import React, { useState, useEffect } from "react";
import { 
  View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, Animated 
} from "react-native";

// Function to get dynamic greeting based on the Ethiopian time (GMT +3)
const getGreeting = () => {
  // Get the current time in UTC and add 3 hours for Ethiopian time (GMT+3)
  const ethiopianTime = new Date(new Date().getTime() + 3 * 60 * 60 * 1000); // Adding 3 hours
  const hour = ethiopianTime.getHours();
  
  // Determine the greeting based on the time of day in Ethiopia
  if (hour < 6) return "Good Morning"; // Early morning (6 AM)
  if (hour < 12) return "Good Morning"; // Morning (6 AM - 12 PM)
  if (hour < 18) return "Good Afternoon"; // Afternoon (12 PM - 6 PM)
  return "Good Evening"; // Evening (6 PM - Midnight)
};

export default function HomeScreen({ navigation }) {
  const [greeting, setGreeting] = useState(getGreeting());
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity

  // Fade-in animation for greeting message
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hamar Notes</Text>
        <Text style={styles.headerIcon}>📝</Text>
      </View>

      {/* Hero Image */}
      <Image style={styles.homeImage} source={require("../images/homeIMage.jpg")} />

      {/* Action Buttons */}
      <TouchableOpacity onPress={() => navigation.navigate("Note")} style={styles.button}>
        <Text style={styles.buttonText}>Go to Notes</Text>
      </TouchableOpacity>

      {/* Motivational Quote */}
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>
          "The best way to predict the future is to create it."
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerLinks}>
          <TouchableOpacity onPress={() => navigation.navigate("About")} style={styles.footerButton}>
            <Text style={styles.footerText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Contact")} style={styles.footerButton}>
            <Text style={styles.footerText}>Contact</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footerText}>© 2025 Hamar Notes</Text>
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    marginTop: 70,
    backgroundColor: "#4A90E2",
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
    height: 420,
    borderRadius: 30,
    marginTop: 30,
  },
 // Updated button style
button: {
  marginTop: 20,
  paddingVertical: 15,
  paddingHorizontal: 40,
  backgroundColor: "#4A90E2", // Changed color to match header/footer
  borderRadius: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 5, // Adjusted shadow to make it more consistent
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
    
    backgroundColor: "#4A90E2",
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
