//   app/Layout.tsx
import React from "react";
import { StyleSheet, View } from "react-native";


export default function Layout({ children }: any) {
  return <View style={styles.container}> {children}</View>
     
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "#0A1931",
  },
});
