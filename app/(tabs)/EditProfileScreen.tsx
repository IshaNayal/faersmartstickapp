import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { getAuth, signOut, updateProfile, updateEmail } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../firebaseConfig";

export default function EditProfileScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserName(data.name ?? "");
        setUserEmail(data.email ?? "");
        setUserPhone(data.phone ?? "");
        setEmergencyContact(data.emergencyContact ?? "");
      }
    };
    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      // Validate emergency contact
      if (emergencyContact && !/^\d{10}$/.test(emergencyContact)) {
        Alert.alert("Invalid number", "Please enter a valid 10-digit phone number.");
        return;
      }

      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      await setDoc(
        docRef,
        {
          name: userName,
          email: userEmail,
          phone: userPhone,
          emergencyContact: emergencyContact,
          uid: user.uid,
        },
        { merge: true }
      );

      // Update Firebase Auth profile/email
      await updateProfile(user, { displayName: userName });
      if (user.email !== userEmail) {
        await updateEmail(user, userEmail);
      }

      // Save emergency contact locally
      await AsyncStorage.setItem("emergencyNumber", emergencyContact);

      Alert.alert("Success", "Profile updated successfully!");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(getAuth());
            router.push("/SignInScreen");
          } catch (error: any) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Edit Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userEmail}
        onChangeText={setUserEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={userPhone}
        onChangeText={setUserPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Emergency Contact"
        value={emergencyContact}
        onChangeText={setEmergencyContact}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "rgba(1, 21, 71, 1)", padding: 20 },
  backBtn: { marginTop: 10, marginBottom: 15 },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: "#000",
  },
  saveBtn: {
    backgroundColor: "#14b8c4",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "bold" },
  logoutBtn: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: { color: "#000", fontSize: 16, fontWeight: "bold" },
});


