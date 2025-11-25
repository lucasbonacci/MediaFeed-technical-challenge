# MediaFeed

Aplicación React Native para visualizar y gestionar un feed de noticias con videos.

## 🎥 Demo de la App

Haz clic en la imagen para ver el video completo.

[![Demo Preview](./src/assets/demo/demo.png)](./src/assets/demo/demo.mp4)

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**: Versión 22.20.0 (recomendado)
- **Java**: Versión 17 o superior
- **Xcode** (para iOS): Última versión estable
- **Android Studio** (para Android): Última versión estable

## 🚀 Cómo Correr el Proyecto

### 1. En la raíz del proyecto, crea un archivo `.env` con las siguientes variables:

> **Nota:** Si descargaste el proyecto desde el archivo comprimido enviado, el archivo `.env` ya está incluido en la carpeta.  
> Si estás clonando el repositorio desde cero, entonces debes crearlo manualmente.

```env
NEWS_API_BASE_URL=https://newsapi.org/v2
NEWS_API_KEY=TU_API_KEY_DE_NEWSAPI
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configuración para iOS

Si vas a correr el proyecto en iOS, necesitas instalar las dependencias de CocoaPods:

```bash
cd ios
pod install
cd ..
```

### 4. Iniciar Metro Bundler

En una terminal, ejecuta:

```bash
npm start
```

### 5. Ejecutar la Aplicación

#### Android

En una nueva terminal:

```bash
npm run android
```

#### iOS

En una nueva terminal:

```bash
npm run ios
```

## 🧪 Testing

Para ejecutar los tests:

```bash
npm test
```

## 1. Qué partes del desarrollo resolví con ayuda de IA y cuáles de manera manual

Utilicé herramientas de IA en prácticamente todas las partes del desarrollo: creación de iconos, tests, navegación, screens, hooks, etc. La clave estuvo en describir muy bien en los prompts qué necesitaba y cómo lo necesitaba. Algunas cosas, como la creación de iconos SVG o la generación de tests, la IA las resuelve muy bien. En otros casos, como las vistas, la IA tiende a generar todo en un solo archivo mezclando UI, lógica y datos. Ahí entra la experiencia del programador: modularizar, extraer lógica, separar responsabilidades, eliminar código repetitivo y ajustar estilos para lograr un código más legible, reutilizable y mantenible.

## 2. Prompts que usé y cómo me ayudó la IA en el proceso

Algunos ejemplos de los prompts que utilicé:

- **Instalación de librerías de navegación y generación de archivos base**

  Pedí instalar @react-navigation/native, @react-navigation/bottom-tabs, @react-navigation/stack y generar:

  - Application.tsx: core de la app
  - BottomTabs.tsx: vistas principales "feed" y "favorites"
  - NavigationService.ts: con funciones navigate y goBack
  - paths.ts: enum con rutas de navegación

  Además, le pedí que genere las tres vistas ("feed", "favorites" y "newDetails") sin lógica, solo la estructura.

- **Generación de iconos SVG**

  Le pedí crear tres archivos SVG (flecha, lista y estrella con soporte para outline/solid color). También instalar las librerías necesarias para renderizarlos.

- **Generación de hooks**

  Por ejemplo, un prompt para crear useDebounce dentro de la carpeta /hooks.

- **Generación de tests**

  Prompt pidiendo un archivo de test para FeedScreen.tsx, cubriendo todos los branches:

  - loading sin datos
  - error sin datos
  - datos disponibles
  - lista vacía

Estos prompts me sirvieron como punto de partida, y después fui adaptando y mejorando el código generado.

## 3. Qué decisiones técnicas tomé y por qué

Decidí utilizar una arquitectura híbrida basada en capas + features, porque permite una separación clara de responsabilidades y facilita que el proyecto escale de manera ordenada. Organicé la app en capas de Presentación, Lógica de Negocio y Datos para mantener el código limpio, reutilizable y fácil de testear.

Elegí React Query para manejar el server state porque el proyecto requiere infinite scroll, manejo de caché, estados de carga y reintentos automáticos. React Query simplifica muchísimo la lógica de fetching y paginación, reduce código repetitivo y brinda una experiencia fluida gracias al cacheo inteligente y al refetch automático.

Para el estado local usé React Context, ya que la feature de favoritos es simple y no justifica librerías más pesadas como Redux o Zustand. React Context es liviano, viene integrado en React y, combinado con un custom hook (useFavorites), permite una manera simple de utilizarlo. Integrándolo con AsyncStorage logré persistencia sin complicaciones.

Extraje la lógica en custom hooks (useNewsFeed, useDebounce, useFavorites) para mantener las pantallas limpias y seguir el patrón Container/Presentational, facilitando reutilización y testeo.

Implementé una capa de servicios para separar el acceso a la API (newsApi.ts) y la persistencia local (favoritesStorage.ts), permitiendo modificar o extender la lógica de datos sin afectar otras capas.

Por último, tomé decisiones de rendimiento, especialmente en las listas: configuraciones optimizadas de FlatList, uso de debounce, memoización y windowing ajustado. Esto mejoró la fluidez del scroll y redujo el consumo de memoria.

## 4. Cómo validé que el código cumple con lo pedido y es de calidad

Para asegurarme de que el código cumpliera con lo solicitado:

- Revisé los requerimientos funcionales de la consigna y validé manualmente todos los flujos principales.
- Implementé tests con Jest y Testing Library para servicios, hooks y componentes.
- Usé TypeScript para garantizar consistencia y evitar errores en tiempo de desarrollo.
- Utilicé ESLint y Prettier para mantener el código ordenado, limpio y estandarizado.
- Verifiqué la separación de capas y responsabilidades conforme a la arquitectura definida.

## 5. Si usaste código sugerido por IA, qué adaptaciones le hiciste y por qué

En muchos casos la IA generaba código funcional, pero mezclaba UI, lógica y datos en el mismo archivo. Para mantener la arquitectura definida, adapté ese código separándolo en:

- componentes presentacionales
- lógica encapsulada en hooks
- acceso a datos en servicios

También eliminé partes repetitivas, mejoré la legibilidad, ajusté estilos, modularicé las vistas y adapté el código para respetar la estructura de carpetas y la arquitectura del proyecto. Esto resultó en un código mucho más mantenible, coherente y escalable.

## ¿Qué desafíos encontraste durante el desarrollo y cómo los resolviste?

Durante el desarrollo no tuve grandes desafíos a nivel lógica o arquitectura, ya que el proyecto es relativamente acotado y pude resolver cada parte de forma fluida. El principal desafío técnico que enfrenté fue que mi entorno de Android estaba desactualizado: tenía una versión vieja de Android Studio y del SDK, y React Native 0.82 exige herramientas más modernas. Para resolverlo, actualicé Android Studio, instalé los SDKs necesarios y ajusté las configuraciones del proyecto para que compile correctamente con la nueva versión. Una vez actualizado el entorno, todo funcionó sin problemas y pude continuar el desarrollo sin bloqueos.
