// app/LinkScreen.tsx 
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LinkScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>PathPilot</Text>
      <View style={styles.content}>
        <Text style={styles.title}>Connection</Text>
        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={{ uri: "https://img.icons8.com/ios-filled/50/14b8c4/sos.png" }}
          />
        </View>
        <Text style={styles.description}>Connect Smart Stick</Text>
        <Text style={styles.status}>Status: Connected</Text>
        <Text style={styles.deviceInfo}>Device: Stick-ABC123</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pair Device</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Check Connection</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a1931",
    padding: 20,
  },
  header: {
    color: "#14b8c4",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  iconContainer: {
    marginVertical: 30,
  },
  icon: {
    width: 50,
    height: 50,
    tintColor: "#14b8c4",
  },
  description: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  status: {
    color: "#14b8c4",
    fontSize: 16,
    marginVertical: 10,
  },
  deviceInfo: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 20,
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
