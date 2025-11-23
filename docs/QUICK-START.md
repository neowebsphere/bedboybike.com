# Quick Start Guide - Bad Boy Bike Website

Get your website up and running in 5 minutes!

## ⚡ Fastest Setup (For Testing)

### Step 1: Open the Website
Simply open `index.html` in your web browser:
- Double-click `index.html`, or
- Right-click → Open With → Your Browser

**That's it!** The website will load with placeholder images.

---

## 🖼️ Add Your Images (Optional for Now)

The website is designed to work even if images are missing. It will show:
- Placeholder images where photos would go
- All functionality will work
- You can test navigation, modals, and forms

### To Add Real Images Later:

1. **Hero & Features** (4 images):
   - Place in `images/` folder:
     - `hero-bike.jpg` (1920x1080)
     - `feature-custom.jpg` (800x600)
     - `feature-parts.jpg` (800x600)
     - `feature-about.jpg` (800x600)

2. **Motorcycles** (10 bikes, 4-5 images each):
   - Place in `images/bikes/bike-01/` through `bike-10/`
   - Each folder needs:
     - `thumb.jpg` (400x300)
     - `main.jpg` (1200x800)
     - `side.jpg` (1200x800)
     - `detail-1.jpg` (1200x800)

See `IMAGE-SETUP-GUIDE.md` for detailed instructions.

---

## 🔧 Customize Content

### 1. Change Company Name
Edit `index.html`, find the logo section:
```html
<a href="#home" class="logo">
    <span class="logo__text">YOUR</span>
    <span class="logo__text">COMPANY</span>
    <span class="logo__text">NAME</span>
</a>
```

### 2. Update Motorcycle Data
Edit `js/motorcycles-data.js`:
- Change bike names, models, years
- Update specifications
- Modify descriptions
- Add/remove motorcycles

### 3. Customize Colors
Edit `css/variables.css`:
```css
--color-bg-primary: #0d0d0d;     /* Main background */
--color-accent: #cc0000;         /* Accent color (red) */
--color-text-primary: #cccccc;   /* Main text color */
```

### 4. Update About Section
Edit `index.html`, find the About section:
```html
<section class="about" id="about">
    <!-- Update the text here -->
</section>
```

### 5. Social Media Links
Edit `index.html`, find the footer:
```html
<div class="social-links">
    <a href="YOUR_FACEBOOK_URL" ...>
    <a href="YOUR_INSTAGRAM_URL" ...>
    <a href="YOUR_YOUTUBE_URL" ...>
</div>
```

---

## 🌐 View on Local Server (Optional)

For better testing (recommended if using real images):

### Option 1: Python (Mac/Linux/Windows with Python)
```bash
cd /path/to/badboybike.com
python -m http.server 8000
```
Then open: http://localhost:8000

### Option 2: PHP (Mac/Linux/Windows with PHP)
```bash
cd /path/to/badboybike.com
php -S localhost:8000
```
Then open: http://localhost:8000

### Option 3: Node.js
```bash
npx http-server -p 8000
```
Then open: http://localhost:8000

### Option 4: VS Code Extension
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

---

## ✅ What Works Right Now

Even without images, you can test:

✓ **Navigation**
- Click menu items to scroll to sections
- Mobile hamburger menu (resize browser)
- Smooth scrolling
- Active section highlighting

✓ **Gallery**
- 10 motorcycle cards display
- Click any card to open modal
- Modal shows details, specs, modifications

✓ **Modal Features**
- Close with X button, Escape key, or background click
- Image gallery with thumbnails (if images exist)
- Arrow keys for image navigation
- Full specifications display

✓ **Contact Form**
- Fill out and submit
- See success message
- Form validation

✓ **Responsive Design**
- Resize browser to see mobile/tablet layouts
- Test on phone/tablet

✓ **Scroll Effects**
- Scroll down to see section animations
- Scroll-to-top button appears after scrolling

---

## 🎨 Test Different Screen Sizes

### Browser Developer Tools:
1. Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Opt+I` (Mac)
2. Click device toggle toolbar icon
3. Select different devices:
   - iPhone (375px)
   - iPad (768px)
   - Desktop (1024px+)

---

## 📋 Testing Checklist

- [ ] Website opens in browser
- [ ] Navigation menu works
- [ ] Smooth scroll to sections
- [ ] Mobile menu works (< 768px width)
- [ ] Gallery displays 10 motorcycles
- [ ] Clicking a bike opens modal
- [ ] Modal closes properly
- [ ] Contact form submits
- [ ] Responsive on mobile/tablet/desktop
- [ ] Scroll-to-top button appears

---

## 🚀 Deploy to Live Server

### Option 1: Free Hosting (Netlify)
1. Create account at netlify.com
2. Drag & drop your project folder
3. Done! Get a live URL instantly

### Option 2: Free Hosting (GitHub Pages)
1. Create GitHub repository
2. Push project files
3. Enable GitHub Pages in settings
4. Access at: `username.github.io/repo-name`

### Option 3: Free Hosting (Vercel)
1. Create account at vercel.com
2. Import your Git repository
3. Auto-deploy on every commit

### Option 4: Your Web Host
1. Upload all files via FTP
2. Maintain folder structure
3. Ensure case-sensitive filenames on Linux servers

---

## 🆘 Troubleshooting

### Problem: CSS not loading
**Solution**: Check that `css/` folder is in same directory as `index.html`

### Problem: JavaScript not working
**Solution**: 
- Check browser console for errors (F12)
- Ensure all JS files are in `js/` folder
- Check file paths are correct

### Problem: Images not showing
**Solution**: 
- Check `images/` folder exists
- Verify image filenames match exactly (case-sensitive)
- See `IMAGE-SETUP-GUIDE.md` for details

### Problem: Modal not opening
**Solution**: 
- Check browser console for errors
- Ensure all JS files loaded
- Try refreshing browser (Ctrl+F5)

### Problem: Mobile menu not working
**Solution**: 
- Resize browser to < 768px width
- Check JavaScript console for errors
- Try clicking hamburger icon again

---

## 📚 Next Steps

1. **Add Your Content**
   - Update motorcycle data in `js/motorcycles-data.js`
   - Add real images (see `IMAGE-SETUP-GUIDE.md`)
   - Customize About section text

2. **Configure Contact Form**
   - Integrate with EmailJS, FormSpree, or your backend
   - See `README.md` for integration options

3. **Optimize for Production**
   - Compress images
   - Minify CSS/JS
   - Test on real devices
   - Check loading speed

4. **Launch!**
   - Deploy to hosting
   - Test live site
   - Share with the world

---

## 💡 Tips

- **Test Early**: Open in browser frequently during customization
- **Use DevTools**: Browser inspector is your friend
- **Mobile First**: Always test mobile view
- **Real Content**: Replace placeholder text with your actual content
- **Backup**: Keep original files before making major changes

---

**Need more help?** See `README.md` for comprehensive documentation.

**Happy building! 🏍️**
