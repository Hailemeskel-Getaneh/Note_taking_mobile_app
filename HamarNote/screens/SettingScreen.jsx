// SettingsScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Alert,
  StyleSheet,
  ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

export default function SettingsScreen({ navigation }) {
  // Local states for different settings. In a production app, consider using context or a global state.
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  // Function to clear all notes from AsyncStorage.
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
          style: "destructive"
        }
      ]
    );
  };

  // Toggle dark mode.
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    // In a production app, update a theme context or global store here.
  };

  // Toggle notification preferences.
  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
    // In a production app, update the notification settings accordingly.
  };

  // Change language selection.
  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    // In a production app, trigger localization updates here.
  };

  return (
    <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Appearance Section */}
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
      </View>

      {/* Notifications Section */}
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

      {/* Language Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
          Language
        </Text>
        <View style={styles.languageContainer}>
          {["English", "Amharic", "Tigrigna"].map((language) => (
            <TouchableOpacity
              key={language}
              style={[
                styles.languageOption,
                selectedLanguage === language && styles.activeLanguageOption,
                isDarkMode && styles.darkLanguageOption
              ]}
              onPress={() => changeLanguage(language)}
            >
              <Text
                style={[
                  styles.languageText,
                  selectedLanguage === language && styles.activeLanguageText,
                  isDarkMode && styles.darkText
                ]}
              >
                {language}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Data Management Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
          Data Management
        </Text>
        <TouchableOpacity style={styles.settingButton} onPress={clearAllNotes}>
          <Text style={styles.settingButtonText}>Clear All Notes</Text>
        </TouchableOpacity>
      </View>

      {/* Developer Info Section */}
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
          Website: https://hailemeskel.netlify.app
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD"
  },
  darkContainer: {
    backgroundColor: "#121212"
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#7360DF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "sans-serif"
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333"
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  darkSettingItem: {
    backgroundColor: "#333"
  },
  settingText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "sans-serif"
  },
  darkText: {
    color: "#fff"
  },
  settingButton: {
    backgroundColor: "#7360DF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10
  },
  settingButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "sans-serif"
  },
  languageContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  languageOption: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center"
  },
  activeLanguageOption: {
    backgroundColor: "#7360DF"
  },
  darkLanguageOption: {
    backgroundColor: "#333"
  },
  languageText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "sans-serif"
  },
  activeLanguageText: {
    color: "#fff"
  },
  aboutText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
    fontFamily: "sans-serif"
  }
});
