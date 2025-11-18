// 360° Image Viewer
class Viewer360 {
  constructor(containerId, images, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container ${containerId} not found`);
      return;
    }
    
    this.images = images;
    this.currentFrame = 0;
    this.totalFrames = images.length;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.rotation = 0;
    
    // NEW: Zoom properties
    this.zoomLevel = 1;
    this.minZoom = 0.5;
    this.maxZoom = 3;
    this.zoomStep = 0.2;
    
    // NEW: Fullscreen state
    this.isFullscreen = false;
    this.originalParent = null;
    this.originalNextSibling = null;
    
    // Options
    this.options = {
      sensitivity: options.sensitivity || 0.5,
      autoRotate: options.autoRotate || false,
      autoRotateSpeed: options.autoRotateSpeed || 0.5,
      inertia: options.inertia !== undefined ? options.inertia : true,
      inertiaFriction: options.inertiaFriction || 0.92,
      showHint: options.showHint !== undefined ? options.showHint : true,
      hintDuration: options.hintDuration || 3000,
      preloadImages: options.preloadImages !== undefined ? options.preloadImages : true,
      enableZoom: options.enableZoom !== undefined ? options.enableZoom : true,
      enableFullscreen: options.enableFullscreen !== undefined ? options.enableFullscreen : true,
      enableKeyboard: options.enableKeyboard !== undefined ? options.enableKeyboard : true,
      enableMouseWheel: options.enableMouseWheel !== undefined ? options.enableMouseWheel : true
    };
    
    this.velocity = 0;
    this.autoRotateTimer = null;
    this.animationFrame = null;
    
    this.init();
  }
  
  init() {
    this.createViewer();
    this.setupEventListeners();
    
    if (this.options.preloadImages) {
      this.preloadAllImages();
    }
    
    if (this.options.autoRotate) {
      this.startAutoRotate();
    }
    
    if (this.options.showHint) {
      this.showDragHint();
    }
  }
  
  createViewer() {
    this.container.innerHTML = '';
    this.container.className = 'viewer-360';
    
    // Create canvas for images
    this.canvas = document.createElement('div');
    this.canvas.className = 'viewer-360__canvas';
    
    // Create image element
    this.imgElement = document.createElement('img');
    this.imgElement.className = 'viewer-360__image';
    this.imgElement.draggable = false;
    this.imgElement.src = this.images[0];
    
    this.canvas.appendChild(this.imgElement);
    
    // Create loading indicator
    this.loader = document.createElement('div');
    this.loader.className = 'viewer-360__loader';
    this.loader.innerHTML = `
      <div class="viewer-360__spinner"></div>
      <p>Loading 360° View...</p>
    `;
    
    // Create hint overlay
    this.hintOverlay = document.createElement('div');
    this.hintOverlay.className = 'viewer-360__hint';
    this.hintOverlay.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
      </svg>
      <p>Drag to rotate</p>
    `;
    
    // Create unified controls panel
    this.controls = document.createElement('div');
    this.controls.className = 'viewer-360__controls';
    this.controls.innerHTML = `
      <!-- Rotation Controls -->
      <div class="viewer-360__control-group">
        <button class="viewer-360__btn" data-action="rotate-left" title="Rotate Left (← Arrow)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2.5 2v6h6M2 11.5a10 10 0 0 1 18.8-4.3"/>
          </svg>
        </button>
        <button class="viewer-360__btn" data-action="toggle-auto" title="Auto Rotate (Space)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
          </svg>
        </button>
        <button class="viewer-360__btn" data-action="rotate-right" title="Rotate Right (→ Arrow)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21.5 2v6h-6M22 12.5a10 10 0 0 1-18.8 4.2"/>
          </svg>
        </button>
      </div>
      
      <!-- Zoom Controls -->
      <div class="viewer-360__control-group">
        <button class="viewer-360__btn" data-action="zoom-out" title="Zoom Out (- or Mouse Wheel)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </button>
        <button class="viewer-360__btn" data-action="zoom-reset" title="Reset Zoom (0)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </button>
        <button class="viewer-360__btn" data-action="zoom-in" title="Zoom In (+ or Mouse Wheel)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
            <line x1="11" y1="8" x2="11" y2="14"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </button>
      </div>
      
      <!-- Fullscreen Control -->
      <div class="viewer-360__control-group">
        <button class="viewer-360__btn" data-action="fullscreen" title="Fullscreen (F)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        </button>
      </div>
    `;
    
    // Frame counter
    this.frameCounter = document.createElement('div');
    this.frameCounter.className = 'viewer-360__counter';
    this.updateFrameCounter();
    
    // NEW: Zoom level indicator
    this.zoomIndicator = document.createElement('div');
    this.zoomIndicator.className = 'viewer-360__zoom-indicator';
    this.updateZoomIndicator();
    
    // Append all elements
    this.container.appendChild(this.loader);
    this.container.appendChild(this.canvas);
    this.container.appendChild(this.hintOverlay);
    this.container.appendChild(this.controls);
    this.container.appendChild(this.frameCounter);
    this.container.appendChild(this.zoomIndicator);
    
    // Hide loader after first image loads
    this.imgElement.addEventListener('load', () => {
      this.loader.style.display = 'none';
    }, { once: true });
  }
  
