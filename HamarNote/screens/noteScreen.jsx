import React, { useState, useEffect } from "react";
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, TextInput, Alert, KeyboardAvoidingView, Platform, FlatList
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

export default function NoteScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [expandedNote, setExpandedNote] = useState(null); 
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [priority, setPriority] = useState(false); // Add priority to note
  const [sortOrder, setSortOrder] = useState("desc"); // Sorting notes by date

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    filterNotes();
  }, [searchQuery, notes]);

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

  const addNote = () => {
    if (newNote.trim() === "") {
      Alert.alert("Error", "Note cannot be empty.");
      return;
    }
    const noteWithDate = {
      text: newNote,
      date: new Date().toLocaleString(),
      priority: priority,
    };
    const updatedNotes = [...notes, noteWithDate];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setNewNote("");
    setPriority(false);
  };

  const editNote = (index) => {
    setNewNote(notes[index].text);
    setPriority(notes[index].priority);
    setEditIndex(index);
  };

  const saveEditedNote = () => {
    if (newNote.trim() === "") {
      Alert.alert("Error", "Note cannot be empty.");
      return;
    }
    const updatedNotes = [...notes];
    updatedNotes[editIndex].text = newNote;
    updatedNotes[editIndex].date = new Date().toLocaleString();
    updatedNotes[editIndex].priority = priority;
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setNewNote("");
    setPriority(false);
    setEditIndex(null);
  };

  const deleteNote = (index) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          style: "cancel", // "Cancel" button
        },
        {
          text: "Delete",
          onPress: () => {
            const updatedNotes = notes.filter((_, i) => i !== index);
            setNotes(updatedNotes);
            saveNotes(updatedNotes);
          },
          style: "destructive", // "Delete" button with red style
        },
      ],
      { cancelable: true }
    );
  };
  

  const filterNotes = () => {
    let filtered = notes;
    if (searchQuery.trim() !== "") {
      filtered = notes.filter(note =>
        note.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortOrder === "desc") {
      filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      filtered = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    setFilteredNotes(filtered);
  };
  const togglePriority = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].priority = !updatedNotes[index].priority;
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };
  
  
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hamar Notes</Text>
        <Feather name="edit" size={24} color="white" />
      </View>

      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#555" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search notes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.notesContainer}>
      // Inside ScrollView where notes are rendered:
  {filteredNotes.length === 0 ? (
    <Text style={styles.noNotesText}>No notes found.</Text>
  ) : (
    filteredNotes.map((note, index) => (
      <View key={index} style={[styles.noteItem, note.priority && styles.priorityNote]}>
        <View style={styles.noteContent}>
          <Text style={styles.noteDate}>{note.date}</Text>
          <TouchableOpacity onPress={() => setExpandedNote(expandedNote === index ? null : index)}>
            <Text style={styles.noteText}>
              {expandedNote === index ? note.text : note.text.length > 50 ? note.text.substring(0, 50) + "..." : note.text}
            </Text>
          </TouchableOpacity>
        </View>
  
        <TouchableOpacity onPress={() => editNote(index)} style={styles.actionButton}>
          <Feather name="edit" size={18} color="white" />
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => deleteNote(index)} style={[styles.actionButton, styles.deleteButton]}>
          <Feather name="trash-2" size={18} color="white" />
        </TouchableOpacity>
  
        {/* Toggle priority button for each note */}
        <TouchableOpacity onPress={() => togglePriority(index)} style={styles.priorityButton}>
          <Text style={styles.priorityText}>
            {note.priority ? "Remove Priority" : "Set as Priority"}
          </Text>
        </TouchableOpacity>
      </View>
    ))
  )}
      </ScrollView>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, editIndex !== null && styles.inputEditing]}
            placeholder={editIndex !== null ? "Edit your note..." : "Write your note here..."}
            value={newNote}
            onChangeText={setNewNote}
            multiline={true}
            textAlignVertical="top"
          />
          <TouchableOpacity onPress={editIndex !== null ? saveEditedNote : addNote} style={styles.addButton}>
            <Feather name={editIndex !== null ? "check" : "plus"} size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <TouchableOpacity onPress={togglePriority} style={styles.priorityButton}>
        <Text style={styles.priorityText}>Toggle Priority</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#1E88E5",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    marginTop: 20,
  },

  backButton: {
    padding: 8,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  searchIcon: {
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
  },

  notesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },

  noteItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#BBDEFB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  priorityNote: {
    borderColor: "#FF7043",
    borderWidth: 2,
  },

  noteContent: {
    flex: 1,
  },

  noteText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E1E1E",
  },

  noteDate: {
    fontSize: 12,
    color: "#444",
    marginBottom: 5,
  },

  actionButton: {
    backgroundColor: "#B771E5",
    padding: 8,
    borderRadius: 5,
    marginLeft: 5,
  },

  deleteButton: {
    backgroundColor: "#E53935",
  },

  noNotesText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
    color: "#666",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#bbb",
  },

  addButton: {
    backgroundColor: "#B771E5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 50,
  },

  priorityButton: {
    backgroundColor: "#1E88E5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },

  priorityText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
