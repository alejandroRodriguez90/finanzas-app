# 💰 FinanzasApp — Premium Finance App

Una aplicación moderna y de alto nivel de finanzas personales desarrollada con **React**, **TypeScript**, **Vite** y **Tailwind CSS**, con diseño dark premium inspirado en aplicaciones iOS de élite.

---

## ✨ Características Principales

### 🔐 Login Premium iOS-Style
- Diseño dark ultra-premium con paleta **negro profundo + dorado bronce** (`#CBA26C`)
- Logo animado con efecto rotado en diamante
- Campos de email y contraseña con toggle de visibilidad
- Botón **Sign In** con gradiente dorado y sombra elegante
- Inicio de sesión social con **Google**, **GitHub** y **LinkedIn**

### 🧬 Módulo Face ID Biométrico (Estilo Apple)
- Módulo interactivo con **3 estados animados**:
  - **SCANNING** → ícono de Face ID parpadeando (pulse)
  - **PROCESSING** → spinner circular verde neón
  - **UNLOCKED** → checkmark con glow verde `rgba(52,199,89,0.7)`
- Borde dinámico que cambia de color al activarse
- Texto de estado `SCANNING / PROCESSING / UNLOCKED` que se ilumina en secuencia
- Etiqueta "BIOMETRIC AUTHORIZATION" estilo Apple

### 📊 Dashboard Financiero Completo
- Saldo con conversión multi-divisa (USD / EUR)
- Botones de acción: `+ ADD`, `↗ SEND`, `⇆ SWAP`, `••• MORE`
- Historial de transacciones con filtros interactivos
- Gráfico de gastos semanal por categoría

### 💳 Digital Key / Tarjeta 3D
- Tarjeta de débito interactiva con rotación 3D (giroscopio/mouse)
- Efecto flip para ver datos ocultos (CVC, número de tarjeta)
- Controles: Freeze Key y Pagos NFC Contactless

### 🏦 Vinculación Bancaria (tipo Plaid)
- Conexión simulada con bancos: Chase Bank, Bank of America, Revolut Ultra
- System Protocols: 2FA Vault, Biometric Link, Smart Alerts

---

## 📁 Estructura del Proyecto

```
/
├── ios/                      (Proyecto nativo iOS — Capacitor)
├── src/
│   ├── components/           (OrbitLogo, Card3D, Header, FloatingDock, Modals, AnalyticsChart)
│   ├── pages/
│   │   ├── LoginPage.tsx     ← Login dark premium con Face ID biométrico
│   │   ├── DashboardPage.tsx
│   │   ├── DigitalKeyPage.tsx
│   │   ├── ProfileSyncPage.tsx
│   │   └── LinkedBankingPage.tsx
│   ├── styles/               (global.css — glassmorphism, variables, animaciones)
│   ├── utils/                (AppContext.tsx, formatters.ts, mockData.ts)
│   ├── App.tsx
│   └── main.tsx
├── public/
├── capacitor.config.ts       (Configuración Capacitor para iOS)
├── package.json
├── vite.config.ts
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

## 📱 Ejecución en Simulador iOS (Capacitor)

> Requiere **Xcode** instalado desde la Mac App Store.

```bash
# 1. Compilar el proyecto web
npm run build

# 2. Sincronizar con el proyecto iOS nativo
npx cap sync ios

# 3. Correr en simulador con Live Reload
npx cap run ios -l

# Abrir manualmente el Simulador
open -a Simulator
```

---

## 🎨 Paleta de Colores & Diseño

| Token            | Color                     | Uso                          |
|------------------|---------------------------|------------------------------|
| Fondo principal  | `#0A0A0A`                 | Background de pantalla login |
| Card oscura      | `#141415` + blur          | Glassmorphism card           |
| Input oscuro     | `#1C1C1E`                 | Campos de formulario         |
| Dorado bronce    | `#D5AE78` → `#B88B52`    | Botón primario (gradiente)   |
| Acento dorado    | `#CBA26C`                 | Textos, links, focus         |
| Verde biométrico | `#34c759`                 | Face ID / estado activo      |
| Fondo app        | `#070A13` → `#0F1424`    | Dashboard & screens          |
| Acento azul      | `#3B82F6`                 | Elementos de acción          |
| Acento violeta   | `#8B5CF6`                 | Gráficos y acentos           |
| Acento esmeralda | `#10B981`                 | Indicadores positivos        |

**Efectos:** Glassmorphism (`backdrop-filter: blur`), micro-animaciones en Face ID, rotación 3D en tarjeta de débito, transiciones suaves en todos los estados interactivos.

---

## 🛠 Tech Stack

- **React 18** + **TypeScript**
- **Vite** (bundler ultrarrápido)
- **Tailwind CSS** (utilidades de estilo)
- **Lucide React** (íconos)
- **Capacitor** (bridge nativo iOS/Android)
- **@capacitor/ios** (plataforma iOS nativa)
