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
import { upcomingEvents } from "@/constants/mockData";

const categories = ["All", "Worship", "Youth", "Community", "Kids"];

const grouped: Record<string, typeof upcomingEvents> = {
  "OCTOBER 2023": upcomingEvents.filter((e) => e.month === "OCT"),
  "NOVEMBER 2023": upcomingEvents.filter((e) => e.month === "NOV"),
};

export default function EventsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const topPadding = Platform.OS === "web" ? 80 : insets.top + 16;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPadding }]}>
        <Text style={[styles.pageTitle, { color: colors.foreground }]}>Events</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.muted }]}>
            <HIcon name="calendar" size={20} color={colors.foreground} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.muted }]}>
            <HIcon name="filter" size={20} color={colors.foreground} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchBar, { backgroundColor: colors.muted }]}>
        <HIcon name="search" size={16} color={colors.mutedForeground} />
        <Text style={[styles.searchPlaceholder, { color: colors.mutedForeground }]}>
          Search events, workshops...
        </Text>
      </View>

      {/* Category Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterChip,
              activeCategory === cat
                ? { backgroundColor: colors.primary }
                : { backgroundColor: colors.muted },
            ]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text
              style={[
                styles.filterChipText,
                { color: activeCategory === cat ? "#FFF" : colors.mutedForeground },
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Grouped Events */}
      {Object.entries(grouped).map(([month, events]) => (
        <View key={month}>
          <Text style={[styles.monthLabel, { color: colors.mutedForeground }]}>{month}</Text>
          {events.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={[styles.eventCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push(`/event/${event.id}`)}
              activeOpacity={0.85}
            >
              <View style={[styles.dateBlock, { backgroundColor: colors.primary }]}>
                <Text style={styles.dateMonth}>{event.month}</Text>
                <Text style={styles.dateDay}>{event.day}</Text>
              </View>
              <View style={styles.eventInfo}>
                <Text style={[styles.eventCategory, { color: colors.mutedForeground }]}>
                  {event.category}
                </Text>
                <Text style={[styles.eventTitle, { color: colors.foreground }]} numberOfLines={1}>
                  {event.title}
                </Text>
                <View style={styles.metaRow}>
                  <HIcon name="clock" size={12} color={colors.mutedForeground} />
                  <Text style={[styles.metaText, { color: colors.mutedForeground }]}>
                    {event.time}
                  </Text>
                </View>
                <View style={styles.metaRow}>
                  <HIcon name="map-pin" size={12} color={colors.mutedForeground} />
                  <Text style={[styles.metaText, { color: colors.mutedForeground }]}>
                    {event.venue}
                  </Text>
                </View>
              </View>
              <Image
                source={{ uri: event.image }}
                style={styles.eventThumb}
              />
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={[styles.footerIcon, { backgroundColor: colors.muted }]}>
          <HIcon name="calendar" size={28} color={colors.mutedForeground} />
        </View>
        <Text style={[styles.footerText, { color: colors.mutedForeground }]}>
          Checking for more events...
        </Text>
        <Text style={[styles.footerSub, { color: colors.mutedForeground }]}>
          New gatherings are posted weekly. Stay connected!
        </Text>
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
  headerActions: { flexDirection: "row", gap: 8 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 14,
  },
  searchPlaceholder: { fontSize: 14, fontFamily: "Inter_400Regular" },
  filterRow: { paddingHorizontal: 20, gap: 8, paddingBottom: 16 },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterChipText: { fontSize: 14, fontFamily: "Inter_500Medium" },
  monthLabel: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontSize: 12,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  eventCard: {
    flexDirection: "row",
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    gap: 12,
    alignItems: "center",
  },
  dateBlock: {
    width: 52,
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dateMonth: { color: "#FFF", fontSize: 10, fontFamily: "Inter_700Bold", letterSpacing: 1 },
  dateDay: { color: "#FFF", fontSize: 24, fontFamily: "Inter_700Bold" },
  eventInfo: { flex: 1, gap: 3 },
  eventCategory: { fontSize: 11, fontFamily: "Inter_500Medium" },
  eventTitle: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 12, fontFamily: "Inter_400Regular" },
  eventThumb: { width: 64, height: 64, borderRadius: 10 },
  footer: { alignItems: "center", paddingVertical: 32, gap: 8 },
  footerIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  footerText: { fontSize: 15, fontFamily: "Inter_500Medium" },
  footerSub: { fontSize: 13, fontFamily: "Inter_400Regular", textAlign: "center", maxWidth: 240 },
});
