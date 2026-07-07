import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HIcon } from "@/components/HIcon";
import { useColors } from "@/hooks/useColors";

interface PrayerPointCardProps {
  text: string;
}

export function PrayerPointCard({ text }: PrayerPointCardProps) {
  const colors = useColors();

  return (
    <View style={[styles.card, { backgroundColor: "#FDF4FF", borderColor: "#E9D5FF" }]}>
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: "#7C3AED" }]}>
          <HIcon name="star" size={14} color="#FFF" />
        </View>
        <Text style={[styles.label, { color: "#7C3AED" }]}>Prayer Point</Text>
      </View>
      <Text style={[styles.text, { color: "#4C1D95" }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  header: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  label: { fontSize: 14, fontFamily: "Inter_700Bold" },
  text: { fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 23, fontStyle: "italic" },
});
