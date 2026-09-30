import React, { createContext, useContext, useState } from 'react';
import { 
  UserProfile, 
  CardDetails, 
  LinkedBank, 
  Transaction, 
  INITIAL_USER, 
  INITIAL_CARD, 
  INITIAL_BANKS, 
  INITIAL_TRANSACTIONS 
} from './mockData';
import { convertCurrency } from './formatters';

export type ScreenType = 'login' | 'splash' | 'onboarding' | 'dashboard' | 'card' | 'profile' | 'linked-banks' | 'analytics';

interface AppContextType {
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  displayMode: 'device-mockup' | 'desktop';
  setDisplayMode: (mode: 'device-mockup' | 'desktop') => void;
  selectedCurrency: 'COP' | 'USD' | 'EUR';
  setSelectedCurrency: (currency: 'COP' | 'USD' | 'EUR') => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  card: CardDetails;
  setCard: React.Dispatch<React.SetStateAction<CardDetails>>;
  banks: LinkedBank[];
  setBanks: React.Dispatch<React.SetStateAction<LinkedBank[]>>;
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id' | 'date'>) => void;
  addBank: (bankName: string, accountType: string, initialBalance: number) => void;
  totalBalanceCOP: number;
  totalBalanceUSD: number;
  totalBalanceEUR: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  // Modals state
  activeModal: 'none' | 'add' | 'send' | 'swap' | 'link-bank' | 'security' | 'join';
  setActiveModal: (modal: 'none' | 'add' | 'send' | 'swap' | 'link-bank' | 'security' | 'join') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [displayMode, setDisplayMode] = useState<'device-mockup' | 'desktop'>('device-mockup');
  const [selectedCurrency, setSelectedCurrency] = useState<'COP' | 'USD' | 'EUR'>('COP');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [card, setCard] = useState<CardDetails>(INITIAL_CARD);
  const [banks, setBanks] = useState<LinkedBank[]>(INITIAL_BANKS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<'none' | 'add' | 'send' | 'swap' | 'link-bank' | 'security' | 'join'>('none');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const totalBalanceCOP = transactions.reduce((acc, tx) => acc + tx.amount, 73150000);
  const totalBalanceUSD = convertCurrency(totalBalanceCOP, 'COP', 'USD');
  const totalBalanceEUR = convertCurrency(totalBalanceCOP, 'COP', 'EUR');

  const addTransaction = (tx: Omit<Transaction, 'id' | 'date'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}`,
      date: 'Ahora mismo'
    };
    setTransactions([newTx, ...transactions]);
    showToast(`Transacción registrada: ${tx.title}`);
  };

  const addBank = (bankName: string, accountType: string, initialBalance: number) => {
    const newBank: LinkedBank = {
      id: `bank-${Date.now()}`,
      bankName,
      accountType: `${accountType} ****${Math.floor(1000 + Math.random() * 9000)}`,
      accountNumber: `****${Math.floor(1000 + Math.random() * 9000)}`,
      balance: initialBalance,
      currency: selectedCurrency,
      status: 'Activo',
      color: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
      lastSync: 'Ahora mismo'
    };
    setBanks([...banks, newBank]);
    setUser(prev => ({ ...prev, linkedBanksCount: prev.linkedBanksCount + 1 }));
    showToast(`¡Entidad ${bankName} vinculada con éxito!`);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        displayMode,
        setDisplayMode,
        selectedCurrency,
        setSelectedCurrency,
        user,
        setUser,
        card,
        setCard,
        banks,
        setBanks,
        transactions,
        addTransaction,
        addBank,
        totalBalanceCOP,
        totalBalanceUSD,
        totalBalanceEUR,
        toastMessage,
        showToast,
        activeModal,
        setActiveModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de un AppProvider');
  }
  return context;
};
