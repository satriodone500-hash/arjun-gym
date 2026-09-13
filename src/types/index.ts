export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  badge?: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  image: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Level' | 'Pemula' | 'Menengah' | 'Lanjutan';
  duration: string;
  schedule: string;
  benefits: string[];
}

export interface Trainer {
  id: string;
  name: string;
  specialization: string | string[];
  experience: string;
  image?: string;
  imageUrl?: string;
  bio: string;
  certifications: string[];
  socialMedia: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  image?: string;
  imageUrl?: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image?: string;
  avatarUrl?: string;
  rating: number;
  memberSince: string;
}

export interface GalleryImage {
  id: string;
  src?: string;
  url?: string;
  alt?: string;
  title?: string;
  category: string;
}

export interface ScheduleItem {
  id: string;
  className: string;
  trainer: string;
  time: string;
  duration: string;
  day: string;
  capacity: number;
  enrolled: number;
  level?: string;
}

export interface DashboardMember {
  id: string;
  name: string;
  email: string;
  membershipType: string;
  startDate: string;
  endDate: string;
  checkInCount: number;
  memberId: string;
  photo: string;
}

export interface UpcomingClass {
  id: string;
  name: string;
  trainer: string;
  time: string;
  date: string;
  location: string;
}

export interface StatItem {
  label: string;
  value: string;
  suffix?: string;
  icon: any;
}
