/**
 * Bad Boy Bike Customizer
 * Interactive 3D-style bike customization showroom
 */

// =========================================
// PARTS DATABASE
// =========================================
const partsDatabase = {
  frame: [
    {
      id: "frame-stock",
      name: "Stock V-Rod Frame",
      details: "Original factory frame",
      price: 0,
      preview: "default",
    },
    {
      id: "frame-chopper",
      name: "Chopper Extended",
      details: 'Extended +4" rake',
      price: 2500,
      preview: "chopper",
    },
    {
      id: "frame-lowrider",
      name: "Low Rider Drop",
      details: 'Lowered 2" stance',
      price: 1800,
      preview: "lowrider",
    },
    {
      id: "frame-hardtail",
      name: "Hardtail Conversion",
      details: "Classic rigid rear",
      price: 3200,
      preview: "hardtail",
    },
  ],
  exhaust: [
    {
      id: "exhaust-stock",
      name: "Stock Exhaust",
      details: "Factory system",
      price: 0,
      preview: "default",
    },
    {
      id: "exhaust-shorty",
      name: "Shorty Pipes",
      details: "Aggressive short cut",
      price: 850,
      preview: "shorty",
    },
    {
      id: "exhaust-drag",
      name: "Drag Pipes",
      details: "Straight through racing",
      price: 1200,
      preview: "drag",
    },
    {
      id: "exhaust-fishtail",
      name: "Fishtail Classic",
      details: "Vintage chrome tips",
      price: 950,
      preview: "fishtail",
    },
    {
      id: "exhaust-2into1",
      name: "2-into-1 Megaphone",
      details: "Performance merge",
      price: 1500,
      preview: "megaphone",
    },
  ],
  wheels: [
    {
      id: "wheels-stock",
      name: 'Stock 19/18"',
      details: "Factory alloy",
      price: 0,
      preview: "default",
    },
    {
      id: "wheels-spoke",
      name: "Chrome Spokes",
      details: "80 spoke classic",
      price: 1800,
      preview: "spoke",
    },
    {
      id: "wheels-solid",
      name: "Solid Disc",
      details: "Aggressive solid look",
      price: 2200,
      preview: "solid",
    },
    {
      id: "wheels-turbine",
      name: "Turbine Black",
      details: "5-spoke turbine design",
      price: 2500,
      preview: "turbine",
    },
    {
      id: "wheels-wire",
      name: 'Fat Wire 21"',
      details: "Oversized front",
      price: 2800,
      preview: "wire21",
    },
  ],
  handlebars: [
    {
      id: "bars-stock",
      name: "Stock Bars",
      details: "Factory position",
      price: 0,
      preview: "default",
    },
    {
      id: "bars-drag",
      name: "Drag Bars",
      details: "Low aggressive stance",
      price: 350,
      preview: "drag",
    },
    {
      id: "bars-ape",
      name: 'Ape Hangers 12"',
      details: "High rise chrome",
      price: 450,
      preview: "ape12",
    },
    {
      id: "bars-ape16",
      name: 'Ape Hangers 16"',
      details: "Extra high rise",
      price: 550,
      preview: "ape16",
    },
    {
      id: "bars-clip",
      name: "Clip-Ons",
      details: "Café racer style",
      price: 400,
      preview: "clipon",
    },
    {
      id: "bars-beach",
      name: "Beach Bars",
      details: "Wide swept back",
      price: 380,
      preview: "beach",
    },
  ],
  seat: [
    {
      id: "seat-stock",
      name: "Stock Seat",
      details: "Factory two-up",
      price: 0,
      preview: "default",
    },
    {
      id: "seat-solo",
      name: "Solo Bobber",
      details: "Spring mounted single",
      price: 650,
      preview: "solo",
    },
    {
      id: "seat-cafe",
      name: "Café Tail",
      details: "Racing style rear cowl",
      price: 850,
      preview: "cafe",
    },
    {
      id: "seat-bagger",
      name: "Bagger Comfort",
      details: "Touring with backrest",
      price: 950,
      preview: "bagger",
    },
    {
      id: "seat-diamond",
      name: "Diamond Stitch",
      details: "Custom leather work",
      price: 1100,
      preview: "diamond",
    },
  ],
  paint: [
    {
      id: "paint-stock",
      name: "Stock Black",
      details: "Factory finish",
      price: 0,
      color: "#1a1a1a",
    },
    {
      id: "paint-matte",
      name: "Matte Black",
      details: "Murdered out",
      price: 800,
      color: "#0d0d0d",
    },
    {
      id: "paint-chrome",
      name: "Chrome Mirror",
      details: "Full chrome body",
      price: 2500,
      color: "#c0c0c0",
    },
    {
      id: "paint-red",
      name: "Candy Apple Red",
      details: "Deep metallic red",
      price: 1200,
      color: "#cc0000",
    },
    {
      id: "paint-blue",
      name: "Electric Blue",
      details: "Pearl metallic",
      price: 1200,
      color: "#0066cc",
    },
    {
      id: "paint-orange",
      name: "Harley Orange",
      details: "Classic HD orange",
      price: 1100,
      color: "#ff6600",
    },
    {
      id: "paint-green",
      name: "Racing Green",
      details: "British racing",
      price: 1200,
      color: "#006633",
    },
    {
      id: "paint-gold",
      name: "Gold Flake",
      details: "Custom metal flake",
      price: 1800,
      color: "#b8860b",
    },
    {
      id: "paint-purple",
      name: "Midnight Purple",
      details: "Color shift pearl",
      price: 1500,
      color: "#4b0082",
    },
    {
      id: "paint-white",
      name: "Pearl White",
      details: "Ghost pearl finish",
      price: 1000,
      color: "#f5f5f5",
    },
  ],
};

