// components/SearchBar.js
import React from "react";
import { View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "../screens/noteScreenStyles";


export const SearchBar = ({ searchQuery, setSearchQuery, darkMode }) => (
  <View style={[styles.searchContainer, darkMode && { backgroundColor: "#333", borderColor: "#555" }]}>
    <Feather name="search" size={20} color={darkMode ? "#fff" : "#555"} style={styles.searchIcon} />
    <TextInput
      style={[styles.searchInput, darkMode && { color: "#fff" }]}
      placeholder="Search notes..."
      placeholderTextColor={darkMode ? "#fff" : "#33367"}
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
  </View>
);