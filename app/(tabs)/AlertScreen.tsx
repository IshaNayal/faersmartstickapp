// app/AlertScreen.tsx
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EmergencyHelpScreen() {
  const [locationShared, setLocationShared] = useState(false);

  const handleButtonPress = () => {
    setLocationShared(true);
  };

  return (
    <View style={styles.container}>
      {locationShared ? (
        <>
          <Text style={styles.title}>Location shared with emergency contact</Text>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>✅</Text>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>Emergency Help Needed</Text>
          <Text style={styles.description}>
            Press the stick to send SOS and share location
          </Text>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🚨</Text>
          </View>
          
          <Text style={styles.subTitle}>Choose to call or message your emergency contact</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
              <Text style={styles.buttonText}>Call to emergency contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
              <Text style={styles.buttonText}>SMS message to emergency contact</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a1931",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    gap: 10,
  },
  description: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  subTitle: {
    color: "#fff",
    fontSize: 18,
    marginVertical: 20,
  },
  iconContainer: {
    marginVertical: 30,
  },
  icon: {
    fontSize: 100,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "#14b8c4",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#000000ff",
    fontSize: 16,
    fontWeight: "bold",
  },
}); 
