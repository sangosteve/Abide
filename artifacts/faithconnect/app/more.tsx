import { HIcon } from "@/components/HIcon";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
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

import { useColors } from "@/hooks/useColors";
import { userProfile } from "@/constants/mockData";

const menuItems = [
  { id: "profile", icon: "user", label: "Profile", color: "#3B82F6" },
  { id: "notifications", icon: "bell", label: "Notifications", color: "#8B5CF6" },
  { id: "prayer", icon: "message-circle", label: "Prayer Requests", color: "#10B981" },
  { id: "saved", icon: "bookmark", label: "Saved Sermons", color: "#F59E0B" },
  { id: "giving-history", icon: "heart", label: "Giving History", color: "#EF4444" },
  { id: "my-events", icon: "calendar", label: "My Events", color: "#0EA5E9" },
  { id: "settings", icon: "settings", label: "Settings", color: "#64748B" },
  { id: "about", icon: "info", label: "About Church", color: "#7C3AED" },
  { id: "contact", icon: "phone", label: "Contact Us", color: "#059669" },
];

export default function MoreScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const topPadding = Platform.OS === "web" ? 80 : insets.top + 16;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 80 }}
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
        <Text style={[styles.pageTitle, { color: colors.foreground }]}>More</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Profile Card */}
      <View style={[styles.profileCard, { backgroundColor: colors.primary }]}>
        <Image source={{ uri: userProfile.avatar }} style={styles.profileAvatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userProfile.name}</Text>
          <Text style={styles.profileEmail}>{userProfile.email}</Text>
          <Text style={styles.profileSince}>Member since {userProfile.memberSince}</Text>
        </View>
        <TouchableOpacity style={styles.editBtn}>
          <HIcon name="edit" size={16} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsRow}>
        {[
          { label: "Sermons", value: "24" },
          { label: "Events", value: "8" },
          { label: "Given", value: "$340" },
        ].map((stat) => (
          <View key={stat.label} style={[styles.statItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statValue, { color: colors.foreground }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Menu Items */}
      <View style={[styles.menuSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {menuItems.map((item, idx) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              idx < menuItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
            ]}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            activeOpacity={0.7}
          >
            <View style={[styles.menuIconBox, { backgroundColor: `${item.color}18` }]}>
              <HIcon name={item.icon as any} size={18} color={item.color} />
            </View>
            <Text style={[styles.menuLabel, { color: colors.foreground }]}>{item.label}</Text>
            <HIcon name="chevron-right" size={16} color={colors.mutedForeground} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Media Gallery */}
      <TouchableOpacity
        style={[styles.mediaButton, { backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }]}
        onPress={() => router.push("/media")}
      >
        <HIcon name="image" size={18} color={colors.primary} />
        <Text style={[styles.mediaButtonText, { color: colors.primary }]}>Media Gallery</Text>
        <HIcon name="arrow-right" size={16} color={colors.primary} />
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        style={[styles.logoutBtn, { backgroundColor: "#FEF2F2", borderColor: "#FECACA" }]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          router.replace("/");
        }}
      >
        <HIcon name="logout" size={18} color="#EF4444" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Version */}
      <Text style={[styles.versionText, { color: colors.mutedForeground }]}>
        FaithConnect v1.0.0
      </Text>
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
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 18,
    gap: 14,
    marginBottom: 16,
  },
  profileAvatar: { width: 56, height: 56, borderRadius: 28, borderWidth: 2, borderColor: "rgba(255,255,255,0.4)" },
  profileInfo: { flex: 1 },
  profileName: { color: "#FFF", fontSize: 18, fontFamily: "Inter_700Bold" },
  profileEmail: { color: "rgba(255,255,255,0.8)", fontSize: 13, fontFamily: "Inter_400Regular" },
  profileSince: { color: "rgba(255,255,255,0.65)", fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 },
  editBtn: { padding: 8 },
  statsRow: { flexDirection: "row", gap: 10, paddingHorizontal: 20, marginBottom: 20 },
  statItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  statValue: { fontSize: 20, fontFamily: "Inter_700Bold" },
  statLabel: { fontSize: 12, fontFamily: "Inter_400Regular" },
  menuSection: {
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  menuIconBox: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  menuLabel: { flex: 1, fontSize: 15, fontFamily: "Inter_500Medium" },
  mediaButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  mediaButtonText: { flex: 1, fontSize: 15, fontFamily: "Inter_600SemiBold" },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  logoutText: { color: "#EF4444", fontSize: 15, fontFamily: "Inter_600SemiBold" },
  versionText: { textAlign: "center", fontSize: 12, fontFamily: "Inter_400Regular", marginBottom: 16 },
});
