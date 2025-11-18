// Modal functionality
class BikeModal {
  constructor() {
    this.modal = document.getElementById('bikeModal');
    this.modalClose = document.getElementById('modalClose');
    this.modalMainImage = document.getElementById('modalMainImage');
    this.modalThumbnails = document.getElementById('modalThumbnails');
    this.modalTitle = document.getElementById('modalTitle');
    this.modalModel = document.getElementById('modalModel');
    this.modalDescription = document.getElementById('modalDescription');
    this.modalSpecs = document.getElementById('modalSpecs');
    this.modalModifications = document.getElementById('modalModifications');
    this.modalGallery = document.getElementById('modalGallery');
    
    this.currentBike = null;
    this.currentImageIndex = 0;
    this.viewMode = 'standard'; // 'standard' or '360'
    this.viewer360 = null;
    
    this.init();
  }
  
  init() {
    // Close button
    this.modalClose.addEventListener('click', () => this.close());
    
    // Close on background click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });
    
    // Arrow keys for image navigation
    document.addEventListener('keydown', (e) => {
      if (!this.modal.classList.contains('active')) return;
      
      if (e.key === 'ArrowLeft') {
        this.previousImage();
      } else if (e.key === 'ArrowRight') {
        this.nextImage();
      }
    });
  }
  
  open(bike) {
    this.currentBike = bike;
    this.currentImageIndex = 0;
    
    this.renderModalContent();
    
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Cleanup 360 viewer if active
    if (this.viewer360) {
      this.viewer360.destroy();
      this.viewer360 = null;
    }
    this.viewMode = 'standard';
  }
  
  renderModalContent() {
    if (!this.currentBike) return;
    
    const bike = this.currentBike;
    
    // Set title and model
    this.modalTitle.textContent = bike.name;
    this.modalModel.textContent = `${bike.model} • ${bike.year} • ${bike.category}`;
    
    // Set description
    this.modalDescription.textContent = bike.description;
    
    // Set main image
    const mainImageSrc = bike.images && bike.images.length > 0 
      ? bike.images[0] 
      : bike.thumbnail || 'images/placeholder-bike.svg';
    this.modalMainImage.src = mainImageSrc;
    this.modalMainImage.alt = bike.name;
    
    // Render thumbnails
    this.renderThumbnails();
    
    // Add 360° view toggle button
    this.add360ViewButton();
    
    // Render specifications
    this.renderSpecs();
    
    // Render modifications
    this.renderModifications();
  }
  
  add360ViewButton() {
    // Check if button already exists
    let viewToggle = this.modalGallery.querySelector('.view-toggle-btn');
    
    if (!viewToggle) {
      viewToggle = document.createElement('button');
      viewToggle.className = 'btn btn--360 view-toggle-btn';
      viewToggle.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
        </svg>
        360° View
      `;
      
      viewToggle.addEventListener('click', () => this.toggle360View());
      
      // Insert after thumbnails
      this.modalThumbnails.parentNode.insertBefore(viewToggle, this.modalThumbnails.nextSibling);
    }
  }
  
  toggle360View() {
    if (this.viewMode === 'standard') {
      this.show360View();
    } else {
      this.showStandardView();
    }
  }
  
  show360View() {
    this.viewMode = '360';
    
    // Hide standard gallery elements
    const mainImageWrapper = this.modalMainImage.parentElement;
    mainImageWrapper.style.display = 'none';
    this.modalThumbnails.style.display = 'none';
    
    // Create 360 viewer container if it doesn't exist
    let viewer360Container = document.getElementById('viewer360Container');
    if (!viewer360Container) {
      viewer360Container = document.createElement('div');
      viewer360Container.id = 'viewer360Container';
      viewer360Container.style.width = '100%';
      viewer360Container.style.height = '100%';
      viewer360Container.style.minHeight = '500px';
      mainImageWrapper.parentNode.insertBefore(viewer360Container, mainImageWrapper);
    } else {
      viewer360Container.style.display = 'block';
    }
    
    // Initialize 360 viewer
    if (this.currentBike.images && this.currentBike.images.length > 0) {
      this.viewer360 = new Viewer360('viewer360Container', this.currentBike.images);
    }
    
    // Update button text
    const viewToggleBtn = this.modalGallery.querySelector('.view-toggle-btn');
    if (viewToggleBtn) {
      viewToggleBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        Standard View
      `;
    }
  }
  