  setupEventListeners() {
    // Mouse events
    this.canvas.addEventListener('mousedown', (e) => this.handleDragStart(e));
    document.addEventListener('mousemove', (e) => this.handleDragMove(e));
    document.addEventListener('mouseup', () => this.handleDragEnd());
    
    // Touch events
    this.canvas.addEventListener('touchstart', (e) => this.handleDragStart(e), { passive: false });
    document.addEventListener('touchmove', (e) => this.handleDragMove(e), { passive: false });
    document.addEventListener('touchend', () => this.handleDragEnd());
    
    // Control buttons (all in one panel now)
    this.controls.addEventListener('click', (e) => {
      const btn = e.target.closest('.viewer-360__btn');
      if (!btn) return;
      
      const action = btn.dataset.action;
      
      // Rotation controls
      if (action === 'rotate-left') {
        this.rotateBy(-1);
      } else if (action === 'rotate-right') {
        this.rotateBy(1);
      } else if (action === 'toggle-auto') {
        this.toggleAutoRotate();
        btn.classList.toggle('active');
      }
      // Zoom controls
      else if (action === 'zoom-in') {
        this.zoomIn();
      } else if (action === 'zoom-out') {
        this.zoomOut();
      } else if (action === 'zoom-reset') {
        this.resetZoom();
      }
      // Fullscreen control
      else if (action === 'fullscreen') {
        this.toggleFullscreen();
      }
    });
    
    // NEW: Keyboard controls
    if (this.options.enableKeyboard) {
      document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    // NEW: Mouse wheel zoom/rotate
    if (this.options.enableMouseWheel) {
      this.canvas.addEventListener('wheel', (e) => this.handleMouseWheel(e), { passive: false });
    }
    
    // NEW: Fullscreen change event
    document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
    document.addEventListener('webkitfullscreenchange', () => this.handleFullscreenChange());
    document.addEventListener('mozfullscreenchange', () => this.handleFullscreenChange());
    document.addEventListener('MSFullscreenChange', () => this.handleFullscreenChange());
    
    // Prevent context menu
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }
  
  handleDragStart(e) {
    this.isDragging = true;
    this.stopAutoRotate();
    
    const point = this.getEventPoint(e);
    this.startX = point.x;
    this.startY = point.y;
    this.velocity = 0;
    
    this.canvas.style.cursor = 'grabbing';
    this.hintOverlay.style.opacity = '0';
    
    e.preventDefault();
  }
  
  handleDragMove(e) {
    if (!this.isDragging) {
      if (this.options.inertia && this.velocity !== 0) {
        this.applyInertia();
      }
      return;
    }
    
    const point = this.getEventPoint(e);
    const deltaX = point.x - this.startX;
    
    // Calculate rotation based on drag distance
    const rotationDelta = deltaX * this.options.sensitivity;
    this.velocity = rotationDelta;
    
    // Update rotation
    this.rotation += rotationDelta;
    
    // Convert rotation to frame
    const frameFloat = (this.rotation / 360) * this.totalFrames;
    let newFrame = Math.floor(frameFloat) % this.totalFrames;
    if (newFrame < 0) newFrame += this.totalFrames;
    
    if (newFrame !== this.currentFrame) {
      this.setFrame(newFrame);
    }
    
    this.startX = point.x;
    this.startY = point.y;
    
    e.preventDefault();
  }
  
  handleDragEnd() {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    this.canvas.style.cursor = 'grab';
    
    // Apply inertia
    if (this.options.inertia && Math.abs(this.velocity) > 0.5) {
      this.applyInertia();
    }
  }
  
  applyInertia() {
    if (Math.abs(this.velocity) < 0.1) {
      this.velocity = 0;
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
      }
      return;
    }
    
    this.rotation += this.velocity;
    this.velocity *= this.options.inertiaFriction;
    
    // Convert rotation to frame
    const frameFloat = (this.rotation / 360) * this.totalFrames;
    let newFrame = Math.floor(frameFloat) % this.totalFrames;
    if (newFrame < 0) newFrame += this.totalFrames;
    
    if (newFrame !== this.currentFrame) {
      this.setFrame(newFrame);
    }
    
    this.animationFrame = requestAnimationFrame(() => this.applyInertia());
  }
  
