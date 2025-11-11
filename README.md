# Bad Boy Bike - Harley-Davidson Custom Shop Website

A modern, responsive website for a custom Harley-Davidson motorcycle shop featuring a dark premium design, interactive gallery, and detailed bike showcase.

## 🎨 Design Features

- **Dark Premium Theme**: Sophisticated black background with metallic gray accents
- **Hero-Driven Layout**: Full-screen hero section with motorcycle showcase
- **Interactive Gallery**: Grid layout displaying 10 custom motorcycle builds
- **Modal Detail Views**: Full-featured modal with image gallery and specifications
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Smooth Animations**: Scroll-based reveal animations and hover effects

## 📁 Project Structure

```
badboybike.com/
├── index.html                 # Main HTML file (single-page application)
├── README.md                  # This file
├── css/
│   ├── variables.css          # CSS custom properties (colors, spacing, etc.)
│   ├── reset.css              # CSS reset and base styles
│   ├── style.css              # Main component styles
│   └── responsive.css         # Media queries for responsive design
├── js/
│   ├── motorcycles-data.js    # Data for 10 custom motorcycles
│   ├── navigation.js          # Navigation and menu functionality
│   ├── gallery.js             # Gallery rendering and interactions
│   ├── modal.js               # Modal/lightbox functionality
│   └── main.js                # General app functionality
└── images/
    ├── hero-bike.jpg          # Main hero image
    ├── feature-custom.jpg     # Feature card: Custom Motorcycles
    ├── feature-parts.jpg      # Feature card: Parts & Accessories
    ├── feature-about.jpg      # Feature card: About Us
    ├── placeholder-bike.jpg   # Fallback placeholder image
    └── bikes/                 # Motorcycle images
        ├── bike-01/
        │   ├── thumb.jpg      # Thumbnail (400x300)
        │   ├── main.jpg       # Main image (1200x800)
        │   ├── side.jpg       # Side view
        │   ├── detail-1.jpg   # Detail shot 1
        │   └── detail-2.jpg   # Detail shot 2
        └── ... (bike-02 through bike-10)
```

## 🚀 Features

### 1. Navigation
- Fixed header with logo and navigation menu
- Smooth scroll to sections
- Active section highlighting
- Mobile hamburger menu with slide-in overlay
- Auto-close on link click or outside click

### 2. Hero Section
- Full-screen background with motorcycle image
- Gradient overlay for text readability
- Prominent call-to-action button
- Responsive typography

### 3. Feature Cards
- Three feature sections: Custom Motorcycles, Parts & Accessories, About Us
- Hover zoom effects on images
- Gradient overlays
- Click to scroll to relevant sections

### 4. Motorcycle Gallery
- Grid layout with 10 custom builds
- Responsive columns (3 → 2 → 1 based on screen size)
- Each card displays:
  - Motorcycle image
  - Name and model
  - Year and basic specs
  - "View Details" button
- Click anywhere on card to open modal

### 5. Modal Detail View
- Full-screen modal overlay
- Image gallery with thumbnails
- Arrow key navigation (left/right)
- Click thumbnails to change main image
- Detailed specifications:
  - Engine size
  - Power and torque
  - Weight
  - Status (Available/Sold)
- Complete modifications list
- Description of the build
- "Inquire About This Build" CTA
- Close via X button, Escape key, or background click

### 6. About Section
- Company information
- Mission and values
- Centered text layout

### 7. Contact Form
- Input fields: Name, Email, Phone, Message
- Form validation (HTML5)
- Success notification on submit
- Responsive layout

### 8. Footer
- Three-column layout (responsive)
- Quick links
- Social media links
- Copyright information

### 9. Additional Features
- Scroll-to-top button (appears after scrolling 500px)
- Smooth scroll animations on section reveal
- Intersection Observer for performance
- Keyboard navigation support
- Accessible ARIA labels

## 🎯 Motorcycle Data Structure

Each motorcycle in `motorcycles-data.js` contains:

