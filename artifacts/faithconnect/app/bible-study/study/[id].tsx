import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HIcon } from "@/components/HIcon";
import { LessonCard } from "@/components/bible-study/LessonCard";
import { ProgressBar } from "@/components/bible-study/ProgressBar";
import { PrimaryButton } from "@/components/bible-study/PrimaryButton";
import { useBibleStudy } from "@/components/bible-study/BibleStudyContext";
import { useColors } from "@/hooks/useColors";
import { useQuery } from "@tanstack/react-query";
import { fetchStudy } from "@/services/api";
import { ActivityIndicator } from "react-native";

export default function StudyDetailScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getLessonStatus, getCompletedCount } = useBibleStudy();

  const { data: series, isLoading } = useQuery({ queryKey: ["bible-study", id], queryFn: () => fetchStudy(id) });
  
  const topPadding = Platform.OS === "web" ? 60 : insets.top;

  if (isLoading) {
    return (
      <View style={[styles.root, { backgroundColor: colors.background, paddingTop: topPadding + 20, justifyContent: 'center' }]}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (!series) {
    return (
      <View style={[styles.root, { backgroundColor: colors.background, paddingTop: topPadding + 20 }]}>
        <Text style={{ color: colors.foreground, textAlign: "center" }}>Study not found.</Text>
      </View>
    );
  }

  const completedCount = getCompletedCount(series.lessons.map((l) => l.id));
  const progress = completedCount / series.totalSessions;

  // Find the lesson to continue: first resume, then first start
  const continueLesson = series.lessons.find(
    (l) => getLessonStatus(l.id, l.defaultStatus) === "resume"
  ) ?? series.lessons.find(
    (l) => getLessonStatus(l.id, l.defaultStatus) === "start"
  ) ?? series.lessons[0];

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={[styles.hero, { paddingTop: topPadding }]}>
          <Image source={{ uri: series.image }} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.heroOverlay} />

          <TouchableOpacity
            style={[styles.backBtn, { top: topPadding + 12 }]}
            onPress={() => router.back()}
          >
            <HIcon name="arrow-left" size={20} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareBtn}>
            <HIcon name="share" size={18} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>BIBLE STUDY SERIES</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title & Teacher */}
          <Text style={[styles.title, { color: colors.foreground }]}>{series.title}</Text>
          <Text style={[styles.description, { color: colors.mutedForeground }]}>
            {series.description}
          </Text>

          <View style={[styles.teacherRow, { borderColor: colors.border }]}>
            <Image source={{ uri: series.teacherAvatar }} style={styles.teacherAvatar} />
            <View>
              <Text style={[styles.teacherName, { color: colors.foreground }]}>
                {series.teacher}
              </Text>
              <Text style={[styles.teacherTitle, { color: colors.mutedForeground }]}>
                {series.teacherTitle}
              </Text>
            </View>
            <View style={styles.teacherRight}>
              <View style={[styles.sessionCountWrap, { backgroundColor: "#EFF6FF" }]}>
                <HIcon name="book-open" size={14} color={colors.primary} />
                <Text style={[styles.sessionCount, { color: colors.primary }]}>
                  {series.totalSessions} Sessions
                </Text>
              </View>
            </View>
          </View>

          {/* Progress */}
          <View style={[styles.progressCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.progressHeader}>
              <Text style={[styles.progressLabel, { color: colors.foreground }]}>
                Your Progress
              </Text>
              <Text style={[styles.progressCount, { color: colors.mutedForeground }]}>
                {completedCount} of {series.totalSessions} sessions
              </Text>
            </View>
            <ProgressBar progress={progress} showPercent />
            {completedCount === series.totalSessions && (
              <View style={styles.completedBanner}>
                <HIcon name="check-circle" size={16} color="#059669" />
                <Text style={[styles.completedText, { color: "#059669" }]}>
                  Series Complete — Well done!
                </Text>
              </View>
            )}
          </View>

          {/* Continue Button */}
          {completedCount < series.totalSessions && (
            <PrimaryButton
              label={
                completedCount === 0
                  ? "Start First Session"
                  : `Continue — ${continueLesson.shortTitle}`
              }
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.push(`/bible-study/lesson/${continueLesson.id}?studyId=${series.id}`);
              }}
              icon={<HIcon name="play" size={16} color="#FFF" />}
            />
          )}

          {/* Sessions List */}
          <View style={styles.sessionsHeader}>
            <Text style={[styles.sessionsTitle, { color: colors.foreground }]}>All Sessions</Text>
            <Text style={[styles.sessionsCount, { color: colors.mutedForeground }]}>
              {completedCount}/{series.totalSessions} done
            </Text>
          </View>

          {series.lessons.map((lesson, idx) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              status={getLessonStatus(lesson.id, lesson.defaultStatus)}
              index={idx}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push(`/bible-study/lesson/${lesson.id}?studyId=${series.id}`);
              }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  hero: { height: 260, position: "relative" },
  heroImage: { width: "100%", height: "100%", position: "absolute" },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10,15,40,0.55)",
  },
  backBtn: {
    position: "absolute",
    left: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  shareBtn: {
    position: "absolute",
    top: 0,
    right: 16,
    bottom: 0,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: 12,
  },
  heroBadge: {
    position: "absolute",
    bottom: 16,
    left: 16,
    backgroundColor: "#2563EB",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  heroBadgeText: { color: "#FFF", fontSize: 10, fontFamily: "Inter_700Bold", letterSpacing: 1 },
  content: { padding: 20, gap: 16 },
  title: { fontSize: 24, fontFamily: "Inter_700Bold", lineHeight: 32 },
  description: { fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 22, marginTop: -4 },
  teacherRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  teacherAvatar: { width: 42, height: 42, borderRadius: 21 },
  teacherName: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  teacherTitle: { fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 },
  teacherRight: { flex: 1, alignItems: "flex-end" },
  sessionCountWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  sessionCount: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  progressCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  progressHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  progressLabel: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
  progressCount: { fontSize: 13, fontFamily: "Inter_400Regular" },
  completedBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#ECFDF5",
    borderRadius: 8,
    padding: 10,
  },
  completedText: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  sessionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  sessionsTitle: { fontSize: 17, fontFamily: "Inter_700Bold" },
  sessionsCount: { fontSize: 13, fontFamily: "Inter_400Regular" },
});
