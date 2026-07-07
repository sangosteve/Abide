import type {
  Sermon,
  SermonSeries,
  Event,
  GivingFund,
  CommunityPost,
  MediaAlbum,
  MediaVideo,
  MediaPhoto,
  DailyVerse,
  UserProfile,
} from "@/types";

export const userProfile: UserProfile = {
  name: "Sarah Johnson",
  firstName: "Sarah",
  avatar: "https://i.pravatar.cc/150?img=47",
  memberSince: "March 2021",
  email: "sarah.johnson@email.com",
};

export const dailyVerse: DailyVerse = {
  verse:
    '"But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint."',
  reference: "Isaiah 40:31",
};

export const featuredSeries: SermonSeries = {
  id: "s1",
  title: "Unwavering Hope",
  description: "A deep dive into the book of Romans with Pastor Sarah Jenkins",
  parts: 4,
  thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
  speaker: "Pastor Sarah Jenkins",
};

export const sermons: Sermon[] = [
  {
    id: "1",
    title: "Finding Peace in the Midst of the Storm",
    speaker: "Pastor Andrew Wright",
    date: "Oct 29, 2023",
    scripture: "Philippians 4:6-7",
    duration: "42:15",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
    description:
      'In this powerful message, Pastor Andrew Wright explores what it means to find true peace even when life\'s storms are raging around us. Drawing from Philippians 4, he shows us how gratitude and prayer transform our perspective and release the "peace that transcends all understanding."',
    series: "The Kingdom Way",
    isNew: false,
  },
  {
    id: "2",
    title: "Finding Peace in the Midst of Chaos",
    speaker: "Pastor Michael Chen",
    date: "Oct 22, 2023",
    scripture: "Philippians 4:6-7",
    duration: "42:15",
    thumbnail: "https://images.unsplash.com/photo-1499244571948-7ccddb3583f1?w=400",
    description:
      "In the chaos of modern life, how do we find genuine peace? Pastor Michael Chen shares timeless principles from Philippians that have helped believers for centuries navigate difficult seasons with grace and confidence.",
    series: "Living Faithfully",
    isNew: true,
  },
  {
    id: "3",
    title: "The Stewardship of Talents",
    speaker: "Pastor Sarah Jenkins",
    date: "Oct 15, 2023",
    scripture: "Matthew 25:14-30",
    duration: "38:40",
    thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400",
    description:
      "What has God entrusted to you? In this thought-provoking sermon, Pastor Sarah Jenkins unpacks the Parable of the Talents and challenges us to invest our God-given gifts for the Kingdom.",
    series: "Kingdom Principles",
    isNew: false,
  },
  {
    id: "4",
    title: "Walking with Grace",
    speaker: "Dr. Robert Miller",
    date: "Oct 08, 2023",
    scripture: "Ephesians 2:8-9",
    duration: "45:02",
    thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400",
    description:
      "Grace is not just a theological concept—it's a way of life. Dr. Robert Miller beautifully explains how understanding God's grace transforms how we relate to God, ourselves, and others.",
    series: "Grace & Truth",
    isNew: false,
  },
  {
    id: "5",
    title: "Building on the Rock",
    speaker: "Pastor Michael Chen",
    date: "Oct 01, 2023",
    scripture: "Matthew 7:24-27",
    duration: "39:18",
    thumbnail: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400",
    description:
      "When storms come—and they will—what is your foundation? Pastor Michael Chen brings a life-changing message about building our lives on the solid rock of God's Word.",
    series: "Foundations of Faith",
    isNew: false,
  },
];

export const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "Night of Awakening: Annual Worship Festival",
    category: "Community Worship",
    date: "Friday, November 24, 2024",
    time: "6:30 PM - 9:30 PM (Doors at 6 PM)",
    venue: "Main Sanctuary - Central Campus",
    host: "Pastor Marcus Chen",
    description:
      "Join us for an unforgettable evening of worship, prayer, and divine connection. The Night of Awakening is more than just a concert; it's a movement aimed at bringing our community together in faith.",
    image: "https://images.unsplash.com/photo-1429514513361-8a632ff5f2ba?w=800",
    month: "NOV",
    day: "24",
  },
  {
    id: "2",
    title: "Night of Worship & Prayer",
    category: "Worship",
    date: "October 28, 2023",
    time: "7:00 PM - 9:00 PM",
    venue: "Main Sanctuary",
    host: "Worship Team",
    description:
      "An intimate evening of corporate worship and intercession. Come with an open heart as we seek God together through music, prayer, and scripture.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
    month: "OCT",
    day: "28",
  },
  {
    id: "3",
    title: "Youth Fall Retreat",
    category: "Youth",
    date: "October 31, 2023",
    time: "All Day",
    venue: "Cedar Lake Camp",
    host: "Youth Pastor Jake Torres",
    description:
      "A transformative weekend for our middle and high school students to grow in faith, build lasting friendships, and encounter God in a powerful way.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800",
    month: "OCT",
    day: "31",
  },
  {
    id: "4",
    title: "Community Harvest Festival",
    category: "Community",
    date: "November 5, 2023",
    time: "5:30 PM",
    venue: "Fellowship Hall",
    host: "Outreach Team",
    description:
      "Bring the whole family! Enjoy food, games, pumpkin decorating, and live music while connecting with your church family and neighbors.",
    image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800",
    month: "NOV",
    day: "05",
  },
  {
    id: "5",
    title: "Awana Kids Games Night",
    category: "Kids",
    date: "November 12, 2023",
    time: "6:00 PM",
    venue: "Gymnasium",
    host: "Children's Ministry",
    description:
      "A fun-filled evening of games, Bible challenges, and prizes for children ages 3-12. Parents are welcome to cheer on their kids!",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
    month: "NOV",
    day: "12",
  },
];