```javascript
{
  id: 1,                              // Unique identifier
  name: "Night Rider V-Rod",          // Display name
  model: "Harley-Davidson V-Rod",     // Base model
  year: 2023,                         // Build year
  category: "Custom Cruiser",         // Category
  thumbnail: "path/to/thumb.jpg",     // Thumbnail image
  images: ["path1.jpg", "path2.jpg"], // Gallery images
  specs: {
    engine: "1250cc Revolution V-Twin",
    power: "125 HP",
    torque: "85 lb-ft",
    weight: "295 kg"
  },
  modifications: [                     // Array of modifications
    "Full custom black powder coat",
    "Lowered suspension system",
    ...
  ],
  description: "Full description...",  // Build description
  status: "Available"                  // Available or Sold
}
```

## 🎨 Color Palette

```css
Primary Background:  #0d0d0d
Secondary Background: #1a1a1a
Text Primary:        #cccccc
Text Secondary:      #999999
Text Heading:        #8a8a8a (metallic gray)
Accent Color:        #cc0000 (red)
Borders:             #333333, #666666
```

## 📱 Responsive Breakpoints

- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: 768px - 1024px
- **Large Desktop**: 1024px+

## 🖼️ Image Requirements

For each motorcycle, you need:

1. **Thumbnail** (400x300px) - Used in gallery grid
2. **Main Image** (1200x800px) - Primary detail view
3. **Additional Images** (2-4 photos) - Side views, details, close-ups

### Required Images:

- `images/hero-bike.jpg` - Hero section background (1920x1080 recommended)
- `images/feature-custom.jpg` - Custom Motorcycles card
- `images/feature-parts.jpg` - Parts & Accessories card
- `images/feature-about.jpg` - About Us card
- `images/placeholder-bike.jpg` - Fallback image (400x300)

For 10 motorcycles:
- Create folders `images/bikes/bike-01/` through `images/bikes/bike-10/`
- Each folder should contain: `thumb.jpg`, `main.jpg`, `side.jpg`, `detail-1.jpg`, `detail-2.jpg`

## 🛠️ Installation & Setup

1. **Clone or download the project**
   ```bash
   git clone [repository-url]
   cd badboybike.com
   ```

2. **Add your images**
   - Place motorcycle images in `images/bikes/bike-XX/` folders
   - Add hero and feature images to `images/` folder

3. **Customize motorcycle data**
   - Edit `js/motorcycles-data.js` with your actual motorcycle details
   - Update image paths to match your files

4. **Launch the website**
   - Open `index.html` in a web browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # PHP
     php -S localhost:8000
     
     # Node.js (with http-server)
     npx http-server -p 8000
     ```

5. **Access in browser**
   - Navigate to `http://localhost:8000`

## 📝 Customization Guide

### Change Colors
Edit `css/variables.css` and modify the color variables:
```css
--color-bg-primary: #0d0d0d;
--color-accent: #cc0000;
```

### Update Content
- **Company Name**: Edit logo text in `index.html`
- **About Text**: Modify content in the About section
- **Contact Form**: Integrate with your email service
- **Footer**: Update social links and company info

### Add/Remove Motorcycles
Edit `js/motorcycles-data.js`:
- Add new objects to the `motorcyclesData` array
- Remove objects to hide motorcycles
- Update properties to change details

### Modify Layout
- **Grid Columns**: Edit `css/style.css` → `.gallery__grid`
- **Spacing**: Adjust variables in `css/variables.css`
- **Fonts**: Change font families in variables

## 🔌 Integration Options

### Email Form (Backend)
Replace the form handler in `js/main.js` with:
- **EmailJS**: Client-side email service
- **FormSpree**: Simple form backend
- **Custom API**: POST to your backend endpoint

### CMS Integration
Convert motorcycle data to load from:
- JSON file via `fetch()`
- WordPress REST API
- Headless CMS (Contentful, Strapi)
- Database via custom API

## ⚡ Performance Optimizations

- **Image Optimization**: Convert to WebP format with JPG fallbacks
- **Lazy Loading**: Add `loading="lazy"` to images
- **CSS Minification**: Use a build tool (Gulp, Webpack)
- **JavaScript Bundling**: Combine and minify JS files
- **CDN**: Host images on a CDN for faster loading

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators on interactive elements
- Alt text on all images
- Sufficient color contrast ratios

## 🌐 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source. Feel free to use and modify for your needs.

## 🤝 Contributing

To add features or fix bugs:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues, please open an issue in the repository.

---

**Built with ❤️ for custom motorcycle enthusiasts**
# bedboybike.com
# bedboybike.com
