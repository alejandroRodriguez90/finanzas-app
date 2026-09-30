# Orbit Financial - App de Finanzas Personales

Una aplicación moderna y futurista de finanzas personales desarrollada en **React**, **TypeScript**, **Vite** y **CSS Vanilla** con diseño inspirado en la interfaz celestial de **Orbit Financial**.

![Orbit Financial](public/favicon.png)

## 🌌 Características Principales

1. **Dashboard Financiero Completo**:
   - Saldo actual con conversión instantánea multi-divisa (USD `$24,092.67` / EUR `€7,805.91`).
   - Botones de acción rápida: `+ ADD`, `↗ SEND`, `⇆ SWAP`, `••• MORE`.
   - Sheet blanco flotante con el historial de transacciones ("Flow History").
   - Filtrado interactivo de transacciones (Transferencias, Cambios de divisas, Gastos y Depósitos).

2. **Digital Key / Tarjeta 3D**:
   - Tarjeta de débito/crédito interactiva en 3D con rotación por giroscopio/mouse y efecto flip.
   - Hoja de especificaciones de clave ("Key Specs"): Número de tarjeta, código CVC con visibilidad oculta/visible, fecha de expiración (`08/29`).
   - Controles de seguridad: Congelar tarjeta (Freeze Key) y Pagos Contactless NFC.

3. **Perfil de Usuario & Linked Banking**:
   - Información del usuario (`Henrry Figgs`, `ELITE ORBITAL MEMBER`).
   - **System Protocols**: Bóveda de Seguridad 2FA, Enlace Biométrico (Biometric Link), y Alertas Inteligentes.
   - **Account Nodes / Vinculación Bancaria**: Conexión simulada tipo Plaid con bancos vinculados (Chase Bank, Bank of America, Revolut Ultra) y posibilidad de vincular nuevas cuentas en tiempo real.

4. **Gráfico de Gastos / Orbit Analytics**:
   - Gráfico de barras interactivo con desglose de gastos por día de la semana y desglose por categorías (Transferencias, Tecnología, Movilidad y Servicios).

5. **Modales Interactivos**:
   - Transferencia a contactos / peers.
   - Intercambio de divisas en tiempo real (`USD ➔ EUR`).
   - Recarga e ingreso de fondos.
   - Protocolo de vinculación bancaria.
   - Registro de usuario ("JOIN THE CONSTELLATION").

6. **Doble Modo de Visualización (Responsive & Phone Mockups)**:
   - **Mobile Orbit Frames Mode**: Muestra la interfaz exacta en marquetería de teléfonos móviles como se muestra en la imagen de referencia.
   - **Expanded Desktop View**: Vista panorámica responsiva para navegadores de escritorio.

---

## 📁 Estructura del Proyecto

```
/
├── app/                      (Puente y exportaciones de la aplicación)
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   └── App.js
├── src/                      (Código fuente principal de la aplicación)
│   ├── components/           (OrbitLogo, Card3D, Header, FloatingDock, Modals, AnalyticsChart)
│   ├── pages/                (DashboardPage, DigitalKeyPage, ProfileSyncPage, LinkedBankingPage, OnboardingPage)
│   ├── styles/               (global.css con variables y temas oscuros glassmorphism)
│   ├── utils/                (AppContext.tsx, formatters.ts, mockData.ts)
│   ├── App.tsx
│   └── main.tsx
├── public/                   (Archivos estáticos e íconos)
├── package.json              (Configuración y dependencias)
├── vite.config.ts            (Configuración de Vite)
└── README.md
```

---

## 🚀 Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Construir para producción
npm run build
```

---

## 🎨 Paleta de Colores & Diseño

- **Fondo Espacial**: `#070A13` a `#0F1424` con resplandores radiales índigo/azules.
- **Tarjetas Blancas Superpuestas**: `#FFFFFF` con texto oscuro `#0F172A` y bordes suavemente redondeados (`32px`).
- **Acentos**: Azul Quantum `#3B82F6`, Neón Violeta `#8B5CF6`, Verde Esmeralda `#10B981`.
- **Efectos**: Glassmorphism (`backdrop-filter: blur(16px)`), micro-animaciones en botones e interacciones 3D en la tarjeta de débito.
