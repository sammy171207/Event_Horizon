# EventHorizon Frontend

A stunning, modern React frontend for the EventHorizon event management platform with GSAP animations and 3D effects.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Backend server running on port 5000

### Installation & Setup

1. **Install Dependencies**:
```bash
npm install
```

2. **Start Development Server**:
```bash
npm run dev
```

3. **Access the Application**:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## ✨ Features

### 🎨 Enhanced Home Page
- **GSAP Animations**: Smooth scroll-triggered animations
- **3D Effects**: Interactive 3D cards with mouse movement
- **Floating Elements**: Dynamic background animations
- **Parallax Scrolling**: Depth effect on scroll
- **Gradient Backgrounds**: Beautiful color transitions
- **Glowing Effects**: Interactive hover states
- **Testimonials**: Social proof section
- **Statistics Counter**: Animated number counters

### 🎯 Key Components
- **Hero Section**: Eye-catching landing area with 3D elements
- **Features Section**: Interactive cards with 3D transforms
- **Stats Section**: Animated counters with scroll triggers
- **Testimonials**: User reviews with star ratings
- **CTA Section**: Call-to-action with background patterns

### 🛠️ Technical Features
- **React 18** with modern hooks
- **GSAP** for advanced animations
- **Framer Motion** for component animations
- **Tailwind CSS** for styling
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Axios** for API communication

## 🎭 Animation Features

### GSAP Animations
- **ScrollTrigger**: Animations triggered by scroll position
- **Timeline**: Coordinated animation sequences
- **Stagger**: Sequential element animations
- **Parallax**: Background movement effects
- **Mouse Interaction**: 3D card rotations

### 3D Effects
- **Transform Styles**: preserve-3d for depth
- **Perspective**: 1000px for realistic 3D
- **Mouse Tracking**: Real-time cursor interaction
- **Floating Elements**: Dynamic background objects

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#3b82f6 to #8b5cf6)
- **Secondary**: Purple gradient (#8b5cf6 to #ec4899)
- **Background**: Dark gradients for hero sections
- **Text**: High contrast for readability

### Typography
- **Headings**: Bold, large text with gradients
- **Body**: Clean, readable fonts
- **Buttons**: Rounded, with hover effects

### Components
- **Cards**: 3D transformable with shadows
- **Buttons**: Gradient backgrounds with glow effects
- **Icons**: SVG icons with consistent styling

## 🔧 Development

### File Structure
```
src/
├── components/
│   ├── 3DAssets.jsx          # 3D background elements
│   ├── Navbar.jsx            # Navigation component
│   ├── LoadingSpinner.jsx    # Loading animation
│   └── Toast.jsx             # Notification component
├── pages/
│   ├── Home.jsx              # Enhanced home page
│   ├── Events.jsx            # Events listing
│   ├── Login.jsx             # Authentication
│   └── ...
├── store/
│   ├── store.js              # Redux store configuration
│   ├── authSlice.js          # Authentication state
│   └── uiSlice.js            # UI state management
└── index.css                 # Global styles and animations
```

### Customization

#### Adding New Animations
```javascript
// Example: Add a new GSAP animation
gsap.from('.new-element', {
  duration: 1,
  y: 100,
  opacity: 0,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.new-element',
    start: 'top 80%'
  }
})
```

#### Modifying 3D Effects
```css
/* Example: Custom 3D card effect */
.custom-3d-card {
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: transform 0.3s ease;
}

.custom-3d-card:hover {
  transform: rotateX(10deg) rotateY(10deg);
}
```

## 🚀 Performance

### Optimization Features
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Responsive images
- **Animation Performance**: Hardware-accelerated transforms
- **Bundle Splitting**: Code splitting for faster loads

### Best Practices
- **Debounced Animations**: Prevent excessive re-renders
- **Cleanup Functions**: Proper GSAP cleanup
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels and keyboard navigation

## 🎯 Testing

### Manual Testing
1. **Scroll Animations**: Scroll through the page to see animations
2. **3D Interactions**: Hover over feature cards
3. **Responsive Design**: Test on different screen sizes
4. **Performance**: Check for smooth 60fps animations

### Browser Support
- Chrome (recommended for best 3D effects)
- Firefox
- Safari
- Edge

## 🔮 Future Enhancements

### Planned Features
- **WebGL Effects**: Advanced 3D graphics
- **Particle Systems**: Dynamic particle animations
- **Audio Integration**: Sound effects for interactions
- **VR Support**: Virtual reality event previews

### Performance Improvements
- **Web Workers**: Background animation processing
- **Canvas Rendering**: Hardware-accelerated graphics
- **Progressive Loading**: Staggered content loading

---

**EventHorizon Frontend** - Where technology meets creativity! 🎉