  showStandardView() {
    this.viewMode = 'standard';
    
    // Cleanup 360 viewer
    if (this.viewer360) {
      this.viewer360.destroy();
      this.viewer360 = null;
    }
    
    // Hide 360 container
    const viewer360Container = document.getElementById('viewer360Container');
    if (viewer360Container) {
      viewer360Container.style.display = 'none';
    }
    
    // Show standard gallery
    const mainImageWrapper = this.modalMainImage.parentElement;
    mainImageWrapper.style.display = 'block';
    this.modalThumbnails.style.display = 'flex';
    
    // Update button text
    const viewToggleBtn = this.modalGallery.querySelector('.view-toggle-btn');
    if (viewToggleBtn) {
      viewToggleBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
        </svg>
        360° View
      `;
    }
  }
  
  renderThumbnails() {
    if (!this.currentBike.images || this.currentBike.images.length === 0) {
      this.modalThumbnails.innerHTML = '';
      return;
    }
    
    this.modalThumbnails.innerHTML = '';
    
    this.currentBike.images.forEach((imageSrc, index) => {
      const thumbnail = document.createElement('div');
      thumbnail.className = 'modal__thumbnail';
      if (index === this.currentImageIndex) {
        thumbnail.classList.add('active');
      }
      
      thumbnail.innerHTML = `
        <img src="${imageSrc}" alt="${this.currentBike.name} - Image ${index + 1}" onerror="this.src='images/placeholder-bike.svg'">
      `;
      
      thumbnail.addEventListener('click', () => this.setImage(index));
      
      this.modalThumbnails.appendChild(thumbnail);
    });
  }
  
  renderSpecs() {
    this.modalSpecs.innerHTML = '';
    
    const specs = this.currentBike.specs;
    
    for (const [key, value] of Object.entries(specs)) {
      const specElement = document.createElement('div');
      specElement.className = 'modal__spec';
      
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      
      specElement.innerHTML = `
        <span class="modal__spec-label">${label}</span>
        <span class="modal__spec-value">${value}</span>
      `;
      
      this.modalSpecs.appendChild(specElement);
    }
    
    // Add status
    const statusElement = document.createElement('div');
    statusElement.className = 'modal__spec';
    statusElement.innerHTML = `
      <span class="modal__spec-label">Status</span>
      <span class="modal__spec-value">${this.currentBike.status}</span>
    `;
    this.modalSpecs.appendChild(statusElement);
  }
  
  renderModifications() {
    this.modalModifications.innerHTML = '';
    
    if (!this.currentBike.modifications || this.currentBike.modifications.length === 0) {
      return;
    }
    
    this.currentBike.modifications.forEach(mod => {
      const modElement = document.createElement('div');
      modElement.className = 'modal__modification';
      modElement.textContent = mod;
      
      this.modalModifications.appendChild(modElement);
    });
  }
  
  setImage(index) {
    if (!this.currentBike.images || index < 0 || index >= this.currentBike.images.length) {
      return;
    }
    
    this.currentImageIndex = index;
    this.modalMainImage.src = this.currentBike.images[index];
    
    // Update active thumbnail
    const thumbnails = this.modalThumbnails.querySelectorAll('.modal__thumbnail');
    thumbnails.forEach((thumb, i) => {
      if (i === index) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });
  }
  
  nextImage() {
    if (!this.currentBike.images) return;
    
    const nextIndex = (this.currentImageIndex + 1) % this.currentBike.images.length;
    this.setImage(nextIndex);
  }
  
  previousImage() {
    if (!this.currentBike.images) return;
    
    const prevIndex = (this.currentImageIndex - 1 + this.currentBike.images.length) % this.currentBike.images.length;
    this.setImage(prevIndex);
  }
}

// Initialize modal and make it globally accessible
document.addEventListener('DOMContentLoaded', () => {
  window.bikeModal = new BikeModal();
});
