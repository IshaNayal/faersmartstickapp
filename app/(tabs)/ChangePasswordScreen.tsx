
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export default function ChangePasswordScreen() {
  const router = useRouter();
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState(""); // for re-authentication
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Pre-fill the email if user is signed in
  useEffect(() => {
    const user = auth.currentUser;
    if (user && user.email) setEmail(user.email);
  }, []);

  const handleChangePassword = async () => {
    const user = auth.currentUser;
    if (!user || !user.email) {
      Alert.alert("Error", "No user signed in");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      // Re-authenticate user with current password
      const credential = EmailAuthProvider.credential(user.email!, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);
      Alert.alert("Success", "Password updated successfully!");
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Change Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Email-id"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        editable={false} // can't change email here
      />
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Create new Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a1931", padding: 20 },
  backBtn: { marginTop: 10, marginBottom: 15 },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold", marginVertical: 20 },
  input: { backgroundColor: "#fff", borderRadius: 8, padding: 12, marginBottom: 12, color: "#000" },
  button: { backgroundColor: "#14b8c4", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
