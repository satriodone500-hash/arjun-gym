import { MembershipPlan } from '../types';

export const membershipPlans: MembershipPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 299000,
    period: 'bulan',
    description: 'Paket ideal untuk kamu yang baru mulai perjalanan fitness.',
    features: [
      'Akses gym area',
      'Locker harian',
      'Konsultasi dasar',
      'Akses jam reguler (06:00 - 22:00)',
      'Orientasi gym gratis',
      'Akses shower & toilet',
    ],
    isPopular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 499000,
    period: 'bulan',
    description: 'Paket terlengkap untuk kamu yang serius membentuk tubuh ideal.',
    features: [
      'Akses gym area unlimited',
      'Locker pribadi',
      'Semua fitness class',
      'Konsultasi trainer bulanan',
      'Akses full jam operasional',
      'Program latihan personal',
      'Akses sauna & shower',
      'Diskon 10% suplemen',
    ],
    isPopular: true,
    badge: 'Most Popular',
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 899000,
    period: 'bulan',
    description: 'Pengalaman fitness premium tanpa batas untuk hasil maksimal.',
    features: [
      'Unlimited gym access 24/7',
      'Semua fitness class',
      'Personal trainer 4x/bulan',
      'Body assessment bulanan',
      'Diet plan personal',
      'Locker premium',
      'Akses VIP lounge',
      'Prioritas booking class',
      'Free guest pass 2x/bulan',
      'Diskon 20% suplemen',
    ],
    isPopular: false,
    badge: 'Premium',
  },
];

export const memberships = membershipPlans;