export const givingFunds: GivingFund[] = [
  { id: "tithe", name: "Tithe", description: "General support", icon: "heart" },
  { id: "offering", name: "Offering", description: "Special projects", icon: "gift" },
  { id: "missions", name: "Missions", description: "Global outreach", icon: "globe" },
  { id: "building", name: "Building Fund", description: "Expansion project", icon: "home" },
];

export const communityPosts: CommunityPost[] = [
  {
    id: "1",
    author: "Sarah Jenkins",
    role: "Worship Leader",
    avatar: "https://i.pravatar.cc/150?img=47",
    timeAgo: "2 hours ago",
    tag: "Testimony",
    content:
      "I am so encouraged by this Sunday's sermon on perseverance. It really spoke to my heart during a difficult week. Who else was blessed by it? 🙌",
    likes: 24,
    comments: 8,
    isLiked: true,
  },
  {
    id: "2",
    author: "Marcus Thompson",
    role: undefined,
    avatar: "https://i.pravatar.cc/150?img=68",
    timeAgo: "4 hours ago",
    tag: "Prayer Request",
    content:
      "Asking for prayers for my mother. She's going into surgery tomorrow morning. We are trusting God for a complete healing and peace for the doctors.",
    likes: 52,
    comments: 14,
    isLiked: false,
  },
  {
    id: "3",
    author: "FaithConnect Team",
    role: "Moderator",
    avatar: "https://i.pravatar.cc/150?img=12",
    timeAgo: "6 hours ago",
    tag: "Announcement",
    content:
      "Don't forget to join our Mid-week Fellowship this Wednesday at 7 PM in the main hall! We'll be discussing the Book of Romans chapter 8. Everyone is welcome!",
    likes: 12,
    comments: 2,
    isLiked: false,
  },
  {
    id: "4",
    author: "Emily Rivera",
    role: undefined,
    avatar: "https://i.pravatar.cc/150?img=44",
    timeAgo: "Yesterday",
    tag: "Question",
    content:
      "Does anyone have recommendations for a good daily devotional for new believers? My younger sister just started her walk with Christ and I'd love to gift her something.",
    likes: 8,
    comments: 22,
    isLiked: false,
  },
];

export const mediaAlbums: MediaAlbum[] = [
  {
    id: "1",
    title: "Missions 2023",
    updatedAt: "2 days ago",
    coverImage: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400",
  },
  {
    id: "2",
    title: "Youth Camp",
    updatedAt: "2 days ago",
    coverImage: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=400",
  },
  {
    id: "3",
    title: "Easter Service",
    updatedAt: "2 days ago",
    coverImage: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=400",
  },
];

export const recentVideos: MediaVideo[] = [
  {
    id: "1",
    title: "Sunday Morning Worship: Finding Peace",
    date: "Mar 22, 2024",
    duration: "45:30",
    thumbnail: "https://images.unsplash.com/photo-1429514513361-8a632ff5f2ba?w=400",
  },
  {
    id: "2",
    title: "Mid-week Prayer & Strength",
    date: "Mar 18, 2024",
    duration: "28:15",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
  },
];

export const photoMemories: MediaPhoto[] = [
  {
    id: "1",
    title: "Community Picnic",
    date: "MAY 2023",
    image: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=400",
    isFeature: true,
  },
  {
    id: "2",
    title: "Small Group Study",
    date: "APR 2023",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400",
  },
  {
    id: "3",
    title: "Volunteer Day",
    date: "MAR 2023",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400",
  },
  {
    id: "4",
    title: "Worship Night",
    date: "MAR 2023",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400",
  },
];

export const quickActions = [
  { id: "bible", label: "Bible", icon: "book-open" },
  { id: "prayer", label: "Prayer", icon: "message-circle" },
  { id: "give", label: "Give", icon: "heart" },
  { id: "events", label: "Events", icon: "calendar" },
];
