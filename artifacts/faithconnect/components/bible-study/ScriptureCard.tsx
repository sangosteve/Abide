import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HIcon } from "@/components/HIcon";
import { useColors } from "@/hooks/useColors";

interface ScriptureCardProps {
  reference: string;
  text: string;
}

export function ScriptureCard({ reference, text }: ScriptureCardProps) {
  const colors = useColors();

  return (
    <View style={[styles.card, { backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }]}>
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: colors.primary }]}>
          <HIcon name="book-open" size={14} color="#FFF" />
        </View>
        <Text style={[styles.reference, { color: colors.primary }]}>{reference}</Text>
      </View>
      <Text style={[styles.verse, { color: "#1E3A8A" }]}>"{text}"</Text>
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
  reference: { fontSize: 14, fontFamily: "Inter_700Bold" },
  verse: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    lineHeight: 24,
    fontStyle: "italic",
  },
});
