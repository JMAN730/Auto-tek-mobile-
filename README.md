# Geoff's Mobile Auto Repair - Website

This repository contains the front-end code for Geoff's Mobile Auto Repair, a local service business based in Charlotte, NC.

## Tech Stack
- HTML5 (Semantic & SEO Optimized)
- CSS3 (Vanilla, Responsive Grid/Flexbox)
- Vanilla JavaScript (Performance Monitoring, UI Interactivity)

## Recent Optimizations (May 2026)

### SEO & Performance
- **Image Optimization:** Converted all heavy JPGs to WebP, implemented lazy loading, and added explicit width/height attributes to prevent layout shifts (CLS).
- **Core Web Vitals:** Preloaded hero images and optimized critical rendering paths.
- **Structured Data:** Added comprehensive JSON-LD schemas (`LocalBusiness`, `FAQPage`, `OpeningHoursSpecification`, `BreadcrumbList`).
- **Local SEO:** Added `geo.region`, `geo.placename`, and `ICBM` meta tags to strengthen local search rankings in Charlotte.
- **Social Metadata:** Added fully configured Open Graph (Facebook/Instagram) and Twitter Card tags.

### Analytics & Security
- **Google Analytics:** Added the GA4 snippet to track user engagement (`G-XXXXXXXXXX`).
- **Security Headers:** Enforced `Content-Security-Policy`, `Strict-Transport-Security`, and `Permissions-Policy` via `.htaccess`.
- **GZIP Compression:** Added `application/ld+json` to `.htaccess` deflate rules to shrink schema payloads.

## Deployment
This static website is ready for deployment on any standard Apache server (to support the `.htaccess` rules).

1. Upload the files to the web root.
2. Replace `G-XXXXXXXXXX` in the HTML files with your actual Google Analytics Measurement ID.
3. Replace the `og-image.jpg` with a real social share banner if desired.
