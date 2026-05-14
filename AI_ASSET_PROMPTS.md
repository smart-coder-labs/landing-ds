# AI Asset Prompts — Apple Design System Landing

Prompts organizados por herramienta y sección de la página.
Todos los assets deben ir en `public/assets/`.

---

## Herramientas recomendadas

| Asset | Herramienta |
|-------|-------------|
| Imágenes estáticas | Midjourney v6, DALL·E 3, Ideogram 2 |
| Videos / loops | Sora, Runway Gen-3, Kling 1.6 |
| Animaciones vectoriales | LottieFiles AI, Jitter |
| Fondos 3D | Spline AI |

---

## 1. Hero Section

### 1a. Fondo hero — imagen estática
**Usar en:** `HeroSection.tsx` como `background-image`
**Archivo sugerido:** `public/assets/hero-bg.jpg`

```
Ultra-minimal abstract background for a premium Apple-inspired design system website.
Soft light gray (#f5f5f7) base with extremely subtle radial gradient in the center fading
from a very pale electric blue (#e8f0ff) to transparent. Clean, breathable, no texture,
no noise, no grain. The gradient is barely perceptible — sophisticated and restrained.
Aspect ratio 16:9, 2560x1440px. Style: Apple.com homepage background, 2024.
No text, no UI elements, no people.
```

---

### 1b. Fondo hero — video loop (dark mode)
**Usar en:** `HeroSection.tsx` como `<video autoPlay muted loop playsInline>`
**Archivo sugerido:** `public/assets/hero-dark-loop.mp4`

```
Seamless 6-second loop video. Pure black background (#000000). Extremely slow-moving,
barely visible aurora-like light streams in deep electric blue (#0a84ff) and soft purple
(#5e5ce6). Opacity very low — 8 to 12% maximum. No sharp edges, everything blurred and
diffused. The motion is slow and organic, like light refracting through deep water.
No flicker, no hard cuts. Suitable as a dark mode website background.
Cinematic quality, 1920x1080, 24fps.
```

---

### 1c. Ilustración hero — dispositivos flotantes
**Usar en:** `HeroSection.tsx` al lado del texto, sección derecha
**Archivo sugerido:** `public/assets/hero-devices.png`

```
Product illustration: three floating UI cards from a React design system, rendered in
isometric 3D perspective. Apple-style visual language. Each card shows a different
UI component: one shows a Button component, one shows a Card with glassmorphism effect,
one shows a Toggle/Switch. Cards float at different heights with subtle drop shadows.
Background: transparent (PNG). Colors: white cards on transparent, accent blue #007aff
for interactive elements. Style: Apple developer documentation illustration, clean,
geometric, no gradients on the cards themselves. 2048x1536px.
```

---

## 2. Features Section

### 2a. Icono animado — Component Library
**Usar en:** feature card "Component Library"
**Archivo sugerido:** `public/assets/lottie/components.json`

```
[LottieFiles AI prompt]
Minimal line-art animation. A 3x3 grid of small squares. Each square lights up
sequentially with a soft blue fill (#007aff), one by one, forming a complete grid.
Then the grid gently pulses once and resets. Loop duration: 2.5 seconds.
Style: SF Symbols / Apple icon aesthetic. Stroke weight: 1.5px. Colors: #1d1d1f
stroke on white, highlight in #007aff. 128x128px canvas.
```

---

### 2b. Icono animado — Dark Mode
**Usar en:** feature card "Dark Mode"
**Archivo sugerido:** `public/assets/lottie/darkmode.json`

```
[LottieFiles AI prompt]
A sun icon morphs smoothly into a moon icon over 1.2 seconds using a fluid shape
morph. No rotation — pure shape interpolation. The sun rays dissolve as the crescent
appears. Color transitions from warm amber (#ff9500) to cool blue-white (#e0e8ff).
Easing: Apple spring curve (ease-out elastic). Canvas 128x128px. Loop once then hold.
```

---

