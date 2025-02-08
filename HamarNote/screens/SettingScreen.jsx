import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

export default function SettingsScreen({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [noteItemColor, setNoteItemColor] = useState("#F3F3F3"); // Defualt Note item color


  const noteItemColors = [
    "#F3F3F3", 
    "#FFF5E0", 
    "#E3F2FD", 
    "#FFE4E1", 
    "#E0FFFF", 
  ];

   
  useEffect(() => {
    const loadNoteItemColor = async () => {
      try {
        const savedColor = await AsyncStorage.getItem("noteItemColor");
        if (savedColor) {
          setNoteItemColor(savedColor);
        }
      } catch (error) {
        console.error("Error loading note item color:", error);
      }
    };
    loadNoteItemColor();
  }, []);

  const saveNoteItemColor = async (color) => {
    try {
      await AsyncStorage.setItem("noteItemColor", color);
      setNoteItemColor(color);
      Alert.alert("Success", "Note item color updated successfully!");
    } catch (error) {
      console.error("Error saving note item color:", error);
      Alert.alert("Error", "Unable to update note item color.");
    }
  };


  const clearAllNotes = async () => {
    Alert.alert(
      "Clear All Notes",
      "Are you sure you want to delete all notes?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("notes");
              Alert.alert("Success", "All notes have been cleared.");
            } catch (error) {
              Alert.alert("Error", "Unable to clear notes.");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  
  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  return (
    <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
          Appearance
        </Text>
        <View style={[styles.settingItem, isDarkMode && styles.darkSettingItem]}>
          <Text style={[styles.settingText, isDarkMode && styles.darkText]}>
            Dark Mode
          </Text>
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>

        
        <View style={styles.colorPickerContainer}>
          <Text style={[styles.settingText, isDarkMode && styles.darkText]}>
            Note Item Color
          </Text>
          <View style={styles.colorOptions}>
            {noteItemColors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  noteItemColor === color && styles.selectedColorOption,
                ]}
                onPress={() => saveNoteItemColor(color)}
              />
            ))}
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
          Notifications
        </Text>
        <View style={[styles.settingItem, isDarkMode && styles.darkSettingItem]}>
          <Text style={[styles.settingText, isDarkMode && styles.darkText]}>
            Enable Notifications
          </Text>
          <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
        </View>
      </View>

      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
          Data Management
        </Text>
        <TouchableOpacity style={styles.settingButton} onPress={clearAllNotes}>
          <Text style={styles.settingButtonText}>Clear All Notes</Text>
        </TouchableOpacity>
      </View>

                      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
          Developer Info
        </Text>
        <Text style={[styles.aboutText, isDarkMode && styles.darkText]}>
          Hamar Notes
        </Text>
        <Text style={[styles.aboutText, isDarkMode && styles.darkText]}>
          Version 1.0.0
        </Text>
        <Text style={[styles.aboutText, isDarkMode && styles.darkText]}>
          Developed by Hailemeskel Getaneh
        </Text>
        <Text style={[styles.aboutText, isDarkMode && styles.darkText]}>
          Contact: hailegetaneh1221@gmail.com
        </Text>
        <Text style={[styles.aboutText, isDarkMode && styles.darkText]}>
          Website: 'https://hailemeskel.netlify.app'
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#7360DF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "sans-serif",
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  darkSettingItem: {
    backgroundColor: "#333",
  },
  settingText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "sans-serif",
  },
  darkText: {
    color: "#fff",
  },
  settingButton: {
    backgroundColor: "#7360DF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  settingButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "sans-serif",
  },
  colorPickerContainer: {
    marginBottom: 20,
  },
  colorOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedColorOption: {
    borderColor: "#7360DF",
  },
  aboutText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
    fontFamily: "sans-serif",
  },
});
