import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useColors } from "@/hooks/useColors";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "outline" | "ghost" | "success";
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function PrimaryButton({
  label,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  icon,
}: PrimaryButtonProps) {
  const colors = useColors();

  const bgMap = {
    primary: colors.primary,
    outline: "transparent",
    ghost: "transparent",
    success: "#059669",
  };

  const borderMap = {
    primary: colors.primary,
    outline: colors.primary,
    ghost: "transparent",
    success: "#059669",
  };

  const textMap = {
    primary: "#FFF",
    outline: colors.primary,
    ghost: colors.primary,
    success: "#FFF",
  };

  return (
    <TouchableOpacity
      style={[
        styles.btn,
        {
          backgroundColor: disabled ? colors.muted : bgMap[variant],
          borderColor: disabled ? colors.border : borderMap[variant],
          borderWidth: variant === "outline" ? 1.5 : 0,
          opacity: disabled ? 0.6 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.82}
    >
      {loading ? (
        <ActivityIndicator color={textMap[variant]} size="small" />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.label,
              { color: disabled ? colors.mutedForeground : textMap[variant] },
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  label: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
});
