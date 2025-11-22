# 📐 Arquitectura y Detalles Técnicos - MediaFeed

## 🏗️ Arquitectura del Proyecto

### Tipo de Arquitectura

El proyecto **MediaFeed** utiliza una **Arquitectura Híbrida** que combina:

1. **Arquitectura por Capas (Layered Architecture)**
2. **Arquitectura Basada en Características (Feature-Based Architecture)**
3. **Arquitectura Component-Based (React)**

### Estructura de Capas

```
┌─────────────────────────────────────┐
│     Presentation Layer              │
│  (Screens, Components, Navigation)  │
├─────────────────────────────────────┤
│     Business Logic Layer            │
│  (Hooks, Context, Custom Logic)     │
├─────────────────────────────────────┤
│     Data Layer                      │
│  (Services, API, Storage)           │
├─────────────────────────────────────┤
│     Infrastructure Layer            │
│  (React Native, Native Modules)    │
└─────────────────────────────────────┘
```

### Patrones de Diseño Implementados

1. **Container/Presentational Pattern**

   - Screens actúan como containers (lógica)
   - Components son presentacionales (UI)

2. **Custom Hooks Pattern**

   - `useNewsFeed`: Lógica de fetching y paginación
   - `useDebounce`: Optimización de búsquedas
   - `useFavorites`: Hook personalizado para contexto

3. **Provider Pattern**

   - `FavoritesProvider`: Gestión global de favoritos
   - `QueryClientProvider`: Gestión de estado del servidor

4. **Service Layer Pattern**

   - Separación de lógica de negocio y acceso a datos
   - `newsApi.ts`: Servicio de API
   - `favoritesStorage.ts`: Servicio de persistencia

5. **Repository Pattern (implícito)**
   - Los servicios actúan como repositorios abstractos

---

## 📦 Stack Tecnológico

### Core Framework

- **React Native**: `0.82.1`
- **React**: `19.1.1`
- **TypeScript**: `5.8.3`

### Navegación

- **@react-navigation/native**: `^7.1.20`
- **@react-navigation/stack**: `^7.6.4`
- **@react-navigation/bottom-tabs**: `^7.8.5`
- **react-native-gesture-handler**: `^2.29.1`
- **react-native-screens**: `^4.18.0`
- **react-native-safe-area-context**: `^5.5.2`

### Gestión de Estado

#### Estado del Servidor (Server State)

- **@tanstack/react-query**: `^5.90.10`
  - Configuración:
    - `staleTime`: 5 minutos
    - `gcTime`: 10 minutos (anteriormente cacheTime)
    - `retry`: 2 intentos
    - `refetchOnReconnect`: true
    - `refetchOnWindowFocus`: false

#### Estado del Cliente (Client State)

- **React Context API**: Para favoritos globales
- **React Hooks**: useState, useEffect, useCallback para estado local

### Persistencia de Datos

- **@react-native-async-storage/async-storage**: `^2.2.0`
  - Almacenamiento local de favoritos
  - Persistencia asíncrona

### Multimedia

- **react-native-video**: `^6.18.0`
  - Reproducción de videos en artículos

### UI/UX

- **react-native-svg**: `^15.15.0`
  - Iconos SVG personalizados

### Configuración

- **react-native-config**: `^1.6.0`
  - Variables de entorno

### Testing

- **Jest**: `^29.6.3`
- **@testing-library/react-native**: `^13.3.3`
- **@testing-library/jest-native**: `^5.4.3`
- **react-test-renderer**: `19.1.1`

### Desarrollo

- **ESLint**: `^8.19.0`
- **Prettier**: `2.8.8`
- **Babel**: Con module-resolver para path aliases

---

## 🗂️ Estructura de Directorios

```
MediaFeed/
├── src/
│   ├── assets/              # Recursos estáticos (SVG icons)
│   ├── components/          # Componentes reutilizables
│   │   ├── EmptyList.tsx
│   │   ├── NewsItem.tsx
│   │   └── __tests__/
│   ├── config/              # Configuraciones (React Query)
│   ├── constants/           # Constantes de la aplicación
│   │   ├── api.ts
│   │   ├── media.ts
│   │   └── storage.ts
│   ├── context/             # Context providers
│   │   ├── FavoritesContext.tsx
│   │   └── __tests__/
│   ├── hooks/               # Custom hooks
│   │   ├── useDebounce.ts
│   │   ├── useNewsFeed.ts
│   │   └── __tests__/
│   ├── navigation/           # Configuración de navegación
│   │   ├── Application.tsx
│   │   ├── BottomTabs.tsx
│   │   ├── NavigationService.ts
│   │   └── paths.ts
│   ├── screens/             # Pantallas de la aplicación
│   │   ├── feedScreen/
│   │   ├── favoritesScreen/
│   │   ├── newDetailScreen/
│   │   └── index.ts
│   ├── services/            # Servicios (API, Storage)
│   │   ├── newsApi.ts
│   │   ├── favoritesStorage.ts
│   │   └── __tests__/
│   ├── theme/               # Tema y estilos
│   │   └── colors.ts
│   ├── types/               # TypeScript type definitions
│   │   ├── favorites.ts
│   │   ├── navigation.ts
│   │   └── news.ts
│   └── utils/               # Utilidades
│       └── listHelpers.ts
├── android/                 # Código nativo Android
├── ios/                     # Código nativo iOS
├── App.tsx                  # Entry point
├── index.js                 # Registro de la app
└── package.json
```

