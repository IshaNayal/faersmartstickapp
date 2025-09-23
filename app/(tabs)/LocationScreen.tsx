// LocationScreen.tsx
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Speech from "expo-speech";

interface Props {
  voiceMode: boolean; 
}

export default function LocationScreen({ voiceMode }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  
  const hasSpoken = useRef(false);

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

  useEffect(() => {
    getLocation();
  }, []);

  
  useEffect(() => {
    if (voiceMode && !hasSpoken.current) {
      Speech.speak("Voice mode enabled, guiding your journey");
      hasSpoken.current = true;
    }
  }, [voiceMode]);

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
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#fff",
  },
  subtitle: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#14b8c4",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
    marginLeft: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  singleButtonWrap: {
    marginTop: 20,
  },
  map: {
    width: "100%",
    height: 250,
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },

  secondaryButton: {
    backgroundColor: "#14b8c4",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
    marginRight : 10,
  },
  secondaryText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  
  
  
});




