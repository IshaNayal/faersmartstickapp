import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

import AlertScreen from "./AlertScreen";
import LinkScreen from "./LinkScreen";
import LocationScreen from "./LocationScreen";
import SettingsScreen from "./SettingsScreen";

type Step = "connect" | "bluetooth" | "connected";
type Screen = "home" | "location" | "alert" | "link" | "settings";

export default function HomeScreen() {
  const [step, setStep] = useState<Step>("connect");
  const [voiceMode, setVoiceMode] = useState(false);
  const [vibrationMode, setVibrationMode] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState<Screen>("home");

  const batteryPercent = 80;

  useEffect(() => {
    const BackHandlerListener = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => BackHandlerListener.remove();
  }, []);

  const scales = {
    home: useRef(new Animated.Value(1)).current,
    location: useRef(new Animated.Value(1)).current,
    alert: useRef(new Animated.Value(1)).current,
    link: useRef(new Animated.Value(1)).current,
    settings: useRef(new Animated.Value(1)).current,
  };

  const handlePress = (screen: Screen) => {
    (Object.keys(scales) as Screen[]).forEach((btn) => {
      Animated.spring(scales[btn], {
        toValue: btn === screen ? 1.2 : 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    });
    setSelectedScreen(screen);
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <View style={styles.sidebarIcons}>
          {(
            [
              { name: "home", icon: "home" },
              { name: "location", icon: "location" },
              { name: "alert", icon: "alert-circle" },
              { name: "link", icon: "link" },
              { name: "settings", icon: "settings" },
            ] as { name: Screen; icon: keyof typeof Ionicons.glyphMap }[]
          ).map((btn) => (
            <Animated.View
              key={btn.name}
              style={{ transform: [{ scale: scales[btn.name] }] }}
            >
              <TouchableOpacity
                style={[
                  styles.iconBtn,
                  selectedScreen === btn.name && styles.activeBtn,
                ]}
                onPress={() => handlePress(btn.name)}
              >
                <Ionicons
                  name={btn.icon}
                  size={26}
                  color={selectedScreen === btn.name ? "#14b8c4" : "#000"}
                />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.welcome}>PathPilot</Text>

        {selectedScreen === "home" && (
          <>
            {step === "connect" && (
              <View style={styles.centerBox}>
                <TouchableOpacity
                  style={styles.connectBtn}
                  onPress={() => setStep("bluetooth")}
                >
                  <Text style={styles.connectText}>Connect your device</Text>
                </TouchableOpacity>
              </View>
            )}

            {step === "bluetooth" && (
              <View style={styles.centerBox}>
                <View style={styles.popupCard}>
                  <Ionicons name="bluetooth" size={22} color="#007BFF" />
                  <Text style={styles.popupText}>
                    Please turn on your Bluetooth and location to connect with
                    the device
                  </Text>
                  <TouchableOpacity
                    style={styles.enableBtn}
                    onPress={() => setStep("connected")}
                  >
                    <Text style={styles.enableText}>
                      Enable Bluetooth & Location
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {step === "connected" && (
              <View style={styles.statusContainer}>
                <View style={styles.statusBox}>
                  <Text style={styles.statusText}>
                    Status:{" "}
                    <Text style={{ color: "lightgreen", fontSize: 20 }}>
                      Connected
                    </Text>
                  </Text>
                </View>

                <View style={styles.obstacleBox}>
                  <Text style={styles.obstacleText}>Obstacle Ahead</Text>
                  <Text style={styles.obstacleDistance}>Distance: 2.5m</Text>
                </View>

                <View style={styles.toggleRow}>
                  <Text style={styles.toggleLabel}>Voice Mode</Text>
                  <Switch
                    value={voiceMode}
                    onValueChange={setVoiceMode}
                    trackColor={{ false: "#3f3d3d", true: "#14b8c4" }}
                    thumbColor={voiceMode ? "#14b8c4" : "#ffffff"}
                  />
                </View>

                <View style={styles.toggleRow}>
                  <Text style={styles.toggleLabel}>Vibration Mode</Text>
                  <Switch
                    value={vibrationMode}
                    onValueChange={setVibrationMode}
                    trackColor={{ false: "#3f3d3d", true: "#14b8c4" }}
                    thumbColor={vibrationMode ? "#14b8c4" : "#ffffff"}
                  />
                </View>

                <View style={styles.batteryContainer}>
                  <Svg height="160" width="160" viewBox="0 0 160 160">
                    <Circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#1e293b"
                      strokeWidth="12"
                      fill="none"
                    />
                    <Circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#14b8c4"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={
                        2 * Math.PI * 70 * (1 - batteryPercent / 100)
                      }
                      strokeLinecap="round"
                    />
                  </Svg>
                  <Text style={styles.batteryText}>
                    Battery: {batteryPercent}%
                  </Text>
                </View>
              </View>
            )}
          </>
        )}

        {/* Location Screen */}
        {selectedScreen === "location" && <LocationScreen voiceMode={voiceMode} />}
        {selectedScreen === "alert" && <AlertScreen />}
        {selectedScreen === "link" && <LinkScreen />}
        {selectedScreen === "settings" && <SettingsScreen />}
      </View>
    </View>
  );
}

// ... styles same as your previous HomeScreen styles


const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", backgroundColor: "rgba(1, 21, 71, 1)" },
  sidebar: {
    width: 70,
    backgroundColor: "#14b8c4",
    borderTopLeftRadius: 20,
    alignItems: "center",
    paddingVertical: 200,
    justifyContent: "space-evenly",
  },
  sidebarIcons: { flex: 1, justifyContent: "flex-end", alignItems: "center" },
  iconBtn: { marginVertical: 18, backgroundColor: "#fff", padding: 14, borderRadius: 50 },
  activeBtn: { backgroundColor: "#fff", borderWidth: 2, borderColor: "#14b8c4" },
  mainContent: { flex: 1, paddingHorizontal: 25, paddingTop: 20, justifyContent: "flex-start" },
  welcome: { fontSize: 32, color: "#14b8c4", fontWeight: "600", marginBottom: 30 },
  centerBox: { flex: 1, justifyContent: "flex-end", alignItems: "center" },
  connectBtn: { backgroundColor: "#14b8c4", paddingVertical: 38, paddingHorizontal: 35, borderRadius: 12, marginHorizontal: 8, marginBottom: 350 },
  connectText: { color: "#fff", fontSize: 27, fontWeight: "600" },
  popupCard: { backgroundColor: "#fff", paddingHorizontal: 35, borderRadius: 12, alignItems: "center", width: "85%", height: 300, marginBottom: 300, marginHorizontal: 8, },
  popupText: { color: "#000000ff", textAlign: "center", marginVertical: 14, fontSize: 20, lineHeight: 20 },
  enableBtn: { backgroundColor: "#14b8c4", paddingVertical: 14, paddingHorizontal: 25, borderRadius: 10, marginTop: 14 },
  enableText: { color: "#fff", fontWeight: "600", fontSize: 20 },
  statusContainer: { marginTop: 10, marginBottom: 20, borderRadius :10 },
  statusBox: { backgroundColor: "rgba(3, 30, 97, 0.76)", padding: 14, borderRadius: 10, marginBottom: 60 },
  statusText: { fontSize: 20, color: "#fff", fontWeight: "bold" },
  obstacleBox: { backgroundColor: "rgba(3, 30, 97, 0.76)", paddingVertical: 16, paddingHorizontal: 14, borderRadius: 20, alignItems: "center", marginBottom: 60 },
  obstacleText: { fontSize: 20, color: "red", fontWeight: "bold", marginBottom: 6, },
  obstacleDistance: { fontSize: 20, color: "#fff" },
  toggleRow: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "rgba(3, 30, 97, 0.76)", paddingVertical: 14, paddingHorizontal: 18, borderRadius: 10, alignItems: "center", marginBottom: 60 },
  toggleLabel: { color: "#ffffffff", fontSize: 20, fontWeight: "bold" },
  batteryContainer: { marginLeft: -20, marginTop: -30, marginBottom: 40, alignItems: "center", justifyContent: "center" },
  batteryText: { position: "absolute", color: "#fff", fontSize: 20, fontWeight: "600" },
});
