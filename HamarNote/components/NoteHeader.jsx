// components/Header.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "../screens/noteScreenStyles";

export const Header = ({ navigation, darkMode, hamburgerMenuVisible, setHamburgerMenuVisible }) => (
  <View style={[styles.header, darkMode && { backgroundColor: "#333" }]}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      <Feather name="arrow-left" size={24} color="white" />
    </TouchableOpacity>
    <Text style={[styles.headerTitle, darkMode && { color: "#fff" }]}>Hamar Notes</Text>
    <TouchableOpacity
      onPress={() => setHamburgerMenuVisible((prev) => !prev)}
      style={styles.hamburgerButton}
    >
      <Feather name={hamburgerMenuVisible ? "x" : "menu"} size={24} color="white" />
    </TouchableOpacity>
  </View>
);