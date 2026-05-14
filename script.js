// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('navLinks');

    if (toggle && nav) {
        toggle.addEventListener('click', function() {
            nav.classList.toggle('open');
            // Toggle between hamburger and X icon
            if (nav.classList.contains('open')) {
                toggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
            } else {
                toggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
            }
        });

        // Close menu when a link is clicked
        nav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('open');
                toggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
            });
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll-triggered fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    var animateElements = document.querySelectorAll(
        '.service-card, .stat-item, .gallery-item, .faq-item, .benefit, .service-item, .book-now-card, .map-card'
    );

    animateElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});


// Initialize Leaflet Map with 15-mile service radius
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
});

function initializeMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement || typeof L === 'undefined') {
        // Leaflet not loaded yet — retry once it is
        window.addEventListener('load', initializeMap);
        return;
    }

    const shopLat  = 39.9752;
    const shopLng  = -75.2321;
    const radiusMiles = 15;
    const radiusMeters = radiusMiles * 1609.344; // 24,140 m

    // Init map
    const map = L.map(mapElement, { zoomControl: true, scrollWheelZoom: false })
                 .setView([shopLat, shopLng], 10);

    // OpenStreetMap tiles (free, no API key)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // 15-mile service area circle
    L.circle([shopLat, shopLng], {
        radius: radiusMeters,
        color: '#c0392b',
        fillColor: '#c0392b',
        fillOpacity: 0.08,
        weight: 2,
        opacity: 0.7
    }).addTo(map).bindPopup('<strong>AutoTek Service Area</strong><br>15-mile radius from shop');

    // Shop marker
    const shopIcon = L.divIcon({
        className: '',
        html: `<div style="
            background:#c0392b;
            width:14px;height:14px;
            border-radius:50%;
            border:3px solid #fff;
            box-shadow:0 2px 6px rgba(0,0,0,0.5)">
        </div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        popupAnchor: [0, -10]
    });

    L.marker([shopLat, shopLng], { icon: shopIcon })
     .addTo(map)
     .bindPopup('<strong>AutoTek Mobile Auto Repair</strong><br>902 Wynnewood Rd<br>Philadelphia, PA 19151')
     .openPopup();
}


// SEO & Analytics Tracking
function trackEvent(eventName, eventData = {}) {
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
    console.log('Event tracked:', eventName, eventData);
}

// Track CTA clicks
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn-primary, .cta-button, a[href^="tel:"]').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackEvent('cta_click', {
                button_text: buttonText,
                page: window.location.pathname,
                element_type: this.tagName
            });
        });
    });
});

// Track form submissions
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const serviceType = document.getElementById('service')?.value || 'unknown';
            trackEvent('form_submission', {
                service_type: serviceType,
                page: window.location.pathname
            });
        });
    }
});

// Track page scroll depth
let maxScroll = 0;
window.addEventListener('scroll', function() {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll > 25 && maxScroll <= 50) {
            trackEvent('scroll_depth', { depth: '25%' });
        } else if (maxScroll > 50 && maxScroll <= 75) {
            trackEvent('scroll_depth', { depth: '50%' });
        } else if (maxScroll > 75) {
            trackEvent('scroll_depth', { depth: '75%' });
        }
    }
});

// Lazy load images for performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Performance monitoring (using modern PerformanceNavigationTiming API)
window.addEventListener('load', function() {
    setTimeout(function() {
        const entries = performance.getEntriesByType('navigation');
        if (entries.length > 0) {
            const navEntry = entries[0];
            trackEvent('page_load_time', {
                load_time_ms: Math.round(navEntry.loadEventEnd - navEntry.startTime),
                dom_content_loaded_ms: Math.round(navEntry.domContentLoadedEventEnd - navEntry.startTime),
                first_byte_ms: Math.round(navEntry.responseStart - navEntry.startTime),
                page: window.location.pathname
            });
        }
    }, 100);
});

// Track outbound links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href && link.href.indexOf(window.location.hostname) === -1 && link.href.indexOf('http') === 0) {
        trackEvent('outbound_link', {
            url: link.href,
            text: link.textContent.trim()
        });
    }
}, true);

// Dynamic copyright year
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.copyright-year').forEach(function(el) {
        el.textContent = new Date().getFullYear();
    });
});
