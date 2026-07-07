export interface StudyLesson {
  id: string;
  seriesId: string;
  title: string;
  shortTitle: string;
  seriesTitle: string;
  duration: string;
  date: string;
  thumbnail: string;
  defaultStatus: "completed" | "resume" | "start";
  scripture: { reference: string; text: string };
  keyThought: string;
  teachingNotes: string;
  reflectionQuestions: string[];
  prayerPoint: string;
}

export interface StudySeries {
  id: string;
  title: string;
  description: string;
  teacher: string;
  teacherTitle: string;
  teacherAvatar: string;
  image: string;
  totalSessions: number;
  lessons: StudyLesson[];
}

export const studyLessons: StudyLesson[] = [
  {
    id: "proverbs-1",
    seriesId: "proverbs-wisdom",
    title: "Session 1: The Fear of the Lord",
    shortTitle: "The Fear of the Lord",
    seriesTitle: "The Wisdom of Proverbs",
    duration: "15 min",
    date: "Oct 24, 2023",
    thumbnail: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400",
    defaultStatus: "completed",
    scripture: {
      reference: "Proverbs 1:7",
      text: "The fear of the Lord is the beginning of knowledge, but fools despise wisdom and instruction.",
    },
    keyThought:
      "True wisdom begins with a reverent, humble relationship with God — not with intelligence or education, but with the posture of our heart.",
    teachingNotes:
      "Proverbs was primarily written by Solomon, the wisest man who ever lived. Yet Solomon begins immediately with a humbling declaration: all wisdom flows from one source — God Himself.\n\nThe Hebrew word for 'fear' here is yirah — it doesn't mean terror, but deep reverence and awe. It is the recognition that God is infinitely greater than us, and that aligning ourselves with His ways is the only path to a meaningful, fruitful life.\n\nWhen we approach decisions, relationships, and challenges with this posture — seeking God first — we access the same wisdom that shaped the universe.",
    reflectionQuestions: [
      "In what areas of your life are you relying on your own understanding rather than seeking God's wisdom?",
      "What does 'fearing the Lord' look like practically in your daily decisions this week?",
      "How has wisdom — or the lack of it — shaped a recent situation in your life?",
    ],
    prayerPoint:
      "Lord, teach me to walk in the fear of You — not in terror, but in deep reverence and trust. Let my decisions today be rooted in Your wisdom and not my own understanding. Amen.",
  },
  {
    id: "proverbs-2",
    seriesId: "proverbs-wisdom",
    title: "Session 2: Trusting God's Plan",
    shortTitle: "Trusting God's Plan",
    seriesTitle: "The Wisdom of Proverbs",
    duration: "12 min",
    date: "Oct 25, 2023",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
    defaultStatus: "resume",
    scripture: {
      reference: "Proverbs 3:5–6",
      text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    },
    keyThought:
      "Surrendering control isn't weakness — it's the highest act of faith. God's paths are always better than our plans.",
    teachingNotes:
      "These two verses may be the most well-known in Proverbs, and for good reason — they cut directly to the heart of what it means to live by faith.\n\nThe word 'trust' (batach) in Hebrew implies more than intellectual belief — it carries the idea of leaning your full weight on something, the way you lean against a wall. Solomon is calling us to lean our entire life on God.\n\n'Lean not on your own understanding' doesn't mean we stop thinking. It means we stop making God's role in our decisions optional. We bring our plans, our wisdom, our research — and we submit them to Him.\n\nThe promise: He will make your paths straight. Not pain-free, not easy — but straight. Purposeful. Fruitful.",
    reflectionQuestions: [
      "Where are you currently 'leaning on your own understanding' in a decision you're facing?",
      "What would it look like practically to 'submit to God' in that area this week?",
      "Can you recall a time when God's path for you looked different from what you planned, but turned out better?",
    ],
    prayerPoint:
      "Father, I release my need to control. I choose today to trust You with the things I cannot see. Straighten my path, even when I don't understand the direction. I believe Your ways are higher than mine. Amen.",
  },
  {
    id: "proverbs-3",
    seriesId: "proverbs-wisdom",
    title: "Session 3: Guarding Your Heart",
    shortTitle: "Guarding Your Heart",
    seriesTitle: "The Wisdom of Proverbs",
    duration: "18 min",
    date: "Oct 26, 2023",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    defaultStatus: "start",
    scripture: {
      reference: "Proverbs 4:23",
      text: "Above all else, guard your heart, for everything you do flows from it.",
    },
    keyThought:
      "Your heart is the wellspring of your life — what you allow in shapes what comes out. Guard it with intention.",
    teachingNotes:
      "Solomon uses the word 'heart' (lev) in Proverbs over 70 times. In biblical terms, the heart is not just the seat of emotions — it is the center of your will, intellect, and character.\n\nWhen Solomon says 'everything flows from it,' he means your choices, words, relationships, and ultimately your destiny are shaped by what you allow into your heart.\n\nGuarding your heart requires active effort. It means being intentional about what you watch, read, listen to, and who you spend time with. It means creating rhythms — prayer, Scripture, worship, community — that cultivate spiritual health.\n\nThis is not about fear-based restriction. It is about building a heart so full of good things that there is no room for the destructive.",
    reflectionQuestions: [
      "What are you allowing into your heart right now that might be shaping you in the wrong direction?",
      "What spiritual rhythms help you 'guard your heart' most effectively?",
      "How does the condition of your heart affect the people closest to you?",
    ],
    prayerPoint:
      "Lord, create in me a clean heart. Help me to be intentional about what I allow in — through my eyes, my ears, and my relationships. Guard the wellspring of my life so that what flows out of me brings glory to You. Amen.",
  },
  {
    id: "proverbs-4",
    seriesId: "proverbs-wisdom",
    title: "Session 4: The Power of Words",
    shortTitle: "The Power of Words",
    seriesTitle: "The Wisdom of Proverbs",
    duration: "14 min",
    date: "Oct 27, 2023",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
    defaultStatus: "start",
    scripture: {
      reference: "Proverbs 18:21",
      text: "The tongue has the power of life and death, and those who love it will eat its fruit.",
    },
    keyThought:
      "Words are never neutral. Every word you speak is a seed — it will grow something in the life of the person who hears it.",
    teachingNotes:
      "Proverbs has more to say about speech than almost any other subject. Solomon understood that words are one of the most powerful forces in human relationships.\n\nScience confirms what Scripture has always taught: words shape brains, change emotional states, affect health, and alter the course of relationships. Words build up and tear down. They create safety and they create wounds.\n\nThe wise person learns to pause before speaking, to ask: Is this true? Is this kind? Is this necessary? Does this build up or tear down?\n\nWe are not called to be silent — we are called to speak life. To be encouragers. To use the gift of language to reflect God's heart to the people around us.",
    reflectionQuestions: [
      "Think about your words over the past week. Did they mostly bring life or create harm?",
      "Is there someone you need to speak a word of encouragement or reconciliation to this week?",
      "What practice could you adopt to become more intentional about the words you speak?",
    ],
    prayerPoint:
      "Lord, set a guard over my mouth and a watch over my lips. Let my words be like apples of gold — beautiful, nourishing, and life-giving. Use my tongue as an instrument of Your grace today. Amen.",
  },
  {
    id: "proverbs-5",
    seriesId: "proverbs-wisdom",
    title: "Session 5: Humility Before Honor",
    shortTitle: "Humility Before Honor",
    seriesTitle: "The Wisdom of Proverbs",
    duration: "16 min",
    date: "Oct 28, 2023",
    thumbnail: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400",
    defaultStatus: "start",
    scripture: {
      reference: "Proverbs 11:2",
      text: "When pride comes, then comes disgrace, but with humility comes wisdom.",
    },
    keyThought:
      "Humility is not thinking less of yourself — it is thinking of yourself less. It is the soil in which wisdom grows.",
    teachingNotes:
      "Pride is one of the most recurring themes in Proverbs because it is one of the most destructive forces in human life. Solomon had seen it destroy kingdoms, fracture friendships, and ruin families.\n\nPride blinds us to our own limitations. It tells us we don't need counsel, we don't need correction, and we don't need God. It is the exact opposite posture from 'the fear of the Lord' that we began this series with.\n\nHumility, by contrast, keeps us teachable. It keeps us curious. It keeps us dependent on God and connected to community. It opens us to correction before we reach the point of collapse.\n\nThe paradox of the Kingdom: the way up is down. Those who humble themselves are the ones God exalts in His time.",
    reflectionQuestions: [
      "In what area of your life is pride most likely to show up — relationships, work, faith?",
      "Who in your life speaks truth to you, and how well do you receive it?",
      "What would genuine humility look like for you in a current challenging situation?",
    ],
    prayerPoint:
      "Father, break off any pride that is keeping me from receiving Your wisdom or connecting with the people around me. Teach me the beauty of humility — not as weakness, but as strength under Your authority. Amen.",
  },
  {
    id: "proverbs-6",
    seriesId: "proverbs-wisdom",
    title: "Session 6: A Life of Excellence",
    shortTitle: "A Life of Excellence",
    seriesTitle: "The Wisdom of Proverbs",
    duration: "20 min",
    date: "Oct 29, 2023",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    defaultStatus: "start",
    scripture: {
      reference: "Proverbs 31:30",
      text: "Charm is deceptive, and beauty is fleeting; but a woman who fears the Lord is to be praised.",
    },
    keyThought:
      "True excellence is not measured by outward achievement but by inward character — a life consistently ordered around the fear of the Lord.",
    teachingNotes:
      "Proverbs ends with a portrait of excellence — a life fully integrated around wisdom. Whether the Proverbs 31 passage is describing a literal woman or an allegory for Lady Wisdom herself, the closing message is the same: character outlasts charm.\n\nA life of excellence according to Proverbs is not about perfect performance. It is about direction — the consistent, daily orientation of our heart toward God.\n\nAs we close this series, the invitation is simple: take what you have learned and let it shape how you live. Wisdom is not merely information — it is formation. It changes not just what we know, but who we are becoming.\n\nThe question is not 'did I finish the Bible study?' but 'am I becoming wiser?' — more faithful, more humble, more generous, more loving.",
    reflectionQuestions: [
      "Looking back across this series, which session impacted you most and why?",
      "What is one area of your life where you want to apply wisdom more consistently going forward?",
      "How has your understanding of 'the fear of the Lord' changed or deepened through this study?",
    ],
    prayerPoint:
      "Lord, thank You for Your wisdom — a gift more precious than silver or gold. As I close this study, seal what You have taught me into my life. Let it not be head knowledge alone, but heart transformation that shapes every area of my life for Your glory. Amen.",
  },
];

export const studySeries: StudySeries[] = [
  {
    id: "proverbs-wisdom",
    title: "The Wisdom of Proverbs",
    description:
      "A 6-session journey through the book of Proverbs — exploring timeless wisdom on the fear of God, trust, the heart, words, humility, and a life of excellence.",
    teacher: "Pastor David Miller",
    teacherTitle: "Lead Pastor",
    teacherAvatar: "https://i.pravatar.cc/150?img=52",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
    totalSessions: 6,
    lessons: studyLessons.filter((l) => l.seriesId === "proverbs-wisdom"),
  },
];

export function getSeriesById(id: string): StudySeries | undefined {
  return studySeries.find((s) => s.id === id);
}

export function getLessonById(id: string): StudyLesson | undefined {
  return studyLessons.find((l) => l.id === id);
}

export function getNextLesson(currentId: string): StudyLesson | undefined {
  const idx = studyLessons.findIndex((l) => l.id === currentId);
  if (idx === -1 || idx >= studyLessons.length - 1) return undefined;
  return studyLessons[idx + 1];
}

export function getLessonIndex(lessonId: string): number {
  return studyLessons.findIndex((l) => l.id === lessonId);
}