// =========================================
// PRESETS
// =========================================
const presets = {
  "blacked-out": {
    name: "Blacked Out",
    parts: {
      frame: "frame-stock",
      exhaust: "exhaust-drag",
      wheels: "wheels-solid",
      handlebars: "bars-drag",
      seat: "seat-solo",
      paint: "paint-matte",
    },
  },
  "chrome-king": {
    name: "Chrome King",
    parts: {
      frame: "frame-stock",
      exhaust: "exhaust-fishtail",
      wheels: "wheels-spoke",
      handlebars: "bars-beach",
      seat: "seat-diamond",
      paint: "paint-chrome",
    },
  },
  racing: {
    name: "Racing",
    parts: {
      frame: "frame-lowrider",
      exhaust: "exhaust-2into1",
      wheels: "wheels-turbine",
      handlebars: "bars-clip",
      seat: "seat-cafe",
      paint: "paint-red",
    },
  },
  vintage: {
    name: "Vintage",
    parts: {
      frame: "frame-hardtail",
      exhaust: "exhaust-fishtail",
      wheels: "wheels-spoke",
      handlebars: "bars-ape",
      seat: "seat-solo",
      paint: "paint-orange",
    },
  },
};

// =========================================
// STATE
// =========================================
const state = {
  currentCategory: "frame",
  selectedParts: {
    frame: "frame-stock",
    exhaust: "exhaust-stock",
    wheels: "wheels-stock",
    handlebars: "bars-stock",
    seat: "seat-stock",
    paint: "paint-stock",
  },
  basePrice: 18500,
  rotation: 0,
  zoom: 1,
  isDragging: false,
  startX: 0,
  isAutoRotating: false,
};

// =========================================
// DOM ELEMENTS
// =========================================
const elements = {
  partsList: document.getElementById("partsList"),
  bikeStage: document.getElementById("bikeStage"),
  bikeImage: document.getElementById("bikeImage"),
  selectedParts: document.getElementById("selectedParts"),
  basePrice: document.getElementById("basePrice"),
  modsPrice: document.getElementById("modsPrice"),
  totalPrice: document.getElementById("totalPrice"),
  angleValue: document.getElementById("angleValue"),
  rotationIndicator: document.getElementById("rotationIndicator"),
  dragHint: document.getElementById("dragHint"),
  toast: document.getElementById("toast"),
  toastMessage: document.getElementById("toastMessage"),
  bikeCanvas: document.getElementById("bikeCanvas"),
  // Buttons
  btnRotateLeft: document.getElementById("btnRotateLeft"),
  btnRotateRight: document.getElementById("btnRotateRight"),
  btnAutoRotate: document.getElementById("btnAutoRotate"),
  btnZoomIn: document.getElementById("btnZoomIn"),
  btnZoomOut: document.getElementById("btnZoomOut"),
  btnReset: document.getElementById("btnReset"),
  btnSaveBuild: document.getElementById("btnSaveBuild"),
  btnShareBuild: document.getElementById("btnShareBuild"),
  btnRequestQuote: document.getElementById("btnRequestQuote"),
};