---

## 🎯 Características Arquitectónicas Clave

### 1. Separación de Responsabilidades

- **Screens**: Orquestación y lógica de presentación
- **Components**: UI pura y reutilizable
- **Hooks**: Lógica de negocio reutilizable
- **Services**: Acceso a datos (API y Storage)
- **Context**: Estado global compartido

### 2. Gestión de Estado Dual

#### Server State (React Query)

- Caché automático
- Refetch inteligente
- Paginación infinita
- Gestión de errores
- Estados de carga

#### Client State (Context API)

- Favoritos persistentes
- Estado sincronizado con AsyncStorage
- Optimistic updates

### 3. Optimizaciones de Rendimiento

- **React.memo**: En componentes como `NewsItem`
- **useCallback**: Para funciones pasadas como props
- **useDebounce**: Para búsquedas (500ms)
- **FlatList optimizations**:
  - `initialNumToRender`: 10
  - `maxToRenderPerBatch`: 10
  - `windowSize`: 7
  - `removeClippedSubviews`: true

### 4. Type Safety

- TypeScript en todo el proyecto
- Tipos estrictos para:
  - Navigation (RootStackParamList)
  - API responses (NewsApiResponse)
  - Favorites (FavoriteArticle)
  - Component props

### 5. Path Aliases

- Configuración en `tsconfig.json` y `babel.config.js`
- Uso de `@/` para imports absolutos
- Mejora la legibilidad y mantenibilidad

---

## 🧪 Testing Strategy

### Configuración de Jest

- **Preset**: `react-native`
- **Coverage Threshold**: 40% (branches, functions, lines, statements)
- **Module Mapper**: Path aliases configurados
- **Setup Files**: `jest.setup.js`

### Cobertura de Tests

- Componentes: `NewsItem`, `EmptyList`
- Hooks: `useDebounce`
- Context: `FavoritesContext`
- Services: `favoritesStorage`
- Screens: `FeedScreen`

---

## 🔌 Integración con APIs

### NewsAPI Integration

- **Endpoint**: `/everything`
- **Método**: GET
- **Autenticación**: Header `X-Api-Key`
- **Parámetros**:
  - `q`: Query de búsqueda
  - `sortBy`: popularity
  - `pageSize`: Configurable (default en constants)
  - `page`: Para paginación

### Manejo de Errores

- Try-catch en servicios
- Error boundaries implícitos con React Query
- Estados de error en UI (`ErrorState` component)

---

## 💾 Persistencia Local

### AsyncStorage

- **Clave**: Configurada en `constants/storage.ts`
- **Formato**: JSON serializado
- **Datos**: Array de `FavoriteArticle`
- **Operaciones**:
  - `getStoredFavorites()`: Lectura
  - `setStoredFavorites()`: Escritura

### Sincronización

- Carga inicial en `FavoritesProvider` useEffect
- Actualización inmediata en memoria
- Persistencia asíncrona en background

---

## 🧭 Navegación

### Estructura de Navegación

```
Application (Stack Navigator)
├── Main (Bottom Tabs)
│   ├── FeedScreen
│   └── FavoritesScreen
└── NewDetailScreen (Stack)
```

### Navigation Service

- Patrón Singleton para navegación programática
- `NavigationService.navigate()`
- `NavigationService.goBack()`
- Type-safe con TypeScript

---

## 🎨 Theming

### Sistema de Colores

- Centralizado en `theme/colors.ts`
- Consistencia en toda la aplicación
- Soporte para dark mode (preparado)

---

## 📊 Métricas y Configuraciones

### React Query Cache

- **staleTime**: 5 minutos (datos considerados frescos)
- **gcTime**: 10 minutos (tiempo en caché antes de GC)
- **retry**: 2 intentos automáticos
- **refetchOnReconnect**: true (refetch al reconectar)

### Performance

- Debounce de búsqueda: 500ms
- Paginación infinita con `useInfiniteQuery`
- Optimizaciones de FlatList

---

## 🔐 Seguridad

- API Key en variables de entorno (react-native-config)
- Validación de tipos en runtime (TypeScript)
- Manejo seguro de errores en servicios
- Validación de datos en AsyncStorage

---

## 📱 Plataformas Soportadas

- **iOS**: Nativo con Swift/Objective-C
- **Android**: Nativo con Kotlin/Java

---

## 🚀 Build y Deployment

### Scripts Disponibles

- `npm start`: Metro Bundler
- `npm run android`: Build y run Android
- `npm run ios`: Build y run iOS
- `npm test`: Ejecutar tests
- `npm run lint`: Linter

### Requisitos

- Node.js: >= 20 (recomendado 22.20.0)
- Java: >= 17
- Xcode (iOS)
- Android Studio (Android)

---

## 📈 Escalabilidad

### Ventajas de la Arquitectura Actual

1. **Modularidad**: Fácil agregar nuevas features
2. **Testabilidad**: Separación clara facilita testing
3. **Mantenibilidad**: Código organizado y tipado
4. **Reutilización**: Hooks y componentes reutilizables
5. **Performance**: Optimizaciones implementadas
