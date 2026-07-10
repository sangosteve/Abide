import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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
import { useBibleStudy } from "@/components/bible-study/BibleStudyContext";
import { useColors } from "@/hooks/useColors";
import { useQuery } from "@tanstack/react-query";
import { fetchStudySeries } from "@/services/api";
import { ActivityIndicator } from "react-native";

const filterTabs = ["All", "By Book", "By Topic", "My Studies"];

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
const weekDates = [13, 14, 15, 16, 17, 18, 19];
const completedDays = [0, 1];

export default function BibleStudyHome() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { getLessonStatus, getCompletedCount } = useBibleStudy();
  const [activeFilter, setActiveFilter] = useState("All");
  
  const { data: studies = [], isLoading } = useQuery({ queryKey: ["bible-studies"], queryFn: fetchStudySeries });
  const series = studies?.[0];
  const previewLessons = series?.lessons.slice(0, 3) ?? [];

  const topPadding = Platform.OS === "web" ? 80 : insets.top + 16;
  const completedCount = series ? getCompletedCount(series.lessons.map((l) => l.id)) : 0;
  const progress = series ? completedCount / series.totalSessions : 0;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: topPadding }]}>
          <TouchableOpacity
            style={[styles.backBtn, { backgroundColor: colors.muted }]}
            onPress={() => router.back()}
          >
            <HIcon name="arrow-left" size={20} color={colors.foreground} />
          </TouchableOpacity>
          <Text style={[styles.pageTitle, { color: colors.foreground }]}>Bible Study</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.muted }]}>
              <HIcon name="search" size={18} color={colors.foreground} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.muted }]}>
              <HIcon name="bell" size={18} color={colors.foreground} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Current Series Hero */}
        {isLoading ? (
          <ActivityIndicator color={colors.primary} style={{ marginVertical: 40 }} />
        ) : series ? (
          <TouchableOpacity
            style={styles.seriesBanner}
            activeOpacity={0.9}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.push(`/bible-study/study/${series.id}`);
            }}
          >
            <Image
              source={{ uri: series.image }}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            <View style={styles.bannerOverlay} />
            <View style={styles.liveRow}>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>CURRENT SERIES</Text>
              </View>
            </View>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>{series.title}</Text>
              <View style={styles.bannerMeta}>
                <Image source={{ uri: series.teacherAvatar }} style={styles.bannerAvatar} />
                <Text style={styles.bannerSpeaker}>{series.teacher}</Text>
              </View>
              <View style={styles.progressRow}>
                <View style={styles.progressLabelRow}>
                  <Text style={styles.progressLabel}>
                    PROGRESS: {Math.round(progress * 100)}%
                  </Text>
                  <Text style={styles.progressDays}>
                    {completedCount}/{series.totalSessions} SESSIONS
                  </Text>
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {filterTabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.filterChip,
                activeFilter === tab
                  ? { backgroundColor: colors.primary, borderColor: colors.primary }
                  : { backgroundColor: colors.background, borderColor: colors.border },
              ]}
              onPress={() => setActiveFilter(tab)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  { color: activeFilter === tab ? "#FFF" : colors.foreground },
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Your Lessons */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Your Lessons</Text>
          {series && (
            <TouchableOpacity onPress={() => router.push(`/bible-study/study/${series.id}`)}>
              <Text style={[styles.viewAll, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.lessonList}>
          {previewLessons.map((lesson, idx) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              status={getLessonStatus(lesson.id, lesson.defaultStatus)}
              index={idx}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push(`/bible-study/lesson/${lesson.id}?studyId=${series?.id}`);
              }}
            />
          ))}
        </View>

        {series && (
          <TouchableOpacity
            style={[styles.seeAllLessons, { borderColor: colors.border }]}
            onPress={() => router.push(`/bible-study/study/${series.id}`)}
          >
            <Text style={[styles.seeAllLessonsText, { color: colors.primary }]}>
              View All {series.totalSessions} Sessions
            </Text>
            <HIcon name="chevron-right" size={16} color={colors.primary} />
          </TouchableOpacity>
        )}

        {/* Reading Plan */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Reading Plan</Text>
        </View>

        <View style={[styles.readingPlanCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.readingPlanHeader}>
            <View style={styles.readingPlanLeft}>
              <View style={[styles.readingPlanIcon, { backgroundColor: "#EFF6FF" }]}>
                <HIcon name="book-open" size={18} color={colors.primary} />
              </View>
              <View>
                <Text style={[styles.readingPlanTitle, { color: colors.foreground }]}>
                  Weekly Reading
                </Text>
                <Text style={[styles.readingPlanSub, { color: colors.mutedForeground }]}>
                  NT PLAN · JOHN 1–5
                </Text>
              </View>
            </View>
            <Text style={[styles.readingPlanProgress, { color: colors.primary }]}>42%</Text>
          </View>

          <View style={styles.calendarRow}>
            {weekDays.map((day, idx) => {
              const isDone = completedDays.includes(idx);
              const isToday = idx === 2;
              return (
                <View key={idx} style={styles.calendarDay}>
                  <Text style={[styles.calendarDayLabel, { color: colors.mutedForeground }]}>
                    {day}
                  </Text>
                  <View
                    style={[
                      styles.calendarDayCircle,
                      isDone && { backgroundColor: "#059669" },
                      isToday && { backgroundColor: colors.primary },
                      !isDone && !isToday && { backgroundColor: colors.muted },
                    ]}
                  >
                    {isDone ? (
                      <HIcon name="check" size={14} color="#FFF" />
                    ) : (
                      <Text
                        style={[
                          styles.calendarDayNum,
                          { color: isToday ? "#FFF" : colors.mutedForeground },
                        ]}
                      >
                        {weekDates[idx]}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Study Notes Preview */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Study Notes</Text>
        </View>

        <TouchableOpacity
          style={[styles.notesPreview, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => {
            const first = series?.lessons[0];
            if (first && series) router.push(`/bible-study/lesson/${first.id}?studyId=${series.id}`);
          }}
          activeOpacity={0.85}
        >
          <View style={styles.notesPreviewLeft}>
            <View style={[styles.notesIcon, { backgroundColor: "#EFF6FF" }]}>
              <HIcon name="file-text" size={16} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.notesTitle, { color: colors.foreground }]}>
                Reflection Notes
              </Text>
              <Text style={[styles.notesSub, { color: colors.mutedForeground }]}>
                Tap a lesson to add personal notes
              </Text>
            </View>
          </View>
          <HIcon name="chevron-right" size={16} color={colors.mutedForeground} />
        </TouchableOpacity>

        {/* Browse All */}
        <View style={[styles.seriesCta, { backgroundColor: "#EFF6FF" }]}>
          <View style={styles.seriesCtaLeft}>
            <HIcon name="book-open" size={22} color={colors.primary} />
            <View>
              <Text style={[styles.seriesCtaTitle, { color: colors.foreground }]}>
                Browse All Studies
              </Text>
              <Text style={[styles.seriesCtaSub, { color: colors.mutedForeground }]}>
                60+ lessons across 12 series
              </Text>
            </View>
          </View>
          <HIcon name="chevron-right" size={20} color={colors.primary} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  pageTitle: { flex: 1, fontSize: 20, fontFamily: "Inter_700Bold" },
  headerRight: { flexDirection: "row", gap: 8 },
  iconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  seriesBanner: { marginHorizontal: 20, borderRadius: 16, overflow: "hidden", height: 210, marginBottom: 16 },
  bannerImage: { width: "100%", height: "100%" },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(10,15,40,0.68)" },
  liveRow: { position: "absolute", top: 12, left: 12 },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#2563EB",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#FFF" },
  liveText: { color: "#FFF", fontSize: 10, fontFamily: "Inter_700Bold", letterSpacing: 1 },
  bannerContent: { position: "absolute", bottom: 14, left: 14, right: 14 },
  bannerTitle: { color: "#FFF", fontSize: 20, fontFamily: "Inter_700Bold", marginBottom: 8 },
  bannerMeta: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  bannerAvatar: { width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: "rgba(255,255,255,0.4)" },
  bannerSpeaker: { color: "rgba(255,255,255,0.85)", fontSize: 12, fontFamily: "Inter_400Regular" },
  progressRow: { gap: 6 },
  progressLabelRow: { flexDirection: "row", justifyContent: "space-between" },
  progressLabel: { color: "rgba(255,255,255,0.75)", fontSize: 11, fontFamily: "Inter_500Medium" },
  progressDays: { color: "rgba(255,255,255,0.75)", fontSize: 11, fontFamily: "Inter_500Medium" },
  progressTrack: { height: 4, backgroundColor: "rgba(255,255,255,0.25)", borderRadius: 2 },
  progressFill: { height: "100%", backgroundColor: "#2563EB", borderRadius: 2 },
  filterRow: { paddingHorizontal: 20, gap: 8, paddingBottom: 16 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  filterChipText: { fontSize: 13, fontFamily: "Inter_500Medium" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontFamily: "Inter_700Bold" },
  viewAll: { fontSize: 13, fontFamily: "Inter_500Medium" },
  lessonList: { paddingHorizontal: 20 },
  seeAllLessons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 28,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  seeAllLessonsText: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  readingPlanCard: {
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    marginBottom: 24,
    gap: 14,
  },
  readingPlanHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  readingPlanLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  readingPlanIcon: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  readingPlanTitle: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  readingPlanSub: { fontSize: 11, fontFamily: "Inter_400Regular", marginTop: 1 },
  readingPlanProgress: { fontSize: 14, fontFamily: "Inter_700Bold" },
  calendarRow: { flexDirection: "row", justifyContent: "space-between" },
  calendarDay: { alignItems: "center", gap: 6 },
  calendarDayLabel: { fontSize: 11, fontFamily: "Inter_500Medium" },
  calendarDayCircle: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  calendarDayNum: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  notesPreview: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    marginBottom: 24,
    gap: 12,
  },
  notesPreviewLeft: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10 },
  notesIcon: { width: 32, height: 32, borderRadius: 9, alignItems: "center", justifyContent: "center" },
  notesTitle: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  notesSub: { fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 },
  seriesCta: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  seriesCtaLeft: { flex: 1, flexDirection: "row", alignItems: "center", gap: 12 },
  seriesCtaTitle: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
  seriesCtaSub: { fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 },
});
