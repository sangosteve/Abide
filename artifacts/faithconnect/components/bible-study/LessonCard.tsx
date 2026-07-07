import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HIcon } from "@/components/HIcon";
import { useColors } from "@/hooks/useColors";
import type { StudyLesson } from "@/constants/bibleStudyMockData";

interface LessonCardProps {
  lesson: StudyLesson;
  status: "completed" | "resume" | "start";
  index: number;
  onPress: () => void;
}

export function LessonCard({ lesson, status, index, onPress }: LessonCardProps) {
  const colors = useColors();

  const statusConfig = {
    completed: { label: "Completed", bg: "#ECFDF5", color: "#059669", icon: "check" as const },
    resume: { label: "Resume", bg: colors.primary, color: "#FFF", icon: "play" as const },
    start: { label: "Start", bg: colors.primary, color: "#FFF", icon: null },
  };
  const cfg = statusConfig[status];

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={[styles.indexCircle, { backgroundColor: status === "completed" ? "#ECFDF5" : "#EFF6FF" }]}>
        {status === "completed" ? (
          <HIcon name="check" size={14} color="#059669" />
        ) : (
          <Text style={[styles.indexNum, { color: colors.primary }]}>{index + 1}</Text>
        )}
      </View>

      <Image source={{ uri: lesson.thumbnail }} style={styles.thumb} resizeMode="cover" />

      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.foreground }]} numberOfLines={2}>
          {lesson.shortTitle}
        </Text>
        <View style={styles.meta}>
          <HIcon name="clock" size={11} color={colors.mutedForeground} />
          <Text style={[styles.metaText, { color: colors.mutedForeground }]}>{lesson.duration}</Text>
        </View>
      </View>

      <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
        {cfg.icon && <HIcon name={cfg.icon} size={11} color={cfg.color} />}
        <Text style={[styles.badgeText, { color: cfg.color }]}>{cfg.label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
  },
  indexCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  indexNum: { fontSize: 13, fontFamily: "Inter_700Bold" },
  thumb: { width: 60, height: 50, borderRadius: 8 },
  info: { flex: 1, gap: 5 },
  title: { fontSize: 13, fontFamily: "Inter_600SemiBold", lineHeight: 18 },
  meta: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 12, fontFamily: "Inter_400Regular" },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeText: { fontSize: 11, fontFamily: "Inter_600SemiBold" },
});
