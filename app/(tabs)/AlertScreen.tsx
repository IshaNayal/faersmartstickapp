import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Linking, Alert, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export default function EmergencyHelpScreen() {
  const [locationShared, setLocationShared] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState<string>("");
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);


  useEffect(() => {
    const loadEmergencyContact = async () => {
      try {
        const number = await AsyncStorage.getItem("emergencyNumber");
        if (number) setEmergencyContact(number);
      } catch (error) {
        console.error("Error loading emergency contact:", error);
      }
    };
    loadEmergencyContact();
  }, []);


  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission denied", "Enable location permissions to use emergency features.");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };
    getLocation();
  }, []);

  const handleCallPress = () => {
    if (!emergencyContact) {
      Alert.alert("No Emergency Contact", "Please set an emergency contact in your profile.");
      return;
    }
    Linking.openURL(`tel:${emergencyContact}`);
    setLocationShared(true);
  };

  const handleSmsPress = async () => {
    if (!emergencyContact) {
      Alert.alert("No Emergency Contact", "Please set an emergency contact in your profile.");
      return;
    }

    let message = "I need emergency help! Please respond.";

    try {
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        message += ` My location: https://www.google.com/maps?q=${latitude},${longitude}`;
      }
    } catch (error) {
      console.error("Error getting location for SMS:", error);
    }

    const smsUrl =
      Platform.OS === "ios"
        ? `sms:${emergencyContact}&body=${encodeURIComponent(message)}`
        : `sms:${emergencyContact}?body=${encodeURIComponent(message)}`;

    Linking.openURL(smsUrl);
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
          <Text style={styles.description}>Press the stick to send SOS and share location</Text>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🚨</Text>
          </View>

          <Text style={styles.subTitle}>Choose to call or message your emergency contact</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleCallPress}>
              <Text style={styles.buttonText}>Call to emergency contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSmsPress}>
              <Text style={styles.buttonText}>SMS message to emergency contact</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(1, 21, 71, 1)", padding: 20 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 40 },
  description: { color: "#fff", fontSize: 20, textAlign: "center", marginVertical: 10 },
  subTitle: { color: "#fff", fontSize: 20, textAlign: "center", marginVertical: 10 },
  iconContainer: { marginVertical: 30 },
  icon: { fontSize: 100 },
  buttonContainer: { flexDirection: "column", alignItems: "center", width: "100%" },
  button: { backgroundColor: "#14b8c4", padding: 15, borderRadius: 5, width: "80%", alignItems: "center", marginVertical: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
