// NoteScreen.js
import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Alert, Share, Text,TouchableOpacity,TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import styles from "./noteScreenStyles";
import VoiceNote from "../components/voiceNote";
import { Header } from "../components/NoteHeader";
import { SearchBar } from "../components/NoteSearchBar";
import { CategoryFilter } from "../components/NoteCategoryFilter";
import { NoteItem } from "../components/NoteItem";
import { ActionMenu } from "../components/NoteActionMenu";
import { HamburgerMenu } from "../components/NoteHamburgerMenu";
import { SortClearModal } from "../components/NoteSortClear";

const noteColors = ["#F3F3F3", "#F5F5F5"];

export default function NoteScreen({ navigation }) {
  // Main states
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [darkMode, setDarkMode] = useState(false);
  const [category, setCategory] = useState("all");
  const [pinned, setPinned] = useState(false);

  // Add-note states
  const [addMode, setAddMode] = useState(false);
  const [newNote, setNewNote] = useState("");

  // Action menu states
  const [actionMenuVisible, setActionMenuVisible] = useState(false);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [actionMenuPosition, setActionMenuPosition] = useState({ x: 0, y: 0 });

  // For in-place editing / expanding note
  const [expandedNoteIndex, setExpandedNoteIndex] = useState(null);
  const [expandedNoteText, setExpandedNoteText] = useState("");

  // Hamburger menu state
  const [hamburgerMenuVisible, setHamburgerMenuVisible] = useState(false);

  // New state for sort/clear modal
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
          onPress: async () => {
            setNotes([]);
            await saveNotes([]);
            setSortClearModalVisible(false);
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

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
      favorite: false,
    };
    const updated = [...notes, noteWithDate];
    setNotes(updated);
    saveNotes(updated);
    setNewNote("");
    setPinned(false);
    setAddMode(false);
  };

  const openActionMenu = (index, event) => {
    const { pageX, pageY } = event.nativeEvent;
    setActionMenuPosition({ x: pageX, y: pageY });
    setSelectedNoteIndex(index);
    setActionMenuVisible(true);
  };

  const closeActionMenu = () => {
    setSelectedNoteIndex(null);
    setActionMenuVisible(false);
  };

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
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const toggleFavorite = (index) => {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes];
      updatedNotes[index] = { ...updatedNotes[index], favorite: !updatedNotes[index].favorite };
      saveNotes(updatedNotes); // Persist to AsyncStorage
      return updatedNotes;
    });
  };

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

  const getDateFromStr = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString();
  };

  const getTimeFromStr = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString();
  };

// NoteScreen.js (partial update)
const handleSaveVoiceNote = (voiceNote) => {
  const updatedNotes = [...notes, voiceNote];
  setNotes(updatedNotes);
  saveNotes(updatedNotes);
};

