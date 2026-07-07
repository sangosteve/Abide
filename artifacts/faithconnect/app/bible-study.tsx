import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HIcon } from "@/components/HIcon";
import { useColors } from "@/hooks/useColors";

const filterTabs = ["All", "By Book", "By Topic", "My Studies"];

const sessions = [
  {
    id: "1",
    title: "Session 1: The Fear of the Lord",
    date: "Oct 24, 2023",
    duration: "15 min",
    status: "completed",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400",
  },
  {
    id: "2",
    title: "Session 2: Trusting God's Plan",
    date: "Oct 25, 2023",
    duration: "12 min",
    status: "resume",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
  },
  {
    id: "3",
    title: "Session 3: Guarding Your Heart",
    date: "Oct 26, 2023",
    duration: "18 min",
    status: "start",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  },
];

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
const weekDates = [13, 14, 15, 16, 17, 18, 19];
const completedDays = [0, 1];

export default function BibleStudyScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [note, setNote] = useState("");
  const topPadding = Platform.OS === "web" ? 80 : insets.top + 16;

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

        {/* Current Series Banner */}
        <TouchableOpacity style={styles.seriesBanner} activeOpacity={0.9}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800" }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay} />
          <View style={styles.liveRow}>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE NOW</Text>
            </View>
          </View>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerLabel}>CURRENT SERIES</Text>
            <Text style={styles.bannerTitle}>The Wisdom of Proverbs</Text>
            <View style={styles.bannerMeta}>
              <Image
                source={{ uri: "https://i.pravatar.cc/150?img=52" }}
                style={styles.bannerAvatar}
              />
              <Text style={styles.bannerSpeaker}>Lead: Pastor David Miller</Text>
            </View>
            <View style={styles.progressRow}>
              <View style={styles.progressLabelRow}>
                <Text style={styles.progressLabel}>PROGRESS: 65%</Text>
                <Text style={styles.progressDays}>12/18 DAYS</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: "65%" }]} />
              </View>
            </View>
          </View>
        </TouchableOpacity>

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
          <TouchableOpacity>
            <Text style={[styles.viewAll, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>

        {sessions.map((session) => (
          <TouchableOpacity
            key={session.id}
            style={[styles.sessionRow, { borderBottomColor: colors.border }]}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            activeOpacity={0.85}
          >
            <Image source={{ uri: session.image }} style={styles.sessionThumb} resizeMode="cover" />
            <View style={styles.sessionInfo}>
              <Text style={[styles.sessionTitle, { color: colors.foreground }]} numberOfLines={1}>
                {session.title}
              </Text>
              <View style={styles.sessionMeta}>
                <View style={styles.sessionMetaItem}>
                  <HIcon name="calendar" size={12} color={colors.mutedForeground} />
                  <Text style={[styles.sessionMetaText, { color: colors.mutedForeground }]}>
                    {session.date}
                  </Text>
                </View>
                <View style={styles.sessionMetaItem}>
                  <HIcon name="clock" size={12} color={colors.mutedForeground} />
                  <Text style={[styles.sessionMetaText, { color: colors.mutedForeground }]}>
                    {session.duration}
                  </Text>
                </View>
              </View>
              {session.status === "completed" && (
                <View style={[styles.statusBadge, { backgroundColor: "#ECFDF5" }]}>
                  <HIcon name="check" size={12} color="#059669" />
                  <Text style={[styles.statusText, { color: "#059669" }]}>Completed</Text>
                </View>
              )}
              {session.status === "resume" && (
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: colors.primary }]}
                  onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
                >
                  <HIcon name="play" size={11} color="#FFF" />
                  <Text style={styles.actionBtnText}>Resume</Text>
                </TouchableOpacity>
              )}
              {session.status === "start" && (
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: colors.primary }]}
                  onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
                >
                  <Text style={styles.actionBtnText}>Start</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity style={styles.moreBtn}>
              <HIcon name="more-vertical" size={18} color={colors.mutedForeground} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

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
                <Text style={[styles.readingPlanTitle, { color: colors.foreground }]}>Weekly Reading</Text>
                <Text style={[styles.readingPlanSub, { color: colors.mutedForeground }]}>
                  NT PLAN: JOHN 1-5
                </Text>
              </View>
            </View>
            <Text style={[styles.readingPlanProgress, { color: colors.primary }]}>42% Complete</Text>
          </View>

          <View style={styles.calendarRow}>
            {weekDays.map((day, idx) => {
              const isCompleted = completedDays.includes(idx);
              const isToday = idx === 2;
              return (
                <View key={idx} style={styles.calendarDay}>
                  <Text style={[styles.calendarDayLabel, { color: colors.mutedForeground }]}>{day}</Text>
                  <View
                    style={[
                      styles.calendarDayCircle,
                      isCompleted && { backgroundColor: "#059669" },
                      isToday && { backgroundColor: colors.primary },
                      !isCompleted && !isToday && { backgroundColor: colors.muted },
                    ]}
                  >
                    {isCompleted ? (
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

        {/* Study Notes */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Study Notes</Text>
        </View>

        <View style={[styles.notesCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
          <View style={styles.notesHeader}>
            <View style={[styles.notesIcon, { backgroundColor: "#EFF6FF" }]}>
              <HIcon name="file-text" size={16} color={colors.primary} />
            </View>
            <Text style={[styles.notesTitle, { color: colors.foreground }]}>Reflection Notes</Text>
            <Text style={[styles.notesSaved, { color: colors.mutedForeground }]}>
              Last saved: 2m ago
            </Text>
          </View>
          <TextInput
            style={[styles.notesInput, { color: colors.mutedForeground }]}
            placeholder="What is God speaking to you today?"
            placeholderTextColor={colors.mutedForeground}
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Join Group + Share */}
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={[styles.joinBtn, { borderColor: colors.border }]}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          >
            <HIcon name="users" size={18} color={colors.foreground} />
            <Text style={[styles.joinBtnText, { color: colors.foreground }]}>Join Group</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.shareBtn, { borderColor: colors.border }]}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          >
            <HIcon name="share" size={18} color={colors.foreground} />
          </TouchableOpacity>
        </View>

        {/* All Sermons CTA */}
        <View style={[styles.seriesCta, { backgroundColor: "#EFF6FF" }]}>
          <View style={styles.seriesCtaLeft}>
            <HIcon name="book-open" size={22} color={colors.primary} />
            <View>
              <Text style={[styles.seriesCtaTitle, { color: colors.foreground }]}>Browse All Studies</Text>
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
  seriesBanner: { marginHorizontal: 20, borderRadius: 16, overflow: "hidden", height: 200, marginBottom: 16 },
  bannerImage: { width: "100%", height: "100%" },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(10,15,40,0.65)" },
  liveRow: { position: "absolute", top: 12, left: 12 },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#22C55E",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#FFF" },
  liveText: { color: "#FFF", fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 1 },
  bannerContent: { position: "absolute", bottom: 14, left: 14, right: 14 },
  bannerLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
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
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 17, fontFamily: "Inter_700Bold" },
  viewAll: { fontSize: 13, fontFamily: "Inter_500Medium" },
  sessionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    gap: 12,
  },
  sessionThumb: { width: 72, height: 60, borderRadius: 10 },
  sessionInfo: { flex: 1, gap: 6 },
  sessionTitle: { fontSize: 14, fontFamily: "Inter_600SemiBold", lineHeight: 19 },
  sessionMeta: { flexDirection: "row", gap: 12 },
  sessionMetaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  sessionMetaText: { fontSize: 12, fontFamily: "Inter_400Regular" },
  statusBadge: { flexDirection: "row", alignItems: "center", gap: 5, alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 12, fontFamily: "Inter_500Medium" },
  actionBtn: { flexDirection: "row", alignItems: "center", gap: 5, alignSelf: "flex-start", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8 },
  actionBtnText: { color: "#FFF", fontSize: 12, fontFamily: "Inter_600SemiBold" },
  moreBtn: { padding: 8 },
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
  readingPlanSub: { fontSize: 11, fontFamily: "Inter_400Regular" },
  readingPlanProgress: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  calendarRow: { flexDirection: "row", justifyContent: "space-between" },
  calendarDay: { alignItems: "center", gap: 6 },
  calendarDayLabel: { fontSize: 11, fontFamily: "Inter_500Medium" },
  calendarDayCircle: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  calendarDayNum: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  notesCard: { marginHorizontal: 20, borderRadius: 14, borderWidth: 1, marginBottom: 16, overflow: "hidden" },
  notesHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.06)",
  },
  notesIcon: { width: 28, height: 28, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  notesTitle: { flex: 1, fontSize: 14, fontFamily: "Inter_600SemiBold" },
  notesSaved: { fontSize: 11, fontFamily: "Inter_400Regular" },
  notesInput: {
    padding: 14,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    minHeight: 80,
    textAlignVertical: "top",
  },
  bottomActions: { flexDirection: "row", gap: 10, paddingHorizontal: 20, marginBottom: 20 },
  joinBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1,
  },
  joinBtnText: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  shareBtn: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
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
