import { HIcon } from "@/components/HIcon";
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

const mediaAlbums = [
  { id: "1", title: "Missions 2023", updatedAt: "2 days ago", coverImage: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400" },
  { id: "2", title: "Youth Camp", updatedAt: "2 days ago", coverImage: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=400" },
  { id: "3", title: "Easter Service", updatedAt: "2 days ago", coverImage: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=400" },
];

const recentVideos = [
  { id: "1", title: "Sunday Morning Worship: Finding Peace", date: "Mar 22, 2024", duration: "45:30", thumbnail: "https://images.unsplash.com/photo-1429514513361-8a632ff5f2ba?w=400" },
  { id: "2", title: "Mid-week Prayer & Strength", date: "Mar 18, 2024", duration: "28:15", thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400" },
];

const photoMemories = [
  { id: "1", title: "Community Picnic", date: "MAY 2023", image: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=400", isFeature: true },
  { id: "2", title: "Small Group Study", date: "APR 2023", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400" },
  { id: "3", title: "Volunteer Day", date: "MAR 2023", image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400" },
  { id: "4", title: "Worship Night", date: "MAR 2023", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400" },
];

const tabs = ["All", "Photos", "Videos", "Albums"];

export default function MediaScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");
  const topPadding = Platform.OS === "web" ? 80 : insets.top + 16;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
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
        <Text style={[styles.pageTitle, { color: colors.foreground }]}>Media Gallery</Text>
        <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.muted }]}>
          <HIcon name="more-vertical" size={20} color={colors.foreground} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.filterChip,
              activeTab === tab
                ? { backgroundColor: colors.primary }
                : { backgroundColor: colors.muted },
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.filterChipText,
                { color: activeTab === tab ? "#FFF" : colors.mutedForeground },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Featured Album */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.featuredAlbum} activeOpacity={0.9}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800" }}
            style={styles.featuredAlbumImage}
            resizeMode="cover"
          />
          <View style={styles.featuredAlbumOverlay} />
          <View style={styles.featuredAlbumBadge}>
            <Text style={styles.featuredAlbumBadgeText}>154 Photos</Text>
          </View>
          <View style={styles.featuredAlbumContent}>
            <Text style={styles.featuredAlbumTitle}>Annual Church Retreat 2023</Text>
            <Text style={styles.featuredAlbumTheme}>Theme: Anchored in Faith & Purpose</Text>
          </View>
          <TouchableOpacity style={[styles.viewAlbumBtn, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
            <Text style={styles.viewAlbumBtnText}>View Album</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {/* Recent Videos */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Recent Videos</Text>
        <TouchableOpacity>
          <Text style={[styles.viewAll, { color: colors.primary }]}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {recentVideos.map((video) => (
          <TouchableOpacity key={video.id} style={styles.videoCard} activeOpacity={0.85}>
            <Image source={{ uri: video.thumbnail }} style={styles.videoThumb} resizeMode="cover" />
            <View style={styles.videoOverlay} />
            <View style={styles.playIconBg}>
              <HIcon name="play" size={18} color="#FFF" />
            </View>
            <View style={styles.videoDurationBadge}>
              <Text style={styles.videoDurationText}>{video.duration}</Text>
            </View>
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
              <Text style={styles.videoDate}>{video.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Photo Memories */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Photo Memories</Text>
        <TouchableOpacity>
          <Text style={[styles.viewAll, { color: colors.primary }]}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.photoGrid}>
        {photoMemories.map((photo) => (
          <TouchableOpacity key={photo.id} style={[styles.photoItem, photo.isFeature && styles.photoItemFeatured]} activeOpacity={0.85}>
            <Image source={{ uri: photo.image }} style={styles.photoImage} resizeMode="cover" />
            <View style={styles.photoOverlay} />
            <View style={styles.photoContent}>
              <Text style={styles.photoDate}>{photo.date}</Text>
              <Text style={styles.photoTitle}>{photo.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Explore Albums */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Explore Albums</Text>
      </View>
      <View style={{ paddingHorizontal: 20, gap: 2 }}>
        {mediaAlbums.map((album, idx) => (
          <TouchableOpacity
            key={album.id}
            style={[
              styles.albumRow,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderTopLeftRadius: idx === 0 ? 14 : 0,
                borderTopRightRadius: idx === 0 ? 14 : 0,
                borderBottomLeftRadius: idx === mediaAlbums.length - 1 ? 14 : 0,
                borderBottomRightRadius: idx === mediaAlbums.length - 1 ? 14 : 0,
              },
            ]}
            activeOpacity={0.85}
          >
            <View style={[styles.albumIconBox, { backgroundColor: "#EFF6FF" }]}>
              <HIcon name="image" size={18} color={colors.primary} />
            </View>
            <View style={styles.albumInfo}>
              <Text style={[styles.albumTitle, { color: colors.foreground }]}>{album.title}</Text>
              <Text style={[styles.albumUpdated, { color: colors.mutedForeground }]}>
                Updated {album.updatedAt}
              </Text>
            </View>
            <HIcon name="chevron-right" size={18} color={colors.mutedForeground} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  pageTitle: { fontSize: 20, fontFamily: "Inter_700Bold" },
  iconBtn: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  filterRow: { paddingHorizontal: 20, gap: 8, paddingBottom: 16 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  filterChipText: { fontSize: 14, fontFamily: "Inter_500Medium" },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontFamily: "Inter_700Bold" },
  viewAll: { fontSize: 14, fontFamily: "Inter_500Medium" },
  featuredAlbum: { borderRadius: 16, overflow: "hidden", height: 180, position: "relative" },
  featuredAlbumImage: { width: "100%", height: "100%" },
  featuredAlbumOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(10,15,40,0.55)" },
  featuredAlbumBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  featuredAlbumBadgeText: { color: "#FFF", fontSize: 11, fontFamily: "Inter_500Medium" },
  featuredAlbumContent: { position: "absolute", top: 12, left: 12, right: 80 },
  featuredAlbumTitle: { color: "#FFF", fontSize: 18, fontFamily: "Inter_700Bold", marginBottom: 4 },
  featuredAlbumTheme: { color: "rgba(255,255,255,0.75)", fontSize: 12, fontFamily: "Inter_400Regular" },
  viewAlbumBtn: {
    position: "absolute",
    bottom: 14,
    left: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  viewAlbumBtnText: { color: "#FFF", fontSize: 13, fontFamily: "Inter_500Medium" },
  horizontalScroll: { paddingHorizontal: 20, gap: 12, paddingBottom: 4 },
  videoCard: { width: 200, borderRadius: 12, overflow: "hidden", position: "relative" },
  videoThumb: { width: "100%", height: 120 },
  videoOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.3)" },
  playIconBg: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -20,
    marginLeft: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  videoDurationBadge: {
    position: "absolute",
    bottom: 52,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  videoDurationText: { color: "#FFF", fontSize: 10, fontFamily: "Inter_500Medium" },
  videoInfo: { padding: 10 },
  videoTitle: { fontSize: 13, fontFamily: "Inter_600SemiBold", color: "#0F172A", marginBottom: 4 },
  videoDate: { fontSize: 11, fontFamily: "Inter_400Regular", color: "#64748B" },
  photoGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 20, gap: 8, marginBottom: 24 },
  photoItem: { width: "47%", height: 120, borderRadius: 12, overflow: "hidden", position: "relative" },
  photoItemFeatured: { width: "47%" },
  photoImage: { width: "100%", height: "100%" },
  photoOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(10,15,40,0.4)" },
  photoContent: { position: "absolute", bottom: 8, left: 8, right: 8 },
  photoDate: { color: "rgba(255,255,255,0.7)", fontSize: 9, fontFamily: "Inter_600SemiBold", letterSpacing: 1 },
  photoTitle: { color: "#FFF", fontSize: 12, fontFamily: "Inter_600SemiBold" },
  albumRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderWidth: 1,
    marginBottom: 1,
  },
  albumIconBox: { width: 40, height: 40, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  albumInfo: { flex: 1 },
  albumTitle: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
  albumUpdated: { fontSize: 12, fontFamily: "Inter_400Regular" },
});