  getEventPoint(e) {
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
    return {
      x: e.clientX,
      y: e.clientY
    };
  }
  
  setFrame(frameIndex) {
    if (frameIndex < 0 || frameIndex >= this.totalFrames) return;
    
    this.currentFrame = frameIndex;
    this.imgElement.src = this.images[frameIndex];
    this.updateFrameCounter();
  }
  
  rotateBy(direction) {
    let newFrame = this.currentFrame + direction;
    if (newFrame < 0) newFrame = this.totalFrames - 1;
    if (newFrame >= this.totalFrames) newFrame = 0;
    
    this.setFrame(newFrame);
    this.rotation = (newFrame / this.totalFrames) * 360;
  }
  
  startAutoRotate() {
    if (this.autoRotateTimer) return;
    
    this.autoRotateTimer = setInterval(() => {
      if (!this.isDragging) {
        this.rotateBy(1);
      }
    }, 1000 / this.options.autoRotateSpeed);
  }
  
  stopAutoRotate() {
    if (this.autoRotateTimer) {
      clearInterval(this.autoRotateTimer);
      this.autoRotateTimer = null;
    }
  }
  
  toggleAutoRotate() {
    if (this.autoRotateTimer) {
      this.stopAutoRotate();
    } else {
      this.startAutoRotate();
    }
  }
  
  showDragHint() {
    this.hintOverlay.style.opacity = '1';
    
    setTimeout(() => {
      this.hintOverlay.style.opacity = '0';
    }, this.options.hintDuration);
  }
  
  updateFrameCounter() {
    this.frameCounter.textContent = `${this.currentFrame + 1} / ${this.totalFrames}`;
  }
  
