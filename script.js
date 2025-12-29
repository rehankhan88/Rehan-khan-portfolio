// ==========================================================
// Rehan Khan Portfolio - Professional JS
// ==========================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. MOBILE MENU TOGGLE LOGIC ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (menuToggle && navList) {
        // Toggle Menu on Hamburger Click
        menuToggle.addEventListener('click', function() {
            // Toggle the .active class. CSS handles the display: flex/none
            navList.classList.toggle('active');
            
            // Optional: Toggle icon from bars to X (times)
            const icon = menuToggle.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close Menu when a link is clicked (UX Best Practice)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    navList.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // --- 2. PROJECT FILTER LOGIC ---
    const filterButtons = document.querySelectorAll('.filter-bar .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                
                // Visual: Remove active class from all, add to clicked
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Logic: Get category
                const filterValue = this.textContent.toLowerCase().trim();
                
                // Filter Cards
                projectCards.forEach(card => {
                    const techText = card.querySelector('.tech-used').textContent.toLowerCase();
                    
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else if (techText.includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});


// --- TYPEWRITER EFFECT FOR HERO SECTION ---
document.addEventListener('DOMContentLoaded', function() {
    
    const textElement = document.getElementById('typewriter');
    // The roles you want to cycle through
    const roles = [
        "AWS Cloud Architect", 
        "AI & Machine Learning Engineer", 
        "Python Developer", 
        "DevOps Specialist"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        // If element doesn't exist (e.g. on other pages), stop
        if (!textElement) return;

        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Remove character
            textElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Deleting is faster
        } else {
            // Add character
            textElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Typing speed
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Finished typing word, pause before deleting
            isDeleting = true;
            typeSpeed = 2000; // Wait 2 seconds
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next role
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause slightly before typing next
        }

        setTimeout(type, typeSpeed);
    }

    // Start the typing loop
    type();
});











// --- 3. FOOTER FUNCTIONALITY ---

// Dynamic Year Update
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Back to Top Button Logic
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}




// --- ABOUT PAGE TABS LOGIC ---
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

if (tabButtons.length > 0) {
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Remove active class from all buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            
            // 2. Add active class to clicked button
            btn.classList.add('active');
            
            // 3. Get the target ID (e.g., 'aws', 'aiml')
            const target = btn.getAttribute('data-tab');
            
            // 4. Hide all content, Show target content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === target) {
                    content.classList.add('active');
                }
            });
        });
    });
}




// --- CONTENT PAGE FILTERING ---
const contentFilterBtns = document.querySelectorAll('.content-filter-bar .filter-btn');
const articleCards = document.querySelectorAll('.article-card'); // Selects both featured and standard cards

