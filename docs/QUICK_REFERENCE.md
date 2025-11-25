# ⚡ Quick Reference - Premium UI Features

## 🎨 Color System

```css
/* Primary Colors */
--primary: #ff0a54        /* Vibrant Pink */
--primary-light: #ff3d71  /* Light Pink */
--primary-dark: #d10746   /* Dark Pink */
--secondary: #00d9ff      /* Electric Cyan */
--accent: #ffd700         /* Gold */

/* Dark Shades */
--dark-1: #0a0a0f         /* Darkest */
--dark-2: #12121a         /* Darker */
--dark-3: #1a1a2e         /* Dark */
--dark-4: #252542         /* Light Dark */

/* Glass Effects */
--glass-white: rgba(255, 255, 255, 0.08)
--glass-border: rgba(255, 255, 255, 0.12)
--glass-shadow: rgba(0, 0, 0, 0.3)
```

## 🌈 Gradient Presets

```css
/* Primary Pink Gradient */
background: linear-gradient(135deg, #ff0a54 0%, #ff3d71 50%, #ff758c 100%);

/* Secondary Cyan Gradient */
background: linear-gradient(135deg, #00d9ff 0%, #0099ff 100%);

/* Cosmic 3-Color Gradient */
background: linear-gradient(135deg, #ff0a54 0%, #00d9ff 50%, #ffd700 100%);

/* Purple Gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## 💫 Key Animations

```css
/* Float Effect */
animation: float 3s ease-in-out infinite;

/* Pulse Glow */
animation: pulse 2s ease-in-out infinite;

/* Fade In Scale */
animation: fadeInScale 0.6s ease;

/* Slide In Up */
animation: slideInUp 0.6s ease;

/* Gradient Flow */
animation: gradientFlow 5s ease infinite;

/* Shimmer */
animation: shimmer 2s ease-in-out infinite;

/* Rotate (Spinner) */
animation: rotate 1s linear infinite;
```

## 🎯 Glass Morphism Template

```css
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
```

## 🔘 Premium Button

```css
.premium-button {
  padding: 18px 32px;
  background: linear-gradient(135deg, #ff0a54 0%, #ff3d71 100%);
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(255, 10, 84, 0.4);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-button:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 32px rgba(255, 10, 84, 0.6);
}
```

## 📝 Gradient Text

```css
.gradient-text {
  background: linear-gradient(135deg, #ff0a54 0%, #00d9ff 50%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: gradientFlow 5s ease infinite;
}
```

## ✨ Hover Glow Effect

```css
.hover-glow {
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-glow::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 10, 84, 0.4) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
  pointer-events: none;
  z-index: -1;
}

.hover-glow:hover::after {
  width: 300px;
  height: 300px;
}
```

## 🎬 3D Card Transform

```css
.card-3d {
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
}

.card-3d:hover {
  transform: translateY(-12px) scale(1.03) rotateX(2deg);
}
```

## 💎 Shadow System

```css
/* Small */
box-shadow: 0 2px 12px rgba(255, 10, 84, 0.1);

/* Medium */
box-shadow: 0 8px 32px rgba(255, 10, 84, 0.2);

/* Large */
box-shadow: 0 16px 48px rgba(255, 10, 84, 0.3);

/* Extra Large */
box-shadow: 0 24px 64px rgba(255, 10, 84, 0.4);

/* Glow */
box-shadow: 0 0 40px rgba(255, 10, 84, 0.6);

/* Glass */
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
```

## 🎪 Transition Timing

```css
/* Fast */
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

/* Normal */
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

/* Slow */
transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);

/* Bounce */
transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Smooth */
transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
```

## 🔄 Loading Skeleton

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--dark-2) 0%,
    var(--dark-3) 50%,
    var(--dark-2) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: -100% 0; }
  100% { background-position: 100% 0; }
}
```

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 480px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Desktop */
@media (max-width: 1024px) { }

/* Large Desktop */
@media (max-width: 1200px) { }
```

## 🎯 Focus State

```css
*:focus-visible {
  outline: none;
  box-shadow: 
    0 0 0 2px var(--primary),
    0 0 0 6px rgba(255, 10, 84, 0.2);
}
```

## ⚡ Performance Tips

```css
/* GPU Acceleration */
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Optimize Backdrop Filter */
.glass {
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  backdrop-filter: blur(20px) saturate(180%);
}
```

## 🌟 Common Combinations

### Glass Card with Hover
```css
.premium-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-card:hover {
  transform: translateY(-4px) scale(1.02);
  border-color: var(--primary);
  box-shadow: 
    0 16px 48px rgba(255, 10, 84, 0.3),
    0 0 60px rgba(255, 10, 84, 0.4);
}
```

### Gradient Border
```css
.gradient-border {
  position: relative;
  border-radius: 16px;
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 2px;
  background: linear-gradient(135deg, #ff0a54 0%, #00d9ff 50%, #ffd700 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
```

### Animated Icon
```css
.animated-icon {
  color: var(--primary);
  font-size: 24px;
  filter: drop-shadow(0 0 10px rgba(255, 10, 84, 0.6));
  animation: pulse 2s ease-in-out infinite;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.animated-icon:hover {
  transform: scale(1.2) rotate(10deg);
  filter: drop-shadow(0 0 20px rgba(255, 10, 84, 1));
}
```

---

## 🚀 Quick Implementation

1. **Add Glass Effect**: Use `.glass-card` class
2. **Add Gradient**: Apply gradient background
3. **Add Animation**: Use keyframe presets
4. **Add Hover**: Scale + shadow + transform
5. **Add Focus**: Custom outline with glow

**Copy, paste, customize! 🎨**
