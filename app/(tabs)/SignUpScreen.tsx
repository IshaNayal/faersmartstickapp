import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function SignUpScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        phone,
        uid: user.uid,
      });

      setSuccessMessage("✅ Account created successfully!");
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");

      
      setTimeout(() => {
        router.push({
          pathname: "/WelcomeScreen",
          params: { name, email, phone },
        });
      }, 2000);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Signup failed");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.push("/WelcomeScreen")}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}> Welcome</Text>
      </View>

      <View style={styles.logoContainer}>
        <Text style={styles.logo}>LOGO</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Create Your Account</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          <Ionicons name="person" size={22} color="#052950ff" style={styles.icon} />
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter your Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Ionicons name="mail" size={22} color="#052950ff" style={styles.icon} />
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <Ionicons name="call" size={22} color="#052950ff" style={styles.icon} />
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Ionicons
            name="lock-closed"
            size={22}
            color="#052950ff"
            style={styles.icon}
          />
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <Ionicons
            name="lock-closed"
            size={22}
            color="#052950ff"
            style={styles.icon}
          />
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignUp}>
          <Text style={styles.signInText}>Create Account</Text>
        </TouchableOpacity>

        {successMessage ? (
          <Text style={styles.success}>{successMessage}</Text>
        ) : null}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(1, 21, 71, 1)",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  header: { fontSize: 24, color: "#00c4cc", marginLeft: 10 },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    zIndex: 1,
  },
  logo: { fontWeight: "bold" },
  card: {
    backgroundColor: "#d3d3d3",
    borderRadius: 20,
    width: "100%",
    height: "100%",
    padding: 50,
    alignItems: "stretch",
  },
  cardTitle: { fontSize: 30, fontWeight: "bold", marginBottom: 15 },
  
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#000000ff",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  icon: {
    marginLeft: 8, 
  },
  signInButton: {
    backgroundColor: "#00c4cc",
    paddingVertical: 15,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 12,
  },
  signInText: {
    color: "#123255ff",
    fontWeight: "bold",
    fontSize: 20,
  },
  success: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
});
