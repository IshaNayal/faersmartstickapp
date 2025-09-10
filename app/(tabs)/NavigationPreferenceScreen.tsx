import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

export default function NavigationPreferencesScreen() {
  const router = useRouter();
  const [voice, setVoice] = useState(true);
  const [vibration, setVibration] = useState(false);

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Navigation Preferences</Text>

      <View style={styles.row}>
        <Text style={styles.rowText}>Voice Guidance</Text>
        <Switch value={voice} onValueChange={setVoice} trackColor={{ false: "#555", true: "#14b8c4" }} thumbColor="#fff" />
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Vibration Alerts</Text>
        <Switch value={vibration} onValueChange={setVibration} trackColor={{ false: "#555", true: "#14b8c4" }} thumbColor="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a1931", padding: 20 },
  backBtn: { marginTop: 10, marginBottom: 15 },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  rowText: { color: "#fff", fontSize: 15 },
});
