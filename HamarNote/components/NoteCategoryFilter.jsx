// components/CategoryFilter.js
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../screens/noteScreenStyles";


export const CategoryFilter = ({ category, setCategory, setSortClearModalVisible, darkMode }) => (
  <View style={styles.categoryContainer}>
    <TouchableOpacity
      onPress={() => setCategory("all")}
      style={[styles.categoryButton, category === "all" && styles.activeCategoryButton]}
    >
      <Text style={[styles.categoryText, category === "all" && styles.activeCategoryText]}>
        All Notes
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => setCategory("favorites")}
      style={[styles.categoryButton, category === "favorites" && styles.activeCategoryButton]}
    >
      <Text style={[styles.categoryText, category === "favorites" && styles.activeCategoryText]}>
        Favorites
      </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => setSortClearModalVisible(true)} style={[styles.verticalDots, darkMode && { color: "#fff" }]}>
      <Text style={[styles.categoryText, { fontSize: 24 }]}>⋮</Text>
    </TouchableOpacity>
  </View>
);