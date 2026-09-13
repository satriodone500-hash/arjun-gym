import { DashboardMember, UpcomingClass } from '../types';

export const mockMember: DashboardMember = {
  id: 'member-001',
  name: 'Raka Pratama',
  email: 'raka.pratama@email.com',
  membershipType: 'Pro',
  startDate: '2026-03-15',
  endDate: '2027-03-15',
  checkInCount: 128,
  memberId: 'AGY-2026-0847',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
};

export const upcomingClasses: UpcomingClass[] = [
  {
    id: 'uc-1',
    name: 'Morning HIIT',
    trainer: 'Bayu Pratama',
    time: '06:00 - 07:00',
    date: '2026-09-10',
    location: 'Studio A',
  },
  {
    id: 'uc-2',
    name: 'Muscle Pump',
    trainer: 'Rendi Saputra',
    time: '17:00 - 18:00',
    date: '2026-09-10',
    location: 'Main Floor',
  },
  {
    id: 'uc-3',
    name: 'Power Yoga',
    trainer: 'Sari Dewi',
    time: '07:30 - 08:30',
    date: '2026-09-11',
    location: 'Studio B',
  },
  {
    id: 'uc-4',
    name: 'CrossFit WOD',
    trainer: 'Maya Anggraini',
    time: '18:30 - 19:30',
    date: '2026-09-12',
    location: 'Functional Area',
  },
];

export const checkInHistory = [
  { date: '2026-09-08', time: '06:15' },
  { date: '2026-09-06', time: '17:30' },
  { date: '2026-09-05', time: '06:10' },
  { date: '2026-09-03', time: '18:00' },
  { date: '2026-09-01', time: '07:00' },
  { date: '2026-08-30', time: '16:45' },
  { date: '2026-08-28', time: '06:20' },
  { date: '2026-08-27', time: '17:15' },
];
