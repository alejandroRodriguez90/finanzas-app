export interface Transaction {
  id: string;
  title: string;
  category: string;
  type: 'swap' | 'transfer' | 'payment' | 'income';
  amount: number;
  currency: 'COP' | 'USD' | 'EUR';
  convertedInfo?: string;
  date: string;
  method: string;
  iconType: 'swap' | 'user' | 'car' | 'tech' | 'income' | 'coffee' | 'entertainment';
  avatarUrl?: string;
}

export interface LinkedBank {
  id: string;
  bankName: string;
  accountType: string;
  accountNumber: string;
  balance: number;
  currency: string;
  status: 'Activo' | 'Sincronizando' | 'Acción Requerida';
  color: string;
  lastSync: string;
}

export interface UserProfile {
  name: string;
  email: string;
  membership: string;
  avatarInitials: string;
  biometricEnabled: boolean;
  securityVaultActive: boolean;
  notificationsEnabled: boolean;
  linkedBanksCount: number;
}

export interface CardDetails {
  number: string;
  cvc: string;
  expiry: string;
  holder: string;
  type: string;
  isFrozen: boolean;
  contactless: boolean;
  onlineLimit: number;
}

export const INITIAL_USER: UserProfile = {
  name: 'Alejandro Rodriguez',
  email: 'alejandro@orbit.io',
  membership: 'MIEMBRO ELITE ORBITAL',
  avatarInitials: 'A',
  biometricEnabled: true,
  securityVaultActive: true,
  notificationsEnabled: true,
  linkedBanksCount: 3,
};

export const INITIAL_CARD: CardDetails = {
  number: '5231 7252 1769 8152',
  cvc: '678',
  expiry: '08/29',
  holder: 'ALEJANDRO RODRIGUEZ',
  type: 'DÉBITO',
  isFrozen: false,
  contactless: true,
  onlineLimit: 20000000,
};

export const INITIAL_BANKS: LinkedBank[] = [
  {
    id: 'bank-1',
    bankName: 'Bancolombia',
    accountType: 'Cuenta de Ahorros ****9412',
    accountNumber: '****9412',
    balance: 74200000,
    currency: 'COP',
    status: 'Activo',
    color: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
    lastSync: 'Ahora mismo'
  },
  {
    id: 'bank-2',
    bankName: 'Banco de Bogotá',
    accountType: 'Cuenta Corriente ****3091',
    accountNumber: '****3091',
    balance: 16500000,
    currency: 'COP',
    status: 'Activo',
    color: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)',
    lastSync: 'Hace 5m'
  },
  {
    id: 'bank-3',
    bankName: 'Nequi / Daviplata',
    accountType: 'Billetera Digital ****7820',
    accountNumber: '****7820',
    balance: 4750000,
    currency: 'COP',
    status: 'Activo',
    color: 'linear-gradient(135deg, #312E81 0%, #4338CA 100%)',
    lastSync: 'Hace 12m'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    title: 'USD ➔ EUR',
    category: 'Protocolo de Moneda',
    type: 'swap',
    amount: 8300000,
    currency: 'COP',
    convertedInfo: '= €1,727.08',
    date: 'Hoy, 14:32',
    method: 'Sincronización Protocolo',
    iconType: 'swap'
  },
  {
    id: 'tx-2',
    title: 'Luisa Castillo',
    category: 'Transferencia a pares',
    type: 'transfer',
    amount: -310000,
    currency: 'COP',
    date: 'Hoy, 11:15',
    method: 'Clave Débito',
    iconType: 'user',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'tx-3',
    title: 'Uber Viaje',
    category: 'Tránsito y Movilidad',
    type: 'payment',
    amount: -142000,
    currency: 'COP',
    date: 'Ayer, 19:40',
    method: 'Clave Débito',
    iconType: 'car'
  },
  {
    id: 'tx-4',
    title: 'Apple Store',
    category: 'Hardware y Tecnología',
    type: 'payment',
    amount: -5390000,
    currency: 'COP',
    date: '27 Sep, 2026',
    method: 'Clave Digital',
    iconType: 'tech'
  },
  {
    id: 'tx-5',
    title: 'Stripe Inc.',
    category: 'Pago Freelance',
    type: 'income',
    amount: 20120000,
    currency: 'COP',
    date: '25 Sep, 2026',
    method: 'Giro Internacional',
    iconType: 'income'
  },
  {
    id: 'tx-6',
    title: 'Netflix Premium',
    category: 'Suscripciones',
    type: 'payment',
    amount: -82900,
    currency: 'COP',
    date: '24 Sep, 2026',
    method: 'Clave Digital',
    iconType: 'entertainment'
  },
  {
    id: 'tx-7',
    title: 'Starbucks Reserve',
    category: 'Restaurantes y Café',
    type: 'payment',
    amount: -35500,
    currency: 'COP',
    date: '22 Sep, 2026',
    method: 'Clave Débito',
    iconType: 'coffee'
  }
];

export const EXPENSE_ANALYTICS_DATA = [
  { day: 'Lun', amount: 600000, income: 1600000 },
  { day: 'Mar', amount: 1300000, income: 600000 },
  { day: 'Mié', amount: 310000, income: 5000000 },
  { day: 'Jue', amount: 1700000, income: 800000 },
  { day: 'Vie', amount: 3600000, income: 20120000 },
  { day: 'Sáb', amount: 950000, income: 1200000 },
  { day: 'Dom', amount: 740000, income: 0 }
];

export const CATEGORY_BREAKDOWN = [
  { name: 'Protocolo y Cambios', percentage: 42, color: '#3B82F6', amount: '$8.300.000 COP' },
  { name: 'Hardware y Tecnología', percentage: 28, color: '#8B5CF6', amount: '$5.390.000 COP' },
  { name: 'Tránsito y Movilidad', percentage: 15, color: '#10B981', amount: '$142.000 COP' },
  { name: 'Servicios y Café', percentage: 15, color: '#F59E0B', amount: '$118.400 COP' }
];
