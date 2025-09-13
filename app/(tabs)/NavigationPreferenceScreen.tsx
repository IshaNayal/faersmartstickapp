import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

export default function NavigationPreferencesScreen() {
  const router = useRouter();
  const [voice, setVoice] = useState(false);
  const [vibration, setVibration] = useState(false);

  return (
    <View style={styles.container}>
      { }
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      { }
      <Text style={styles.header}></Text>

      { }
      

      

      { }
      <Text style={[styles.sectionTitle, { marginTop: -9 }]}>Navigation Preferences</Text>


      { }
      <View style={styles.row}>
        <Text style={styles.rowText}>Voice Guidance</Text>
        <Switch
          value={voice}
          onValueChange={setVoice}
          trackColor={{ false: "#3f3d3d", true: "#14b8c4" }}
          thumbColor={voice ? "#14b8c4" : "#fff"}
        />
      </View>

      { }
      <View style={styles.row}>
        <Text style={styles.rowText}>Vibration Alerts</Text>
        <Switch
          value={vibration}
          onValueChange={setVibration}
          trackColor={{ false: "#3f3d3d", true: "#14b8c4" }}
          thumbColor={vibration ? "#14b8c4" : "#fff"}
        />
      </View>

      { }
      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Mode of Travel</Text>

      <TouchableOpacity style={styles.modeBtn}>
        <Text style={styles.modeText}>CAR 🚗</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.modeBtn}>
        <Text style={styles.modeText}>Bike 🏍️</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.modeBtn}>
        <Text style={styles.modeText}>Bus 🚌</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.modeBtn}>
        <Text style={styles.modeText}>Walking 🚶‍♂️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a1931",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backBtn: {
    marginBottom: 10,
    marginTop: 40,
  },
  header: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#14b8c4",
    marginRight: 10,
  },
  email: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    color: "#ccc",
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 10,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 70,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  rowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modeBtn: {
    backgroundColor: "#ddd",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginVertical: 6,
  },
  modeText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});
