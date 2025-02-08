// voiceNote.js
import React, { useState } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import styles from "./noteScreenStyles";

const VoiceNote = ({ onSave }) => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      const { status } = await Audio.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission Denied", "Please enable microphone access to record voice notes.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      console.log("Starting recording..");
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
      console.log("Recording started..");
    } catch (err) {
      console.error("Failed to start recording", err);
      Alert.alert("Error", "Could not start recording. Please try again.");
    }
  }

  async function stopRecording() {
    try {
      console.log("Stopping recording..");
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setIsRecording(false);

      // Save file permanently
      const fileName = `voiceNote_${Date.now()}.m4a`;
      const newUri = FileSystem.documentDirectory + fileName;
      await FileSystem.moveAsync({
        from: uri,
        to: newUri,
      });

      console.log("Recording saved at:", newUri);
      Alert.alert("Success", "Voice note saved successfully!");

      // Call the onSave function passed from NoteScreen
      if (onSave) {
        onSave({
          type: "voice",
          uri: newUri,
          date: new Date().toISOString(),
          pinned: false,
          favorite: false,
        });
      }
    } catch (err) {
      console.error("Failed to stop recording", err);
      Alert.alert("Error", "Could not stop recording. Please try again.");
    }
  }

  return (
    <View>
      <TouchableOpacity
        onPress={isRecording ? stopRecording : startRecording}
        style={styles.voiceNoteButton}
      >
        <Feather name={isRecording ? "stop-circle" : "mic"} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default VoiceNote;