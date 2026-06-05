/* ==========================================================================
   MAIN JS — SSVD CONSTRUCTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 1. Navigation scroll state
  const header = document.getElementById('main-header');
  const scrollThreshold = 50;

  const checkScroll = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.remove('header-transparent');
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
      header.classList.add('header-transparent');
    }
  };

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Initial check

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('btn-mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileMenu = () => {
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden');
  };

  mobileToggle.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  // 3. Subtle Parallax for Hero Background
  const heroSection = document.getElementById('home');
  const heroBg = heroSection.querySelector('.hero-bg');

  window.addEventListener('scroll', () => {
    if (heroSection) {
      const scrollPosition = window.scrollY;
      // Parallax zoom effect
      heroBg.style.transform = `scale(${1 + scrollPosition * 0.0005}) translateY(${scrollPosition * 0.1}px)`;
    }
  });

  // Trigger load state for hero
  setTimeout(() => {
    heroSection.classList.add('loaded');
  }, 100);

  // 4. Scroll Reveal Intersection Observer
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Statistics Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * target);
      
      el.textContent = currentVal;
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = target;
      }
    };
    
    requestAnimationFrame(updateCount);
  };

  const statsSection = document.querySelector('.stats-section');
  let animatedStats = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedStats) {
        statNumbers.forEach(num => animateCounter(num));
        animatedStats = true;
      }
    });
  }, { threshold: 0.3 });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // 6. Services Hover dynamic image background reveal
  const serviceItems = document.querySelectorAll('.service-item');
  const hoverBg = document.getElementById('services-hover-bg');

  serviceItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const bgUrl = item.getAttribute('data-bg');
      if (bgUrl) {
        hoverBg.style.backgroundImage = `url('${bgUrl}')`;
        hoverBg.classList.add('active');
      }
    });

    item.addEventListener('mouseleave', () => {
      hoverBg.classList.remove('active');
    });
  });

  // 7. Portfolio Filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active filter btn class
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 350);
        }
      });
    });
  });

  // Project details data mapping
  const projectsData = {
    'proj-card-1': {
      title: 'Rushikonda Cliff Villa',
      location: 'Visakhapatnam, Andhra Pradesh',
      tag: 'Luxury Villas',
      timeline: '22 Months',
      scale: '12,500 sq ft',
      img: '/assets/proj-villa.png',
      desc: 'Perched on the scenic cliffs of Rushikonda, the Rushikonda Cliff Villa is an architectural statement built with high-grade exposed concrete and local teakwood. The structure features floor-to-ceiling glass panes opening to the Bay of Bengal and a stunning infinity swimming pool that cantilevers over the cliff edges. Structured to endure coastal cyclonic pressures, it incorporates rust-proof structural reinforcements and smart rain-harvesting technologies, perfectly blending modern beach architecture with elite Indian craftsmanship.'
    },
    'proj-card-2': {
      title: 'Bayview Premium Enclave',
      location: 'Visakhapatnam, Andhra Pradesh',
      tag: 'Apartments & Residential Communities',
      timeline: '34 Months',
      scale: '110,000 sq ft',
      img: '/assets/proj-apt.png',
      desc: 'Located along the iconic Beach Road in Vizag, the Bayview Premium Enclave comprises 45 state-of-the-art sea-facing apartments. The facade utilizes locally sourced Andhra granites, smart wind-barrier panels, and desktop planters, and intelligent microclimate terraces. Engineered with earthquake-resistant pile foundations and low-carbon green cement, the building meets the highest sustainability standards while offering private spas and automated smart-home interiors.'
    },
    'proj-card-3': {
      title: 'The V-Spire IT Tower',
      location: 'Visakhapatnam, Andhra Pradesh',
      tag: 'Commercial Buildings',
      timeline: '28 Months',
      scale: '85,000 sq ft',
      img: '/assets/proj-comm.png',
      desc: 'Serving as a premier technology hub at the Madhurawada IT SEZ, The V-Spire Tower boasts a dramatic helical concrete structure and low-emission glass glazing. Designed to maximize natural light while mitigating coastal heat, it incorporates column-free office layouts utilizing post-tensioned concrete slab engineering. Complete with solar power grids, smart water treatment plants, and premium corporate lounges, it sets a benchmark for IT offices in Andhra Pradesh.'
    },
    'proj-card-4': {
      title: 'Kakinada Logistics Berth',
      location: 'Kakinada, Andhra Pradesh',
      tag: 'Industrial Facilities',
      timeline: '18 Months',
      scale: '240,000 sq ft',
      img: '/assets/proj-ind.png',
      desc: 'A massive, heavy-load industrial logistics facility located near Kakinada Port. Engineered to support heavy container traffic, the terminal combines solid pile foundation layouts with a 120-meter clear-span structural steel truss canopy. The industrial floor is constructed using specialized high-strength concrete mixes combined with metal fiber reinforcement and laser-guided floor levelers to ensure absolute structural precision and long-term utility.'
    },
    'proj-card-5': {
      title: 'Aurelia Commercial Plaza',
      location: 'Visakhapatnam, Andhra Pradesh',
      tag: 'Commercial Buildings',
      timeline: '24 Months',
      scale: '65,000 sq ft',
      img: '/assets/proj-comm-2.png',
      desc: 'Positioned in a primary commercial zone of Vizag, Aurelia Commercial Plaza is a luxury shopping and dining terminal. Designed with massive board-formed concrete pillars, geometric brass metal canopies, and double-height retail outlets. The plaza integrates an eco-friendly central ventilation system, robust storm-water management suitable for heavy monsoons, and elegant water columns reflecting the architectural forms.'
    },
    'proj-card-6': {
      title: 'Vizag Oceanfront Estates',
      location: 'Visakhapatnam, Andhra Pradesh',
      tag: 'Luxury Villas',
      timeline: '26 Months',
      scale: '18,500 sq ft',
      img: '/assets/proj-villa-2.png',
      desc: 'A premium shoreline villa development comprising bespoke architectural estates at Beach Road. Each estate blends raw concrete structural beauty with refined local teak cladding and extensive glass fronts that offer unobstructed ocean panoramas. Designed with structural retaining seawalls, high-wind windbreaks, smart backup power systems, and landscape design showcasing native coastal vegetation.'
    }
  };

  // Portfolio Case Study Modal System
  const modal = document.getElementById('portfolio-modal');
  const modalImg = document.getElementById('modal-project-img');
  const modalTag = document.getElementById('modal-project-tag');
  const modalTitle = document.getElementById('modal-project-title');
  const modalLocation = document.getElementById('modal-project-location');
  const modalTimeline = document.getElementById('modal-project-timeline');
  const modalScale = document.getElementById('modal-project-scale');
  const modalDesc = document.getElementById('modal-project-description');
  const modalClose = document.getElementById('btn-modal-close');
  const modalCloseArea = document.getElementById('modal-close-area');

  const openProjectModal = (cardId) => {
    const data = projectsData[cardId];
    if (!data) return;

    modalImg.src = data.img;
    modalImg.alt = data.title;
    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalLocation.textContent = data.location;
    modalTimeline.textContent = data.timeline;
    modalScale.textContent = data.scale;
    modalDesc.textContent = data.desc;

    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.add('active');
      document.body.classList.add('overflow-hidden');
    }, 10);
  };

  const closeProjectModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 500);
  };

  // Bind click events to cards
  projectCards.forEach(card => {
    // Open on card click
    card.addEventListener('click', (e) => {
      // Prevent opening multiple times if sub-button clicked
      openProjectModal(card.id);
    });
  });

  modalClose.addEventListener('click', closeProjectModal);
  modalCloseArea.addEventListener('click', closeProjectModal);
  
  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // Modal contact CTA smooth navigation
  const modalContactBtn = document.getElementById('btn-modal-contact');
  modalContactBtn.addEventListener('click', () => {
    closeProjectModal();
  });

  // 8. Construction Process Timeline Scroll Progress & Activation
  const timelineItems = document.querySelectorAll('.scroll-reveal-timeline');
  const progressBar = document.getElementById('timeline-progress-bar');
  const timelineContainer = document.querySelector('.timeline-container');

  const handleTimelineObserver = () => {
    if (!timelineContainer) return;
    
    // Set active timeline step cards
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.35,
      rootMargin: '0px 0px -100px 0px'
    });

    timelineItems.forEach(item => observer.observe(item));

    // Progress bar height dynamic scroll calculations
    window.addEventListener('scroll', () => {
      const containerRect = timelineContainer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if container is in view
      if (containerRect.top < windowHeight && containerRect.bottom > 0) {
        const totalHeight = containerRect.height - 250;
        const scrolledDistance = Math.max(0, windowHeight * 0.5 - containerRect.top);
        const scrollPercent = Math.min(100, (scrolledDistance / totalHeight) * 100);
        
        progressBar.style.height = `${scrollPercent}%`;
      }
    });
  };

  handleTimelineObserver();

  // 9. Interactive Contact Form Actions
  const contactForm = document.getElementById('ssvd-contact-form');
  const formSuccess = document.getElementById('contact-form-success');
  const resetBtn = document.getElementById('btn-reset-form');
  const submitBtn = document.getElementById('btn-submit-contact');
  const submitText = submitBtn.querySelector('.submit-text');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Visual feedback loading state
      submitBtn.style.pointerEvents = 'none';
      submitText.textContent = 'Initiating Dossier...';
      submitBtn.style.opacity = '0.7';

      // Simulate network request/database recording
      setTimeout(() => {
        contactForm.classList.add('hidden');
        formSuccess.classList.remove('hidden');
        
        // Restore btn state
        submitBtn.style.pointerEvents = 'auto';
        submitText.textContent = 'Initiating Private Consultation';
        submitBtn.style.opacity = '1';
        
        // Scroll to form view smoothly
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      }, 1500);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      contactForm.reset();
      formSuccess.classList.add('hidden');
      contactForm.classList.remove('hidden');
    });
  }

  // 10. Premium Audio Welcome Narration
  const welcomeAudio = new Audio('/assets/welcome.mp3');
  let welcomePlayed = false;

  const playWelcome = () => {
    if (welcomePlayed) return;
    welcomePlayed = true;

    welcomeAudio.play()
      .then(() => {
        removeInteractionListeners();
      })
      .catch((err) => {
        // Reset flag if blocked so that interaction listeners can try again on next action
        welcomePlayed = false;
        console.log("Audio autoplay blocked by browser. Narration will play on user interaction.");
      });
  };

  const removeInteractionListeners = () => {
    document.removeEventListener('click', playWelcome);
    document.removeEventListener('mousemove', playWelcome);
    document.removeEventListener('scroll', playWelcome);
    document.removeEventListener('touchstart', playWelcome);
  };

  // Bind to first interaction
  document.addEventListener('click', playWelcome);
  document.addEventListener('mousemove', playWelcome);
  document.addEventListener('scroll', playWelcome);
  document.addEventListener('touchstart', playWelcome);

  // Attempt immediate playback on load
  setTimeout(playWelcome, 300);

  // 11. Dynamic background architectural grid lines
  const gridContainer = document.createElement('div');
  gridContainer.className = 'draft-grid-bg';
  for (let i = 0; i < 4; i++) {
    const line = document.createElement('div');
    line.className = 'draft-line';
    gridContainer.appendChild(line);
  }
  document.body.appendChild(gridContainer);

  // 12. Entrance Preloader dismissal
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      // Re-create icons to ensure newly added slider icons render perfectly
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 1500);
  }

  // 13. Interactive Comparison Slider Logic
  const sliderContainer = document.getElementById('comparison-slider-container');
  const blueprintLayer = document.getElementById('blueprint-layer');
  const sliderHandle = document.getElementById('comparison-handle');
  
  if (sliderContainer && blueprintLayer && sliderHandle) {
    let isDragging = false;
    
    const setSliderPosition = (x) => {
      const rect = sliderContainer.getBoundingClientRect();
      let position = ((x - rect.left) / rect.width) * 100;
      
      if (position < 0) position = 0;
      if (position > 100) position = 100;
      
      blueprintLayer.style.width = `${position}%`;
      sliderHandle.style.left = `${position}%`;
    };
    
    const handleMove = (e) => {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault(); // Prevent screen scroll while dragging slider
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setSliderPosition(clientX);
    };
    
    const startDrag = (e) => {
      isDragging = true;
    };
    
    const stopDrag = () => {
      isDragging = false;
    };
    
    // Desktop dragging
    sliderHandle.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', stopDrag);
    
    // Mobile dragging
    sliderHandle.addEventListener('touchstart', startDrag);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', stopDrag);
    
    // Direct click snap
    sliderContainer.addEventListener('click', (e) => {
      if (e.target.closest('#comparison-handle')) return;
      setSliderPosition(e.clientX);
    });
  }

  // 14. Interactive Space Inspector (Floor Plan) Logic
  const floorRooms = document.querySelectorAll('.floor-room');
  const inspectorPanel = document.getElementById('inspector-panel');
  const inspectorImg = document.getElementById('inspector-img');
  const inspectorTag = document.getElementById('inspector-tag');
  const inspectorTitle = document.getElementById('inspector-room-title');
  const inspectorSize = document.getElementById('inspector-size');
  const inspectorHeight = document.getElementById('inspector-height');
  const inspectorMaterials = document.getElementById('inspector-materials');
  const inspectorLighting = document.getElementById('inspector-lighting');
  const inspectorDesc = document.getElementById('inspector-desc');

  const spaceSpecsData = {
    'living': {
      tag: '01 / TECHNICAL SPACE',
      title: 'Double-Height Living Hall',
      size: '3,450 sq ft',
      height: '22 feet',
      materials: 'Board-formed concrete, brass trim, Italian travertine',
      lighting: 'Automated circadian brass fixtures & natural clerestory bands',
      img: '/assets/interior-living.png',
      desc: 'Designed as the social core of the villa, this double-height volume combines monolithic raw concrete walls with delicate brass elements. The massive 22ft floor-to-ceiling glass doors open completely to frame the sea, creating a seamless transition from the interior hall to the outdoor cantilever deck.'
    },
    'master': {
      tag: '02 / PRIVATE SUITE',
      title: 'Oceanfront Master Suite',
      size: '1,850 sq ft',
      height: '11 feet',
      materials: 'Local teak flooring, texturized limestone plaster, brass profiles',
      lighting: 'Concealed warm cove LEDs, directional reading spotlights',
      img: '/assets/proj-villa-2.png',
      desc: 'A private sanctuary positioned to catch the morning sun. Features fully pocketing glass doors that open to a private balcony overlooking the Bay of Bengal, an open-concept vanity detailed in brushed brass, and natural wood cladding that creates a soft, grounded contrast to the raw structural concrete.'
    },
    'pool': {
      tag: '03 / RECREATION DECK',
      title: 'Cantilever Deck & Pool',
      size: '2,600 sq ft',
      height: 'Open to Sky',
      materials: 'Anti-slip volcanic ash tiles, stainless structural tensioners',
      lighting: 'Submerged gold-hued pool beams, pathway marker LEDs',
      img: '/assets/proj-villa.png',
      desc: 'A massive architectural projection suspended over the cliffside. The infinity swimming pool features crystal-clear water merging into the horizon, surrounded by thermal-treated limestone decks that remain cool under heavy coastal sunlight, providing structural stability and high-end outdoor luxury.'
    },
    'terrace': {
      tag: '04 / SUNSET LOUNGE',
      title: 'Sunset Terrace Lounge',
      size: '1,400 sq ft',
      height: 'Open to Sky',
      materials: 'Exposed concrete benches, weather-proof teak wood, brass details',
      lighting: 'Subtle step-lighting, central brass fire bowl glows',
      img: '/assets/hero-villa.png',
      desc: 'Perched on the highest point of the structure, the Sunset Terrace offers unobstructed 360-degree panoramas of the Visakhapatnam shoreline. Detailed with built-in monolithic concrete lounge seating, weather-proof upholstery, and a central bronze fire element, it is engineered to withstand marine air while offering unmatched comfort.'
    }
  };

  if (floorRooms.length > 0 && inspectorPanel) {
    floorRooms.forEach(room => {
      room.addEventListener('click', () => {
        const roomId = room.getAttribute('data-room');
        const specs = spaceSpecsData[roomId];
        if (!specs) return;

        // Toggle active states on paths
        floorRooms.forEach(r => r.classList.remove('active'));
        room.classList.add('active');

        // Fade out visual panel
        inspectorPanel.classList.add('fading');

        // Swap contents after fade out animation completes
        setTimeout(() => {
          inspectorImg.src = specs.img;
          inspectorImg.alt = specs.title;
          inspectorTag.textContent = specs.tag;
          inspectorTitle.textContent = specs.title;
          inspectorSize.textContent = specs.size;
          inspectorHeight.textContent = specs.height;
          inspectorMaterials.textContent = specs.materials;
          inspectorLighting.textContent = specs.lighting;
          inspectorDesc.textContent = specs.desc;

          // Fade back in
          inspectorPanel.classList.remove('fading');
        }, 400);
      });
    });
  }

  // 15. Scroll-Driven Spatial Zoom Logic (Apple-Style)
  const zoomSection = document.getElementById('spatial-zoom');
  const zoomWindow = document.getElementById('zoom-window');
  const facadeImg = document.querySelector('.zoom-img-facade');
  const interiorImg = document.querySelector('.zoom-img-interior');
  const zoomNarrative = document.getElementById('zoom-narrative');

  const handleSpatialZoom = () => {
    if (!zoomSection || !zoomWindow || !facadeImg || !interiorImg) return;

    const rect = zoomSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Check if the section has entered the view
    if (rect.top <= 0 && rect.bottom >= windowHeight) {
      // Calculate scroll progress (0 to 1) inside the section's active scroll range
      const totalScrollable = rect.height - windowHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      // 1. Expand the frame window
      const isMobile = window.innerWidth <= 768;
      const startWidth = isMobile ? 85 : 70;
      const startHeight = isMobile ? 50 : 60;
      
      const currentWidth = startWidth + (100 - startWidth) * Math.min(1, progress * 1.5); // Fill screen at progress 0.66
      const currentHeight = startHeight + (100 - startHeight) * Math.min(1, progress * 1.5);
      
      zoomWindow.style.width = `${currentWidth}vw`;
      zoomWindow.style.height = `${currentHeight}vh`;

      // 2. Zoom the images
      // Facade image scale goes from 1.08 to 1.3
      const facadeScale = 1.08 + (1.3 - 1.08) * progress;
      facadeImg.style.transform = `scale(${facadeScale})`;

      // 3. Cross-fade to interior
      // Interior opacity starts fading in at progress 0.45, hits 1 at progress 0.85
      let interiorOpacity = 0;
      if (progress > 0.45) {
        interiorOpacity = Math.min(1, (progress - 0.45) / 0.4); 
      }
      interiorImg.style.opacity = interiorOpacity;

      // Interior image scale starts at 1.25 and zooms down to 1.08
      const interiorScale = 1.25 - (1.25 - 1.08) * progress;
      interiorImg.style.transform = `scale(${interiorScale})`;

      // 4. Reveal narrative text overlay
      if (progress > 0.7) {
        zoomNarrative.classList.add('active');
      } else {
        zoomNarrative.classList.remove('active');
      }
    } else if (rect.top > 0) {
      // Reset to initial state
      const isMobile = window.innerWidth <= 768;
      zoomWindow.style.width = isMobile ? '85vw' : '70vw';
      zoomWindow.style.height = isMobile ? '50vh' : '60vh';
      facadeImg.style.transform = 'scale(1.08)';
      interiorImg.style.opacity = '0';
      interiorImg.style.transform = 'scale(1.25)';
      zoomNarrative.classList.remove('active');
    } else if (rect.bottom < windowHeight) {
      // Lock at final state
      zoomWindow.style.width = '100vw';
      zoomWindow.style.height = '100vh';
      facadeImg.style.transform = 'scale(1.3)';
      interiorImg.style.opacity = '1';
      interiorImg.style.transform = 'scale(1.08)';
      zoomNarrative.classList.add('active');
    }
  };




  // Add scroll event listener
  window.addEventListener('scroll', () => {
    requestAnimationFrame(handleSpatialZoom);
  });
});