// =========================================
// INITIALIZATION
// =========================================
function init() {
  renderParts(state.currentCategory);
  setupCategoryTabs();
  setupViewerControls();
  setupDragRotation();
  setupPresets();
  setupActionButtons();
  updatePrices();
  updateSelectedPartsList();
}

// =========================================
// RENDER PARTS LIST
// =========================================
function renderParts(category) {
  const parts = partsDatabase[category];

  elements.partsList.innerHTML = parts
    .map((part) => {
      const isSelected = state.selectedParts[category] === part.id;
      const isPaint = category === "paint";

      return `
      <div class="part-item ${isSelected ? "selected" : ""}" data-part-id="${
        part.id
      }" data-category="${category}">
        <div class="part-item__preview ${
          isPaint ? "part-item__preview--color" : ""
        }" 
             style="${isPaint ? `--preview-color: ${part.color}` : ""}">
          ${
            !isPaint
              ? '<svg viewBox="0 0 60 45" fill="none" stroke="currentColor" stroke-width="1"><rect x="5" y="5" width="50" height="35" rx="3" opacity="0.3"/></svg>'
              : ""
          }
        </div>
        <div class="part-item__info">
          <div class="part-item__name">${part.name}</div>
          <div class="part-item__details">${part.details}</div>
        </div>
        <div class="part-item__price ${
          part.price === 0 ? "part-item__price--included" : ""
        }">
          ${part.price === 0 ? "Included" : `+$${part.price.toLocaleString()}`}
        </div>
      </div>
    `;
    })
    .join("");

  // Add click listeners
  elements.partsList.querySelectorAll(".part-item").forEach((item) => {
    item.addEventListener("click", () =>
      selectPart(item.dataset.partId, item.dataset.category)
    );
  });
}

// =========================================
// CATEGORY TABS
// =========================================
function setupCategoryTabs() {
  document.querySelectorAll(".category-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      // Update active state
      document
        .querySelectorAll(".category-tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Update current category and render parts
      state.currentCategory = tab.dataset.category;
      renderParts(state.currentCategory);
    });
  });
}

// =========================================
// SELECT PART
// =========================================
function selectPart(partId, category) {
  // Update state
  state.selectedParts[category] = partId;

  // Re-render parts list to show selection
  renderParts(category);

  // Apply visual effect to bike
  applyPartToBike(partId, category);

  // Update prices
  updatePrices();

  // Update selected parts list
  updateSelectedPartsList();

  // Show toast
  const part = partsDatabase[category].find((p) => p.id === partId);
  showToast(`${part.name} applied!`);

  // Add highlight animation to bike
  elements.bikeImage.classList.add("highlight-pulse");
  setTimeout(() => elements.bikeImage.classList.remove("highlight-pulse"), 600);
}

// =========================================
// APPLY PART TO BIKE (Visual Effects)
// =========================================
function applyPartToBike(partId, category) {
  const part = partsDatabase[category].find((p) => p.id === partId);

  if (category === "paint") {
    applyPaintColor(part.color);
  }

  // In a real implementation, you would swap out bike component images
  // For this demo, we'll apply visual transformations
  const bikeStage = elements.bikeStage;

  switch (category) {
    case "frame":
      applyFrameEffect(partId);
      break;
    case "exhaust":
      applyExhaustEffect(partId);
      break;
    case "wheels":
      applyWheelEffect(partId);
      break;
    case "handlebars":
      applyHandlebarEffect(partId);
      break;
    case "seat":
      applySeatEffect(partId);
      break;
  }
}

