// Parallax effect for hero section
class ParallaxEffect {
  constructor() {
    this.hero = document.querySelector('.hero');
    this.heroContent = document.querySelector('.hero__content');
    this.heroBike = document.querySelector('.hero__bike');
    this.lastScrollY = window.scrollY;
    this.ticking = false;
    
    this.init();
  }
  
  init() {
    if (!this.hero) return;
    
    // Set initial transform origin for smoother scaling
    if (this.heroBike) {
      this.heroBike.style.transformOrigin = 'center center';
    }
    
    // Listen to scroll event with RAF optimization
    window.addEventListener('scroll', () => {
      this.lastScrollY = window.scrollY;
      this.requestTick();
    }, { passive: true });
    
    // Initial update
    this.update();
  }
  
  requestTick() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.update();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }
  
  update() {
    const scrolled = this.lastScrollY;
    const heroHeight = this.hero.offsetHeight;
    
    // Only apply parallax while hero is in viewport
    if (scrolled > heroHeight) return;
    
    // Calculate parallax values
    const scrollPercent = scrolled / heroHeight;
    
    // Background parallax (slower movement)
    const bgOffset = scrolled * 0.5;
    this.hero.style.backgroundPositionY = `${bgOffset}px`;
    
    // Bike parallax (medium speed with slight scale)
    if (this.heroBike) {
      const bikeOffset = scrolled * 0.3;
      const bikeScale = 1 - (scrollPercent * 0.2); // Scale from 1 to 0.8
      const bikeOpacity = 1 - (scrollPercent * 0.8); // Fade out
      
      this.heroBike.style.transform = `translate(-50%, calc(-50% + ${bikeOffset}px)) scale(${bikeScale})`;
      this.heroBike.style.opacity = bikeOpacity;
    }
    
    // Content parallax (slower fade and slight movement)
    if (this.heroContent) {
      const contentOffset = -70;
      const contentOpacity = 1 - (scrollPercent * 1.2);
      
      this.heroContent.style.transform = `translateY(${contentOffset}px)`;
      this.heroContent.style.opacity = Math.max(0, contentOpacity);
    }
  }
}

// Initialize parallax when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ParallaxEffect();
});

