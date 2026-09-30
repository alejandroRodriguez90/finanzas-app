// Utilidades de formato para Orbit Financial App (Pesos Colombianos COP & Multidivisa)

export const formatCurrency = (amount: number, currency: string = 'COP'): string => {
  const absAmount = Math.abs(amount);
  
  if (currency === 'COP') {
    // Formato estándar colombiano: $ 95.450.000 COP
    const formatted = Math.round(absAmount).toLocaleString('es-CO');
    const sign = amount < 0 ? '-' : '';
    return `${sign}$${formatted} COP`;
  }

  const symbolMap: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£'
  };

  const symbol = symbolMap[currency] || '$';
  const formatted = absAmount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const sign = amount < 0 ? '-' : '';
  return `${sign}${symbol}${formatted}`;
};

export const formatCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\D/g, '');
  return cleaned.replace(/(.{4})/g, '$1 ').trim();
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-CO', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const convertCurrency = (amount: number, from: string, to: string): number => {
  // Conversión con tasas relativas a COP (1 USD = 4150 COP, 1 EUR = 4550 COP)
  const ratesInCOP: Record<string, number> = {
    COP: 1,
    USD: 4150,
    EUR: 4550,
    GBP: 5300
  };

  const amountInCOP = amount * (ratesInCOP[from] || 1);
  return amountInCOP / (ratesInCOP[to] || 1);
};
