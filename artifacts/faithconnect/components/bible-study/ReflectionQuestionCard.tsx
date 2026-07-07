import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";

interface ReflectionQuestionCardProps {
  question: string;
  index: number;
}

export function ReflectionQuestionCard({ question, index }: ReflectionQuestionCardProps) {
  const colors = useColors();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.num, { backgroundColor: "#EFF6FF" }]}>
        <Text style={[styles.numText, { color: colors.primary }]}>{index + 1}</Text>
      </View>
      <Text style={[styles.question, { color: colors.foreground }]}>{question}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 8,
  },
  num: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  numText: { fontSize: 13, fontFamily: "Inter_700Bold" },
  question: { flex: 1, fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 22 },
});
