export const mockUsers = [
  { id: 'u1', name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'Ministry Leader', group: 'Women\'s Ministry', status: 'Active', joinedDate: '2023-01-15' },
  { id: 'u2', name: 'Michael Chen', email: 'm.chen@example.com', role: 'Group Leader', group: 'Young Adults', status: 'Active', joinedDate: '2023-03-22' },
  { id: 'u3', name: 'Emily Davis', email: 'emily.d@example.com', role: 'Member', group: 'Wednesday Study', status: 'Inactive', joinedDate: '2023-06-10' },
  { id: 'u4', name: 'David Wilson', email: 'david.w@example.com', role: 'Member', group: 'Men\'s Fellowship', status: 'Active', joinedDate: '2023-08-05' },
  { id: 'u5', name: 'Lisa Anderson', email: 'lisa.a@example.com', role: 'Worship Team', group: 'Worship Arts', status: 'Active', joinedDate: '2022-11-30' },
  { id: 'u6', name: 'James White', email: 'j.white@example.com', role: 'Group Leader', group: 'Couples Group', status: 'Active', joinedDate: '2022-09-14' },
  { id: 'u7', name: 'Anna Martinez', email: 'anna.m@example.com', role: 'Member', group: 'Women\'s Ministry', status: 'Pending', joinedDate: '2024-01-05' },
  { id: 'u8', name: 'Robert Taylor', email: 'robert.t@example.com', role: 'Ministry Leader', group: 'Youth Ministry', status: 'Active', joinedDate: '2021-05-20' },
];

export const mockBibleStudies = [
  { id: 'b1', title: 'The Wisdom of Proverbs', leader: 'Daniel Miller', sessions: 18, participants: 45, progress: 60, status: 'Active' },
  { id: 'b2', title: 'Romans: Grace & Faith', leader: 'Sarah Johnson', sessions: 16, participants: 32, progress: 100, status: 'Completed' },
  { id: 'b3', title: 'The Gospel of John', leader: 'John Smith', sessions: 24, participants: 68, progress: 25, status: 'Active' },
  { id: 'b4', title: 'Psalms: Songs of Praise', leader: 'Michael Chen', sessions: 20, participants: 28, progress: 0, status: 'Draft' },
  { id: 'b5', title: 'Acts: The Early Church', leader: 'Daniel Miller', sessions: 14, participants: 50, progress: 10, status: 'Active' },
];

export const mockSermons = [
  { id: 's1', title: 'Walk by Faith, Not by Sight', speaker: 'Pastor John Smith', series: 'Faith That Overcomes', scripture: '2 Corinthians 5:7', date: '2024-05-19', mediaStatus: 'Uploaded', publishStatus: 'Published', views: 1245 },
  { id: 's2', title: 'Faith That Overcomes', speaker: 'Pastor John Smith', series: 'Faith That Overcomes', scripture: '1 John 5:4', date: '2024-05-12', mediaStatus: 'Uploaded', publishStatus: 'Published', views: 1089 },
  { id: 's3', title: 'The Power of Prayer', speaker: 'Pastor David Wilson', series: 'Spiritual Disciplines', scripture: 'James 5:14-16', date: '2024-05-05', mediaStatus: 'Processing', publishStatus: 'Scheduled', views: 0 },
  { id: 's4', title: 'Guard Your Heart', speaker: 'Pastor John Smith', series: 'Proverbs', scripture: 'Proverbs 4:23', date: '2024-04-28', mediaStatus: 'Uploaded', publishStatus: 'Published', views: 1530 },
  { id: 's5', title: 'Abide in Me', speaker: 'Sarah Johnson', series: 'The Gospel of John', scripture: 'John 15:4', date: '2024-04-21', mediaStatus: 'Uploaded', publishStatus: 'Published', views: 980 },
];

export const mockEvents = [
  { id: 'e1', title: 'Worship Night', date: '2024-05-24', category: 'Worship', host: 'Worship Arts', registrations: 120, capacity: 200, status: 'Upcoming' },
  { id: 'e2', title: 'Youth Conference 2025', date: '2024-05-30', category: 'Conference', host: 'Youth Ministry', registrations: 345, capacity: 500, status: 'Upcoming' },
  { id: 'e3', title: 'Baptism Sunday', date: '2024-06-15', category: 'Special Service', host: 'Pastoral Team', registrations: 45, capacity: null, status: 'Upcoming' },
  { id: 'e4', title: 'Community Outreach', date: '2024-06-22', category: 'Outreach', host: 'Missions', registrations: 85, capacity: 100, status: 'Upcoming' },
  { id: 'e5', title: 'Father\'s Day Service', date: '2024-06-15', category: 'Service', host: 'Pastoral Team', registrations: 0, capacity: null, status: 'Draft' },
];

export const mockDiscussions = [
  { id: 'd1', thread: 'Prayer for my mother\'s surgery', author: 'Emily Davis', group: 'Prayer Requests', replies: 12, reports: 0, sentiment: 'Positive', status: 'Active' },
  { id: 'd2', thread: 'Question about Romans 8', author: 'Michael Chen', group: 'Romans Study', replies: 8, reports: 0, sentiment: 'Neutral', status: 'Active' },
  { id: 'd3', thread: 'Potluck signup for next week', author: 'Anna Martinez', group: 'Women\'s Ministry', replies: 24, reports: 0, sentiment: 'Positive', status: 'Active' },
  { id: 'd4', thread: 'Inappropriate content link', author: 'Unknown', group: 'General', replies: 1, reports: 5, sentiment: 'Negative', status: 'Flagged' },
  { id: 'd5', thread: 'Looking for a mentor', author: 'James White', group: 'Men\'s Fellowship', replies: 4, reports: 0, sentiment: 'Positive', status: 'Active' },
];

export const dashboardMetrics = {
  totalUsers: 1248,
  activeStudies: 12,
  upcomingEvents: 24,
  activeThreads: 342,
};
