// components/SortClearModal.js
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "../screens/noteScreenStyles";


export const SortClearModal = ({ sortClearModalVisible, setSortClearModalVisible, toggleSortOrder, clearAllNotes, sortOrder }) => {
  if (!sortClearModalVisible) return null;

  return (
    <TouchableOpacity
      style={styles.modalOverlay}
      onPress={() => setSortClearModalVisible(false)}
    >
      <View style={styles.hamburgerModal}>
        <TouchableOpacity onPress={toggleSortOrder} style={styles.modalItem}>
          <Feather name="arrow-up" size={18} color="#333" />
          <Text style={styles.modalItemText}>
            Sort: {sortOrder === "desc" ? "Descending" : "Ascending"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearAllNotes} style={styles.modalItem}>
          <Feather name="trash-2" size={18} color="#333" />
          <Text style={styles.modalItemText}>Clear All Notes</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};