  preloadAllImages() {
    this.images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
  
  // NEW: Keyboard controls
  handleKeyboard(e) {
    // Don't trigger if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }
    
    // Only handle keyboard when viewer is visible
    if (!this.container || this.container.style.display === 'none') {
      return;
    }
    
    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.rotateBy(-1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.rotateBy(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.zoomIn();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.zoomOut();
        break;
      case '+':
      case '=':
        e.preventDefault();
        this.zoomIn();
        break;
      case '-':
      case '_':
        e.preventDefault();
        this.zoomOut();
        break;
      case '0':
        e.preventDefault();
        this.resetZoom();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        this.toggleFullscreen();
        break;
      case ' ':
        e.preventDefault();
        this.toggleAutoRotate();
        const autoBtn = this.controls.querySelector('[data-action="toggle-auto"]');
        if (autoBtn) autoBtn.classList.toggle('active');
        break;
    }
  }
  
  // NEW: Mouse wheel control
  handleMouseWheel(e) {
    e.preventDefault();
    
    // Check if Ctrl is pressed for zoom, otherwise rotate
    if (e.ctrlKey || e.metaKey) {
      // Zoom
      if (e.deltaY < 0) {
        this.zoomIn();
      } else {
        this.zoomOut();
      }
    } else {
      // Rotate
      if (e.deltaY < 0) {
        this.rotateBy(-1);
      } else {
        this.rotateBy(1);
      }
    }
  }
  
  // NEW: Zoom functions
  zoomIn() {
    if (!this.options.enableZoom) return;
    
    this.zoomLevel = Math.min(this.maxZoom, this.zoomLevel + this.zoomStep);
    this.applyZoom();
    this.updateZoomIndicator();
  }
  
  zoomOut() {
    if (!this.options.enableZoom) return;
    
    this.zoomLevel = Math.max(this.minZoom, this.zoomLevel - this.zoomStep);
    this.applyZoom();
    this.updateZoomIndicator();
  }
  
  resetZoom() {
    if (!this.options.enableZoom) return;
    
    this.zoomLevel = 1;
    this.applyZoom();
    this.updateZoomIndicator();
  }
  
  applyZoom() {
    this.imgElement.style.transform = `scale(${this.zoomLevel})`;
    this.imgElement.style.transition = 'transform 0.2s ease';
  }
  
  updateZoomIndicator() {
    const percentage = Math.round(this.zoomLevel * 100);
    this.zoomIndicator.textContent = `${percentage}%`;
    
    // Show indicator temporarily
    this.zoomIndicator.style.opacity = '1';
    clearTimeout(this.zoomIndicatorTimeout);
    this.zoomIndicatorTimeout = setTimeout(() => {
      if (this.zoomLevel === 1) {
        this.zoomIndicator.style.opacity = '0';
      }
    }, 2000);
  }
  
  // NEW: Fullscreen functions
  toggleFullscreen() {
    if (!this.options.enableFullscreen) return;
    
    if (this.isFullscreen) {
      this.exitFullscreen();
    } else {
      this.enterFullscreen();
    }
  }
  
  enterFullscreen() {
    const elem = this.container;
    
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }
  
  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
  
  handleFullscreenChange() {
    this.isFullscreen = !!(document.fullscreenElement || 
                           document.webkitFullscreenElement || 
                           document.mozFullScreenElement || 
                           document.msFullscreenElement);
    
    // Update fullscreen button icon in the unified controls panel
    const fullscreenBtn = this.controls.querySelector('[data-action="fullscreen"]');
    if (fullscreenBtn) {
      if (this.isFullscreen) {
        fullscreenBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
          </svg>
        `;
        fullscreenBtn.title = "Exit Fullscreen (F or Esc)";
        this.container.classList.add('viewer-360--fullscreen');
      } else {
        fullscreenBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        `;
        fullscreenBtn.title = "Fullscreen (F)";
        this.container.classList.remove('viewer-360--fullscreen');
      }
    }
  }
  
  destroy() {
    // Stop animations
    this.stopAutoRotate();
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    
    // Exit fullscreen if active
    if (this.isFullscreen) {
      this.exitFullscreen();
    }
    
    // Remove event listeners
    this.canvas.removeEventListener('mousedown', this.handleDragStart);
    this.canvas.removeEventListener('touchstart', this.handleDragStart);
    
    // Clear container
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
