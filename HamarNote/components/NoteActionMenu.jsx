// components/ActionMenu.js
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "../screens/noteScreenStyles";


export const ActionMenu = ({ actionMenuVisible, actionMenuPosition, selectedNoteIndex, notes, expandNote, shareNote, copyNote, deleteNote, closeActionMenu, darkMode }) => {
  if (!actionMenuVisible || selectedNoteIndex === null) return null;

  return (
    <TouchableOpacity style={styles.actionMenuOverlay} onPress={closeActionMenu}>
      <View
        style={[
          styles.actionMenu,
          {
            left: actionMenuPosition.x - 100,
            top: actionMenuPosition.y + 10,
          },
          darkMode && { backgroundColor: "#333" },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            expandNote(selectedNoteIndex);
            closeActionMenu();
          }}
          style={styles.actionMenuItem}
        >
          <Feather name="edit" size={18} color="#333" />
          <Text style={[styles.actionMenuItemText, darkMode && { color: "#fff" }]}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => shareNote(notes[selectedNoteIndex])} style={styles.actionMenuItem}>
          <Feather name="share-2" size={18} color="#333" />
          <Text style={[styles.actionMenuItemText, darkMode && { color: "#fff" }]}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => copyNote(notes[selectedNoteIndex])} style={styles.actionMenuItem}>
          <Feather name="copy" size={18} color="#333" />
          <Text style={[styles.actionMenuItemText, darkMode && { color: "#fff" }]}>Copy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteNote(selectedNoteIndex)} style={styles.actionMenuItem}>
          <Feather name="trash-2" size={18} color="#333" />
          <Text style={[styles.actionMenuItemText, darkMode && { color: "#fff" }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};