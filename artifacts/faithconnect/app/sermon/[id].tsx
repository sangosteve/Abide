import { HIcon } from "@/components/HIcon";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
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
import { useQuery } from "@tanstack/react-query";
import { fetchSermon } from "@/services/api";
import { ActivityIndicator } from "react-native";

export default function SermonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0.34);
  const [isSaved, setIsSaved] = useState(false);

  const { data: sermon, isLoading } = useQuery({ queryKey: ["sermon", id], queryFn: () => fetchSermon(id) });
  
  const topPadding = Platform.OS === "web" ? 60 : insets.top;

  const togglePlay = () => {
    setIsPlaying((p) => !p);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const totalSeconds = 42 * 60 + 15;
  const currentSeconds = Math.floor(totalSeconds * progress);
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <View style={[styles.root, { backgroundColor: colors.background, justifyContent: 'center' }]}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (!sermon) {
    return (
      <View style={[styles.root, { backgroundColor: colors.background, justifyContent: 'center' }]}>
        <Text style={{ color: colors.foreground, textAlign: 'center' }}>Sermon not found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: sermon.thumbnail }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />
          <View style={[styles.heroHeader, { paddingTop: topPadding + 12 }]}>
            <TouchableOpacity
              style={[styles.backBtn, { backgroundColor: "rgba(0,0,0,0.35)" }]}
              onPress={() => router.back()}
            >
              <HIcon name="arrow-left" size={20} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.heroHeaderTitle}>Sermon Player</Text>
            <View style={styles.heroHeaderActions}>
              <TouchableOpacity style={[styles.backBtn, { backgroundColor: "rgba(0,0,0,0.35)" }]}>
                <HIcon name="share" size={18} color="#FFF" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.backBtn, { backgroundColor: "rgba(0,0,0,0.35)" }]}>
                <HIcon name="more-vertical" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>Current Series: {sermon.series}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title & Info */}
          <Text style={[styles.sermonTitle, { color: colors.foreground }]}>{sermon.title}</Text>
          <View style={styles.metaRow}>
            <HIcon name="user" size={14} color={colors.mutedForeground} />
            <Text style={[styles.metaText, { color: colors.mutedForeground }]}>{sermon.speaker}</Text>
            <View style={[styles.dot, { backgroundColor: colors.border }]} />
            <HIcon name="calendar" size={14} color={colors.mutedForeground} />
            <Text style={[styles.metaText, { color: colors.mutedForeground }]}>{sermon.date}</Text>
          </View>

          {/* Progress */}
          <View style={styles.progressSection}>
            <View style={[styles.progressTrack, { backgroundColor: colors.muted }]}>
              <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${progress * 100}%` }]} />
              <View style={[styles.progressThumb, { backgroundColor: colors.primary, left: `${progress * 100}%` }]} />
            </View>
            <View style={styles.progressTimes}>
              <Text style={[styles.timeText, { color: colors.mutedForeground }]}>
                {formatTime(currentSeconds)}
              </Text>
              <Text style={[styles.timeText, { color: colors.mutedForeground }]}>
                {sermon.duration}
              </Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.controlBtn}
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            >
              <HIcon name="rotate-left" size={26} color={colors.foreground} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.playBtn, { backgroundColor: colors.primary }]}
              onPress={togglePlay}
              activeOpacity={0.85}
            >
              <HIcon
                name={isPlaying ? "pause" : "play"}
                size={30}
                color="#FFF"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlBtn}
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            >
              <HIcon name="rotate-right" size={26} color={colors.foreground} />
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionGrid}>
            {[
              { icon: "file-text", label: "Sermon Notes" },
              { icon: "book-open", label: "Full Scripture" },
              { icon: "download", label: "Download" },
              { icon: "bookmark", label: "Save Sermon" },
            ].map((action) => (
              <TouchableOpacity
                key={action.label}
                style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                activeOpacity={0.8}
              >
                <HIcon name={action.icon as any} size={22} color={colors.foreground} />
                <Text style={[styles.actionLabel, { color: colors.foreground }]}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Key Scripture */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Key Scripture</Text>
            <TouchableOpacity>
              <Text style={[styles.viewAll, { color: colors.primary }]}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.scriptureCard, { backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }]}>
            <View style={styles.scriptureRef}>
              <HIcon name="book-open" size={14} color={colors.primary} />
              <Text style={[styles.scriptureRefText, { color: colors.primary }]}>
                {sermon.scripture}
              </Text>
            </View>
            <Text style={[styles.scriptureText, { color: colors.foreground }]}>
              "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."
            </Text>
          </View>

          {/* Reflection Note */}
          <View style={[styles.reflectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.reflectionHeader}>
              <View style={[styles.reflectionDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.reflectionLabel, { color: colors.mutedForeground }]}>
                REFLECTION NOTE
              </Text>
            </View>
            <Text style={[styles.reflectionText, { color: colors.foreground }]}>
              Think about the 'storms' currently in your life. How can you actively choose thanksgiving today even before the storm subsides?
            </Text>
          </View>

          {/* Description */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>About This Message</Text>
          </View>
          <Text style={[styles.descText, { color: colors.mutedForeground }]}>{sermon.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  heroContainer: { height: 240, position: "relative" },
  heroImage: { width: "100%", height: "100%" },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(10,15,40,0.5)" },
  heroHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  heroHeaderTitle: {
    flex: 1,
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
    marginHorizontal: 8,
  },
  heroHeaderActions: { flexDirection: "row", gap: 8 },
  heroBadge: {
    position: "absolute",
    bottom: 14,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "#2563EB",
  },
  heroBadgeText: { color: "#FFF", fontSize: 12, fontFamily: "Inter_500Medium" },
  content: { padding: 20 },
  sermonTitle: { fontSize: 22, fontFamily: "Inter_700Bold", lineHeight: 30, marginBottom: 10 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 20, flexWrap: "wrap" },
  metaText: { fontSize: 13, fontFamily: "Inter_400Regular" },
  dot: { width: 4, height: 4, borderRadius: 2, marginHorizontal: 2 },
  progressSection: { marginBottom: 24 },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    position: "relative",
    overflow: "visible",
    marginBottom: 6,
  },
  progressFill: { height: "100%", borderRadius: 2 },
  progressThumb: {
    position: "absolute",
    top: -5,
    marginLeft: -6,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  progressTimes: { flexDirection: "row", justifyContent: "space-between" },
  timeText: { fontSize: 12, fontFamily: "Inter_500Medium" },
  controls: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 32, marginBottom: 28 },
  controlBtn: { padding: 8 },
  playBtn: { width: 68, height: 68, borderRadius: 34, alignItems: "center", justifyContent: "center" },
  actionGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 28 },
  actionCard: {
    width: "47%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  actionLabel: { fontSize: 13, fontFamily: "Inter_500Medium" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontFamily: "Inter_700Bold" },
  viewAll: { fontSize: 14, fontFamily: "Inter_500Medium" },
  scriptureCard: { borderRadius: 14, padding: 16, borderWidth: 1, marginBottom: 16, gap: 10 },
  scriptureRef: { flexDirection: "row", alignItems: "center", gap: 6 },
  scriptureRefText: { fontSize: 13, fontFamily: "Inter_700Bold", letterSpacing: 0.5 },
  scriptureText: { fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 22, fontStyle: "italic" },
  reflectionCard: { borderRadius: 14, padding: 16, borderWidth: 1, marginBottom: 24, gap: 8 },
  reflectionHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
  reflectionDot: { width: 8, height: 8, borderRadius: 4 },
  reflectionLabel: { fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 1.2 },
  reflectionText: { fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 22 },
  descText: { fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 22 },
});