// NoteScreen.js (partial update)
if (expandedNoteIndex !== null) {
  const note = notes[expandedNoteIndex];
  const bgColor = note.pinned ? "#F26B0F" : noteColors[expandedNoteIndex % noteColors.length];

  return (
    <SafeAreaView style={[styles.container, darkMode && { backgroundColor: "#121212" }]}>
      <Header navigation={navigation} darkMode={darkMode} hamburgerMenuVisible={hamburgerMenuVisible} setHamburgerMenuVisible={setHamburgerMenuVisible} />
      <View style={[styles.expandedContainer, darkMode && { backgroundColor: "#333", borderColor: "#5B913B" }]}>
        <View style={styles.noteHeader}>
          <Text style={[styles.noteDate, darkMode && { color: "#fff" }]}>
            {getDateFromStr(note.date)}
          </Text>
          <TouchableOpacity
            onPress={() => toggleFavorite(expandedNoteIndex)}
            style={[
              styles.favoriteButton,
              { backgroundColor: note.favorite ? "#e91e63" : "transparent" }
            ]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather
              name="heart"
              size={20}
              color={note.favorite ? "white" : darkMode ? "white" : "#555"}
            />
          </TouchableOpacity>
        </View>

        {note.type === "voice" ? (
          <TouchableOpacity onPress={() => {}} style={styles.voiceNotePlayButton}>
            <Feather name="play" size={24} color={darkMode ? "#fff" : "#555"} />
            <Text style={[styles.voiceNoteText, darkMode && { color: "#fff" }]}>
              Play Voice Note
            </Text>
          </TouchableOpacity>
        ) : (
          <TextInput
            style={[
              styles.expandedTextInput,
              darkMode && { backgroundColor: "#333", color: "#fff", borderColor: "#555" },
            ]}
            multiline
            textAlignVertical="top"
            value={expandedNoteText}
            onChangeText={setExpandedNoteText}
          />
        )}

        <View style={styles.expandedActions}>
          <TouchableOpacity onPress={collapseNote} style={styles.expandedButton}>
            <Text style={[styles.expandedButtonText, darkMode && { color: "#fff" }]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={saveExpandedNote} style={styles.expandedButton}>
            <Text style={[styles.expandedButtonText, darkMode && { color: "#fff" }]}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.timeContainer}>
          <Feather name="clock" size={16} color={darkMode ? "#fff" : "#555"} />
          <Text style={[styles.timeText, darkMode && { color: "white" }]}>
            {getTimeFromStr(note.date)}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
  return (
    <SafeAreaView style={[styles.container, darkMode && { backgroundColor: "#121212" }]}>
      <Header navigation={navigation} darkMode={darkMode} hamburgerMenuVisible={hamburgerMenuVisible} setHamburgerMenuVisible={setHamburgerMenuVisible} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} darkMode={darkMode} />
      <CategoryFilter category={category} setCategory={setCategory} setSortClearModalVisible={setSortClearModalVisible} darkMode={darkMode} />
      <ScrollView style={styles.notesContainer}>
        {filteredNotes.length === 0 ? (
          <Text style={styles.noNotesText}>No notes found.</Text>
        ) : (
          filteredNotes.map((note, index) => (
            <NoteItem
              key={index}
              note={note}
              index={index}
              darkMode={darkMode}
              expandNote={expandNote}
              openActionMenu={openActionMenu}
              toggleFavorite={toggleFavorite}
            />
          ))
        )}
      </ScrollView>

      <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 10 }}>
        <TouchableOpacity onPress={startAddMode} style={styles.addNoteButton}>
          <Text style={styles.addNoteText}>Add Note</Text>
        </TouchableOpacity>

        <VoiceNote onSave={handleSaveVoiceNote} />
      </View>

      {addMode && (
        <View style={[styles.addModeContainer, darkMode && { backgroundColor: "#333" }]}>
          <View style={styles.addModeHeader}>
            <TouchableOpacity onPress={cancelAddMode} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.addModeTitle}>New Note</Text>
          </View>
          <TextInput
            style={[styles.addModeInput, darkMode && { placeholderTextColor: "#fff" }]}
            placeholder="Write your note here..."
            placeholderTextColor="#333"
            value={newNote}
            onChangeText={setNewNote}
            multiline
            textAlignVertical="top"
          />
          <View style={styles.addModeActions}>
            <TouchableOpacity onPress={cancelAddMode} style={styles.addModeActionButton}>
              <Text style={styles.addModeActionText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmAddNote} style={[styles.addModeActionButton, darkMode && { color: "#fff" }]}>
              <Text style={[styles.addModeActionText, darkMode && { color: "#fff" }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ActionMenu
        actionMenuVisible={actionMenuVisible}
        actionMenuPosition={actionMenuPosition}
        selectedNoteIndex={selectedNoteIndex}
        notes={notes}
        expandNote={expandNote}
        shareNote={shareNote}
        copyNote={copyNote}
        deleteNote={deleteNote}
        closeActionMenu={closeActionMenu}
        darkMode={darkMode}
      />

      <HamburgerMenu
        hamburgerMenuVisible={hamburgerMenuVisible}
        setHamburgerMenuVisible={setHamburgerMenuVisible}
        toggleDarkMode={toggleDarkMode}
        navigation={navigation}
        darkMode={darkMode}
      />

      <SortClearModal
        sortClearModalVisible={sortClearModalVisible}
        setSortClearModalVisible={setSortClearModalVisible}
        toggleSortOrder={toggleSortOrder}
        clearAllNotes={clearAllNotes}
        sortOrder={sortOrder}
      />
    </SafeAreaView>
  );
}