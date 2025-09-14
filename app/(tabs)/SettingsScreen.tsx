import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; 
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getAuth } from "firebase/auth";

export default function SettingsScreen() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState<string>("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) setUserEmail(user.email || "");
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.mainContent}>
        <Text style={styles.title}></Text>

     
        <View style={styles.profileCard}>
          <Ionicons name="person-circle" size={65} color="#14b8c4" />
          <View>
            <Text style={styles.email}>{userEmail || "No email"}</Text>
            <Text style={styles.username}></Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Account settings</Text>

        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push("/EditProfileScreen")}
        >
          <Text style={styles.rowText}>Edit Profile</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push("/ChangePasswordScreen")}
        >
          <Text style={styles.rowText}>Change Password</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.rowText}>Notification</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: "#555", true: "#14b8c4" }}
            thumbColor="#fff"
          />
        </View>

        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push("./NavigationPreferenceScreen")}
        >
          <Text style={styles.rowText}>Navigation Preferences</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>

        
        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>More</Text>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Privacy & Policy</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Help</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", backgroundColor: "#0a1931" },
  mainContent: { flex: 1, padding: 0 },
  title: {
    color: "#fff",
    fontSize: 29,
    fontWeight: "bold",
    marginBottom: 28,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255, 255, 255, 1)", 
    paddingBottom: 35,
  },
  email: { color: "#fff", fontSize: 17, fontWeight: "600" },
  username: { color: "#aaa", fontSize: 20 },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    paddingBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255, 255, 255, 1)", 
    marginTop: 5,
    marginBottom: 5,
  },
  rowText: { color: "#fff", fontSize: 15, fontWeight: "600" },
});

