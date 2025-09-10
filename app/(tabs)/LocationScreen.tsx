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

  // Custom top margin for each step
  const stepMarginTop = {
    1: 80, // Step 1 pushed down
    2: 40, // Step 2 slightly down
    3: 40, // Step 3 slightly down
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
    paddingTop: -70,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    //textAlign: "center",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 25,
    color: "#aaa",
    //textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 50,
  },
  button: {
    backgroundColor: "#00c4cc",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 18,
    marginHorizontal: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 29,
  },
  secondaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    backgroundColor: "#1c2e4a",
    marginHorizontal: 8,
  },
  secondaryText: {
    color: "#fff",
    fontSize: 29,
  },
  row: {
    flexDirection: "row",
    marginTop: 20,
  },
  singleButtonWrap: {
    marginTop: 30,
  },
});
