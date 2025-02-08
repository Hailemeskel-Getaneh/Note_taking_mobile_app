// components/HamburgerMenu.js
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "../screens/noteScreenStyles";


export const HamburgerMenu = ({ hamburgerMenuVisible, setHamburgerMenuVisible, toggleDarkMode, navigation, darkMode }) => {
  if (!hamburgerMenuVisible) return null;

  return (
    <TouchableOpacity
      style={[styles.modalOverlay]}
      onPress={() => setHamburgerMenuVisible(false)}
    >
      <View style={[styles.hamburgerModal, darkMode && { backgroundColor: "#333" }]}>
        <TouchableOpacity onPress={toggleDarkMode} style={styles.modalItem}>
          <Feather name={darkMode ? "sun" : "moon"} size={18} color="#333" />
          <Text style={[styles.modalItemText, darkMode && { color: "#fff" }]}>{darkMode ? "Light Mode" : "Dark Mode"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("About")} style={styles.modalItem}>
          <Feather name="info" size={18} color="#333" />
          <Text style={[styles.modalItemText, darkMode && { color: "#fff" }]}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Contact")} style={styles.modalItem}>
          <Feather name="phone" size={18} color="#333" />
          <Text style={[styles.modalItemText, darkMode && { color: "#fff" }]}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalItem}>
          <Feather name="settings" size={18} color="#333" />
          <Text onPress={() => navigation.navigate("Settings")} style={[styles.modalItemText, darkMode && { color: "#fff" }]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};