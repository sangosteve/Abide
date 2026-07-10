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
import { useQuery } from "@tanstack/react-query";
import { fetchDiscussions } from "@/services/api";
import { ActivityIndicator } from "react-native";
import type { CommunityPost } from "@/types";

const tabs = ["Discussions", "Prayer Wall", "Groups"];

const tagColors: Record<string, { bg: string; text: string }> = {
  Testimony: { bg: "#FFF7ED", text: "#C2410C" },
  "Prayer Request": { bg: "#F0FDF4", text: "#166534" },
  Announcement: { bg: "#EFF6FF", text: "#1D4ED8" },
  Question: { bg: "#FAF5FF", text: "#7E22CE" },
};

export default function CommunityScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Discussions");
  const [likedIds, setLikedIds] = useState(new Set<string>());
  
  const { data: generalPosts = [], isLoading: loadingGeneral } = useQuery({ queryKey: ["discussions", "general"], queryFn: () => fetchDiscussions("general") });
  const { data: prayerPosts = [], isLoading: loadingPrayer } = useQuery({ queryKey: ["discussions", "prayer_request"], queryFn: () => fetchDiscussions("prayer_request") });
  const { data: announcementPosts = [], isLoading: loadingAnnouncements } = useQuery({ queryKey: ["discussions", "announcement"], queryFn: () => fetchDiscussions("announcement") });
  
  const posts = activeTab === "Discussions" ? generalPosts : activeTab === "Prayer Wall" ? prayerPosts : announcementPosts;
  const isLoading = activeTab === "Discussions" ? loadingGeneral : activeTab === "Prayer Wall" ? loadingPrayer : loadingAnnouncements;

  const topPadding = Platform.OS === "web" ? 80 : insets.top + 16;

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  
  const displayPosts = posts.map(p => ({
    ...p,
    isLiked: likedIds.has(p.id),
    likes: p.likes + (likedIds.has(p.id) ? 1 : 0)
  }));

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPadding }]}>
        <Text style={[styles.pageTitle, { color: colors.foreground }]}>Community</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.iconBtn, { backgroundColor: colors.muted }]}
            onPress={() => router.push("/more")}
          >
            <Image source={{ uri: "https://i.pravatar.cc/150?img=47" }} style={styles.avatarSmall} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabRow}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabBtn,
              activeTab === tab && [styles.activeTabBtn, { borderBottomColor: colors.primary }],
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === tab ? colors.primary : colors.mutedForeground,
                  fontFamily: activeTab === tab ? "Inter_600SemiBold" : "Inter_400Regular",
                },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Post Composer */}
      <View style={[styles.composer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Image source={{ uri: "https://i.pravatar.cc/150?img=47" }} style={styles.composerAvatar} />
        <View style={[styles.composerInput, { backgroundColor: colors.muted }]}>
          <Text style={[styles.composerPlaceholder, { color: colors.mutedForeground }]}>
            What's on your heart today?
          </Text>
        </View>
      </View>
      <View style={[styles.composerActions, { borderColor: colors.border }]}>
        <View style={styles.composerIcons}>
          <TouchableOpacity style={styles.composerIconBtn}>
            <HIcon name="image" size={20} color={colors.mutedForeground} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.composerIconBtn}>
            <HIcon name="smile" size={20} color={colors.mutedForeground} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.composerIconBtn}>
            <HIcon name="map-pin" size={20} color={colors.mutedForeground} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.postBtn, { backgroundColor: colors.primary }]}>
          <Text style={styles.postBtnText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Activity Label */}
      <Text style={[styles.activityLabel, { color: colors.mutedForeground }]}>RECENT ACTIVITY</Text>

      {/* Posts */}
      {isLoading ? (
        <ActivityIndicator color={colors.primary} style={{ marginVertical: 20 }} />
      ) : (
        displayPosts.map((post) => {
          const tagStyle = tagColors[post.tag] ?? { bg: colors.muted, text: colors.mutedForeground };
          return (
            <View
              key={post.id}
              style={[styles.postCard, { backgroundColor: colors.background, borderBottomColor: colors.border }]}
            >
              <View style={styles.postHeader}>
                <Image source={{ uri: post.avatar }} style={styles.postAvatar} />
                <View style={styles.postMeta}>
                  <View style={styles.authorRow}>
                    <Text style={[styles.authorName, { color: colors.foreground }]}>
                      {post.author}
                    </Text>
                    {post.role && (
                      <View style={[styles.roleBadge, { backgroundColor: "#EFF6FF" }]}>
                        <Text style={[styles.roleText, { color: colors.primary }]}>{post.role}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.postTime, { color: colors.mutedForeground }]}>
                    {post.timeAgo}
                  </Text>
                </View>
                <TouchableOpacity>
                  <HIcon name="more-horizontal" size={18} color={colors.mutedForeground} />
                </TouchableOpacity>
              </View>

              <View style={[styles.tagBadge, { backgroundColor: tagStyle.bg }]}>
                <Text style={[styles.tagText, { color: tagStyle.text }]}>{post.tag}</Text>
              </View>

              <Text style={[styles.postContent, { color: colors.foreground }]}>{post.content}</Text>

              <View style={styles.postFooter}>
                <View style={styles.postReactions}>
                  <TouchableOpacity
                    style={styles.reactionBtn}
                    onPress={() => toggleLike(post.id)}
                  >
                    <HIcon
                      name="heart"
                      size={16}
                      color={post.isLiked ? "#EF4444" : colors.mutedForeground}
                    />
                    <Text style={[styles.reactionCount, { color: post.isLiked ? "#EF4444" : colors.mutedForeground }]}>
                      {post.likes}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.reactionBtn}>
                    <HIcon name="message-circle" size={16} color={colors.mutedForeground} />
                    <Text style={[styles.reactionCount, { color: colors.mutedForeground }]}>
                      {post.comments}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.shareBtn}>
                  <HIcon name="share" size={16} color={colors.mutedForeground} />
                  <Text style={[styles.shareText, { color: colors.mutedForeground }]}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      )}

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
      >
        <HIcon name="plus" size={24} color="#FFF" />
      </TouchableOpacity>
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
  pageTitle: { fontSize: 28, fontFamily: "Inter_700Bold" },
  headerActions: { flexDirection: "row", gap: 8 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  avatarSmall: { width: 36, height: 36, borderRadius: 18 },
  tabRow: { paddingHorizontal: 20, gap: 0, borderBottomWidth: 1 },
  tabBtn: { paddingVertical: 12, paddingHorizontal: 4, marginRight: 24, borderBottomWidth: 2, borderBottomColor: "transparent" },
  activeTabBtn: {},
  tabText: { fontSize: 15 },
  composer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderBottomWidth: 0,
    marginTop: 12,
    marginHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  composerAvatar: { width: 36, height: 36, borderRadius: 18 },
  composerInput: { flex: 1, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20 },
  composerPlaceholder: { fontSize: 14, fontFamily: "Inter_400Regular" },
  composerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginBottom: 4,
  },
  composerIcons: { flexDirection: "row", gap: 16 },
  composerIconBtn: { padding: 4 },
  postBtn: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  postBtnText: { color: "#FFF", fontSize: 14, fontFamily: "Inter_600SemiBold" },
  activityLabel: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 1.5,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  postCard: { paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1 },
  postHeader: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 10 },
  postAvatar: { width: 40, height: 40, borderRadius: 20 },
  postMeta: { flex: 1 },
  authorRow: { flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" },
  authorName: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
  roleBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  roleText: { fontSize: 11, fontFamily: "Inter_500Medium" },
  postTime: { fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 },
  tagBadge: { alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, marginBottom: 10 },
  tagText: { fontSize: 12, fontFamily: "Inter_500Medium" },
  postContent: { fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 22, marginBottom: 14 },
  postFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  postReactions: { flexDirection: "row", gap: 16 },
  reactionBtn: { flexDirection: "row", alignItems: "center", gap: 5 },
  reactionCount: { fontSize: 14, fontFamily: "Inter_500Medium" },
  shareBtn: { flexDirection: "row", alignItems: "center", gap: 5 },
  shareText: { fontSize: 14, fontFamily: "Inter_400Regular" },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});