function applyPaintColor(color) {
  const paintLayer = document.getElementById("layerPaint");
  paintLayer.style.backgroundColor = color;
  paintLayer.classList.add("active");

  // Also update the bike image filter for more realistic color shift
  const bikeImage = elements.bikeImage;

  // Reset any previous filters
  bikeImage.style.filter = "";

  // Apply color-specific effects
  if (color === "#0d0d0d" || color === "#1a1a1a") {
    // Matte/Dark black
    bikeImage.style.filter = "brightness(0.8) contrast(1.1)";
    paintLayer.classList.remove("active");
  } else if (color === "#c0c0c0") {
    // Chrome
    bikeImage.style.filter = "brightness(1.3) contrast(1.2) saturate(0)";
    paintLayer.classList.remove("active");
  } else if (color === "#f5f5f5") {
    // White
    bikeImage.style.filter = "brightness(1.4) contrast(0.9) saturate(0.5)";
    paintLayer.classList.remove("active");
  }
}

function applyFrameEffect(partId) {
  const bikeStage = elements.bikeStage;
  bikeStage.style.transition = "transform 0.5s ease";

  switch (partId) {
    case "frame-chopper":
      bikeStage.style.transform = `rotateY(${state.rotation}deg) scale(${state.zoom}) scaleX(1.05)`;
      break;
    case "frame-lowrider":
      bikeStage.style.transform = `rotateY(${state.rotation}deg) scale(${state.zoom}) translateY(10px)`;
      break;
    default:
      updateBikeTransform();
  }
}

function applyExhaustEffect(partId) {
  // Visual indicator of exhaust change
  const effectsLayer = document.getElementById("layerEffects");
  effectsLayer.innerHTML = "";

  if (partId !== "exhaust-stock") {
    // Add a subtle glow effect for custom exhausts
    const glow = document.createElement("div");
    glow.className = "exhaust-glow";
    glow.style.cssText = `
      position: absolute;
      right: 10%;
      bottom: 30%;
      width: 60px;
      height: 30px;
      background: radial-gradient(ellipse, rgba(255, 100, 50, 0.3), transparent);
      border-radius: 50%;
      animation: exhaustPulse 2s ease-in-out infinite;
    `;
    effectsLayer.appendChild(glow);
  }
}

function applyWheelEffect(partId) {
  // In a full implementation, wheel images would be swapped
  // For demo, we add a visual indicator
}

function applyHandlebarEffect(partId) {
  // Visual transformation for handlebar changes
}

function applySeatEffect(partId) {
  // Visual transformation for seat changes
}

// =========================================
// UPDATE PRICES
// =========================================
function updatePrices() {
  let modsTotal = 0;

  Object.entries(state.selectedParts).forEach(([category, partId]) => {
    const part = partsDatabase[category].find((p) => p.id === partId);
    if (part) {
      modsTotal += part.price;
    }
  });

  const total = state.basePrice + modsTotal;

  elements.basePrice.textContent = `$${state.basePrice.toLocaleString()}`;
  elements.modsPrice.textContent =
    modsTotal > 0 ? `+$${modsTotal.toLocaleString()}` : "+$0";
  elements.totalPrice.textContent = `$${total.toLocaleString()}`;

  // Animate price change
  elements.totalPrice.style.transform = "scale(1.1)";
  setTimeout(() => {
    elements.totalPrice.style.transform = "scale(1)";
  }, 200);
}

// =========================================
// UPDATE SELECTED PARTS LIST
// =========================================
function updateSelectedPartsList() {
  const categories = [
    "frame",
    "exhaust",
    "wheels",
    "handlebars",
    "seat",
    "paint",
  ];
  const selectedPartsContainer = elements.selectedParts;

  selectedPartsContainer.innerHTML = categories
    .map((category) => {
      const partId = state.selectedParts[category];
      const part = partsDatabase[category].find((p) => p.id === partId);
      const hasSelection =
        partId !== `${category}-stock` &&
        partId !== `${category.substring(0, category.length)}s-stock`;
      const isStock = part && part.price === 0;

      return `
      <div class="selected-part ${!isStock ? "has-selection" : ""}">
        <span class="selected-part__category">${category.toUpperCase()}</span>
        <span class="selected-part__name">${part ? part.name : "--"}</span>
      </div>
    `;
    })
    .join("");
}

