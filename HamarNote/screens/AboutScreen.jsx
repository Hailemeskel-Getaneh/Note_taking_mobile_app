import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Linking, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AboutScreen = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={require('../images/aboutImage.jpg')}
          style={styles.aboutImage}
        />
        <Text style={styles.title}>About Hamar Notes</Text>
        <Text style={styles.text}>
          Hamar Notes is an innovative note-taking app designed to simplify the process of organizing your thoughts and ideas.
        </Text>
        <TouchableOpacity onPress={toggleExpand} style={styles.accordionButton}>
          <Text style={styles.accordionButtonText}>
            {expanded ? 'Read Less' : 'Read More'}
          </Text>
        </TouchableOpacity>
        {expanded && (
          <View style={styles.accordionContent}>
            <Text style={styles.text}>
              It allows users to create, update, and manage their notes with ease, all while keeping things simple and intuitive.
            </Text>
            <Text style={styles.text}>
              Whether you're a student, professional, or someone who just loves to stay organized, Hamar Notes is perfect for everyone.
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL('https://hailemeskel.netlify.app/')}
        >
          <Text style={styles.buttonText}>Visit Our Website</Text>
        </TouchableOpacity>
         <View style={styles.footer}>
                <Text style={styles.footerText}>© 2025 Hamar Notes</Text>
              </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  aboutImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    color: '#555',
    textAlign: 'left',
    marginVertical: 10,
    lineHeight: 26,
  },
  accordionButton: {
    marginVertical: 10,
  },
  accordionButtonText: {
    fontSize: 18,
    color: '#4A90E2',
  },
  accordionContent: {
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#7360DF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  footer: {
    padding: 10,
    alignItems: "center",
    marginTop: 125,
    width: "100%",
  },
  footerText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "sans-serif",
  },
});

export default AboutScreen;
