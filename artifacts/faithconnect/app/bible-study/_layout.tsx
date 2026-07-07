import { Stack } from "expo-router";
import { BibleStudyProvider } from "@/components/bible-study/BibleStudyContext";

export default function BibleStudyLayout() {
  return (
    <BibleStudyProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </BibleStudyProvider>
  );
}