### 2c. Icono animado — Animations / Spring Physics
**Usar en:** feature card "Animations"
**Archivo sugerido:** `public/assets/lottie/spring.json`

```
[LottieFiles AI prompt]
A small circle bounces with a spring physics simulation. It drops from the top of the
canvas, hits the bottom, bounces with decreasing amplitude (3 bounces), then settles.
Simultaneously a sine wave draws itself underneath the circle tracing its path.
Colors: #007aff circle, #007aff/30 wave. Duration: 2 seconds, then loops. 128x128px.
```

---

## 3. Components Gallery

### 3a. Background sección — gradient sutil
**Usar en:** `ComponentsGallery.tsx` como `background-image`
**Archivo sugerido:** `public/assets/gallery-bg.jpg`

```
Minimal flat background for a UI component showcase section. Very light warm gray
(#fafafa) with an extremely subtle diagonal gradient from top-left to bottom-right,
barely shifting 3% in luminosity. No texture. Seamlessly tileable. 1920x1080px.
The effect should be nearly invisible but add depth compared to pure white.
Style: Stripe.com or Linear.app documentation background.
```

---

### 3b. Video — Component interaction demo
**Usar en:** `ComponentsGallery.tsx` como demo preview
**Archivo sugerido:** `public/assets/components-demo.mp4`

```
Screen recording style video (but AI-generated). Shows a clean web UI on a white
background. A cursor moves and interacts with Apple-style UI components in sequence:
1. Hovers over a blue pill-shaped Button — it subtly scales up 2%
2. Clicks a Toggle/Switch — it slides smoothly to ON state with haptic-feel animation
3. Opens a Card component — it fades in with a 12px upward slide
4. Types in an Input field — text appears character by character
All animations use spring physics. Background: #f5f5f7. Duration: 8 seconds loop.
No text labels, no mouse cursor visible, just the components reacting.
1920x1080, 60fps.
```

---

## 4. Showcase Section

### 4a. Mockup — MacBook con el DS
**Usar en:** `ShowcaseSection.tsx` como imagen principal
**Archivo sugerido:** `public/assets/macbook-mockup.png`

```
Photorealistic MacBook Pro 16" (Space Black) displayed at a slight 15-degree angle,
screen facing viewer. On the screen: a clean web interface showing a design system
component library with a dark sidebar on the left listing component names, and a main
content area showing a Card component with glassmorphism effect. The UI uses Apple's
design language — SF Pro font, #007aff blue accents, dark mode (#1c1c1e background).
Studio lighting, soft shadows, transparent background (PNG). 2400x1600px.
Hyperrealistic product photography style.
```

---

### 4b. Mockup — iPhone mostrando componentes mobile
**Usar en:** `ShowcaseSection.tsx` al lado del MacBook
**Archivo sugerido:** `public/assets/iphone-mockup.png`

```
Photorealistic iPhone 16 Pro (Natural Titanium) held at a natural slight tilt,
Dynamic Island visible. Screen shows a mobile app built with Apple-style components:
a list of UI components with their names, small preview thumbnails, and a search bar
at the top. Light mode. Clean, minimal UI. Studio lighting, white bounce cards visible
in the reflection. Transparent background (PNG). 1200x2400px. No text on the phone
screen that says "iPhone" — just the UI. Hyperrealistic.
```

---

### 4c. Video — Hero cinematic loop para showcase
**Usar en:** `ShowcaseSection.tsx` como fondo de sección
**Archivo sugerido:** `public/assets/showcase-loop.mp4`

```
Cinematic 10-second seamless loop. Camera slowly orbits a floating 3D MacBook Pro at
0.5 degrees per second. The laptop is open showing a design system UI. Lighting: three-
point studio setup, key light from upper-left, fill from right, rim light from behind.
Background: pure white studio (#ffffff). Depth of field: slight bokeh on the background.
The MacBook gently rotates as if floating in zero gravity with imperceptible slow bob.
Photorealistic CGI, 4K (3840x2160), ProRes quality.
```

