import { Feather } from "@expo/vector-icons";
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

import { useColors } from "@/hooks/useColors";
import { upcomingEvents } from "@/constants/mockData";

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const event = upcomingEvents.find((e) => e.id === id) ?? upcomingEvents[0];
  const topPadding = Platform.OS === "web" ? 60 : insets.top;

  const categoryColor = "#2563EB";

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <Image source={{ uri: event.image }} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.heroOverlay} />
          <TouchableOpacity
            style={[styles.backBtn, { top: topPadding + 12, backgroundColor: "rgba(0,0,0,0.4)" }]}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={20} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.shareBtn, { top: topPadding + 12, backgroundColor: "rgba(0,0,0,0.4)" }]}
          >
            <Feather name="share-2" size={18} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.heroContent}>
            <View style={[styles.catBadge, { backgroundColor: categoryColor }]}>
              <Text style={styles.catBadgeText}>{event.category}</Text>
            </View>
            <Text style={styles.heroTitle}>{event.title}</Text>
          </View>
        </View>

        {/* Info Card */}
        <View style={[styles.infoCard, { backgroundColor: colors.background, shadowColor: "#000" }]}>
          {/* Date */}
          <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
            <View style={[styles.infoIcon, { backgroundColor: "#EFF6FF" }]}>
              <Feather name="calendar" size={18} color={colors.primary} />
            </View>
            <View style={styles.infoText}>
              <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>DATE</Text>
              <Text style={[styles.infoValue, { color: colors.foreground }]}>{event.date}</Text>
            </View>
          </View>
          {/* Time */}
          <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
            <View style={[styles.infoIcon, { backgroundColor: "#EFF6FF" }]}>
              <Feather name="clock" size={18} color={colors.primary} />
            </View>
            <View style={styles.infoText}>
              <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>TIME</Text>
              <Text style={[styles.infoValue, { color: colors.foreground }]}>{event.time}</Text>
            </View>
          </View>
          {/* Venue */}
          <View style={[styles.infoRow, { borderBottomColor: "transparent" }]}>
            <View style={[styles.infoIcon, { backgroundColor: "#EFF6FF" }]}>
              <Feather name="map-pin" size={18} color={colors.primary} />
            </View>
            <View style={styles.infoText}>
              <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>VENUE</Text>
              <Text style={[styles.infoValue, { color: colors.foreground }]}>{event.venue}</Text>
              <TouchableOpacity>
                <Text style={[styles.getDir, { color: colors.primary }]}>Get Directions ↗</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Speaker */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="user" size={18} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Guest Speakers</Text>
          </View>
          <View style={[styles.speakerCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=68" }}
              style={styles.speakerAvatar}
            />
            <View style={styles.speakerInfo}>
              <Text style={[styles.speakerName, { color: colors.foreground }]}>{event.host}</Text>
              <Text style={[styles.speakerRole, { color: colors.mutedForeground }]}>
                Lead Pastor at Grace Global with a passion for revival and community transformation.
              </Text>
            </View>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="info" size={18} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>About the Event</Text>
          </View>
          <Text style={[styles.descText, { color: colors.foreground }]}>{event.description}</Text>
          <View style={{ marginTop: 16, gap: 12 }}>
            {[
              { icon: "check-circle", title: "Open to All Ages", desc: "Childcare provided for ages 0-5." },
              { icon: "check-circle", title: "Free Parking", desc: "Available in the North and South lots." },
              { icon: "check-circle", title: "Refreshments", desc: "Light snacks and coffee served after service." },
            ].map((item) => (
              <View key={item.title} style={styles.featureRow}>
                <Feather name={item.icon as any} size={16} color={colors.success} />
                <View style={styles.featureText}>
                  <Text style={[styles.featureTitle, { color: colors.foreground }]}>{item.title}</Text>
                  <Text style={[styles.featureDesc, { color: colors.mutedForeground }]}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Location Map Placeholder */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Location</Text>
          <View style={[styles.mapPlaceholder, { backgroundColor: colors.muted, borderColor: colors.border }]}>
            <Image
              source={{ uri: event.image }}
              style={styles.mapImage}
              resizeMode="cover"
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            paddingBottom: Platform.OS === "web" ? 34 : insets.bottom + 12,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.addCalBtn, { borderColor: colors.primary }]}
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        >
          <Text style={[styles.addCalText, { color: colors.primary }]}>Add to Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.registerBtn, { backgroundColor: colors.primary }]}
          onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}
          activeOpacity={0.85}
        >
          <Text style={styles.registerBtnText}>Register Now  →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  hero: { height: 300, position: "relative" },
  heroImage: { width: "100%", height: "100%" },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(10,15,40,0.55)" },
  backBtn: {
    position: "absolute",
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  shareBtn: {
    position: "absolute",
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  heroContent: { position: "absolute", bottom: 20, left: 16, right: 16, gap: 10 },
  catBadge: { alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  catBadgeText: { color: "#FFF", fontSize: 12, fontFamily: "Inter_600SemiBold" },
  heroTitle: { color: "#FFF", fontSize: 24, fontFamily: "Inter_700Bold", lineHeight: 32 },
  infoCard: {
    marginHorizontal: 20,
    marginTop: -24,
    borderRadius: 16,
    padding: 4,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 14,
    borderBottomWidth: 1,
  },
  infoIcon: { width: 38, height: 38, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  infoText: { flex: 1, gap: 2 },
  infoLabel: { fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1.2 },
  infoValue: { fontSize: 15, fontFamily: "Inter_500Medium" },
  getDir: { fontSize: 13, fontFamily: "Inter_500Medium", marginTop: 4 },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 },
  sectionTitle: { fontSize: 17, fontFamily: "Inter_700Bold" },
  speakerCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  speakerAvatar: { width: 44, height: 44, borderRadius: 22 },
  speakerInfo: { flex: 1 },
  speakerName: { fontSize: 15, fontFamily: "Inter_600SemiBold", marginBottom: 4 },
  speakerRole: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 20 },
  descText: { fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 22 },
  featureRow: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  featureText: { flex: 1 },
  featureTitle: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  featureDesc: { fontSize: 13, fontFamily: "Inter_400Regular" },
  mapPlaceholder: { height: 160, borderRadius: 14, overflow: "hidden", borderWidth: 1 },
  mapImage: { width: "100%", height: "100%" },
  bottomBar: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  addCalBtn: { flex: 1, paddingVertical: 14, borderRadius: 50, alignItems: "center", borderWidth: 1.5 },
  addCalText: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
  registerBtn: { flex: 1.4, paddingVertical: 14, borderRadius: 50, alignItems: "center" },
  registerBtnText: { color: "#FFF", fontSize: 15, fontFamily: "Inter_700Bold" },
});
