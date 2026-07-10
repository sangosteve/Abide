/**
 * Seed the database with initial data for the Abide platform.
 * Run: pnpm --filter @workspace/scripts run seed
 */
import { db } from "@workspace/db";
import {
  usersTable,
  sermonsTable,
  bibleStudiesTable,
  lessonsTable,
  eventsTable,
  discussionsTable,
} from "@workspace/db";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("Seeding database…");

  // ── Users ──────────────────────────────────────────────────────────────────
  const users = await db
    .insert(usersTable)
    .values([
      { firstName: "Sarah",   lastName: "Johnson",  email: "sarah.j@example.com",  role: "ministry_leader", group: "Women's Ministry",  status: "active",   memberSince: "2023-01-15" },
      { firstName: "Michael", lastName: "Chen",     email: "m.chen@example.com",   role: "group_leader",    group: "Young Adults",      status: "active",   memberSince: "2023-03-22" },
      { firstName: "Emily",   lastName: "Davis",    email: "emily.d@example.com",  role: "member",          group: "Wednesday Study",   status: "inactive", memberSince: "2023-06-10" },
      { firstName: "David",   lastName: "Wilson",   email: "david.w@example.com",  role: "member",          group: "Men's Fellowship",  status: "active",   memberSince: "2023-08-05" },
      { firstName: "Lisa",    lastName: "Anderson", email: "lisa.a@example.com",   role: "worship_team",    group: "Worship Arts",      status: "active",   memberSince: "2022-11-30" },
      { firstName: "James",   lastName: "White",    email: "j.white@example.com",  role: "group_leader",    group: "Couples Group",     status: "active",   memberSince: "2022-09-14" },
      { firstName: "Anna",    lastName: "Martinez", email: "anna.m@example.com",   role: "member",          group: "Women's Ministry",  status: "pending",  memberSince: "2024-01-05" },
      { firstName: "Robert",  lastName: "Taylor",   email: "robert.t@example.com", role: "ministry_leader", group: "Youth Ministry",    status: "active",   memberSince: "2021-05-20" },
      { firstName: "John",    lastName: "Smith",    email: "john.smith@example.com", role: "admin",           group: "Pastoral Team",     status: "active",   memberSince: "2020-01-01" },
      { firstName: "Daniel",  lastName: "Miller",   email: "daniel.m@example.com", role: "ministry_leader", group: "Bible Studies",     status: "active",   memberSince: "2021-03-10" },
    ])
    .onConflictDoNothing()
    .returning();
  console.log(`  ${users.length} users`);

  // ── Sermons ────────────────────────────────────────────────────────────────
  const sermons = await db
    .insert(sermonsTable)
    .values([
      {
        title: "Walk by Faith, Not by Sight",
        speaker: "Pastor John Smith",
        series: "Faith That Overcomes",
        scripture: "2 Corinthians 5:7",
        date: "2024-05-19",
        duration: 44,
        summary: "A powerful message about trusting God when the path ahead is unclear. Drawing from 2 Corinthians 5, Pastor John shows how walking by faith transforms our perspective and strengthens our relationship with God.",
        thumbnailUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
        mediaStatus: "ready",
        publishStatus: "published",
        views: 1245,
        visibility: "public",
      },
      {
        title: "Faith That Overcomes",
        speaker: "Pastor John Smith",
        series: "Faith That Overcomes",
        scripture: "1 John 5:4",
        date: "2024-05-12",
        duration: 41,
        summary: "Every believer faces trials that test their faith. In this message, we explore what it means to have an overcoming faith — one that doesn't just survive storms, but grows stronger through them.",
        thumbnailUrl: "https://images.unsplash.com/photo-1499244571948-7ccddb3583f1?w=400",
        mediaStatus: "ready",
        publishStatus: "published",
        views: 1089,
        visibility: "public",
      },
      {
        title: "The Power of Prayer",
        speaker: "Pastor David Wilson",
        series: "Spiritual Disciplines",
        scripture: "James 5:14-16",
        date: "2024-05-05",
        duration: 38,
        summary: "Prayer is not a last resort — it's our first response. Pastor David takes us through James 5 to rediscover what genuine, fervent prayer looks like and why it changes everything.",
        thumbnailUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400",
        mediaStatus: "processing",
        publishStatus: "scheduled",
        views: 0,
        visibility: "public",
      },
      {
        title: "Guard Your Heart",
        speaker: "Pastor John Smith",
        series: "Proverbs",
        scripture: "Proverbs 4:23",
        date: "2024-04-28",
        duration: 46,
        summary: "Solomon writes that the heart is the wellspring of life — everything flows from it. In this message, we learn practical, biblical ways to protect our hearts in a world full of distractions.",
        thumbnailUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400",
        mediaStatus: "ready",
        publishStatus: "published",
        views: 1530,
        visibility: "public",
      },
      {
        title: "Abide in Me",
        speaker: "Sarah Johnson",
        series: "The Gospel of John",
        scripture: "John 15:4",
        date: "2024-04-21",
        duration: 39,
        summary: "Jesus's invitation to 'abide in me' is one of the most intimate calls in all of Scripture. What does it mean to remain in Christ — and what becomes possible when we do?",
        thumbnailUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400",
        mediaStatus: "ready",
        publishStatus: "published",
        views: 980,
        visibility: "public",
      },
    ])
    .onConflictDoNothing()
    .returning();
  console.log(`  ${sermons.length} sermons`);

  // ── Bible Studies ──────────────────────────────────────────────────────────
  const studies = await db
    .insert(bibleStudiesTable)
    .values([
      {
        title: "The Wisdom of Proverbs",
        leader: "Daniel Miller",
        lessonCount: 6,
        participants: 45,
        progress: 60,
        status: "active",
        studyType: "in_person",
        visibility: "members_only",
        startDate: "2024-01-15",
        endDate: "2024-06-30",
        description: "A 6-session journey through the book of Proverbs — exploring timeless wisdom on the fear of God, trust, the heart, words, humility, and a life of excellence.",
        coverImageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
      },
      {
        title: "Romans: Grace & Faith",
        leader: "Sarah Johnson",
        lessonCount: 16,
        participants: 32,
        progress: 100,
        status: "completed",
        studyType: "hybrid",
        visibility: "members_only",
        startDate: "2023-09-01",
        endDate: "2024-01-15",
        description: "A deep exploration of Paul's letter to the Romans — unpacking the doctrines of grace, justification, and the life of faith.",
      },
      {
        title: "The Gospel of John",
        leader: "John Smith",
        lessonCount: 24,
        participants: 68,
        progress: 25,
        status: "active",
        studyType: "in_person",
        visibility: "public",
        startDate: "2024-03-01",
        endDate: "2024-10-31",
        description: "An in-depth study of John's Gospel, tracing the signs, sermons, and stories that reveal Jesus as the Son of God.",
        coverImageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      },
      {
        title: "Psalms: Songs of Praise",
        leader: "Michael Chen",
        lessonCount: 20,
        participants: 28,
        progress: 0,
        status: "draft",
        studyType: "online",
        visibility: "members_only",
        description: "A journey through selected Psalms — learning to pray, praise, lament, and trust God through every season of life.",
      },
      {
        title: "Acts: The Early Church",
        leader: "Daniel Miller",
        lessonCount: 14,
        participants: 50,
        progress: 10,
        status: "active",
        studyType: "in_person",
        visibility: "public",
        startDate: "2024-04-01",
        endDate: "2024-08-31",
        description: "Walking through the book of Acts to discover how the early church was born, grew, and spread the gospel across the known world.",
      },
    ])
    .onConflictDoNothing()
    .returning();
  console.log(`  ${studies.length} bible studies`);

  // ── Lessons (for The Wisdom of Proverbs) ───────────────────────────────────
  const proverbsStudy = await db
    .select({ id: bibleStudiesTable.id })
    .from(bibleStudiesTable)
    .where(eq(bibleStudiesTable.title, "The Wisdom of Proverbs"))
    .limit(1);

  const studyId = proverbsStudy[0]?.id;
  if (studyId) {
    // Clear existing lessons so seed is idempotent
    await db.delete(lessonsTable).where(eq(lessonsTable.studyId, studyId));

    const lessons = await db
      .insert(lessonsTable)
      .values([
        {
          studyId,
          title: "Session 1: The Fear of the Lord",
          shortTitle: "The Fear of the Lord",
          scripture: "Proverbs 1:7",
          scriptureText: "The fear of the Lord is the beginning of knowledge, but fools despise wisdom and instruction.",
          duration: 15,
          thumbnailUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400",
          keyThought: "True wisdom begins with a reverent, humble relationship with God — not with intelligence or education, but with the posture of our heart.",
          teachingNotes: "Proverbs was primarily written by Solomon, the wisest man who ever lived. Yet Solomon begins immediately with a humbling declaration: all wisdom flows from one source — God Himself.\n\nThe Hebrew word for 'fear' here is yirah — it doesn't mean terror, but deep reverence and awe. It is the recognition that God is infinitely greater than us, and that aligning ourselves with His ways is the only path to a meaningful, fruitful life.\n\nWhen we approach decisions, relationships, and challenges with this posture — seeking God first — we access the same wisdom that shaped the universe.",
          reflectionQuestions: JSON.stringify([
            "In what areas of your life are you relying on your own understanding rather than seeking God's wisdom?",
            "What does 'fearing the Lord' look like practically in your daily decisions this week?",
            "How has wisdom — or the lack of it — shaped a recent situation in your life?",
          ]),
          prayerPoint: "Lord, teach me to walk in the fear of You — not in terror, but in deep reverence and trust. Let my decisions today be rooted in Your wisdom and not my own understanding. Amen.",
          status: "published",
          orderIndex: 0,
        },
        {
          studyId,
          title: "Session 2: Trusting God's Plan",
          shortTitle: "Trusting God's Plan",
          scripture: "Proverbs 3:5-6",
          scriptureText: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
          duration: 12,
          thumbnailUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
          keyThought: "Surrendering control isn't weakness — it's the highest act of faith. God's paths are always better than our plans.",
          teachingNotes: "These two verses may be the most well-known in Proverbs, and for good reason — they cut directly to the heart of what it means to live by faith.\n\nThe word 'trust' (batach) in Hebrew implies more than intellectual belief — it carries the idea of leaning your full weight on something. Solomon is calling us to lean our entire life on God.\n\n'Lean not on your own understanding' doesn't mean we stop thinking. It means we stop making God's role in our decisions optional. We bring our plans, our wisdom, our research — and we submit them to Him.\n\nThe promise: He will make your paths straight. Not pain-free, not easy — but straight. Purposeful. Fruitful.",
          reflectionQuestions: JSON.stringify([
            "Where do you tend to 'lean on your own understanding' rather than trusting God?",
            "What would it look like to submit that specific area to Him this week?",
            "Has there been a time when God's path turned out to be better than the one you planned?",
          ]),
          prayerPoint: "Father, I surrender my plans to You today. Help me to trust You fully — even when Your path doesn't look like what I expected. Make my ways straight according to Your purpose. Amen.",
          status: "published",
          orderIndex: 1,
        },
        {
          studyId,
          title: "Session 3: The Heart Above All",
          shortTitle: "The Heart Above All",
          scripture: "Proverbs 4:23",
          scriptureText: "Above all else, guard your heart, for everything you do flows from it.",
          duration: 14,
          thumbnailUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
          keyThought: "The heart is the command center of our lives. What we allow in — through our eyes, ears, and thoughts — shapes everything we become.",
          teachingNotes: "Solomon uses the phrase 'above all else' — a signal that what follows is of supreme importance. The heart, in biblical terms, is not just the seat of emotion; it's the center of our will, intellect, and character.\n\nModern neuroscience actually confirms this ancient wisdom: our habits of thought literally shape the neural pathways in our brains. What we dwell on, we become.\n\nGuarding the heart is not passive — it requires active vigilance. It means being intentional about what we watch, read, listen to, and who we spend time with. It means returning repeatedly to God's Word as the filter for everything that enters.",
          reflectionQuestions: JSON.stringify([
            "What inputs in your daily life are shaping your heart — positively or negatively?",
            "What is one practical step you could take this week to better 'guard your heart'?",
            "How does what you allow into your heart affect your relationships and decisions?",
          ]),
          prayerPoint: "Lord, help me guard my heart with wisdom and intentionality. Reveal anything I've allowed in that is not from You, and give me the courage to remove it. Let my heart be a place where Your presence feels at home. Amen.",
          status: "published",
          orderIndex: 2,
        },
        {
          studyId,
          title: "Session 4: The Power of Words",
          shortTitle: "The Power of Words",
          scripture: "Proverbs 18:21",
          scriptureText: "The tongue has the power of life and death, and those who love it will eat its fruit.",
          duration: 16,
          thumbnailUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400",
          keyThought: "Our words carry extraordinary power — to build or to break, to heal or to harm. Wisdom begins with learning to speak life.",
          teachingNotes: "Proverbs has more to say about speech than almost any other subject. The tongue, though small, is described as having the power of life and death — a remarkable claim.\n\nWe live in an age of unprecedented communication. Social media, texting, email — we generate more words than any generation in history. And yet, the quality of our speech may never have been lower.\n\nWisdom calls us to a different standard: words that are true, kind, necessary, and timely. Words that encourage, correct with love, build up rather than tear down, and bring peace into conflict.",
          reflectionQuestions: JSON.stringify([
            "Think of a time when someone's words had a powerful impact on you — positively or negatively. What made the difference?",
            "In what relationships or settings do you find it hardest to 'speak life'?",
            "What would it look like to be more intentional about your words this week?",
          ]),
          prayerPoint: "Lord, set a guard over my mouth and a watch over the door of my lips. Let my words today bring life, encouragement, and truth. Where I have spoken poorly, give me the humility to make it right. Amen.",
          status: "published",
          orderIndex: 3,
        },
        {
          studyId,
          title: "Session 5: The Way of Humility",
          shortTitle: "The Way of Humility",
          scripture: "Proverbs 11:2",
          scriptureText: "When pride comes, then comes disgrace, but with humility comes wisdom.",
          duration: 13,
          thumbnailUrl: "https://images.unsplash.com/photo-1429514513361-8a632ff5f2ba?w=400",
          keyThought: "Humility is not thinking less of yourself — it's thinking of yourself less. It's the posture that opens our hearts to God's wisdom and others' perspectives.",
          teachingNotes: "The connection Proverbs makes between pride and disgrace is not coincidental — it's a spiritual law. Pride closes us off to correction, to growth, to God's guidance. It convinces us we already know enough, that we don't need help, that others are the problem.\n\nHumility, by contrast, is the open-handed posture that says: 'I might be wrong. I need God. I can learn from others.' Far from weakness, this is the foundation of wisdom.\n\nThe greatest leaders, the most effective communicators, the most respected people in history have almost universally been marked by a profound humility — not self-deprecation, but genuine other-centeredness.",
          reflectionQuestions: JSON.stringify([
            "Where do you see pride operating in your life — in your relationships, your work, your spiritual life?",
            "What is the difference between healthy confidence and destructive pride?",
            "Who in your life models humility well? What can you learn from them?",
          ]),
          prayerPoint: "Lord, create in me a humble heart. Where I have been proud or self-sufficient, forgive me and reshape me. Teach me to value what You value — the low place, the servant's posture, the learner's heart. Amen.",
          status: "published",
          orderIndex: 4,
        },
        {
          studyId,
          title: "Session 6: A Life of Excellence",
          shortTitle: "A Life of Excellence",
          scripture: "Proverbs 31:30",
          scriptureText: "Charm is deceptive, and beauty is fleeting; but a woman who fears the Lord is to be praised.",
          duration: 15,
          thumbnailUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400",
          keyThought: "True excellence is not measured by outward achievement but by inward character — a life consistently ordered around the fear of the Lord.",
          teachingNotes: "Proverbs ends with a portrait of excellence — a life fully integrated around wisdom. Whether the Proverbs 31 passage is describing a literal woman or an allegory for Lady Wisdom herself, the closing message is the same: character outlasts charm.\n\nA life of excellence according to Proverbs is not about perfect performance. It is about direction — the consistent, daily orientation of our heart toward God.\n\nAs we close this series, the invitation is simple: take what you have learned and let it shape how you live. Wisdom is not merely information — it is formation. It changes not just what we know, but who we are becoming.\n\nThe question is not 'did I finish the Bible study?' but 'am I becoming wiser?' — more faithful, more humble, more generous, more loving.",
          reflectionQuestions: JSON.stringify([
            "Looking back across this series, which session impacted you most and why?",
            "What is one area of your life where you want to apply wisdom more consistently going forward?",
            "How has your understanding of 'the fear of the Lord' changed or deepened through this study?",
          ]),
          prayerPoint: "Lord, thank You for Your wisdom — a gift more precious than silver or gold. As I close this study, seal what You have taught me into my life. Let it not be head knowledge alone, but heart transformation that shapes every area of my life for Your glory. Amen.",
          status: "published",
          orderIndex: 5,
        },
      ])
      .returning();
    console.log(`  ${lessons.length} lessons`);
  }

  // ── Events ────────────────────────────────────────────────────────────────
  const events = await db
    .insert(eventsTable)
    .values([
      {
        title: "Worship Night",
        date: "2024-05-24",
        time: "19:00",
        category: "Worship",
        host: "Worship Arts",
        venue: "Main Sanctuary",
        description: "A special evening of corporate worship, prayer, and encounter. Come ready to seek God together as a family.",
        bannerUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
        registrations: 120,
        capacity: 200,
        publishStatus: "published",
        visibility: "public",
      },
      {
        title: "Youth Conference 2025",
        date: "2024-05-30",
        time: "09:00",
        category: "Conference",
        host: "Youth Ministry",
        venue: "Community Center",
        address: "123 Main St",
        description: "Three days of powerful sessions, worship, and community for students in grades 6-12. Speakers, small groups, and activities designed to help young people grow in their faith.",
        bannerUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
        registrations: 345,
        capacity: 500,
        publishStatus: "published",
        visibility: "public",
        requireRsvp: true,
      },
      {
        title: "Baptism Sunday",
        date: "2024-06-15",
        time: "10:30",
        category: "Special Service",
        host: "Pastoral Team",
        venue: "Main Sanctuary",
        description: "A celebration of new life and public declaration of faith. If you feel called to be baptized, speak with a pastor before the service.",
        bannerUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800",
        registrations: 45,
        publishStatus: "published",
        visibility: "public",
      },
      {
        title: "Community Outreach Day",
        date: "2024-06-22",
        time: "08:00",
        category: "Outreach",
        host: "Missions Team",
        venue: "Various Locations",
        description: "Join us as we serve our city! Teams will be placed at local food banks, neighborhood clean-up sites, and community centers. All ages welcome.",
        bannerUrl: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800",
        registrations: 85,
        capacity: 100,
        publishStatus: "published",
        visibility: "public",
      },
      {
        title: "Father's Day Service",
        date: "2024-06-15",
        time: "09:00",
        category: "Special Service",
        host: "Pastoral Team",
        venue: "Main Sanctuary",
        description: "A special service celebrating the fathers and father figures in our community.",
        registrations: 0,
        publishStatus: "draft",
        visibility: "public",
      },
    ])
    .onConflictDoNothing()
    .returning();
  console.log(`  ${events.length} events`);

  // ── Discussions ───────────────────────────────────────────────────────────
  const discussions = await db
    .insert(discussionsTable)
    .values([
      {
        title: "Prayer for my mother's surgery",
        authorName: "Emily Davis",
        group: "Prayer Requests",
        type: "prayer_request",
        content: "My mother is having surgery on Friday and I'm asking for prayer for peace, a skilled surgical team, and a full recovery. She's been so brave through all of this. Thank you all for your love and support.",
        replies: 12,
        likes: 24,
        sentiment: "positive",
        status: "active",
      },
      {
        title: "Question about Romans 8",
        authorName: "Michael Chen",
        group: "Romans Study",
        type: "general",
        content: "In our last session we discussed Romans 8:28 — 'all things work together for good.' I've been wrestling with this verse. How do we reconcile it with genuine suffering? Would love to hear how others interpret this.",
        replies: 8,
        likes: 15,
        sentiment: "neutral",
        status: "active",
      },
      {
        title: "Potluck signup for next week",
        authorName: "Anna Martinez",
        group: "Women's Ministry",
        type: "announcement",
        content: "The Women's Ministry potluck is NEXT Sunday after the second service! Please sign up below for what you're bringing. We need: salads, desserts, drinks, and savory dishes. It's going to be a beautiful time of fellowship!",
        replies: 24,
        likes: 31,
        sentiment: "positive",
        status: "active",
      },
      {
        title: "Looking for a mentor",
        authorName: "James White",
        group: "Men's Fellowship",
        type: "general",
        content: "I've been attending Abide for about 6 months now and I'm looking for a mentor — someone who can walk alongside me as I grow in my faith and leadership. If you'd be open to connecting, please reach out.",
        replies: 4,
        likes: 18,
        sentiment: "positive",
        status: "active",
      },
      {
        title: "God's faithfulness in a hard season",
        authorName: "Lisa Anderson",
        group: "General",
        type: "general",
        content: "Wanted to share a testimony. This past year has been incredibly difficult — job loss, health challenges, and personal struggles. But through it all, I've seen God's faithfulness in ways I never expected. He is good, even when life is hard.",
        replies: 19,
        likes: 47,
        sentiment: "positive",
        status: "active",
      },
    ])
    .onConflictDoNothing()
    .returning();
  console.log(`  ${discussions.length} discussions`);

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
