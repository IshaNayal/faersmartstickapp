// LocationScreen.tsx

import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LocationScreen() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const nextStep = () => {
    if (step < 3) setStep((prev) => (prev + 1) as 1 | 2 | 3);
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => (prev - 1) as 1 | 2 | 3);
  };

  const stepMarginTop = {
    1: 80,
    2: 40,
    3: 40,
  };

  return (
    <View style={styles.container}>
      {/* Step 1 */}
      {step === 1 && (
        <View style={[styles.content, { marginTop: stepMarginTop[1] }]}>
          <Text style={styles.title}>
            Launching Navigation Mode: Let the Journey Begin
          </Text>
          <Text style={styles.subtitle}>
            Seamlessly connect and navigate with your smart assistant
          </Text>

          <View style={styles.singleButtonWrap}>
            <TouchableOpacity style={styles.button} onPress={nextStep}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <View style={[styles.content, { marginTop: stepMarginTop[2] }]}>
          <Text style={styles.title}>Real-time location detected</Text>
          <Text style={styles.subtitle}>
            Your position is updated for precise journey guidance
          </Text>

          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/9/99/Google_Maps_icon.png",
            }}
            style={styles.image}
          />

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

      {/* Step 3 */}
      {step === 3 && (
        <View style={[styles.content, { marginTop: stepMarginTop[3] }]}>
          <Text style={styles.title}>You’ve reached your destination</Text>
          <Text style={styles.subtitle}>
            Guidance completed. We’re glad you got here safely
          </Text>

          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/9/99/Google_Maps_icon.png",
            }}
            style={styles.image}
          />

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
    backgroundColor: "#0a1931",
    paddingHorizontal: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 80,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 80,
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 50,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center", // ensures same height
    marginTop: 20,
  },
  // Primary (Next/Done/Start)
  button: {
    backgroundColor: "#00c4cc",
    width: 120, // fixed width
    paddingVertical: 20,
    borderRadius: 18,
    marginHorizontal: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  // Secondary (Back)
  secondaryButton: {
    backgroundColor: "#1c2e4a",
    width: 120, // same fixed width
    paddingVertical: 20,
    borderRadius: 18,
    marginHorizontal: 4,
    alignItems: "center",
  },
  secondaryText: {
    fontWeight: "bold",
    color: "#ff0000",
    fontSize: 20,
  },
  singleButtonWrap: {
    marginTop: 30,
  },
});

