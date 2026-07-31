export interface DayScheduleItem {
  time: string;
  title: string;
  gujaratiTitle?: string;
  description: string;
  iconName: string;
  isHighlight?: boolean;
}

export interface DayTheme {
  dayNumber: 1 | 2 | 3;
  dateString: string;
  dayOfWeek: string;
  themeTitle: string;
  gujaratiTheme: string;
  dressCodeTitle: string;
  dressCodeIcon: string;
  bgColorClass: string;
  accentColor: string;
  gradientBg: string;
  badgeBorder: string;
  description: string;
  scriptureChapter: string;
  schedule: DayScheduleItem[];
  driveFolderUrl: string;
  visualImage: string;
}

export interface HighlightVideo {
  id: string;
  title: string;
  gujaratiTitle: string;
  category: 'trailer' | 'docu' | 'kirtan' | 'pravachan';
  duration: string;
  thumbnail: string;
  videoUrl: string;
  speakerOrArtist: string;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: '25years' | 'mandir' | 'parayan' | 'seva';
  imageUrl: string;
  caption: string;
  year?: string;
}

export interface FaqItem {
  id: string;
  category: 'general' | 'dress' | 'food' | 'venue';
  question: string;
  answer: string;
}

export interface RsvpTicket {
  id: string;
  passNumber: string;
  fullName: string;
  phone: string;
  email: string;
  mandalWing: string;
  guestCount: number;
  daysAttending: string[];
  comments?: string;
  createdAt: string;
}