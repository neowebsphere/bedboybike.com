/**
 * Bike Customizer - Interactive motorcycle customization
 * Allows users to select parts and see real-time preview
 */

// Parts database
const partsDatabase = {
  frame: [
    { id: 'frame-stock', name: 'Stock V-Rod Frame', details: 'Original factory frame', price: 0 },
    { id: 'frame-chopper', name: 'Chopper Extended', details: 'Extended +4" rake', price: 2500 },
    { id: 'frame-lowrider', name: 'Low Rider Drop', details: 'Lowered 2" stance', price: 1800 },
    { id: 'frame-hardtail', name: 'Hardtail Conversion', details: 'Classic rigid rear', price: 3200 },
  ],
  exhaust: [
    { id: 'exhaust-stock', name: 'Stock Exhaust', details: 'Factory system', price: 0 },
    { id: 'exhaust-shorty', name: 'Shorty Pipes', details: 'Aggressive short cut', price: 850 },
    { id: 'exhaust-drag', name: 'Drag Pipes', details: 'Straight through racing', price: 1200 },
    { id: 'exhaust-fishtail', name: 'Fishtail Classic', details: 'Vintage chrome tips', price: 950 },
    { id: 'exhaust-2into1', name: '2-into-1 Megaphone', details: 'Performance merge', price: 1500 },
  ],
  wheels: [
    { id: 'wheels-stock', name: 'Stock 19/18"', details: 'Factory alloy', price: 0 },
    { id: 'wheels-spoke', name: 'Chrome Spokes', details: '80 spoke classic', price: 1800 },
    { id: 'wheels-solid', name: 'Solid Disc', details: 'Aggressive solid look', price: 2200 },
    { id: 'wheels-turbine', name: 'Turbine Black', details: '5-spoke turbine design', price: 2500 },
    { id: 'wheels-wire', name: 'Fat Wire 21"', details: 'Oversized front', price: 2800 },
  ],
  handlebars: [
    { id: 'bars-stock', name: 'Stock Bars', details: 'Factory position', price: 0 },
    { id: 'bars-drag', name: 'Drag Bars', details: 'Low aggressive stance', price: 350 },
    { id: 'bars-ape', name: 'Ape Hangers 12"', details: 'High rise chrome', price: 450 },
    { id: 'bars-ape16', name: 'Ape Hangers 16"', details: 'Extra high rise', price: 550 },
    { id: 'bars-clip', name: 'Clip-Ons', details: 'Café racer style', price: 400 },
    { id: 'bars-beach', name: 'Beach Bars', details: 'Wide swept back', price: 380 },
  ],
  seat: [
    { id: 'seat-stock', name: 'Stock Seat', details: 'Factory two-up', price: 0 },
    { id: 'seat-solo', name: 'Solo Bobber', details: 'Spring mounted single', price: 650 },
    { id: 'seat-cafe', name: 'Café Tail', details: 'Racing style rear cowl', price: 850 },
    { id: 'seat-bagger', name: 'Bagger Comfort', details: 'Touring with backrest', price: 950 },
    { id: 'seat-diamond', name: 'Diamond Stitch', details: 'Custom leather work', price: 1100 },
  ],
  paint: [
    { id: 'paint-stock', name: 'Stock Black', details: 'Factory finish', price: 0, color: '#1a1a1a' },
    { id: 'paint-matte', name: 'Matte Black', details: 'Murdered out', price: 800, color: '#0d0d0d' },
    { id: 'paint-chrome', name: 'Chrome Mirror', details: 'Full chrome body', price: 2500, color: '#c0c0c0' },
    { id: 'paint-red', name: 'Candy Apple Red', details: 'Deep metallic red', price: 1200, color: '#cc0000' },
    { id: 'paint-blue', name: 'Electric Blue', details: 'Pearl metallic', price: 1200, color: '#0066cc' },
    { id: 'paint-orange', name: 'Harley Orange', details: 'Classic HD orange', price: 1100, color: '#ff6600' },
    { id: 'paint-green', name: 'Racing Green', details: 'British racing', price: 1200, color: '#006633' },
    { id: 'paint-gold', name: 'Gold Flake', details: 'Custom metal flake', price: 1800, color: '#b8860b' },
    { id: 'paint-purple', name: 'Midnight Purple', details: 'Color shift pearl', price: 1500, color: '#4b0082' },
    { id: 'paint-white', name: 'Pearl White', details: 'Ghost pearl finish', price: 1000, color: '#f5f5f5' },
  ]
};

// State
const customizerState = {
  currentCategory: 'frame',
  selectedParts: {
    frame: 'frame-stock',
    exhaust: 'exhaust-stock',
    wheels: 'wheels-stock',
    handlebars: 'bars-stock',
    seat: 'seat-stock',
    paint: 'paint-stock'
  },
  basePrice: 18500,
  rotation: 0,
  isAutoRotating: false,
  autoRotateInterval: null
};

