import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ModeValue = "car" | "bike" | "bus" | "walking";

export default function NavigationPreferencesScreen() {
  const router = useRouter();
  const [voice, setVoice] = useState(false);
  const [vibration, setVibration] = useState(false);
  const [selectedMode, setSelectedMode] = useState<ModeValue | null>(null);

  const modes: { label: string; value: ModeValue }[] = [
    { label: "Car 🚗", value: "car" },
    { label: "Bike 🏍️", value: "bike" },
    { label: "Bus 🚌", value: "bus" },
    { label: "Walking 🚶‍♂️", value: "walking" },
  ];

 
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const voicePref = await AsyncStorage.getItem("voice");
        const vibrationPref = await AsyncStorage.getItem("vibration");
        const modePref = await AsyncStorage.getItem("travelMode");

        if (voicePref !== null) setVoice(voicePref === "true");
        if (vibrationPref !== null) setVibration(vibrationPref === "true");
        if (modePref !== null) setSelectedMode(modePref as ModeValue);
      } catch (error) {
        console.error("Failed to load preferences", error);
      }
    };

    loadPreferences();
  }, []);

  
  useEffect(() => {
    const savePreferences = async () => {
      try {
        await AsyncStorage.setItem("voice", voice.toString());
        await AsyncStorage.setItem("vibration", vibration.toString());
        if (selectedMode) await AsyncStorage.setItem("travelMode", selectedMode);
      } catch (error) {
        console.error("Failed to save preferences", error);
      }
    };

    savePreferences();
  }, [voice, vibration, selectedMode]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={[styles.sectionTitle, { marginTop: -3 }]}>
        Navigation Preferences
      </Text>

      <View style={styles.row}>
        <Text style={styles.rowText}>Voice Guidance</Text>
        <Switch
          value={voice}
          onValueChange={setVoice}
          trackColor={{ false: "#3f3d3d", true: "#14b8c4" }}
          thumbColor={voice ? "#14b8c4" : "#fff"}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Vibration Alerts</Text>
        <Switch
          value={vibration}
          onValueChange={setVibration}
          trackColor={{ false: "#3f3d3d", true: "#14b8c4" }}
          thumbColor={vibration ? "#14b8c4" : "#fff"}
        />
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Mode of Travel</Text>

      {modes.map((mode) => (
        <TouchableOpacity
          key={mode.value}
          style={[
            styles.modeBtn,
            selectedMode === mode.value && styles.modeBtnSelected,
          ]}
          onPress={() => setSelectedMode(mode.value)}
        >
          <Text
            style={[
              styles.modeText,
              selectedMode === mode.value && styles.modeTextSelected,
            ]}
          >
            {mode.label}
          </Text>
        </TouchableOpacity>
      ))}
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
  modeBtnSelected: {
    backgroundColor: "#14b8c4",
  },
  modeText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  modeTextSelected: {
    color: "#fff",
  },
});

