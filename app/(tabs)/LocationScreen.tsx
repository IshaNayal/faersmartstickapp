import * as Location from "expo-location";
import * as Speech from "expo-speech";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface Props {
  voiceMode: boolean;
}

export default function LocationScreen({ voiceMode }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [showMapCoverStep2, setShowMapCoverStep2] = useState(true);
  const [showMapCoverStep3, setShowMapCoverStep3] = useState(true);

  const hasSpoken = useRef(false);

  const nextStep = () => { if (step < 3) setStep((prev) => (prev + 1) as 1 | 2 | 3); };
  const prevStep = () => { if (step > 1) setStep((prev) => (prev - 1) as 1 | 2 | 3); };

  const stepMarginTop = { 1: 80, 2: 40, 3: 40 };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Enable location permissions to use this feature");
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
  };

  useEffect(() => { getLocation(); }, []);

  useEffect(() => {
    if (voiceMode && !hasSpoken.current) {
      Speech.speak("Voice mode enabled, guiding your journey");
      hasSpoken.current = true;
    }
  }, [voiceMode]);

  const MAP_HEIGHT = 250;

  return (
    <View style={styles.container}>
     
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

    
      {step === 2 && location && (
        <View style={[styles.content, { marginTop: stepMarginTop[2] }]}>
          <Text style={styles.title}>Real-time location detected</Text>
          <Text style={styles.subtitle}>Your position is updated for precise journey guidance</Text>

          <View style={{ width: "100%", height: MAP_HEIGHT, marginVertical: 20 }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker coordinate={location} title="You are here" />
            </MapView>

         
            {showMapCoverStep2 && (
              <TouchableOpacity
                style={styles.mapCoverFull}
                onPress={() => setShowMapCoverStep2(false)}
              >
                <Image
                  source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQieO4YO7vglQcG7iTln_Tp5cV7klER0X-VnA&s" }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}

           
            <View style={styles.circleRowOverlay}>
              <TouchableOpacity
                style={styles.circleButton}
                onPress={() => {
                  if (voiceMode) Speech.speak("Hello! I am your smart assistant giving you guidance.");
                  else Alert.alert("Voice mode is off", "Enable voice mode from the Home screen.");
                }}
              >
                <Text style={styles.circleText}>🎙️</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.circleButton} onPress={getLocation}>
                <Text style={styles.circleText}>📍</Text>
              </TouchableOpacity>
            </View>
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

  
      {step === 3 && location && (
        <View style={[styles.content, { marginTop: stepMarginTop[3] }]}>
          <Text style={styles.title}>You’ve reached your destination</Text>
          <Text style={styles.subtitle}>Guidance completed. We’re glad you got here safely</Text>

          <View style={{ width: "100%", height: MAP_HEIGHT, marginVertical: 20 }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker coordinate={location} title="Destination" />
            </MapView>

            {showMapCoverStep3 && (
              <TouchableOpacity
                style={styles.mapCoverFull}
                onPress={() => setShowMapCoverStep3(false)}
              >
                <Image
                  source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQieO4YO7vglQcG7iTln_Tp5cV7klER0X-VnA&s" }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}

         
            <View style={styles.circleRowOverlay}>
              <TouchableOpacity
                style={styles.circleButton}
                onPress={() => {
                  if (voiceMode) Speech.speak("Congratulations! You’ve reached your destination.");
                  else Alert.alert("Voice mode is off", "Enable voice mode from the Home screen.");
                }}
              >
                <Text style={styles.circleText}>🎤</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.circleButton}
                onPress={() => Alert.alert("😊", "You completed your journey safely!")}
              >
                <Text style={styles.circleText}>😊</Text>
              </TouchableOpacity>
            </View>
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
  container: { flex: 1, backgroundColor: "#011547" },
  content: { alignItems: "center", paddingHorizontal: 20 },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10, color: "#fff" },
  subtitle: { fontSize: 18, color: "#fff", textAlign: "center", marginBottom: 20 },
  button: { backgroundColor: "#14b8c4", padding: 12, borderRadius: 12, marginTop: 20, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  secondaryButton: { backgroundColor: "#14b8c4", padding: 12, borderRadius: 12, marginTop: 20, alignItems: "center" },
  secondaryText: { color: "#fff", fontSize: 18, fontWeight: "bold" },


  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 100,          
    marginBottom: 30,       
  },

  singleButtonWrap: { marginTop: 20 },

  mapCoverFull: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center" },


  circleRowOverlay: {
    position: "absolute",
    bottom: -90,             
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },

  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#14b8c4",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  circleText: { fontSize: 28 },
});

