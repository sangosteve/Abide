import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HIcon } from "@/components/HIcon";
import { ScriptureCard } from "@/components/bible-study/ScriptureCard";
import { ReflectionQuestionCard } from "@/components/bible-study/ReflectionQuestionCard";
import { PrayerPointCard } from "@/components/bible-study/PrayerPointCard";
import { NotesEditor } from "@/components/bible-study/NotesEditor";
import { PrimaryButton } from "@/components/bible-study/PrimaryButton";
import { useBibleStudy } from "@/components/bible-study/BibleStudyContext";
import { useColors } from "@/hooks/useColors";
import { getLessonById, getNextLesson, getLessonIndex } from "@/constants/bibleStudyMockData";

export default function LessonDetailScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { getLessonStatus, markLessonComplete, saveNote, lessonNotes, lessonNotesSavedAt } =
    useBibleStudy();

  const lesson = getLessonById(id as string);
  const nextLesson = lesson ? getNextLesson(lesson.id) : undefined;
  const lessonIndex = lesson ? getLessonIndex(lesson.id) : 0;

  const topPadding = Platform.OS === "web" ? 60 : insets.top + 12;

  const [noteText, setNoteText] = useState(lessonNotes[id as string] ?? "");

  if (!lesson) {
    return (
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.foreground, textAlign: "center", marginTop: 100 }}>
          Lesson not found.
        </Text>
      </View>
    );
  }

  const status = getLessonStatus(lesson.id, lesson.defaultStatus);
  const isCompleted = status === "completed";

  // Show saved timestamp whenever notes are unchanged vs the last saved version
  const hasUnsavedChanges = noteText !== (lessonNotes[lesson.id] ?? "");

  function handleSaveNote() {
    if (!lesson) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    saveNote(lesson.id, noteText);
  }

  function handleMarkComplete() {
    if (!lesson) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    markLessonComplete(lesson.id);
    if (nextLesson) {
      Alert.alert(
        "Lesson Complete! 🎉",
        `Great work on "${lesson.shortTitle}". Ready to continue to the next session?`,
        [
          { text: "Not Yet", style: "cancel" },
          {
            text: "Next Session →",
            onPress: () => router.replace(`/bible-study/lesson/${nextLesson.id}`),
          },
        ]
      );
    } else {
      Alert.alert(
        "Series Complete! 🎉",
        "You've completed the entire series. That's a big deal!",
        [{ text: "Back to Study", onPress: () => router.back() }]
      );
    }
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 48 }}
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
          <View style={styles.headerCenter}>
            <Text style={[styles.seriesLabel, { color: colors.primary }]}>
              {lesson.seriesTitle}
            </Text>
          </View>
          <TouchableOpacity style={[styles.shareIconBtn, { backgroundColor: colors.muted }]}>
            <HIcon name="share" size={18} color={colors.foreground} />
          </TouchableOpacity>
        </View>

        {/* Session Badge */}
        <View style={styles.sessionBadgeRow}>
          <View style={[styles.sessionBadge, { backgroundColor: "#EFF6FF" }]}>
            <Text style={[styles.sessionBadgeText, { color: colors.primary }]}>
              Session {lessonIndex + 1} of 6
            </Text>
          </View>
          {isCompleted && (
            <View style={styles.completedBadge}>
              <HIcon name="check" size={12} color="#059669" />
              <Text style={styles.completedBadgeText}>Completed</Text>
            </View>
          )}
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={[styles.lessonTitle, { color: colors.foreground }]}>
            {lesson.shortTitle}
          </Text>
          <View style={styles.metaRow}>
            <HIcon name="clock" size={14} color={colors.mutedForeground} />
            <Text style={[styles.metaText, { color: colors.mutedForeground }]}>
              {lesson.duration} read
            </Text>
            <View style={[styles.metaDot, { backgroundColor: colors.mutedForeground }]} />
            <Text style={[styles.metaText, { color: colors.mutedForeground }]}>
              {lesson.date}
            </Text>
          </View>
        </View>

        <View style={styles.contentArea}>
          {/* Scripture */}
          <SectionLabel label="Scripture" icon="book-open" colors={colors} />
          <ScriptureCard
            reference={lesson.scripture.reference}
            text={lesson.scripture.text}
          />

          {/* Key Thought */}
          <SectionLabel label="Key Thought" icon="zap" colors={colors} />
          <View style={[styles.keyThoughtCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.keyThoughtText, { color: colors.foreground }]}>
              {lesson.keyThought}
            </Text>
          </View>

          {/* Teaching Notes */}
          <SectionLabel label="Teaching Notes" icon="file-text" colors={colors} />
          <View style={[styles.notesCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {lesson.teachingNotes.split("\n\n").map((para, i) => (
              <Text
                key={i}
                style={[styles.teachingPara, { color: colors.foreground }, i > 0 && { marginTop: 12 }]}
              >
                {para}
              </Text>
            ))}
          </View>

          {/* Reflection Questions */}
          <SectionLabel label="Reflection Questions" icon="message-circle" colors={colors} />
          {lesson.reflectionQuestions.map((q, i) => (
            <ReflectionQuestionCard key={i} question={q} index={i} />
          ))}

          {/* Prayer Point */}
          <SectionLabel label="Prayer" icon="star" colors={colors} />
          <PrayerPointCard text={lesson.prayerPoint} />

          {/* Notes Editor */}
          <SectionLabel label="Your Notes" icon="edit" colors={colors} />
          <NotesEditor
            value={noteText}
            onChange={setNoteText}
            onSave={handleSaveNote}
            savedAt={hasUnsavedChanges ? undefined : lessonNotesSavedAt[lesson.id]}
          />

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            {!isCompleted ? (
              <PrimaryButton
                label="Mark as Complete"
                onPress={handleMarkComplete}
                icon={<HIcon name="check" size={16} color="#FFF" />}
              />
            ) : (
              <PrimaryButton
                label="Session Completed"
                onPress={() => {}}
                variant="success"
                disabled
                icon={<HIcon name="check" size={16} color="#FFF" />}
              />
            )}

            {nextLesson && (
              <PrimaryButton
                label={`Continue → ${nextLesson.shortTitle}`}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push(`/bible-study/lesson/${nextLesson.id}`);
                }}
                variant="outline"
              />
            )}

            {!nextLesson && isCompleted && (
              <PrimaryButton
                label="Back to Study Plan"
                onPress={() => router.back()}
                variant="outline"
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function SectionLabel({
  label,
  icon,
  colors,
}: {
  label: string;
  icon: string;
  colors: ReturnType<typeof import("@/hooks/useColors").useColors>;
}) {
  return (
    <View style={sectionStyles.row}>
      <View style={[sectionStyles.iconWrap, { backgroundColor: "#EFF6FF" }]}>
        <HIcon name={icon as any} size={14} color={colors.primary} />
      </View>
      <Text style={[sectionStyles.label, { color: colors.foreground }]}>{label}</Text>
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  iconWrap: { width: 26, height: 26, borderRadius: 7, alignItems: "center", justifyContent: "center" },
  label: { fontSize: 16, fontFamily: "Inter_700Bold" },
});

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
  },
  backBtn: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center" },
  shareIconBtn: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center" },
  headerCenter: { flex: 1, alignItems: "center" },
  seriesLabel: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  sessionBadgeRow: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 20, marginBottom: 8 },
  sessionBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  sessionBadgeText: { fontSize: 12, fontFamily: "Inter_600SemiBold" },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  completedBadgeText: { fontSize: 12, fontFamily: "Inter_600SemiBold", color: "#059669" },
  titleSection: { paddingHorizontal: 20, gap: 8, marginBottom: 4 },
  lessonTitle: { fontSize: 26, fontFamily: "Inter_700Bold", lineHeight: 34 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  metaText: { fontSize: 13, fontFamily: "Inter_400Regular" },
  metaDot: { width: 3, height: 3, borderRadius: 1.5 },
  contentArea: { paddingHorizontal: 20, gap: 16 },
  keyThoughtCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  keyThoughtText: { fontSize: 15, fontFamily: "Inter_500Medium", lineHeight: 24, fontStyle: "italic" },
  notesCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  teachingPara: { fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 23 },
  actionSection: { gap: 10, marginTop: 8 },
});
