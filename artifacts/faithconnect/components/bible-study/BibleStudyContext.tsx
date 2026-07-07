import React, { createContext, useCallback, useContext, useState } from "react";

interface BibleStudyContextType {
  completedLessons: string[];
  lessonNotes: Record<string, string>;
  lessonNotesSavedAt: Record<string, number>;
  markLessonComplete: (lessonId: string) => void;
  saveNote: (lessonId: string, note: string) => void;
  getLessonStatus: (
    lessonId: string,
    defaultStatus: "completed" | "resume" | "start"
  ) => "completed" | "resume" | "start";
  getCompletedCount: (lessonIds: string[]) => number;
}

const BibleStudyContext = createContext<BibleStudyContextType | null>(null);

export function BibleStudyProvider({ children }: { children: React.ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<string[]>(["proverbs-1"]);
  const [lessonNotes, setLessonNotes] = useState<Record<string, string>>({});
  const [lessonNotesSavedAt, setLessonNotesSavedAt] = useState<Record<string, number>>({});

  const markLessonComplete = useCallback((lessonId: string) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId) ? prev : [...prev, lessonId]
    );
  }, []);

  const saveNote = useCallback((lessonId: string, note: string) => {
    setLessonNotes((prev) => ({ ...prev, [lessonId]: note }));
    setLessonNotesSavedAt((prev) => ({ ...prev, [lessonId]: Date.now() }));
  }, []);

  const getLessonStatus = useCallback(
    (lessonId: string, defaultStatus: "completed" | "resume" | "start") => {
      if (completedLessons.includes(lessonId)) return "completed";
      return defaultStatus;
    },
    [completedLessons]
  );

  const getCompletedCount = useCallback(
    (lessonIds: string[]) =>
      lessonIds.filter((id) => completedLessons.includes(id)).length,
    [completedLessons]
  );

  return (
    <BibleStudyContext.Provider
      value={{
        completedLessons,
        lessonNotes,
        lessonNotesSavedAt,
        markLessonComplete,
        saveNote,
        getLessonStatus,
        getCompletedCount,
      }}
    >
      {children}
    </BibleStudyContext.Provider>
  );
}

export function useBibleStudy() {
  const ctx = useContext(BibleStudyContext);
  if (!ctx) throw new Error("useBibleStudy must be used within BibleStudyProvider");
  return ctx;
}
