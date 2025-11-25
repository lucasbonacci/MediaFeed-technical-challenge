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
   - `useArticleFavorite`: Hook para gestión de favoritos por artículo
   - `useFavorites`: Hook personalizado para contexto (exportado desde FavoritesContext)

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
- **@d11/react-native-fast-image**: `^8.13.0`
  - Optimización de carga de imágenes
  - Caché de imágenes
  - Priorización de imágenes

### UI/UX

- **react-native-svg**: `^15.15.0`
  - Iconos SVG personalizados

### Internacionalización

- **i18next**: `^25.6.3`
- **react-i18next**: `^16.3.5`
- **react-native-localize**: `^3.6.0`
  - Detección automática del idioma del dispositivo
  - Soporte para múltiples idiomas (español, inglés)
  - Traducciones centralizadas en archivos JSON

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
│   │   ├── languages.ts
│   │   ├── media.ts
│   │   ├── newsApiErrors.ts
│   │   └── storage.ts
│   ├── context/             # Context providers
│   │   ├── FavoritesContext.tsx
│   │   └── __tests__/
│   ├── hooks/               # Custom hooks
│   │   ├── useArticleFavorite.ts
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
│   │   │   ├── components/  # Componentes específicos del feed
│   │   │   │   ├── ErrorState.tsx
│   │   │   │   ├── LoadMoreError.tsx
│   │   │   │   ├── Loading.tsx
│   │   │   │   └── SearchInput.tsx
│   │   │   ├── FeedScreen.tsx
│   │   │   └── __tests__/
│   │   ├── favoritesScreen/
│   │   ├── newDetailScreen/
│   │   │   ├── components/  # Componentes específicos del detalle
│   │   │   │   ├── ArticleBody.tsx
│   │   │   │   ├── ArticleHeader.tsx
│   │   │   │   ├── ArticleImage.tsx
│   │   │   │   ├── ArticleMeta.tsx
│   │   │   │   ├── ReadMoreButton.tsx
│   │   │   │   └── VideoPlayer.tsx
│   │   │   └── NewDetailScreen.tsx
│   │   └── index.ts
│   ├── services/            # Servicios (API, Storage)
│   │   ├── newsApi.ts
│   │   ├── favoritesStorage.ts
│   │   └── __tests__/
│   ├── theme/               # Tema y estilos
│   │   ├── colors.ts
│   │   ├── fonts.ts
│   │   └── index.ts
│   ├── types/               # TypeScript type definitions
│   │   ├── favorites.ts
│   │   ├── languages.ts
│   │   ├── navigation.ts
│   │   └── news.ts
│   ├── i18n/                # Internacionalización
│   │   ├── locales/
│   │   │   ├── en.json
│   │   │   └── es.json
│   │   └── index.ts
│   └── utils/               # Utilidades
│       ├── cleanArticleContent.ts
│       ├── formatDate.ts
│       ├── getDeviceLanguage.ts
│       ├── keyExtractor.ts
│       ├── normalizeUrl.ts
│       ├── openUrl.ts
│       ├── parseNewsApiError.ts
│       ├── parseNewsApiResponse.ts
│       └── translateNewsError.ts
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

- **Sistema de Códigos de Error**: Constantes tipadas en `constants/newsApiErrors.ts`
- **Parsing de Errores**: `parseNewsApiError` para normalizar errores de la API
- **Traducción de Errores**: `translateNewsError` para mensajes localizados
- **Componentes de Error**:
  - `ErrorState`: Para errores principales con opción de reintentar
  - `LoadMoreError`: Para errores en la paginación
- **Try-catch en servicios**: Manejo seguro de errores de red y parsing
- **Error boundaries implícitos**: Con React Query para errores de queries
- **Validación de Respuestas**: Sanitización y validación de datos de la API

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

### Sistema de Tipografía

- Centralizado en `theme/fonts.ts`
- Definición de tamaños, pesos, estilos y line-heights
- Constantes tipadas para consistencia
- Exportación unificada desde `theme/index.ts`

---

## 📊 Métricas y Configuraciones

### React Query Cache

- **staleTime**: 5 minutos (datos considerados frescos)
- **gcTime**: 10 minutos (tiempo en caché antes de GC)
- **retry**: 2 intentos automáticos
- **refetchOnReconnect**: true (refetch al reconectar)
- **refetchOnWindowFocus**: false

### Performance

- **Debounce de búsqueda**: 500ms (optimización de requests)
- **Paginación infinita**: Con `useInfiniteQuery`
- **Optimizaciones de FlatList**:
  - `initialNumToRender`: 10
  - `maxToRenderPerBatch`: 10
  - `windowSize`: 7
  - `removeClippedSubviews`: true
  - `decelerationRate`: Plataforma específica (Android: 0.9, iOS: 1)
- **FastImage**: Caché y optimización de imágenes
- **React.memo**: En componentes como `NewsItem` con comparación personalizada
- **useCallback**: Para funciones pasadas como props

---

## 🔐 Seguridad

- **API Key**: En variables de entorno (react-native-config)
- **Validación de tipos**: TypeScript estricto en todo el proyecto
- **Sanitización de datos**: Validación y sanitización de respuestas de API
- **Manejo seguro de errores**: Try-catch en servicios y validación de datos
- **Validación de datos**: En AsyncStorage con verificación de tipos
- **Normalización de URLs**: Validación y normalización antes de abrir enlaces

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

## 🌐 Internacionalización (i18n)

### Configuración

