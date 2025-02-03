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
import styles from "../screens/noteScreenStyles";

const noteColors = ["#F3F3F3", "#F2EFE7"];

export default function NoteScreen({ navigation }) {
  // Main states
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [darkMode, setDarkMode] = useState(false);
  // Only two filter categories now: "all" and "favorites"
  const [category, setCategory] = useState("all");

  const [pinned, setPinned] = useState(false);

  // Add-note states
  const [addMode, setAddMode] = useState(false);
  const [newNote, setNewNote] = useState("");

  // Action menu states for share/copy/delete/edit
  const [actionMenuVisible, setActionMenuVisible] = useState(false);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [actionMenuPosition, setActionMenuPosition] = useState({ x: 0, y: 0 });

  // For in-place editing / expanding note
  const [expandedNoteIndex, setExpandedNoteIndex] = useState(null);
  const [expandedNoteText, setExpandedNoteText] = useState("");

  // Hamburger menu state (for dark mode, about, etc.)
  const [hamburgerMenuVisible, setHamburgerMenuVisible] = useState(false);

  // New state for sort/clear modal (triggered by vertical dots in category navigation)
  const [sortClearModalVisible, setSortClearModalVisible] = useState(false);

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

  // Filter and sort logic – now only "all" and "favorites" are valid
  const filterNotes = () => {
    let filtered = notes;
    if (searchQuery.trim()) {
      filtered = filtered.filter((note) =>
        note.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (category === "favorites") {
      filtered = filtered.filter((note) => note.favorite);
    }
    filtered = filtered.sort((a, b) =>
      sortOrder === "desc"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );
    setFilteredNotes(filtered);
  };

  // Dark mode and sort toggles
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    setSortClearModalVisible(false);
  };

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
            setSortClearModalVisible(false);
          },
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  // Add note functionality
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

  // Action menu functions
  const openActionMenu = (index, event) => {
    // Get the press coordinates from the onPressIn event:
    const { pageX, pageY } = event.nativeEvent;
    setActionMenuPosition({ x: pageX, y: pageY });
    setSelectedNoteIndex(index);
    setActionMenuVisible(true);
  };
  const closeActionMenu = () => {
    setSelectedNoteIndex(null);
    setActionMenuVisible(false);
  };

  // Share/copy/delete actions
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

  // Toggle favorite status
  const toggleFavorite = (index) => {
    const updated = [...notes];
    updated[index].favorite = !updated[index].favorite;
    setNotes(updated);
    saveNotes(updated);
  };

  // Expand/collapse note for in-place editing
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

  // Helpers for formatting date and time
  const getDateFromStr = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString();
  };
  const getTimeFromStr = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString();
  };

  // If a note is expanded (editing mode), render only that note view
  if (expandedNoteIndex !== null) {
    const note = notes[expandedNoteIndex];
    const bgColor =
      note.pinned
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
          <View style={{ width: 24 }} />
        </View>

        {/* Expanded Note */}
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

          {/* Editable text area */}
          <TextInput
            style={[
              styles.expandedTextInput,
              darkMode && { backgroundColor: "#333", color: "#fff", borderColor: "#555" }
            ]}
            multiline
            textAlignVertical="top"
            value={expandedNoteText}
            onChangeText={setExpandedNoteText}
          />

          {/* Cancel and Save buttons */}
          <View style={styles.expandedActions}>
            <TouchableOpacity onPress={collapseNote} style={styles.expandedButton}>
              <Text style={styles.expandedButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={saveExpandedNote} style={styles.expandedButton}>
              <Text style={styles.expandedButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Time display */}
          <View style={styles.timeContainer}>
            <Feather name="clock" size={16} color={darkMode ? "#fff" : "#555"} />
            <Text style={[styles.timeText, darkMode && { color: "#fff" }]}>
              {getTimeFromStr(note.date)}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Render the main list view
  return (
    <SafeAreaView style={[styles.container, darkMode && { backgroundColor: "#121212" }]}>
      {/* Header */}
      <View style={[styles.header, darkMode && { backgroundColor: "#333" }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, darkMode && { color: "#fff" }]}>Hamar Notes</Text>
        <TouchableOpacity
          onPress={() => setHamburgerMenuVisible((prev) => !prev)}
          style={styles.hamburgerButton}
        >
          {/* Toggle between menu and close icon */}
          <Feather name={hamburgerMenuVisible ? "x" : "menu"} size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
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

      {/* Category navigation: "All", "Favorites", and the vertical dots button */}
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

        {/* Vertical dots button for sort/clear options.
            No border or background applied via the verticalDots style. */}
        <TouchableOpacity onPress={() => setSortClearModalVisible(true)} style={styles.verticalDots}>
          <Text style={[styles.categoryText, { fontSize: 24 }]}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Notes list */}
      <ScrollView style={styles.notesContainer}>
        {filteredNotes.length === 0 ? (
          <Text style={styles.noNotesText}>No notes found.</Text>
        ) : (
          filteredNotes.map((note, index) => {
            // For dark mode, override note item background and text colors
            const baseBgColor =
              note.pinned ? "#F26B0F" : noteColors[index % noteColors.length];
            const bgColor = darkMode ? "#333" : baseBgColor;
            const textColor = darkMode ? "#fff" : "black";
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
                  <Text style={[styles.noteDate, { color: textColor }]}>
                    {getDateFromStr(note.date)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => toggleFavorite(index)}
                    style={[styles.favoriteButton, note.favorite && styles.favoriteActive]}
                  >
                    <Feather
                      name="heart"
                      size={20}
                      color={note.favorite ? "#e91e63" : textColor}
                    />
                  </TouchableOpacity>
                </View>

                {/* Tapping the note expands it */}
                <TouchableOpacity onPress={() => expandNote(index)} style={{ flex: 1 }}>
                  <View style={styles.noteContent}>
                    <Text style={[styles.noteText, { color: textColor }]}>
                      {note.text.length > 30 ? note.text.substring(0, 30) + "..." : note.text}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Three-dots action menu button. We use onPressIn to capture tap coordinates */}
                <TouchableOpacity
                  onPressIn={(event) => openActionMenu(index, event)}
                  style={[styles.moreButton, { marginLeft: 10 }]}
                >
                  <Feather name="more-vertical" size={20} color={textColor} />
                </TouchableOpacity>

                {/* Time display */}
                <View style={styles.timeContainer}>
                  <Feather name="clock" size={16} color={textColor} />
                  <Text style={[styles.timeText, { color: textColor }]}>{getTimeFromStr(note.date)}</Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Footer (if needed) */}
      <View style={styles.footer}>
        {/* Example: <Text style={styles.footerText}>© 2025 Hamar Notes</Text> */}
      </View>

      {/* "Add Note" button */}
      <TouchableOpacity onPress={startAddMode} style={styles.addNoteButton}>
        <Text style={styles.addNoteText}>Add Note</Text>
      </TouchableOpacity>

      {/* Add Note mode */}
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

      {/* Action Menu (for Edit, Share, Copy, Delete) positioned based on tap coordinates */}
      {actionMenuVisible && selectedNoteIndex !== null && (
        <TouchableOpacity style={styles.actionMenuOverlay} onPress={closeActionMenu}>
          <View
            style={[
              styles.actionMenu,
              {
                left: actionMenuPosition.x - 100, // adjust offset as needed
                top: actionMenuPosition.y + 10,   // adjust offset as needed
              }
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

      {/* Hamburger Menu (for dark mode, about, contact, settings) */}
      {hamburgerMenuVisible && (
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setHamburgerMenuVisible(false)}
        >
          <View style={styles.hamburgerModal}>
            <TouchableOpacity onPress={toggleDarkMode} style={styles.modalItem}>
              <Feather name={darkMode ? "sun" : "moon"} size={18} color="#333" />
              <Text style={styles.modalItemText}>{darkMode ? "Light Mode" : "Dark Mode"}</Text>
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

      {/* Sort/Clear Modal triggered by vertical dots in category navigation */}
      {sortClearModalVisible && (
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
      )}
    </SafeAreaView>
  );
}
