import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox } from "react-native-paper";

import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebaseConfig.js";

type RootStackParamList = {
  SignIn: undefined;
  HomeScreen1: undefined;
  WelcomeScreen: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "SignIn">;

export default function SignInScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);


  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Missing fields", "Please enter email and password.");
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ User signed in:", userCredential.user.email);
      navigation.navigate("HomeScreen1");
    } catch (error: any) {
      console.error("❌ Login Error:", error.message);
      Alert.alert("Sign In Failed", "incorrect email or password");
    }
  };

 
  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Enter Email", "Please enter your email to reset password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Password Reset", "Check your spam email for reset instructions.");
    } catch (error: any) {
      console.error("❌ Forgot Password Error:", error.message);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      { }
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.navigate("WelcomeScreen")}>
          <Ionicons name="arrow-back" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.header}> Welcome</Text>
      </View>

      { }
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>LOGO</Text>
      </View>

      { }
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sign In</Text>

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <Ionicons name="person" size={20} color="#123255" style={styles.inputIcon} />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Ionicons name="lock-closed" size={20} color="#123255" style={styles.inputIcon} />
        </View>

        { }
        <View style={styles.checkboxRow}>
          <Checkbox
            status={rememberMe ? "checked" : "unchecked"}
            onPress={() => setRememberMe(!rememberMe)}
            color="#00c4cc"
          />
          <Text style={styles.checkboxText}>Remember me</Text>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotText}>Forget Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.orLine} />
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome5 name="google" size={24} color="#ff0000ff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="apple" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="facebook" size={24} color="#3b5998" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a1931", alignItems: "center", justifyContent: "flex-start", paddingTop: 40 },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 10, width: "100%", paddingHorizontal: 20 },
  header: { fontSize: 24, color: "#00ccff", marginLeft: 10 },
  logoContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#f0f0f0", alignItems: "center", justifyContent: "center", marginBottom: 40, zIndex: 1 },
  logo: { fontWeight: "bold", color: "#001f3f" },
  card: { backgroundColor: "#e0e0e0", borderRadius: 12, width: "90%", padding: 30, alignItems: "stretch", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, maxHeight: "70%" },
  cardTitle: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#001f3f" },
  label: { fontSize: 16, marginTop: 10, marginBottom: 5, fontWeight: "bold", color: "#333" },
  inputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 8, borderWidth: 1, borderColor: "#ccc", paddingHorizontal: 10, marginBottom: 10 },
  input: { flex: 1, paddingVertical: 10, paddingHorizontal: 5, fontSize: 16 },
  inputIcon: { marginLeft: 5 },
  checkboxRow: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  checkboxText: { flex: 1, fontSize: 14, color: "#333" },
  forgotText: { fontSize: 14, color: "#00ccff", fontWeight: "bold" },
  signInButton: { backgroundColor: "#00ccff", paddingVertical: 15, borderRadius: 8, alignItems: "center", marginVertical: 10 },
  signInText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  orContainer: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  orLine: { flex: 1, height: 1, backgroundColor: "#ccc" },
  orText: { marginHorizontal: 10, color: "#666", fontWeight: "bold" },
  socialButtons: { flexDirection: "row", justifyContent: "space-around" },
  socialButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#ddd" },
});
