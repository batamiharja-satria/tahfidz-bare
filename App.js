import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

export default function App() {
  const [uri, setUri] = useState(null);

  useEffect(() => {
    (async () => {
      const asset = Asset.fromModule(require("./dist/index.html"));
      await asset.downloadAsync(); // pastiin kebaca
      setUri(asset.localUri || asset.uri);
    })();
  }, []);

  if (!uri) return null;

  return (
    <SafeAreaView style={styles.container}>
      <WebView 
        source={{ uri }} 
        originWhitelist={["*"]}
        allowFileAccess
        allowUniversalAccessFromFileURLs
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});