if (contentFilterBtns.length > 0) {
    contentFilterBtns.forEach(button => {
        button.addEventListener('click', function() {
            // 1. Visual update for buttons
            contentFilterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 2. Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // 3. Filter articles
            articleCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = (card.classList.contains('featured-article-card')) ? 'flex' : 'flex';
                    // Note: 'flex' is needed because the styled cards use flexbox layout
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}





// --- PROJECT & CONTENT FILTER LOGIC (Unified) ---
    // This script handles filtering for both projects and content.

    // Get all filter buttons (for projects AND content)
    const allFilterButtons = document.querySelectorAll('.filter-bar .filter-btn');
    
    // Get all filterable items (project cards AND content article cards)
    const allFilterableItems = document.querySelectorAll('.project-card, .article-card');

    if (allFilterButtons.length > 0) {
        allFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                
                // 1. Visual: Remove active class from all buttons in the same bar
                this.closest('.filter-bar').querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                
                // 2. Add active class to clicked button
                this.classList.add('active');
                
                // 3. Get the filter category
                const filterValue = this.getAttribute('data-filter'); // 'all', 'cloud', 'ai-ml', 'python', etc.
                
                // 4. Filter Items (projects or articles)
                allFilterableItems.forEach(item => {
                    const itemCategories = item.getAttribute('data-category'); // e.g., "cloud fullstack"
                    
                    if (filterValue === 'all' || itemCategories.includes(filterValue)) {
                        // Determine display style based on the item type (flex for featured/project cards, block for standard content cards)
                        if (item.classList.contains('featured-article-card') || item.classList.contains('project-card')) {
                             item.style.display = 'flex'; // These layouts use flex
                        } else {
                             item.style.display = 'block'; // Standard content cards might use block
                        }
                       
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
    // ... (Your other JS code, like the typewriter effect and footer logic, goes here) ...

    // --- PROJECT FILTER LOGIC ---
    const filterButtons = document.querySelectorAll('.projects-filter-bar .filter-btn');
    const projectCards = document.querySelectorAll('.project-grid .project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                
                // 1. Update the 'active' visual state for the buttons
                // Ensure only buttons within the *current* filter bar are deactivated
                this.closest('.filter-bar').querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                // 2. Get the filter category (e.g., 'cloud', 'ai-ml', or 'all')
                const filterValue = this.getAttribute('data-filter'); 
                
                // 3. Loop through all project cards to show/hide them
                projectCards.forEach(card => {
                    // Get the project's categories (e.g., "cloud fullstack")
                    const cardCategories = card.getAttribute('data-category'); 
                    
                    // Logic to show or hide the card
                    if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                        // Show the card (using flex since the card CSS uses flexbox properties)
                        card.style.display = 'flex';
                    } else {
                        // Hide the card
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    // ... (End of your DOMContentLoaded block) ...
});





document.addEventListener('DOMContentLoaded', function() {
    // ... (Your existing JS code - typewriter, footer, nav highlighter, filters - goes here) ...

    // --- CERTIFICATE MODAL LOGIC (NEW) ---
    const certModal = document.getElementById("certModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close-btn")[0];

    const certGalleryItems = document.querySelectorAll(".cert-gallery-item");

    if (certGalleryItems.length > 0 && certModal && modalImg && captionText && closeBtn) {
        certGalleryItems.forEach(item => {
            item.addEventListener('click', function() {
                certModal.style.display = "block";
                modalImg.src = this.getAttribute('data-cert-src'); // Use the full-size image source
                captionText.innerHTML = this.querySelector('h4').textContent + " - " + this.querySelector('.cert-provider').textContent;
            });
        });

        // When the user clicks on <span> (x), close the modal
        closeBtn.addEventListener('click', function() {
            certModal.style.display = "none";
        });

        // When the user clicks anywhere outside of the image, close it
        window.addEventListener('click', function(event) {
            if (event.target == certModal) {
                certModal.style.display = "none";
            }
        });

        // Optional: Close with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === "Escape") {
                certModal.style.display = "none";
            }
        });
    }
    // ... (End of your DOMContentLoaded block) ...
});


//projects page

javascript
// Basic interactivity: menu toggle, filtering, and lightbox gallery
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// Menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
  });
}

// Filtering
const filterBtns = $$('.filter-btn');
function filterProjects(tag) {
  const cards = $$('.project-card');
  cards.forEach(c => {
    const cat = (c.dataset.category || '').split(/\s+/);
    c.style.display = (tag === 'all' || cat.includes(tag)) ? '' : 'none';
  });
}
filterBtns.forEach(btn => btn.addEventListener('click', () => {
  filterBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterProjects(btn.dataset.filter);
}));
filterProjects('all');

// Lightbox / Gallery
const lightbox = $('#lightbox');
const lbImage = $('#lbImage');
const lbTitle = $('#lbTitle');
const lbDesc = $('#lbDesc');
const lbThumbs = $('#lbThumbs');
const lbCaption = $('#lbCaption');
const lbLive = $('#lbLive');
const lbRepo = $('#lbRepo');
const lbDownload = $('#lbDownload');

let currentGallery = [];
let currentIndex = 0;

function openGallery(card) {
  const images = JSON.parse(card.getAttribute('data-images') || '[]');
  if (!images.length) return;
  currentGallery = images;
  currentIndex = 0;
  lbTitle.textContent = card.dataset.title || '';
  lbDesc.textContent = card.dataset.desc || '';
  lbLive.href = card.dataset.live || '#';
  lbRepo.href = card.dataset.repo || '#';
  buildThumbs(images);
  showImage(0);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeGallery() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lbThumbs.innerHTML = '';
}

function showImage(i) {
  if (!currentGallery.length) return;
  currentIndex = Math.max(0, Math.min(i, currentGallery.length - 1));
  const src = currentGallery[currentIndex];
  lbImage.src = src;
  lbImage.alt = lbTitle.textContent + ' — screenshot ' + (currentIndex + 1);
  lbCaption.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
  lbDownload.href = src;
  $$('.lb-thumb', lbThumbs).forEach((t, idx) => t.classList.toggle('active', idx === currentIndex));
}

function buildThumbs(images) {
  lbThumbs.innerHTML = '';
  images.forEach((src, i) => {
    const btn = document.createElement('button');
    btn.className = 'lb-thumb';
    btn.setAttribute('aria-label', 'Open screenshot ' + (i + 1));
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = src;
    btn.appendChild(img);
    btn.addEventListener('click', () => showImage(i));
    lbThumbs.appendChild(btn);
  });
}

// Attach open triggers
$$('.open-gallery').forEach(btn => btn.addEventListener('click', (e) => openGallery(e.target.closest('.project-card'))));

// Controls
$('.lightbox .close').addEventListener('click', closeGallery);
$('.lightbox .prev').addEventListener('click', () => showImage(currentIndex - 1));
$('.lightbox .next').addEventListener('click', () => showImage(currentIndex + 1));

// Keyboard nav
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
  if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  if (e.key === 'Escape') closeGallery();
});

// Click outside to close
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeGallery(); });

// Back-to-top
$('#backToTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Make project card keyboard-accessible (Enter opens gallery)
$$('.project-card').forEach(card => card.addEventListener('keydown', (e) => { if (e.key === 'Enter') openGallery(card); }));

// Year auto-update
document.addEventListener('DOMContentLoaded', () => { const y = new Date().getFullYear(); document.getElementById('year').textContent = y; });




function openGallery(card){
  // try parse data-images first
  let images = [];
  const raw = card.getAttribute('data-images');
  if (raw) {
    try {
      images = JSON.parse(raw);
    } catch (err) {
      // tolerate non-JSON comma list e.g. "img/a.png,img/b.png"
      images = raw.replace(/^\[|\]$/g,'').split(',').map(s => s.trim().replace(/^"|"$/g,'')).filter(Boolean);
    }
  }

  // fallback: collect inline imgs if data-images empty
  if (!images.length) {
    images = Array.from(card.querySelectorAll('.project-image-wrapper img'))
                  .map(img => img.src)
                  .filter(Boolean);
  }

  if (!images.length) return; // nothing to show

  currentGallery = images;
  currentIndex = 0;
  lbTitle.textContent = card.dataset.title || '';
  lbDesc.textContent  = card.dataset.desc  || '';
  lbLive.href = card.dataset.live || '#';
  lbRepo.href = card.dataset.repo || '#';
  buildThumbs(images);
  showImage(0);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