// =========================================
// VIEWER CONTROLS
// =========================================
function setupViewerControls() {
  // Rotate buttons
  elements.btnRotateLeft.addEventListener("click", () => {
    state.rotation -= 30;
    updateBikeTransform();
  });

  elements.btnRotateRight.addEventListener("click", () => {
    state.rotation += 30;
    updateBikeTransform();
  });

  // Auto rotate
  elements.btnAutoRotate.addEventListener("click", toggleAutoRotate);

  // Zoom controls
  elements.btnZoomIn.addEventListener("click", () => {
    state.zoom = Math.min(2, state.zoom + 0.2);
    updateBikeTransform();
  });

  elements.btnZoomOut.addEventListener("click", () => {
    state.zoom = Math.max(0.5, state.zoom - 0.2);
    updateBikeTransform();
  });

  // Reset
  elements.btnReset.addEventListener("click", resetView);
}

function updateBikeTransform() {
  elements.bikeStage.style.transform = `rotateY(${state.rotation}deg) scale(${state.zoom})`;

  // Update angle display
  const normalizedAngle = ((state.rotation % 360) + 360) % 360;
  elements.angleValue.textContent = `${Math.round(normalizedAngle)}°`;

  // Update rotation indicator
  const indicatorPosition = (normalizedAngle / 360) * 100;
  elements.rotationIndicator.style.left = `${indicatorPosition}%`;
}

function toggleAutoRotate() {
  state.isAutoRotating = !state.isAutoRotating;
  elements.btnAutoRotate.classList.toggle("active", state.isAutoRotating);

  if (state.isAutoRotating) {
    autoRotate();
  }
}

function autoRotate() {
  if (!state.isAutoRotating) return;

  state.rotation += 0.5;
  updateBikeTransform();
  requestAnimationFrame(autoRotate);
}

function resetView() {
  state.rotation = 0;
  state.zoom = 1;
  state.isAutoRotating = false;
  elements.btnAutoRotate.classList.remove("active");
  updateBikeTransform();
  showToast("View reset");
}

// =========================================
// DRAG ROTATION
// =========================================
function setupDragRotation() {
  const canvas = elements.bikeCanvas;

  // Mouse events
  canvas.addEventListener("mousedown", startDrag);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", endDrag);

  // Touch events
  canvas.addEventListener("touchstart", startDrag, { passive: true });
  document.addEventListener("touchmove", drag, { passive: true });
  document.addEventListener("touchend", endDrag);

  // Mouse wheel zoom
  canvas.addEventListener("wheel", handleWheel, { passive: false });
}

function startDrag(e) {
  state.isDragging = true;
  state.startX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;

  // Hide drag hint on first interaction
  if (elements.dragHint) {
    elements.dragHint.classList.add("hidden");
  }

  // Stop auto rotate
  if (state.isAutoRotating) {
    toggleAutoRotate();
  }
}

function drag(e) {
  if (!state.isDragging) return;

  const currentX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
  const deltaX = currentX - state.startX;

  state.rotation += deltaX * 0.5;
  state.startX = currentX;

  updateBikeTransform();
}

function endDrag() {
  state.isDragging = false;
}

function handleWheel(e) {
  e.preventDefault();

  if (e.deltaY < 0) {
    state.zoom = Math.min(2, state.zoom + 0.1);
  } else {
    state.zoom = Math.max(0.5, state.zoom - 0.1);
  }

  updateBikeTransform();
}

// =========================================
// PRESETS
// =========================================
function setupPresets() {
  document.querySelectorAll(".preset-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const presetId = btn.dataset.preset;
      applyPreset(presetId);
    });
  });
}

function applyPreset(presetId) {
  const preset = presets[presetId];
  if (!preset) return;

  // Apply all parts from preset
  Object.entries(preset.parts).forEach(([category, partId]) => {
    state.selectedParts[category] = partId;
    applyPartToBike(partId, category);
  });

  // Update UI
  renderParts(state.currentCategory);
  updatePrices();
  updateSelectedPartsList();

  showToast(`${preset.name} preset applied!`);

  // Fancy animation
  elements.bikeImage.style.animation = "none";
  elements.bikeImage.offsetHeight; // Trigger reflow
  elements.bikeImage.style.animation = "presetApply 0.8s ease-out";
}

