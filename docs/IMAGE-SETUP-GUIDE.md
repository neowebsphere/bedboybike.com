# Image Setup Guide - Bad Boy Bike Website

This guide will help you prepare and organize all images needed for the website.

## 📐 Image Specifications

### Required Image Dimensions

1. **Hero Image**
   - Filename: `hero-bike.jpg`
   - Location: `images/`
   - Recommended size: 1920x1080px (16:9 ratio)
   - Format: JPG
   - Subject: Full custom motorcycle, side/3-quarter view
   - Note: Will have gradient overlay, keep important elements on left side

2. **Feature Cards** (3 images)
   - Filenames: `feature-custom.jpg`, `feature-parts.jpg`, `feature-about.jpg`
   - Location: `images/`
   - Recommended size: 800x600px (4:3 ratio)
   - Format: JPG
   - Subjects:
     - **feature-custom.jpg**: Completed custom motorcycle
     - **feature-parts.jpg**: Motorcycle parts/workshop/accessories
     - **feature-about.jpg**: Shop/team/workspace photo

3. **Placeholder Image**
   - Filename: `placeholder-bike.jpg`
   - Location: `images/`
   - Size: 400x300px (4:3 ratio)
   - Format: JPG
   - Subject: Generic motorcycle silhouette or "No Image" graphic

4. **Motorcycle Gallery Images** (Per bike: 4-5 images)
   - Location: `images/bikes/bike-01/`, `bike-02/`, etc.
   - Per motorcycle folder:
     - `thumb.jpg` - 400x300px - Gallery thumbnail
     - `main.jpg` - 1200x800px - Primary detail image
     - `side.jpg` - 1200x800px - Side view
     - `detail-1.jpg` - 1200x800px - Close-up detail
     - `detail-2.jpg` - 1200x800px - Another angle/detail (optional)

## 📁 Directory Structure to Create

```
images/
├── hero-bike.jpg
├── feature-custom.jpg
├── feature-parts.jpg
├── feature-about.jpg
├── placeholder-bike.jpg
└── bikes/
    ├── bike-01/
    │   ├── thumb.jpg
    │   ├── main.jpg
    │   ├── side.jpg
    │   ├── detail-1.jpg
    │   └── detail-2.jpg
    ├── bike-02/
    │   └── (same structure)
    ├── bike-03/
    │   └── (same structure)
    ├── bike-04/
    │   └── (same structure)
    ├── bike-05/
    │   └── (same structure)
    ├── bike-06/
    │   └── (same structure)
    ├── bike-07/
    │   └── (same structure)
    ├── bike-08/
    │   └── (same structure)
    ├── bike-09/
    │   └── (same structure)
    └── bike-10/
        └── (same structure)
```

## 🎨 Image Guidelines

### Photography Tips:

1. **Lighting**
   - Use natural daylight or professional studio lighting
   - Avoid harsh shadows
   - Ensure motorcycle details are visible

2. **Background**
   - Clean, uncluttered backgrounds
   - Dark backgrounds work well with the site theme
   - Avoid distracting elements

3. **Angles**
   - Main: 3/4 front view (shows front and side)
   - Side: Full profile, parallel to camera
   - Details: Close-ups of custom work (paint, chrome, modifications)

4. **Resolution**
   - Use high-resolution source images
   - Minimum 1200px on longest side for main images
   - Maintain aspect ratios when resizing

### Optimization:

1. **Before Upload**
   - Resize to exact dimensions
   - Compress using tools like:
     - TinyPNG/TinyJPG
     - ImageOptim (Mac)
     - Squoosh (web-based)
   - Target file size: 100-300KB for large images, 50-100KB for thumbnails

2. **Format Recommendations**
   - JPG for photographs (quality 80-85%)
   - WebP for better compression (with JPG fallback)
   - PNG only if transparency needed

## 🔄 Quick Setup with Your Images

### Option 1: Manual Setup

1. Create directory structure:
   ```bash
   cd images
   mkdir -p bikes/bike-{01..10}
   ```

2. Place your images in appropriate folders

3. Rename files to match expected filenames:
   - `thumb.jpg`, `main.jpg`, `side.jpg`, etc.

### Option 2: Batch Rename Script

If you have images with different names, use this structure:

```bash
# Example for bike-01
cd images/bikes/bike-01
mv "your-thumbnail-name.jpg" "thumb.jpg"
mv "your-main-image.jpg" "main.jpg"
mv "your-side-view.jpg" "side.jpg"
mv "your-detail-1.jpg" "detail-1.jpg"
mv "your-detail-2.jpg" "detail-2.jpg"
```

## 🖼️ Using Placeholder Images (For Testing)

If you don't have images yet, you can use placeholder services:

### Free Placeholder Sources:

1. **Unsplash** (Free, high-quality)
   - https://unsplash.com/s/photos/harley-davidson
   - https://unsplash.com/s/photos/custom-motorcycle

2. **Pexels** (Free, no attribution)
   - https://www.pexels.com/search/motorcycle/

3. **Placeholder.com** (Quick solid color placeholders)
   - Use: `https://via.placeholder.com/1200x800/333333/999999?text=Bike+Name`

### Quick Test Setup:

Create a simple HTML file to download images:

```html
<!-- save as download-placeholders.html -->
<!DOCTYPE html>
<html>
<head><title>Image Links</title></head>
<body>
<h1>Right-click and "Save As" these images:</h1>

<h2>Hero & Features</h2>
<img src="https://via.placeholder.com/1920x1080/0d0d0d/8a8a8a?text=Hero+Bike" width="400">
<img src="https://via.placeholder.com/800x600/0d0d0d/8a8a8a?text=Custom+Motorcycles" width="400">

<h2>Bike Images (Repeat for all 10)</h2>
<img src="https://via.placeholder.com/400x300/0d0d0d/8a8a8a?text=Bike+01+Thumb" width="200">
<img src="https://via.placeholder.com/1200x800/0d0d0d/8a8a8a?text=Bike+01+Main" width="400">
</body>
</html>
```

## ✅ Image Checklist

Before launch, verify:

- [ ] Hero image is optimized and properly sized
- [ ] All 3 feature card images are present
- [ ] Placeholder image exists as fallback
- [ ] All 10 bike folders created (bike-01 through bike-10)
- [ ] Each bike has at least `thumb.jpg` and `main.jpg`
- [ ] All images are optimized (compressed)
- [ ] Image filenames match exactly (case-sensitive)
- [ ] No spaces in filenames
- [ ] All paths in `motorcycles-data.js` match actual files

## 🚨 Common Issues

### Images Not Showing?

1. **Check file paths** - Must match exactly (case-sensitive on servers)
2. **Check file extensions** - `.jpg` not `.jpeg` or `.JPG`
3. **Verify files exist** - Open browser dev tools, check Network tab for 404 errors
4. **Check permissions** - Files must be readable by web server

### Images Too Large?

1. **Resize before upload** - Don't rely on CSS to resize
2. **Compress** - Use online tools or image editors
3. **Check file sizes** - Should be < 500KB each

### Images Look Pixelated?

1. **Use higher resolution sources**
2. **Don't upscale** - Only downscale from larger originals
3. **Maintain aspect ratio** - Avoid stretching

## 📞 Need Help?

If you need assistance with image preparation:
1. Check image dimensions: Use Windows Photo Viewer properties or Mac Preview
2. Batch resize: Use IrfanView (Windows) or Preview (Mac)
3. Compress: Use TinyPNG.com or Squoosh.app

---

**Once images are ready, your website will look amazing! 🏍️**
