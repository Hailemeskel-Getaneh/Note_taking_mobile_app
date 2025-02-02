import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
  Share
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import styles from "../screens/noteScreenStyles"; // Import styles from the separate file

const noteColors = ["#F3F3F3"];

export default function NoteScreen({ navigation }) {

  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [darkMode, setDarkMode] = useState(false);
  const [category, setCategory] = useState("all");

  const [pinned, setPinned] = useState(false);

  const [addMode, setAddMode] = useState(false);
  const [newNote, setNewNote] = useState("");

  const [actionMenuVisible, setActionMenuVisible] = useState(false);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

  const [expandedNoteIndex, setExpandedNoteIndex] = useState(null);
  const [expandedNoteText, setExpandedNoteText] = useState("");

  // Hamburger menu
  const [hamburgerMenuVisible, setHamburgerMenuVisible] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    filterNotes();
  }, [searchQuery, notes, sortOrder, category]);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes) setNotes(JSON.parse(storedNotes));
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  const saveNotes = async (updatedNotes) => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  // Filter & sort logic
  const filterNotes = () => {
    let filtered = notes;
    if (searchQuery.trim()) {
      filtered = filtered.filter((note) =>
        note.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (category === "favorites") {
      filtered = filtered.filter((note) => note.favorite);
    } else if (category === "pinned") {
      filtered = filtered.filter((note) => note.pinned);
    }
    filtered = filtered.sort((a, b) =>
      sortOrder === "desc"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );
    setFilteredNotes(filtered);
  };

  // Dark mode & sorting
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleSortOrder = () =>
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));

  const clearAllNotes = () => {
    Alert.alert(
      "Clear All Notes",
      "Are you sure you want to delete all notes?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          onPress: () => {
            setNotes([]);
            saveNotes([]);
          },
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  // Add note
  const startAddMode = () => {
    setAddMode(true);
    setNewNote("");
  };
  const cancelAddMode = () => {
    setAddMode(false);
    setNewNote("");
  };
  const confirmAddNote = () => {
    if (newNote.trim() === "") {
      Alert.alert("Error", "Note cannot be empty.");
      return;
    }
    const noteWithDate = {
      text: newNote,
      date: new Date().toISOString(),
      pinned: pinned,
      favorite: false
    };
    const updated = [...notes, noteWithDate];
    setNotes(updated);
    saveNotes(updated);
    setNewNote("");
    setPinned(false);
    setAddMode(false);
  };

  // Action menu
  const openActionMenu = (index) => {
    setSelectedNoteIndex(index);
    setActionMenuVisible(true);
  };
  const closeActionMenu = () => {
    setSelectedNoteIndex(null);
    setActionMenuVisible(false);
  };

  // Share/copy/delete
  const shareNote = async (note) => {
    try {
      await Share.share({ message: note.text, title: "Hamar Note" });
    } catch (error) {
      Alert.alert("Error", "Unable to share note.");
    }
    closeActionMenu();
  };
  const copyNote = (note) => {
    Clipboard.setString(note.text);
    Alert.alert("Copied", "Note text copied to clipboard.");
    closeActionMenu();
  };
  const deleteNote = (index) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            const updated = notes.filter((_, i) => i !== index);
            setNotes(updated);
            saveNotes(updated);
            closeActionMenu();
          },
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  // Toggle favorite
  const toggleFavorite = (index) => {
    const updated = [...notes];
    updated[index].favorite = !updated[index].favorite;
    setNotes(updated);
    saveNotes(updated);
  };

  // In‐place expansion
  const expandNote = (index) => {
    setExpandedNoteIndex(index);
    setExpandedNoteText(notes[index].text);
  };
  const collapseNote = () => {
    setExpandedNoteIndex(null);
    setExpandedNoteText("");
  };

  const saveExpandedNote = () => {
    if (expandedNoteText.trim() === "") {
      Alert.alert("Error", "Note cannot be empty.");
      return;
    }
    const updated = [...notes];
    updated[expandedNoteIndex].text = expandedNoteText;
    updated[expandedNoteIndex].date = new Date().toISOString();
    setNotes(updated);
    saveNotes(updated);
    collapseNote();
  };

  // Helpers
  const getDateFromStr = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString();
  };
  const getTimeFromStr = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString();
  };

  // If a note is expanded, show only that note in an "expanded" style
  if (expandedNoteIndex !== null) {
    const note = notes[expandedNoteIndex];
    const bgColor = note.pinned
      ? "#F26B0F"
      : noteColors[expandedNoteIndex % noteColors.length];
    return (
      <SafeAreaView style={[styles.container, darkMode && { backgroundColor: "#121212" }]}>
        {/* Header */}
        <View style={[styles.header, darkMode && { backgroundColor: "#333" }]}>
          <TouchableOpacity onPress={collapseNote} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, darkMode && { color: "#fff" }]}>
            Hamar Notes
          </Text>
          <View style={{ width: 24 }} /> {/* placeholder for alignment */}
        </View>

        {/* Expanded note */}
        <View style={[styles.expandedContainer, { backgroundColor: bgColor }]}>
          <View style={styles.noteHeader}>
            <Text style={[styles.noteDate, darkMode && { color: "#ccc" }]}>
              {getDateFromStr(note.date)}
            </Text>
            <TouchableOpacity
              onPress={() => toggleFavorite(expandedNoteIndex)}
              style={[styles.favoriteButton, note.favorite && styles.favoriteActive]}
            >
              <Feather
                name="heart"
                size={20}
                color={note.favorite ? "#e91e63" : darkMode ? "#fff" : "#555"}
              />
            </TouchableOpacity>
          </View>

          {/* In‐place editing */}
          <TextInput
            style={[styles.expandedTextInput, { color: "black" }]}
            multiline
            textAlignVertical="top"
            value={expandedNoteText}
            onChangeText={setExpandedNoteText}
          />

          {/* Save or collapse */}
          <View style={styles.expandedActions}>
            <TouchableOpacity onPress={collapseNote} style={styles.expandedButton}>
              <Text style={styles.expandedButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={saveExpandedNote} style={styles.expandedButton}>
              <Text style={styles.expandedButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Time container */}
          <View style={styles.timeContainer}>
            <Feather name="clock" size={16} color={darkMode ? "#fff" : "#555"} />
            <Text style={[styles.timeText, darkMode && { color: "black" }]}>
              {getTimeFromStr(note.date)}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Otherwise, show the normal list
  return (
    <SafeAreaView style={[styles.container, darkMode && { backgroundColor: "#121212" }]}>
      {/* Header */}
      <View style={[styles.header, darkMode && { backgroundColor: "#333" }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, darkMode && { color: "#fff" }]}>Hamar Notes</Text>
        <TouchableOpacity onPress={() => setHamburgerMenuVisible(true)} style={styles.hamburgerButton}>
          <Feather name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search */}


      <View style={[styles.searchContainer, darkMode && { backgroundColor: "#333", borderColor: "#555" }]}>
        <Feather name="search" size={20} color={darkMode ? "#fff" : "#555"} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, darkMode && { color: "#fff" }]}
          placeholder="Search notes..."
          placeholderTextColor={darkMode ? "#bbb" : "#888"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>


      {/* catagory navigation */}

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

        <TouchableOpacity
          onPress={() => setCategory("pinned")}
          style={[styles.categoryButton, category === "pinned" && styles.activeCategoryButton]}
        >
          <Text style={[styles.categoryText, category === "pinned" && styles.activeCategoryText]}>
            Pinned
          </Text>
        </TouchableOpacity>

      </View>

      {/* notes list */}
      <ScrollView style={styles.notesContainer}>
        {filteredNotes.length === 0 ? (
          <Text style={styles.noNotesText}>No notes found.</Text>
        ) : (
          filteredNotes.map((note, index) => {
            const bgColor = note.pinned
              ? "#F26B0F"
              : noteColors[index % noteColors.length];
            return (
              <View
                key={index}
                style={[
                  styles.noteItem,
                  { backgroundColor: bgColor },
                  note.pinned && styles.priorityNote
                ]}
              >
                {/* Note header */}
                <View style={styles.noteHeader}>
                  <Text style={styles.noteDate}>{getDateFromStr(note.date)}</Text>
                  <TouchableOpacity
                    onPress={() => toggleFavorite(index)}
                    style={[styles.favoriteButton, note.favorite && styles.favoriteActive]}
                  >
                    <Feather
                      name="heart"
                      size={20}
                      color={note.favorite ? "#e91e63" : "#555"}
                    />
                  </TouchableOpacity>
                </View>

                {/* Expand note */}
                <TouchableOpacity onPress={() => expandNote(index)} style={{ flex: 1 }}>
                  <View style={styles.noteContent}>
                    <Text style={styles.noteText}>
                      {note.text.length > 30 ? note.text.substring(0, 30) + "..." : note.text}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* More vertical menu */}
                <TouchableOpacity onPress={() => openActionMenu(index)} style={[styles.moreButton, { marginLeft: 10 }]}>
                  <Feather name="more-vertical" size={20} color="#555" />
                </TouchableOpacity>

                {/* Time container */}
                <View style={styles.timeContainer}>
                  <Feather name="clock" size={16} color="#555" />
                  <Text style={styles.timeText}>{getTimeFromStr(note.date)}</Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        {/* <Text style={styles.footerText}>© 2025 Hamar Notes</Text> */}
      </View>

      {/* Add Note Button */}
      <TouchableOpacity onPress={startAddMode} style={styles.addNoteButton}>
        {/* <Feather name="plus" size={24} color="white" /> */}
        <Text style={styles.addNoteText}>Add Note</Text>
      </TouchableOpacity>

      {/* Add Note Mode */}
      {addMode && (
        <View style={styles.addModeContainer}>
          <View style={styles.addModeHeader}>
            <TouchableOpacity onPress={cancelAddMode} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.addModeTitle}>New Note</Text>
          </View>
          <TextInput
            style={styles.addModeInput}
            placeholder="Write your note here..."
            placeholderTextColor="#888"
            value={newNote}
            onChangeText={setNewNote}
            multiline
            textAlignVertical="top"
          />
          <View style={styles.addModeActions}>
            <TouchableOpacity onPress={cancelAddMode} style={styles.addModeActionButton}>
              <Text style={styles.addModeActionText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmAddNote} style={styles.addModeActionButton}>
              <Text style={styles.addModeActionText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Action Menu (Share/Copy/Delete) */}
      {actionMenuVisible && selectedNoteIndex !== null && (
        <TouchableOpacity style={styles.actionMenuOverlay} onPress={closeActionMenu}>
          <View style={styles.actionMenu}>
            <TouchableOpacity onPress={() => {}} style={styles.actionMenuItem}>
              <Feather name="edit" size={18} color="#333" />
              <Text style={styles.actionMenuItemText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => shareNote(notes[selectedNoteIndex])} style={styles.actionMenuItem}>
              <Feather name="share-2" size={18} color="#333" />
              <Text style={styles.actionMenuItemText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => copyNote(notes[selectedNoteIndex])} style={styles.actionMenuItem}>
              <Feather name="copy" size={18} color="#333" />
              <Text style={styles.actionMenuItemText}>Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteNote(selectedNoteIndex)} style={styles.actionMenuItem}>
              <Feather name="trash-2" size={18} color="#333" />
              <Text style={styles.actionMenuItemText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}

      {/* Hamburger Menu */}
      {hamburgerMenuVisible && (
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setHamburgerMenuVisible(false)}>
          <View style={styles.hamburgerModal}>
            <TouchableOpacity onPress={toggleDarkMode} style={styles.modalItem}>
              <Feather name={darkMode ? "sun" : "moon"} size={18} color="#333" />
              <Text style={styles.modalItemText}>{darkMode ? "Light Mode" : "Dark Mode"}</Text>
            </TouchableOpacity>
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
            <TouchableOpacity onPress={() => navigation.navigate("About")} style={styles.modalItem}>
              <Feather name="info" size={18} color="#333" />
              <Text style={styles.modalItemText}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Contact")} style={styles.modalItem}>
              <Feather name="phone" size={18} color="#333" />
              <Text style={styles.modalItemText}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem}>
              <Feather name="settings" size={18} color="#333" />
              <Text style={styles.modalItemText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
