import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // To use icons (make sure to install expo-icons)

const ContactScreen = () => {
  const openEmail = () => Linking.openURL('mailto:Hamar1627@gmail.com');
  const openPhone = () => Linking.openURL('tel:+251956b319463');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.text}>
          For any inquiries, feedback, or support, feel free to reach out to us!
        </Text>
        
        {/* Email Contact */}
        <TouchableOpacity style={styles.contactItem} onPress={openEmail}>
          <Ionicons name="mail-outline" size={24} color="#4A90E2" />
          <Text style={styles.contactText}>Email: Hamar1627@gmail.com</Text>
        </TouchableOpacity>

        {/* Phone Contact */}
        <TouchableOpacity style={styles.contactItem} onPress={openPhone}>
          <Ionicons name="call-outline" size={24} color="#4A90E2" />
          <Text style={styles.contactText}>Phone: +251 956 319 463</Text>
        </TouchableOpacity>

        {/* Address */}
        <View style={styles.contactItem}>
          <Ionicons name="location-outline" size={24} color="#4A90E2" />
          <Text style={styles.contactText}>Address: Debre Birhan University, Debre Birhan, Ethiopia</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'flex-start', // Align to the left for a more clean layout
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E3A59',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  contactText: {
    fontSize: 18,
    color: '#black',
    marginLeft: 10,
  },
});

export default ContactScreen;
