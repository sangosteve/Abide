import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { HIcon } from "@/components/HIcon";
import { useColors } from "@/hooks/useColors";

interface NotesEditorProps {
  value: string;
  onChange: (text: string) => void;
  onSave: () => void;
  savedAt?: number; // timestamp
}

export function NotesEditor({ value, onChange, onSave, savedAt }: NotesEditorProps) {
  const colors = useColors();
  const [isFocused, setIsFocused] = useState(false);

  const savedLabel = savedAt
    ? (() => {
        const diff = Math.floor((Date.now() - savedAt) / 1000);
        if (diff < 60) return "Just saved";
        if (diff < 3600) return `Saved ${Math.floor(diff / 60)}m ago`;
        return `Saved ${Math.floor(diff / 3600)}h ago`;
      })()
    : null;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: isFocused ? colors.primary : colors.border,
          borderWidth: isFocused ? 1.5 : 1,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: "#EFF6FF" }]}>
          <HIcon name="file-text" size={14} color={colors.primary} />
        </View>
        <Text style={[styles.title, { color: colors.foreground }]}>Personal Notes</Text>
        {savedLabel && (
          <Text style={[styles.savedLabel, { color: colors.mutedForeground }]}>{savedLabel}</Text>
        )}
      </View>

      <TextInput
        style={[styles.input, { color: colors.foreground }]}
        placeholder="What is God speaking to you through this lesson?"
        placeholderTextColor={colors.mutedForeground}
        value={value}
        onChangeText={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        multiline
        numberOfLines={5}
        textAlignVertical="top"
      />

      <TouchableOpacity
        style={[styles.saveBtn, { backgroundColor: "#EFF6FF" }]}
        onPress={onSave}
        activeOpacity={0.8}
      >
        <HIcon name="check" size={14} color={colors.primary} />
        <Text style={[styles.saveBtnText, { color: colors.primary }]}>Save Notes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    overflow: "hidden",
    gap: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.06)",
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { flex: 1, fontSize: 14, fontFamily: "Inter_600SemiBold" },
  savedLabel: { fontSize: 11, fontFamily: "Inter_400Regular" },
  input: {
    padding: 14,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    minHeight: 100,
    lineHeight: 22,
  },
  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: 12,
    margin: 12,
    borderRadius: 10,
  },
  saveBtnText: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
});
