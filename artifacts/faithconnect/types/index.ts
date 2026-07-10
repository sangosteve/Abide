export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  scripture: string;
  duration: string;
  thumbnail: string;
  description: string;
  series: string;
  videoUrl?: string | null;
  audioUrl?: string | null;
  isNew?: boolean;
}

export interface SermonSeries {
  id: string;
  title: string;
  description: string;
  parts: number;
  thumbnail: string;
  speaker: string;
}

export interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  host: string;
  description: string;
  image: string;
  month: string;
  day: string;
}

export interface GivingFund {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  role?: string;
  avatar: string;
  timeAgo: string;
  tag: string;
  content: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

export interface MediaAlbum {
  id: string;
  title: string;
  updatedAt: string;
  coverImage: string;
}

export interface MediaVideo {
  id: string;
  title: string;
  date: string;
  duration: string;
  thumbnail: string;
}

export interface MediaPhoto {
  id: string;
  title: string;
  date: string;
  image: string;
  isFeature?: boolean;
}

export interface DailyVerse {
  verse: string;
  reference: string;
}

export interface UserProfile {
  name: string;
  firstName: string;
  avatar: string;
  memberSince: string;
  email: string;
}
