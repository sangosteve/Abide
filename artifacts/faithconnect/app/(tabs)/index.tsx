import { HIcon } from "@/components/HIcon";
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

import { useColors } from "@/hooks/useColors";
import { dailyVerse, sermons, upcomingEvents, quickActions } from "@/constants/mockData";

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [verseHearted, setVerseHearted] = useState(false);
  const featured = sermons[1];

  const topPadding = Platform.OS === "web" ? 80 : insets.top + 16;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPadding }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.logoMark, { backgroundColor: colors.primary }]}>
            <HIcon name="zap" size={14} color="#FFF" />
          </View>
          <Text style={[styles.appTitle, { color: colors.foreground }]}>FaithConnect</Text>
        </View>
        <TouchableOpacity
          style={[styles.notifBtn, { backgroundColor: colors.muted }]}
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        >
          <HIcon name="bell" size={20} color={colors.foreground} />
          <View style={[styles.notifDot, { backgroundColor: colors.destructive }]} />
        </TouchableOpacity>
      </View>

      {/* Greeting */}
      <View style={styles.greetingRow}>
        <View style={styles.greetingText}>
          <Text style={[styles.greeting, { color: colors.foreground }]}>
            Good Morning, Sarah
          </Text>
          <Text style={[styles.greetingSub, { color: colors.mutedForeground }]}>
            You are exactly where you need to be.
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/more")}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=47" }}
            style={styles.avatar}
          />
          <View style={[styles.onlineDot, { backgroundColor: colors.success }]} />
        </TouchableOpacity>
      </View>

      {/* Featured Sermon */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Featured Sermon</Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/sermons")}>
          <Text style={[styles.viewAll, { color: colors.primary }]}>View All</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.featuredCard}
        onPress={() => router.push(`/sermon/${featured.id}`)}
        activeOpacity={0.92}
      >
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1429514513361-8a632ff5f2ba?w=800" }}
          style={styles.featuredImage}
          resizeMode="cover"
        />
        <View style={styles.featuredOverlay} />
        <View style={styles.featuredBadgeRow}>
          <View style={[styles.newBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.newBadgeText}>New Release</Text>
          </View>
        </View>
        <View style={styles.featuredPlayBtn}>
          <HIcon name="play-circle" size={44} color="rgba(255,255,255,0.9)" />
        </View>
        <View style={styles.featuredContent}>
          <Text style={styles.featuredTitle} numberOfLines={2}>
            {featured.title}
          </Text>
          <Text style={styles.featuredSpeaker}>{featured.speaker}</Text>
        </View>
      </TouchableOpacity>

      {/* Quick Actions */}
      <View style={styles.quickActionsRow}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[styles.quickAction, { backgroundColor: colors.card }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              if (action.id === "give") router.push("/(tabs)/give");
              if (action.id === "events") router.push("/(tabs)/events");
            }}
            activeOpacity={0.8}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: colors.muted }]}>
              <HIcon
                name={action.icon as any}
                size={20}
                color={colors.primary}
              />
            </View>
            <Text style={[styles.quickActionLabel, { color: colors.foreground }]}>
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Daily Verse */}
      <View style={[styles.verseCard, { backgroundColor: "#EFF6FF" }]}>
        <View style={styles.verseHeader}>
          <View style={[styles.verseIcon, { backgroundColor: colors.primary }]}>
            <HIcon name="book-open" size={12} color="#FFF" />
          </View>
          <Text style={[styles.verseLabel, { color: colors.primary }]}>VERSE OF THE DAY</Text>
        </View>
        <Text style={[styles.verseText, { color: colors.foreground }]}>
          {dailyVerse.verse}
        </Text>
        <View style={styles.verseFooter}>
          <Text style={[styles.verseRef, { color: colors.mutedForeground }]}>
            {dailyVerse.reference}
          </Text>
          <View style={styles.verseActions}>
            <TouchableOpacity
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            >
              <HIcon name="share" size={18} color={colors.mutedForeground} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setVerseHearted((v) => !v);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }}
            >
              <HIcon
                name="heart"
                size={18}
                color={verseHearted ? colors.destructive : colors.mutedForeground}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Events Near You */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Events Near You</Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/events")}>
          <Text style={[styles.viewAll, { color: colors.primary }]}>Full Calendar</Text>
        </TouchableOpacity>
      </View>

      {upcomingEvents.slice(0, 2).map((event) => (
        <TouchableOpacity
          key={event.id}
          style={[styles.eventRow, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => router.push(`/event/${event.id}`)}
          activeOpacity={0.85}
        >
          <View style={[styles.eventDateBlock, { backgroundColor: colors.primary }]}>
            <Text style={styles.eventMonth}>{event.month}</Text>
            <Text style={styles.eventDay}>{event.day}</Text>
          </View>
          <View style={styles.eventInfo}>
            <Text style={[styles.eventTitle, { color: colors.foreground }]} numberOfLines={1}>
              {event.title}
            </Text>
            <View style={styles.eventMeta}>
              <HIcon name="clock" size={12} color={colors.mutedForeground} />
              <Text style={[styles.eventMetaText, { color: colors.mutedForeground }]}>
                {event.time}
              </Text>
            </View>
            <View style={styles.eventMeta}>
              <HIcon name="map-pin" size={12} color={colors.mutedForeground} />
              <Text style={[styles.eventMetaText, { color: colors.mutedForeground }]}>
                {event.venue}
              </Text>
            </View>
          </View>
          <HIcon name="chevron-right" size={18} color={colors.mutedForeground} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoMark: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  appTitle: { fontSize: 17, fontFamily: "Inter_700Bold" },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  notifDot: {
    position: "absolute",
    top: 6,
    right: 7,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#FFF",
  },
  greetingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greetingText: { flex: 1 },
  greeting: { fontSize: 24, fontFamily: "Inter_700Bold", marginBottom: 2 },
  greetingSub: { fontSize: 14, fontFamily: "Inter_400Regular" },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  onlineDot: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 11,
    height: 11,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: { fontSize: 18, fontFamily: "Inter_700Bold" },
  viewAll: { fontSize: 14, fontFamily: "Inter_500Medium" },
  featuredCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
    height: 200,
    marginBottom: 20,
  },
  featuredImage: { width: "100%", height: "100%" },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10,15,40,0.55)",
  },
  featuredBadgeRow: {
    position: "absolute",
    top: 14,
    left: 14,
    flexDirection: "row",
  },
  newBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  newBadgeText: { color: "#FFF", fontSize: 11, fontFamily: "Inter_600SemiBold" },
  featuredPlayBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -22,
    marginLeft: -22,
  },
  featuredContent: {
    position: "absolute",
    bottom: 14,
    left: 14,
    right: 14,
  },
  featuredTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    marginBottom: 4,
  },
  featuredSpeaker: { color: "rgba(255,255,255,0.8)", fontSize: 13, fontFamily: "Inter_400Regular" },
  quickActionsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  quickAction: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionLabel: { fontSize: 12, fontFamily: "Inter_500Medium" },
  verseCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
  },
  verseHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  verseIcon: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  verseLabel: { fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 1.5 },
  verseText: { fontSize: 15, fontFamily: "Inter_400Regular", lineHeight: 24, marginBottom: 16 },
  verseFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  verseRef: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  verseActions: { flexDirection: "row", gap: 16 },
  eventRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    gap: 12,
  },
  eventDateBlock: {
    width: 48,
    height: 56,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  eventMonth: { color: "#FFF", fontSize: 10, fontFamily: "Inter_700Bold", letterSpacing: 1 },
  eventDay: { color: "#FFF", fontSize: 22, fontFamily: "Inter_700Bold" },
  eventInfo: { flex: 1, gap: 4 },
  eventTitle: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  eventMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  eventMetaText: { fontSize: 12, fontFamily: "Inter_400Regular" },
});
