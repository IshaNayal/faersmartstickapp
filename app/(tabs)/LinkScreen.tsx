import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LinkScreen() {
  return (
    <View style={styles.container}>
      { }
      <View style={styles.topSection}>
       
        <Text style={styles.title}>Connection</Text>
      </View>

      {}
      <View style={styles.content}>
        <Image
          style={styles.icon}
          source={{ uri: "https://img.icons8.com/ios-filled/50/14b8c4/sos.png" }}
        />
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
    paddingHorizontal: 1, 
  },
  topSection: {
    alignItems: "center",
    marginTop: 80, 
    marginBottom: 40,
  },
  header: {
    color: "#14b8c4",
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 10,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: "#14b8c4",
    marginVertical: 60,
  },
  description: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 8,
  },
  status: {
    color: "#14b8c4",
    fontSize: 20,
    marginBottom: 4,
  },
  deviceInfo: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#14b8c4",
    width: 150, 
    paddingVertical: 20, 
    borderRadius: 18, 
    marginHorizontal: 4,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: "#ffffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