---

## 5. Documentation Section

### 5a. Ilustración — Code + Design tokens
**Usar en:** `DocumentationSection.tsx`
**Archivo sugerido:** `public/assets/tokens-illustration.png`

```
Flat vector illustration (no shadows, no gradients) showing the concept of design tokens.
A color palette of 6 swatches on the left (blues, grays, greens) connected by thin lines
to UI components on the right (a button, a card, a badge). Lines show the token mapping.
Style: Apple Human Interface Guidelines documentation artwork. Colors from Apple's
palette: #007aff, #34c759, #ff9500, #ff3b30, #5856d6, #1d1d1f. Transparent background.
2048x1024px. Clean, educational, minimal.
```

---

## 6. Stats Section

### 6a. Background — subtle animated gradient
**Usar en:** `StatsSection.tsx`
**Archivo sugerido:** `public/assets/lottie/stats-bg.json`

```
[LottieFiles AI prompt]
Full-width background animation. Three overlapping elliptical gradient blobs in very
pale blue (#e8f0ff), pale purple (#f0eeff), and pale mint (#e8fff2). Blobs move
extremely slowly (full cycle: 20 seconds), morphing shape slightly and drifting
2-3% across the canvas. Opacity: 40%. No sharp edges, everything Gaussian-blurred
(radius 80px equivalent). Seamless loop. 1920x400px canvas.
```

---

## 7. CTA Section

### 7a. Background — dark gradient premium
**Usar en:** `CTASection.tsx` como fondo
**Archivo sugerido:** `public/assets/cta-bg.jpg`

```
Premium dark background for a call-to-action section. Near-black base (#0a0a0a) with
a centered radial glow in deep electric blue (#0a84ff) at 6% opacity, very large
radius covering 60% of the image. Smooth, professional, no noise. The effect is
similar to Apple's dark product pages — deeply cinematic. 1920x600px.
Subtle diagonal light streaks at 2% opacity. No text, no UI.
```

---

## 8. Assets globales / reutilizables

### 8a. Noise texture overlay
**Usar en:** múltiples secciones como `mix-blend-mode: overlay` a baja opacidad
**Archivo sugerido:** `public/assets/noise.png`

```
Seamlessly tileable noise/grain texture. Fine grain, monochromatic (50% gray base),
organic film grain aesthetic similar to Apple's Vision Pro marketing materials.
Grain size: fine (1-2px). Opacity when used: 3-5%. Tile size: 256x256px PNG.
No pattern, purely stochastic noise. Used to add tactile depth to flat backgrounds.
```

---

### 8b. Video — Ambient loop fondo global (light mode)
**Archivo sugerido:** `public/assets/ambient-light.mp4`

```
Extremely subtle ambient video loop for a light-mode website background. Pure white
(#ffffff) base. A very slow, barely visible caustic light pattern — like sunlight
refracting through a glass of water — drifts across the frame at 1% opacity.
No color, just luminosity variation of 1-2%. Duration: 30 seconds seamless loop.
1920x1080px, H.264, optimized for web (under 2MB).
The effect should be subliminal — users shouldn't consciously notice it but the page
should feel "alive" vs a static background.
```

---

## Notas de implementación

Una vez generados los assets, estos son los snippets para incrustarlos:

```tsx
// Video de fondo (hero dark mode)
<video
  autoPlay muted loop playsInline
  className="absolute inset-0 w-full h-full object-cover opacity-60"
  src="/assets/hero-dark-loop.mp4"
/>

// Imagen de fondo
<div
  className="absolute inset-0 bg-cover bg-center"
  style={{ backgroundImage: 'url(/assets/hero-bg.jpg)' }}
/>

// Lottie animation
import Lottie from 'lottie-react'
import animationData from '/assets/lottie/components.json'
<Lottie animationData={animationData} loop className="w-16 h-16" />
```

Para Lottie necesitás instalar: `npm install lottie-react`
