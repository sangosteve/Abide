import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const enter = () => {
    router.replace("/(tabs)");
  };

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1429514513361-8a632ff5f2ba?w=800" }}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View
        style={[
          styles.container,
          {
            paddingTop: Platform.OS === "web" ? 80 : insets.top + 20,
            paddingBottom: Platform.OS === "web" ? 40 : insets.bottom + 20,
          },
        ]}
      >
        <View style={styles.top}>
          <View style={styles.logoBox}>
            <Text style={styles.logoIcon}>⚡</Text>
          </View>
          <Text style={styles.appName}>FaithConnect</Text>
        </View>

        <View style={styles.middle}>
          <Text style={styles.headline}>Welcome Home</Text>
          <Text style={styles.subtitle}>
            Find your community, deepen your faith, and grow spiritually with us.
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryBtn} onPress={enter} activeOpacity={0.85}>
            <Text style={styles.primaryBtnText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={enter} activeOpacity={0.85}>
            <Text style={styles.secondaryBtnText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.guestBtn} onPress={enter} activeOpacity={0.7}>
            <Text style={styles.guestBtnText}>Explore as Guest  ›</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.tagline}>ROOTED IN LOVE · FOUNDED ON FAITH</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10, 15, 40, 0.62)",
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "space-between",
  },
  top: {
    alignItems: "center",
    gap: 8,
    marginTop: 20,
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  logoIcon: {
    fontSize: 32,
  },
  appName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 2,
    opacity: 0.9,
    textTransform: "uppercase",
  },
  middle: {
    alignItems: "center",
    gap: 12,
  },
  headline: {
    color: "#FFFFFF",
    fontSize: 36,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 280,
  },
  actions: {
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
  },
  secondaryBtn: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  secondaryBtnText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
  },
  guestBtn: {
    alignItems: "center",
    paddingVertical: 8,
  },
  guestBtnText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
  tagline: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: 8,
  },
});