// DOM Elements
const elements = {
  partsList: document.getElementById('partsList'),
  bikeStage: document.getElementById('bikeStage'),
  bikeImage: document.getElementById('bikeImage'),
  paintLayer: document.getElementById('paintLayer'),
  selectedPartsList: document.getElementById('selectedPartsList'),
  basePrice: document.getElementById('basePrice'),
  modsPrice: document.getElementById('modsPrice'),
  totalPrice: document.getElementById('totalPrice'),
  btnRotateLeft: document.getElementById('btnRotateLeft'),
  btnRotateRight: document.getElementById('btnRotateRight'),
  btnAutoRotate: document.getElementById('btnAutoRotate'),
  btnRequestQuote: document.getElementById('btnRequestQuote'),
  btnResetCustomization: document.getElementById('btnResetCustomization')
};

// Initialize
function initCustomizer() {
  if (!elements.partsList) return; // Section might not be on page
  
  setupCategoryTabs();
  renderParts(customizerState.currentCategory);
  updateSelectedPartsList();
  updatePrices();
  setupViewerControls();
  setupActionButtons();
}

// Setup category tabs
function setupCategoryTabs() {
  const tabs = document.querySelectorAll('.customizer__tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active state
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update current category and render parts
      customizerState.currentCategory = tab.dataset.category;
      renderParts(customizerState.currentCategory);
    });
  });
}

// Render parts list
function renderParts(category) {
  const parts = partsDatabase[category];
  if (!parts || !elements.partsList) return;
  
  elements.partsList.innerHTML = parts.map(part => {
    const isSelected = customizerState.selectedParts[category] === part.id;
    const isPaint = category === 'paint';
    
    return `
      <div class="customizer__part-item ${isSelected ? 'selected' : ''}" 
           data-part-id="${part.id}" 
           data-category="${category}">
        <div class="customizer__part-preview ${isPaint ? 'customizer__part-preview--color' : ''}" 
             style="${isPaint ? `--preview-color: ${part.color}` : ''}">
          ${!isPaint ? '<svg viewBox="0 0 60 45" fill="none" stroke="currentColor" stroke-width="1"><rect x="5" y="5" width="50" height="35" rx="3" opacity="0.3"/></svg>' : ''}
        </div>
        <div class="customizer__part-info">
          <div class="customizer__part-name">${part.name}</div>
          <div class="customizer__part-details">${part.details}</div>
        </div>
        <div class="customizer__part-price ${part.price === 0 ? 'customizer__part-price--included' : ''}">
          ${part.price === 0 ? 'Included' : `+$${part.price.toLocaleString()}`}
        </div>
      </div>
    `;
  }).join('');
  
  // Add click listeners
  elements.partsList.querySelectorAll('.customizer__part-item').forEach(item => {
    item.addEventListener('click', () => {
      selectPart(item.dataset.partId, item.dataset.category);
    });
  });
}

// Select part
function selectPart(partId, category) {
  customizerState.selectedParts[category] = partId;
  
  // Re-render parts list to show selection
  renderParts(category);
  
  // Apply visual effect
  applyPartToBike(partId, category);
  
  // Update prices and selected parts list
  updatePrices();
  updateSelectedPartsList();
  
  // Add highlight animation
  if (elements.bikeImage) {
    elements.bikeImage.classList.add('highlight-pulse');
    setTimeout(() => {
      elements.bikeImage.classList.remove('highlight-pulse');
    }, 600);
  }
}

// Apply part to bike (visual effects)
function applyPartToBike(partId, category) {
  if (category === 'paint') {
    const part = partsDatabase[category].find(p => p.id === partId);
    if (part && elements.paintLayer) {
      elements.paintLayer.style.backgroundColor = part.color;
      
      // Apply filter effects based on color
      if (elements.bikeImage) {
        if (part.color === '#0d0d0d' || part.color === '#1a1a1a') {
          // Matte/Dark black
          elements.bikeImage.style.filter = 'brightness(0.8) contrast(1.1)';
          elements.paintLayer.classList.remove('active');
        } else if (part.color === '#c0c0c0') {
          // Chrome
          elements.bikeImage.style.filter = 'brightness(1.3) contrast(1.2) saturate(0)';
          elements.paintLayer.classList.remove('active');
        } else if (part.color === '#f5f5f5') {
          // White
          elements.bikeImage.style.filter = 'brightness(1.4) contrast(0.9) saturate(0.5)';
          elements.paintLayer.classList.remove('active');
        } else {
          // Colored paint
          elements.bikeImage.style.filter = '';
          elements.paintLayer.classList.add('active');
        }
      }
    }
  }
  
  // For other categories, visual transformations could be applied
  // In a full implementation, you would swap component images
  if (category === 'frame' && elements.bikeStage) {
    const bikeStage = elements.bikeStage;
    bikeStage.style.transition = 'transform 0.5s ease';
    
    switch(partId) {
      case 'frame-chopper':
        updateBikeTransform(1.05, 1);
        break;
      case 'frame-lowrider':
        updateBikeTransform(1, 1, 0, 10);
        break;
      default:
        updateBikeTransform();
    }
  }
}