- **Detección automática**: Usa `react-native-localize` para detectar idioma del dispositivo
- **Idiomas soportados**: Español (es) e Inglés (en)
- **Fallback**: Inglés por defecto
- **Configuración**: `i18n/index.ts` con detector personalizado
- **Archivos de traducción**: JSON en `i18n/locales/`

### Uso

- Hook `useTranslation` de `react-i18next` en componentes
- Claves de traducción organizadas por sección (feed, favorites, article, navigation, errors)
- Interpolación de variables en traducciones
- Traducciones de errores específicos de la API

## 📈 Escalabilidad

### Ventajas de la Arquitectura Actual

1. **Modularidad**: Estructura por features facilita agregar nuevas funcionalidades
2. **Testabilidad**: Separación clara de responsabilidades facilita testing
3. **Mantenibilidad**: Código organizado, tipado y documentado
4. **Reutilización**: Hooks y componentes reutilizables
5. **Performance**: Optimizaciones implementadas (memo, debounce, FastImage)
6. **Internacionalización**: Sistema i18n preparado para múltiples idiomas
7. **Manejo de errores**: Sistema robusto y traducible
8. **Type Safety**: TypeScript estricto en todo el proyecto

## 🎬 Características Adicionales

### Video Player

- Componente `VideoPlayer` para reproducir videos en artículos
- Soporte para URLs de video opcionales
- Fallback a video de ejemplo si no hay URL
- Poster image para preview
- Controles nativos del reproductor

### Optimización de Imágenes

- Uso de `FastImage` en lugar de `Image` nativo
- Caché automático de imágenes
- Priorización de imágenes (high priority)
- Placeholder para imágenes faltantes

### Utilidades

El proyecto incluye un conjunto completo de utilidades en `src/utils/` para manejar diferentes aspectos de la aplicación:

#### Manejo de Datos de la API

- **parseNewsApiResponse**:

  - Parsea y sanitiza las respuestas de la API de noticias
  - Valida la estructura de la respuesta (debe ser objeto con array de articles)
  - Sanitiza strings requeridos y opcionales con funciones helper
  - Aplica valores por defecto para campos requeridos (ej: 'Untitled' para títulos vacíos)
  - Valida y sanitiza cada artículo del array
  - Maneja campos opcionales como `videoUrl`
  - Lanza errores descriptivos si la respuesta es inválida

- **parseNewsApiError**:

  - Parsea errores de la API de noticias
  - Extrae código de error y mensaje del body de la respuesta
  - Asigna el status HTTP al error
  - Normaliza códigos de error a tipos tipados (`NewsApiErrorCode`)
  - Asigna 'unknownError' como fallback si no hay código válido
  - Retorna un `NewsApiError` tipado con código, mensaje y status

- **getNewsErrorMessage** (translateNewsError):
  - Traduce mensajes de error a mensajes localizados
  - Valida que el código de error sea uno de los códigos soportados
  - Usa i18next para obtener traducciones desde `errors.newsApi.{code}`
  - Maneja errores desconocidos con fallback a 'unknownError'
  - Type-safe con validación de tipos de códigos de error

#### Manejo de URLs

- **normalizeUrl**:

  - Normaliza y valida URLs antes de usarlas
  - Intenta crear un objeto URL válido
  - Si falta el protocolo, intenta agregar 'https://' automáticamente
  - Retorna `null` si la URL no puede ser normalizada
  - Útil para prevenir errores al abrir enlaces

- **openUrl**:
  - Abre URLs de forma segura usando `Linking` de React Native
  - Normaliza la URL antes de abrirla usando `normalizeUrl`
  - Maneja errores silenciosamente (solo log en consola)
  - No lanza excepciones si la URL es inválida

#### Formateo y Limpieza de Contenido

- **formatDate**:

  - Objeto con métodos para formatear fechas con detección automática de idioma
  - **Detección automática**: Usa `getDeviceLanguage()` para detectar el idioma del dispositivo
  - **Mapeo de idiomas**: Convierte códigos de idioma a locales (`es` → `es-ES`, `en` → `en-US`)
  - `short(dateString, locale?)`: Formato corto de fecha (ej: "15/01/2024" para es-ES, "01/15/2024" para en-US)
    - Locale por defecto: Detectado automáticamente del dispositivo
    - Si no se proporciona locale, usa el idioma del dispositivo
  - `full(dateString, locale?)`: Formato completo con fecha y hora
    - Incluye año, mes completo, día, hora y minutos
    - Locale por defecto: Detectado automáticamente del dispositivo
    - Formato localizado según el idioma del dispositivo
  - Usa `toLocaleDateString` nativo del navegador con locale apropiado
  - Integración con sistema de i18n: Respeta el idioma configurado en la app

- **cleanArticleContent**:
  - Limpia el contenido de artículos removiendo patrones de truncamiento
  - Elimina patrones como `[+123 chars]` que indican contenido truncado
  - Retorna `null` si el contenido está vacío o no es string
  - Útil para mostrar contenido limpio al usuario

#### Utilidades de UI y Datos

- **keyExtractor**:

  - Genera keys únicas para items en listas (FlatList)
  - Combina la URL del artículo con el índice
  - Formato: `"{url}-{index}"`
  - Asegura keys estables para optimización de React

- **getDeviceLanguage**:
  - Detecta el idioma del dispositivo usando `react-native-localize`
  - Obtiene el código de idioma del primer locale del dispositivo
  - Valida que el idioma esté en la lista de idiomas soportados
  - Retorna 'en' como fallback si el idioma no está soportado
  - Usado para configurar i18n y para queries de la API
