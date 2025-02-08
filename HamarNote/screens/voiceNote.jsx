import React, { useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import styles from "./noteScreenStyles"; 

const VoiceNote = () => {
  const [recording, setRecording] = useState(null);

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      console.log('Recording started..');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(null);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    Alert.alert("Success", "Voice note recorded successfully", [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]);
  }

  return (
    <TouchableOpacity
      onPress={recording ? stopRecording : startRecording}
      style={styles.voiceNoteButton} 
    >
      <Feather name={recording ? "stop-circle" : "mic"} size={24} color="white" />
    </TouchableOpacity>
  );
};

export default VoiceNote;