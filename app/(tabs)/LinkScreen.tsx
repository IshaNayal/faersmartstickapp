import React, { useState } from "react";
import { Image, StyleSheet, Text, View, Switch } from "react-native";

export default function LinkScreen() {

  const [isDeviceOn, setIsDeviceOn] = useState(false);

  return (
    <View style={styles.container}>
    
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connect Smart Stick</Text>
        <Text style={styles.sectionDesc}>
          Pair your smart stick to access features like live location, SOS, and activity updates.
        </Text>
      </View>

    
      <View style={styles.deviceStatusRow}>
        <Text style={styles.deviceStatusText}>Device Status</Text>
        <View style={styles.switchWrapper}>
          <Switch
            value={isDeviceOn}
            onValueChange={setIsDeviceOn} 
            thumbColor="#fff"
            trackColor={{ false: "#102147", true: "#14b8c4" }}
          />
        </View>
      </View>
      <View style={styles.divider} />

    
      <Text style={styles.pairedTitle}>Paired Devices</Text>

    
      <View style={styles.deviceBox}>
        <View style={styles.deviceRow}>
          <Image
            style={styles.stickIcon}
            source={{ uri: "https://img.icons8.com/color/48/match-stick.png" }}
          />
          <Text style={styles.deviceNameConnected}>Stick123</Text>
          <Text style={styles.deviceStatusConnected}>✓ connected</Text>
        </View>
        <Text style={styles.deviceLastSync}>Last Synced : just Now</Text>
      </View>

     
      <View style={styles.deviceBox}>
        <View style={styles.deviceRow}>
          <Image
            style={styles.stickIcon}
            source={{ uri: "https://img.icons8.com/color/48/match-stick.png" }}
          />
          <Text style={styles.deviceNameNotConnected}>Stick130</Text>
          <Text style={styles.deviceStatusNotConnected}>Not connected</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(1, 21, 71, 1)",
    paddingHorizontal: 20,
    paddingTop: 35,
  },
  section: {
    marginBottom: 7,
    justifyContent: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  sectionDesc: {
    color: "#ffffffff",
    fontSize: 20,
  },
  deviceStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 3,
    justifyContent: "space-between",
  },
  deviceStatusText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  switchWrapper: {
    marginRight: 3,
  },
  divider: {
    height: 1,
    backgroundColor: "#242a4f",
    marginVertical: 15,
  },
  pairedTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 7,
  },
  deviceBox: {
    backgroundColor: "#d4dbe6",
    borderRadius: 14,
    padding: 10,
    marginBottom: 15,
  },
  deviceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stickIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  deviceNameConnected: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#111d35",
    marginRight: 7,
  },
  deviceStatusConnected: {
    color: "#29e664",
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 4,
  },
  deviceLastSync: {
    color: "#000000ff",
    marginLeft: 34,
    fontSize: 14,
    marginTop: 2,
  },
  deviceNameNotConnected: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#111d35",
    marginRight: 9,
  },
  deviceStatusNotConnected: {
    color: "#000000ff",
    fontSize: 16,
    fontWeight: "600",
  },
});











