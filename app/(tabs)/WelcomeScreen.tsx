import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome</Text>

      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>LOGO</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.taglineRow}>
          <MaterialIcons name="keyboard-voice" size={24} color="#333" />
          <Text style={styles.tagline}>
            Welcome to Smart Stick : Your Navigation Companion
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/SignInScreen")} 
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/(tabs)/SignUpScreen")} 
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  "#052950ff",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#00cfc1",
    marginBottom: 20,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 78,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
    elevation: 6,
    zIndex: 2,
  },
  logoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0d1b2a",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingTop: 100,
    paddingBottom: 20,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    elevation: 8,
    flex: 1,
  },
  taglineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    paddingHorizontal: 10,
  },
  tagline: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginLeft: 6,
    flexShrink: 1,
    textAlign: "center",
  },
  buttonGroup: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#00cfc1",
    paddingVertical: 20,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
    marginVertical: 15,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#123255ff",
  },
});
