import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";

interface ProgressBarProps {
  progress: number; // 0–1
  label?: string;
  showPercent?: boolean;
  height?: number;
  color?: string;
}

export function ProgressBar({
  progress,
  label,
  showPercent = true,
  height = 6,
  color,
}: ProgressBarProps) {
  const colors = useColors();
  const pct = Math.min(Math.max(progress, 0), 1);
  const barColor = color ?? colors.primary;

  return (
    <View style={styles.wrapper}>
      {(label || showPercent) && (
        <View style={styles.labelRow}>
          {label && (
            <Text style={[styles.label, { color: colors.mutedForeground }]}>{label}</Text>
          )}
          {showPercent && (
            <Text style={[styles.percent, { color: colors.primary }]}>
              {Math.round(pct * 100)}%
            </Text>
          )}
        </View>
      )}
      <View style={[styles.track, { height, backgroundColor: colors.muted }]}>
        <View
          style={[
            styles.fill,
            { width: `${pct * 100}%`, height, backgroundColor: barColor },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 6 },
  labelRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  label: { fontSize: 13, fontFamily: "Inter_500Medium" },
  percent: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  track: { borderRadius: 99, overflow: "hidden", backgroundColor: "#E2E8F0" },
  fill: { borderRadius: 99 },
});
