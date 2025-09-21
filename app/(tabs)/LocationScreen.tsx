
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LocationScreen() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [voiceGuidance, setVoiceGuidance] = useState(false);

  const nextStep = () => {
    if (step < 3) setStep((prev) => (prev + 1) as 1 | 2 | 3);
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => (prev - 1) as 1 | 2 | 3);
  };

  const stepMarginTop = { 1: 80, 2: 40, 3: 40 };


  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Enable location permissions to use this feature");
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  };


  const loadVoicePreference = async () => {
    try {
      const voicePref = await AsyncStorage.getItem("voice");
      setVoiceGuidance(voicePref === "true");
    } catch (error) {
      console.error("Failed to load voice preference", error);
    }
  };

  const handleVoice = () => {
    if (!voiceGuidance) {
      Alert.alert(
        "Voice Guidance is Off",
        "Enable Voice Guidance in Navigation Preferences to use this feature."
      );
      return;
    }
    Speech.speak("Hello! Main aapki smart assistant hoon jo aapko guidance de rahi hoon.");
  };

  useEffect(() => {
    getLocation();
    loadVoicePreference();
  }, []);

  return (
    <View style={styles.container}>
      {}
      {step === 1 && (
        <View style={[styles.content, { marginTop: stepMarginTop[1] }]}>
          <Text style={styles.title}>Launching Navigation Mode: Let the Journey Begin</Text>
          <Text style={styles.subtitle}>Seamlessly connect and navigate with your smart assistant</Text>
          <View style={styles.singleButtonWrap}>
            <TouchableOpacity style={styles.button} onPress={nextStep}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {}
      {step === 2 && location && (
        <View style={[styles.content, { marginTop: stepMarginTop[2] }]}>
          <Text style={styles.title}>Real-time location detected</Text>
          <Text style={styles.subtitle}>Your position is updated for precise journey guidance</Text>

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={location} title="You are here" />
          </MapView>

          <View style={styles.extraRow}>
            <TouchableOpacity style={styles.voiceButton} onPress={handleVoice}>
              <Text style={styles.extraText}>🎤 Voice</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationButton} onPress={getLocation}>
              <Text style={styles.extraText}>📍 Location</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.secondaryButton} onPress={prevStep}>
              <Text style={styles.secondaryText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={nextStep}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {}
      {step === 3 && location && (
        <View style={[styles.content, { marginTop: stepMarginTop[3] }]}>
          <Text style={styles.title}>You’ve reached your destination</Text>
          <Text style={styles.subtitle}>Guidance completed. We’re glad you got here safely</Text>

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={location} title="Destination" />
          </MapView>

          <View style={styles.extraRow}>
            <TouchableOpacity style={styles.voiceButton} onPress={handleVoice}>
              <Text style={styles.extraText}>🎤 Voice</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationButton} onPress={getLocation}>
              <Text style={styles.extraText}>📍 Location</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.secondaryButton} onPress={prevStep}>
              <Text style={styles.secondaryText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(1, 21, 71, 1)",
    paddingHorizontal: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 10,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  map: {
    width: "90%",
    height: 300,
    borderRadius: 10,
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#00c4cc",
    width: 120,
    paddingVertical: 20,
    borderRadius: 18,
    marginHorizontal: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  secondaryButton: {
    backgroundColor: "#00c4cc",
    width: 120,
    paddingVertical: 20,
    borderRadius: 18,
    marginHorizontal: 4,
    alignItems: "center",
  },
  secondaryText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 20,
  },
  singleButtonWrap: {
    marginTop: 30,
  },
  
  extraRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  voiceButton: {
    backgroundColor: "#00c4cc",
    width: 120,
    paddingVertical: 15,
    borderRadius: 18,
    marginHorizontal: 4,
    alignItems: "center",
  },
  locationButton: {
    backgroundColor: "#00c4cc",
    width: 120,
    paddingVertical: 15,
    borderRadius: 18,
    marginHorizontal: 4,
    alignItems: "center",
  },
  extraText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
  },
});

