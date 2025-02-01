import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Optional Image to make it more visually engaging */}
        <Image
          source={require('../images/aboutImage.jpg')} // Make sure to add an image for this
          style={styles.aboutImage}
        />
        

        {/* Title */}
        <Text style={styles.title}>About Hamar Notes</Text>

        {/* Description Text */}
        <Text style={styles.text}>
          Hamar Notes is an innovative note-taking app designed to simplify the process of organizing your thoughts and ideas.
          It allows users to create, update, and manage their notes with ease, all while keeping things simple and intuitive.
        </Text>
        <Text style={styles.text}>
          Whether you're a student, professional, or someone who just loves to stay organized, Hamar Notes is perfect for everyone.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC', // Light background color
    padding: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30, // Add top margin to position content nicely
  },
  aboutImage: {
    width: '100%', // Image width covering full screen width
    height: 200, // Adjust image height for a nice header effect
    borderRadius: 10, // Rounded corners
    marginBottom: 20, // Space between the image and text
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15, // Space below the title
    fontFamily: 'Arial', // Optional: Choose a clean font
  },
  text: {
    fontSize: 18,
    color: '#555',
    textAlign: 'left',
    marginVertical: 15,
    lineHeight: 26, // Increase line spacing for readability
    fontFamily: 'Arial', // Optional: Make sure text is clean and readable
  },
});

export default AboutScreen;