// Update bike transform
function updateBikeTransform(scaleX = 1, scaleY = 1, translateX = 0, translateY = 0) {
  if (!elements.bikeStage) return;
  elements.bikeStage.style.transform = `
    rotateY(${customizerState.rotation}deg) 
    scaleX(${scaleX}) 
    scaleY(${scaleY}) 
    translateX(${translateX}px) 
    translateY(${translateY}px)
  `;
}

// Update prices
function updatePrices() {
  if (!elements.basePrice) return;
  
  let modsTotal = 0;
  
  Object.entries(customizerState.selectedParts).forEach(([category, partId]) => {
    const part = partsDatabase[category].find(p => p.id === partId);
    if (part) {
      modsTotal += part.price;
    }
  });
  
  const total = customizerState.basePrice + modsTotal;
  
  if (elements.basePrice) {
    elements.basePrice.textContent = `$${customizerState.basePrice.toLocaleString()}`;
  }
  if (elements.modsPrice) {
    elements.modsPrice.textContent = modsTotal > 0 ? `+$${modsTotal.toLocaleString()}` : '+$0';
  }
  if (elements.totalPrice) {
    elements.totalPrice.textContent = `$${total.toLocaleString()}`;
    
    // Animate price change
    elements.totalPrice.style.transform = 'scale(1.1)';
    setTimeout(() => {
      elements.totalPrice.style.transform = 'scale(1)';
    }, 200);
  }
}

// Update selected parts list
function updateSelectedPartsList() {
  if (!elements.selectedPartsList) return;
  
  const categories = ['frame', 'exhaust', 'wheels', 'handlebars', 'seat', 'paint'];
  
  elements.selectedPartsList.innerHTML = categories.map(category => {
    const partId = customizerState.selectedParts[category];
    const part = partsDatabase[category].find(p => p.id === partId);
    const isStock = part && part.price === 0;
    
    return `
      <div class="customizer__selected-part ${!isStock ? 'has-selection' : ''}">
        <span class="customizer__selected-category">${category.toUpperCase()}</span>
        <span class="customizer__selected-name">${part ? part.name : '--'}</span>
      </div>
    `;
  }).join('');
}

// Setup viewer controls
function setupViewerControls() {
  if (!elements.btnRotateLeft) return;
  
  elements.btnRotateLeft.addEventListener('click', () => {
    customizerState.rotation -= 30;
    updateBikeTransform();
  });
  
  elements.btnRotateRight.addEventListener('click', () => {
    customizerState.rotation += 30;
    updateBikeTransform();
  });
  
  if (elements.btnAutoRotate) {
    elements.btnAutoRotate.addEventListener('click', toggleAutoRotate);
  }
}

// Toggle auto rotate
function toggleAutoRotate() {
  customizerState.isAutoRotating = !customizerState.isAutoRotating;
  
  if (elements.btnAutoRotate) {
    elements.btnAutoRotate.classList.toggle('active', customizerState.isAutoRotating);
  }
  
  if (customizerState.isAutoRotating) {
    startAutoRotate();
  } else {
    stopAutoRotate();
  }
}

// Start auto rotate
function startAutoRotate() {
  if (customizerState.autoRotateInterval) return;
  
  customizerState.autoRotateInterval = setInterval(() => {
    customizerState.rotation += 0.5;
    updateBikeTransform();
  }, 16); // ~60fps
}

// Stop auto rotate
function stopAutoRotate() {
  if (customizerState.autoRotateInterval) {
    clearInterval(customizerState.autoRotateInterval);
    customizerState.autoRotateInterval = null;
  }
}

// Setup action buttons
function setupActionButtons() {
  if (elements.btnRequestQuote) {
    elements.btnRequestQuote.addEventListener('click', requestQuote);
  }
  
  if (elements.btnResetCustomization) {
    elements.btnResetCustomization.addEventListener('click', resetCustomization);
  }
}

// Request quote
function requestQuote() {
  // Calculate total
  let modsTotal = 0;
  Object.entries(customizerState.selectedParts).forEach(([category, partId]) => {
    const part = partsDatabase[category].find(p => p.id === partId);
    if (part) modsTotal += part.price;
  });
  
  const total = customizerState.basePrice + modsTotal;
  
  // Create parts summary
  const partsSummary = Object.entries(customizerState.selectedParts).map(([category, partId]) => {
    const part = partsDatabase[category].find(p => p.id === partId);
    return `${category}: ${part.name}`;
  }).join('\n');
  
  // Scroll to contact section
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Reset customization
function resetCustomization() {
  customizerState.selectedParts = {
    frame: 'frame-stock',
    exhaust: 'exhaust-stock',
    wheels: 'wheels-stock',
    handlebars: 'bars-stock',
    seat: 'seat-stock',
    paint: 'paint-stock'
  };
  
  // Reset visual effects
  if (elements.bikeImage) {
    elements.bikeImage.style.filter = '';
  }
  if (elements.paintLayer) {
    elements.paintLayer.classList.remove('active');
    elements.paintLayer.style.backgroundColor = 'transparent';
  }
  
  // Update UI
  renderParts(customizerState.currentCategory);
  updateSelectedPartsList();
  updatePrices();
  updateBikeTransform();
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCustomizer);
} else {
  initCustomizer();
}

