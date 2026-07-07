import { Feather } from "@expo/vector-icons";
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
import { sermons, featuredSeries } from "@/constants/mockData";

const filterTabs = ["All", "Series", "Topics", "Speakers"];

export default function SermonsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const topPadding = Platform.OS === "web" ? 80 : insets.top + 16;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPadding }]}>
        <Text style={[styles.pageTitle, { color: colors.foreground }]}>Sermons</Text>
        <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.muted }]}>
          <Feather name="search" size={20} color={colors.foreground} />
        </TouchableOpacity>
      </View>

      {/* Filter Chips */}
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
                ? { backgroundColor: colors.primary }
                : { backgroundColor: colors.muted },
            ]}
            onPress={() => setActiveFilter(tab)}
          >
            <Text
              style={[
                styles.filterChipText,
                { color: activeFilter === tab ? "#FFF" : colors.mutedForeground },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Current Series Card */}
      <TouchableOpacity style={styles.seriesCard} activeOpacity={0.9}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" }}
          style={styles.seriesImage}
          resizeMode="cover"
        />
        <View style={styles.seriesOverlay} />
        <View style={styles.seriesBadge}>
          <Text style={styles.seriesBadgeText}>CURRENT SERIES</Text>
        </View>
        <View style={styles.seriesPartsTag}>
          <Text style={styles.seriesPartsText}>{featuredSeries.parts} Parts</Text>
        </View>
        <View style={styles.seriesContent}>
          <Text style={styles.seriesTitle}>{featuredSeries.title}</Text>
          <Text style={styles.seriesDesc} numberOfLines={2}>
            {featuredSeries.description}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Recent Sermons */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Recent Sermons</Text>
        <TouchableOpacity>
          <Text style={[styles.viewAll, { color: colors.primary }]}>View All</Text>
        </TouchableOpacity>
      </View>

      {sermons.map((sermon) => (
        <TouchableOpacity
          key={sermon.id}
          style={[styles.sermonItem, { borderBottomColor: colors.border }]}
          onPress={() => router.push(`/sermon/${sermon.id}`)}
          activeOpacity={0.8}
        >
          <View style={styles.sermonThumbContainer}>
            <Image source={{ uri: sermon.thumbnail }} style={styles.sermonThumb} />
            <View style={styles.durationBadge}>
              <Text style={styles.durationText}>{sermon.duration}</Text>
            </View>
          </View>
          <View style={styles.sermonInfo}>
            <Text style={[styles.sermonTitle, { color: colors.foreground }]} numberOfLines={2}>
              {sermon.title}
            </Text>
            <View style={styles.sermonMeta}>
              <Feather name="user" size={12} color={colors.mutedForeground} />
              <Text style={[styles.sermonMetaText, { color: colors.mutedForeground }]}>
                {sermon.speaker}
              </Text>
            </View>
            <View style={styles.sermonBottom}>
              <Text style={[styles.sermonDate, { color: colors.mutedForeground }]}>
                {sermon.date}
              </Text>
              <View style={[styles.scriptureTag, { backgroundColor: "#EFF6FF" }]}>
                <Text style={[styles.scriptureTagText, { color: colors.primary }]}>
                  {sermon.scripture}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.sermonActions}>
            <TouchableOpacity style={styles.sermonActionBtn}>
              <Feather name="download" size={18} color={colors.mutedForeground} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sermonActionBtn}>
              <Feather name="more-vertical" size={18} color={colors.mutedForeground} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}

      {/* Bible Study CTA */}
      <View style={[styles.biblebanner, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[styles.bibleIcon, { backgroundColor: "#EFF6FF" }]}>
          <Feather name="book-open" size={24} color={colors.primary} />
        </View>
        <Text style={[styles.bibleTitle, { color: colors.foreground }]}>
          Dig Deeper Into The Word
        </Text>
        <Text style={[styles.bibleDesc, { color: colors.mutedForeground }]}>
          Access study notes and scripture references for every sermon to enrich your personal study time.
        </Text>
        <TouchableOpacity style={styles.bibleCTA}>
          <Text style={[styles.bibleCTAText, { color: colors.primary }]}>Open Bible Study</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 16,
  },
  pageTitle: { fontSize: 28, fontFamily: "Inter_700Bold" },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  filterRow: { paddingHorizontal: 20, gap: 8, paddingBottom: 16 },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterChipText: { fontSize: 14, fontFamily: "Inter_500Medium" },
  seriesCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
    height: 180,
    marginBottom: 24,
  },
  seriesImage: { width: "100%", height: "100%" },
  seriesOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10,15,40,0.65)",
  },
  seriesBadge: {
    position: "absolute",
    top: 14,
    left: 14,
  },
  seriesBadgeText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 1.5,
  },
  seriesPartsTag: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  seriesPartsText: { color: "#FFF", fontSize: 12, fontFamily: "Inter_600SemiBold" },
  seriesContent: {
    position: "absolute",
    bottom: 16,
    left: 14,
    right: 14,
  },
  seriesTitle: { color: "#FFF", fontSize: 22, fontFamily: "Inter_700Bold", marginBottom: 4 },
  seriesDesc: { color: "rgba(255,255,255,0.75)", fontSize: 13, fontFamily: "Inter_400Regular" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 18, fontFamily: "Inter_700Bold" },
  viewAll: { fontSize: 14, fontFamily: "Inter_500Medium" },
  sermonItem: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    gap: 12,
    alignItems: "flex-start",
  },
  sermonThumbContainer: { position: "relative" },
  sermonThumb: { width: 80, height: 64, borderRadius: 10 },
  durationBadge: {
    position: "absolute",
    bottom: 4,
    left: 4,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: { color: "#FFF", fontSize: 10, fontFamily: "Inter_500Medium" },
  sermonInfo: { flex: 1, gap: 4 },
  sermonTitle: { fontSize: 14, fontFamily: "Inter_600SemiBold", lineHeight: 20 },
  sermonMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  sermonMetaText: { fontSize: 12, fontFamily: "Inter_400Regular" },
  sermonBottom: { flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" },
  sermonDate: { fontSize: 12, fontFamily: "Inter_400Regular" },
  scriptureTag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  scriptureTagText: { fontSize: 11, fontFamily: "Inter_600SemiBold" },
  sermonActions: { gap: 6, alignItems: "center" },
  sermonActionBtn: { padding: 4 },
  biblebanner: {
    margin: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    gap: 8,
  },
  bibleIcon: { width: 52, height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center", marginBottom: 4 },
  bibleTitle: { fontSize: 16, fontFamily: "Inter_700Bold", textAlign: "center" },
  bibleDesc: { fontSize: 13, fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 20 },
  bibleCTA: { paddingVertical: 6 },
  bibleCTAText: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
});
