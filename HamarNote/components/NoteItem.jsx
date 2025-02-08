// components/NoteItem.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import styles from "../screens/noteScreenStyles";

const noteColors = ["#F3F3F3", "#F5F5F5"];

export const NoteItem = ({ note, index, darkMode, expandNote, openActionMenu, toggleFavorite }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const baseBgColor = note.pinned ? "#F26B0F" : noteColors[index % noteColors.length];
  const bgColor = darkMode ? "#333" : baseBgColor;
  const textColor = darkMode ? "#fff" : "black";

  const playSound = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync({ uri: note.uri });
      setSound(newSound);
      await newSound.playAsync();
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error("Error playing sound:", error);
      Alert.alert("Error", "Could not play the voice note.");
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const getDateFromStr = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString();
  };

  const getTimeFromStr = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString();
  };

  return (
    <View
      key={index}
      style={[
        styles.noteItem,
        { backgroundColor: bgColor },
        note.pinned && styles.priorityNote,
      ]}
    >
      <View style={styles.noteHeader}>
        <Text style={[styles.noteDate, { color: textColor }]}>
          {getDateFromStr(note.date)}
        </Text>

        <TouchableOpacity onPress={() => toggleFavorite(index)}>
          <MaterialCommunityIcons
            name={note.favorite ? "heart" : "heart-outline"}
            size={24}
            color={note.favorite ? "red" : "black"}
          />
        </TouchableOpacity>
      </View>

      {note.type === "voice" ? (
        <TouchableOpacity onPress={isPlaying ? stopSound : playSound} style={styles.voiceNotePlayButton}>
          <Feather name={isPlaying ? "pause" : "play"} size={24} color={textColor} />
          <Text style={[styles.voiceNoteText, { color: textColor }]}>
            {isPlaying ? "Playing..." : "Play Voice Note"}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => expandNote(index)} style={{ flex: 1 }}>
          <View style={styles.noteContent}>
            <Text style={[styles.noteText, { color: textColor }]}>
              {note.text.length > 30 ? note.text.substring(0, 30) + "..." : note.text}
            </Text>
          </View>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPressIn={(event) => openActionMenu(index, event)}
        style={[styles.moreButton, { marginLeft: 10 }]}
      >
        <Feather name="more-vertical" size={20} color={textColor} />
      </TouchableOpacity>

      <View style={styles.timeContainer}>
        <Feather name="clock" size={16} color={textColor} />
        <Text style={[styles.timeText, { color: textColor }]}>
          {getTimeFromStr(note.date)}
        </Text>
      </View>
    </View>
  );
};