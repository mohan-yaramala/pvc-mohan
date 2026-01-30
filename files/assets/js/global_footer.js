/**
 * PVC SECURITY - GLOBAL FOOTER COMPONENT
 * Handles footer injection and interactive contact links.
 */

const PVC_FOOTER_DATA = {
    logoPath: 'assets/img/logo/logo1.png',
    description: 'PVC Security provides professional CCTV and surveillance solutions for homes, shops, offices, and industries.',
    phone1: '+91 91445 55566',
    phone1Clean: '+919144555566',
    phone2: '+91 81124 56789',
    phone2Clean: '+918112456789',
    email: 'pvcsecurity@gmail.com',
    serviceArea: 'Andhra Pradesh & Telangana',
    whatsapp: '+919144555566',
    workingHours: 'Mon - Sat: 10:00 AM - 8:00 PM'
};

function initPvcFooter() {
    // Prevent duplicate injection
    if (document.querySelector('.pvc-global-footer')) return;

    const footerHtml = `
    <footer class="pvc-global-footer">
        <div class="pvc-footer-container">
            <div class="pvc-footer-row">
                <!-- 1. BRAND SECTION -->
                <div class="pvc-footer-col">
                    <div class="pvc-footer-logo">
                        <img src="${PVC_FOOTER_DATA.logoPath}" alt="PVC Security Logo" width="200" height="80" style="object-fit: contain;">
                    </div>
                    <p class="pvc-footer-desc">${PVC_FOOTER_DATA.description}</p>
                    <div class="pvc-trust-icons">
                        <div class="pvc-trust-item"><i class="fa-solid fa-shield-check"></i> Genuine Products</div>
                        <div class="pvc-trust-item"><i class="fa-solid fa-headset"></i> Expert Support</div>
                    </div>
                </div>

                <!-- 2. QUICK LINKS -->
                <div class="pvc-footer-col">
                    <h4 class="pvc-footer-title">Quick Links</h4>
                    <ul class="pvc-footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about-us.html">About Us</a></li>
                        <li><a href="all-products.html">New Products</a></li>
                        <li><a href="all-products.html?category=ACCESSORIES">Shop by Categories</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="contact-us.html">Contact Us</a></li>
                    </ul>
                </div>

                <!-- 3. CONTACT INFORMATION -->
                <div class="pvc-footer-col">
                    <h4 class="pvc-footer-title">Contact Support</h4>
                    <ul class="pvc-contact-list">
                        <li class="pvc-contact-item">
                            <a href="tel:${PVC_FOOTER_DATA.phone1Clean}" class="pvc-contact-icon" aria-label="Call Primary"><i class="fa-solid fa-phone"></i></a>
                            <div class="pvc-contact-text">
                                <span>Call Primary</span>
                                <a href="tel:${PVC_FOOTER_DATA.phone1Clean}">${PVC_FOOTER_DATA.phone1}</a>
                            </div>
                        </li>
                        <li class="pvc-contact-item">
                            <a href="tel:${PVC_FOOTER_DATA.phone2Clean}" class="pvc-contact-icon" aria-label="Call Secondary"><i class="fa-solid fa-phone"></i></a>
                            <div class="pvc-contact-text">
                                <span>Call Secondary</span>
                                <a href="tel:${PVC_FOOTER_DATA.phone2Clean}">${PVC_FOOTER_DATA.phone2}</a>
                            </div>
                        </li>
                        <li class="pvc-contact-item">
                            <a href="mailto:${PVC_FOOTER_DATA.email}" class="pvc-contact-icon" aria-label="Email Us"><i class="fa-solid fa-envelope"></i></a>
                            <div class="pvc-contact-text">
                                <span>Email Address</span>
                                <a href="mailto:${PVC_FOOTER_DATA.email}">${PVC_FOOTER_DATA.email}</a>
                            </div>
                        </li>
                        <li class="pvc-contact-item">
                            <a href="contact-us.html" class="pvc-contact-icon" aria-label="Our Location"><i class="fa-solid fa-location-dot"></i></a>
                            <div class="pvc-contact-text">
                                <span>Service Area</span>
                                <p>${PVC_FOOTER_DATA.serviceArea}</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- 4. SUPPORT & CONNECT -->
                <div class="pvc-footer-col">
                    <h4 class="pvc-footer-title">Secure Now</h4>
                    <div class="pvc-action-btns">
                        <a href="https://wa.me/${PVC_FOOTER_DATA.whatsapp}" target="_blank" class="pvc-footer-btn pvc-btn-whatsapp" aria-label="Chat on WhatsApp">
                            <i class="fa-brands fa-whatsapp"></i> WhatsApp Chat
                        </a>
                    </div>
                    <div class="pvc-trust-icons" style="margin-bottom: 20px;">
                        <span style="font-size: 13px; color: rgba(255,255,255,0.5);"><i class="fa-regular fa-clock"></i> ${PVC_FOOTER_DATA.workingHours}</span>
                    </div>
                </div>
            </div>

            <div class="pvc-footer-bottom">
                <p class="pvc-copyright">© ${new Date().getFullYear()} PVC Security - Leading the Future of AIoT. All Rights Reserved.</p>
            </div>
        </div>

        <!-- Global Floating WhatsApp Button -->
        <a href="https://wa.me/${PVC_FOOTER_DATA.whatsapp}" target="_blank" class="pvc-floating-whatsapp" aria-label="WhatsApp Us">
            <i class="fa-brands fa-whatsapp"></i>
        </a>

        </a>
        
        </a>
    </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHtml);

    // --- ACTIVE PAGE HIGHLIGHTING ---
    const currentPagePath = window.location.pathname.split('/').pop() || 'index.html';
    const queryParams = new URLSearchParams(window.location.search);
    const hasCategoryFilter = queryParams.has('category') || queryParams.has('cat');

    document.querySelectorAll('.pvc-footer-links a').forEach(link => {
        const href = link.getAttribute('href');

        if (hasCategoryFilter) {
            const catVal = (queryParams.get('category') || queryParams.get('cat')).toUpperCase();

            // If it's the "Shop by Categories" link, check if it's a component
            if (href.includes('category=ACCESSORIES') && catVal !== 'ALL CATEGORIES') {
                // If the current category is one of the component categories (from header config)
                // We don't have direct access here but we can check if it matches common ones
                const components = ["ACCESSORIES", "CABLES", "HDD", "MONITOR", "RACK", "SD CARDS"];
                if (components.includes(catVal)) {
                    link.classList.add('active');
                    return;
                }
            }

            // If it's "New Products", we might want it active for brands if we want to follow header logic
            // But usually brands aren't "New Products". Header highlights "New Products" only for the exact page.
        }

        // Standard matching
        if (href === currentPagePath || (queryParams.toString() && href.includes(currentPagePath) && href.includes(queryParams.toString()))) {
            link.classList.add('active');
        } else if (href === currentPagePath && !hasCategoryFilter) {
            link.classList.add('active');
        }
    });
}

// Global Close Handler for Mobile CTA
document.addEventListener('click', function (e) {
    if (e.target.closest('#pvcStickyClose')) {
        const cta = document.getElementById('pvcMobileStickyCta');
        if (cta) {
            cta.style.display = 'none';
        }
    }
});

// Auto-load dependencies
if (!document.querySelector('link[href*="global_footer.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/css/global_footer.css';
    document.head.appendChild(link);
}

// Ensure FontAwesome
if (!document.getElementById('fa-link') && !document.querySelector('link[href*="fontawesome"]')) {
    const fa = document.createElement('link');
    fa.id = 'fa-link';
    fa.rel = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fa);
}

// Run on load
if (document.readyState === "complete" || document.readyState === "interactive") {
    initPvcFooter();
} else {
    document.addEventListener('DOMContentLoaded', initPvcFooter);
}