// =========================================
// ACTION BUTTONS
// =========================================
function setupActionButtons() {
  elements.btnSaveBuild.addEventListener("click", saveBuild);
  elements.btnShareBuild.addEventListener("click", shareBuild);
  elements.btnRequestQuote.addEventListener("click", requestQuote);
}

function saveBuild() {
  const buildData = {
    parts: state.selectedParts,
    timestamp: Date.now(),
  };

  // Save to localStorage
  const savedBuilds = JSON.parse(localStorage.getItem("bbbikeBuilds") || "[]");
  savedBuilds.push(buildData);
  localStorage.setItem("bbbikeBuilds", JSON.stringify(savedBuilds));

  showToast("Build saved successfully!");
}

function shareBuild() {
  // Create shareable URL with build config
  const buildConfig = btoa(JSON.stringify(state.selectedParts));
  const shareUrl = `${window.location.origin}${window.location.pathname}?build=${buildConfig}`;

  // Copy to clipboard
  navigator.clipboard
    .writeText(shareUrl)
    .then(() => {
      showToast("Link copied to clipboard!");
    })
    .catch(() => {
      showToast("Share link created");
    });
}

function requestQuote() {
  // Calculate total
  let modsTotal = 0;
  Object.entries(state.selectedParts).forEach(([category, partId]) => {
    const part = partsDatabase[category].find((p) => p.id === partId);
    if (part) modsTotal += part.price;
  });

  const total = state.basePrice + modsTotal;

  // Create parts summary
  const partsSummary = Object.entries(state.selectedParts)
    .map(([category, partId]) => {
      const part = partsDatabase[category].find((p) => p.id === partId);
      return `${category}: ${part.name}`;
    })
    .join("\n");

  // Redirect to contact with pre-filled info
  const subject = encodeURIComponent("Custom Bike Quote Request");
  const body = encodeURIComponent(
    `I would like to request a quote for the following custom build:\n\n${partsSummary}\n\nEstimated Total: $${total.toLocaleString()}`
  );

  window.location.href = `index.html#contact`;
  showToast("Redirecting to contact form...");
}

// =========================================
// TOAST NOTIFICATIONS
// =========================================
function showToast(message) {
  elements.toastMessage.textContent = message;
  elements.toast.classList.add("show");

  setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 3000);
}

// =========================================
// LOAD BUILD FROM URL
// =========================================
function loadBuildFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const buildConfig = params.get("build");

  if (buildConfig) {
    try {
      const parts = JSON.parse(atob(buildConfig));
      Object.entries(parts).forEach(([category, partId]) => {
        if (partsDatabase[category]) {
          state.selectedParts[category] = partId;
          applyPartToBike(partId, category);
        }
      });

      renderParts(state.currentCategory);
      updatePrices();
      updateSelectedPartsList();
      showToast("Build loaded from link!");
    } catch (e) {
      console.error("Failed to load build from URL", e);
    }
  }
}

// =========================================
// MOBILE NAVIGATION TOGGLE
// =========================================
const navToggle = document.getElementById("navToggle");
const nav = document.querySelector(".nav__list");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("nav__list--active");
    navToggle.classList.toggle("active");
  });
}

// =========================================
// ADD ADDITIONAL CSS FOR ANIMATIONS
// =========================================
const additionalStyles = document.createElement("style");
additionalStyles.textContent = `
  @keyframes presetApply {
    0% { transform: scale(1) rotateY(0); filter: brightness(1); }
    50% { transform: scale(1.05) rotateY(180deg); filter: brightness(1.5); }
    100% { transform: scale(1) rotateY(360deg); filter: brightness(1); }
  }
  
  @keyframes exhaustPulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.2); }
  }
  
  .nav__list--active {
    display: flex !important;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--bg-panel);
    padding: 1rem;
    border-bottom: 1px solid var(--border-cyber);
  }
  
  @media (max-width: 992px) {
    .nav__list--active {
      display: flex !important;
    }
  }
`;
document.head.appendChild(additionalStyles);

// =========================================
// INITIALIZE ON DOM READY
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  init();
  loadBuildFromUrl();
});

// Initialize immediately if DOM is already ready
if (document.readyState !== "loading") {
  init();
  loadBuildFromUrl();
}
