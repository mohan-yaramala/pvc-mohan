/**
 * PVC SECURITY - GLOBAL HEADER COMPONENT
 * Handles header injection, navigation, and core interactions.
 */

const PVC_HEADER_CONFIG = {
    logoPath: 'assets/img/logo/logo1.png',
    phone: '+919144555566',
    searchUrl: 'all-products.html', // Point to all-products which has the list
    brands: [
        { name: 'Hikvision', url: 'all-products.html?cat=HIKVISION' },
        { name: 'Dahua', url: 'all-products.html?cat=DAHUA' },
        { name: 'CP Plus', url: 'all-products.html?cat=CP PLUS' },
        { name: 'Imou', url: 'all-products.html?cat=IMOU' },
        { name: 'EZVIZ', url: 'all-products.html?cat=EZVIZ' }
    ],
    categories: [
        { name: 'Network Cameras', url: 'network-cameras.html' },
        { name: 'Turbo HD Cameras', url: 'turbo-hd.html' },
        { name: 'Access Control', url: 'access-control.html' },
        { name: 'Video Intercom', url: 'video-intercom.html' },
        { name: 'Alarm Systems', url: 'alarm-systems.html' },
        { name: 'Display & Control', url: 'display-control.html' }
    ]
};

function initPvcHeader() {
    const headerHtml = `
    <header class="pvc-global-header" id="pvc-global-header">
        <div class="pvc-header-container">
            <div class="pvc-header-logo">
                <a href="index.html">
                    <img src="${PVC_HEADER_CONFIG.logoPath}" alt="PVC Security Logo" width="180" height="60" style="object-fit: contain;">
                </a>
            </div>

            <nav class="pvc-main-nav">
                <ul class="pvc-nav-list">
                    <li class="pvc-nav-item"><a href="index.html" class="pvc-nav-link" id="nav-home">Home</a></li>
                    <li class="pvc-nav-item"><a href="about-us.html" class="pvc-nav-link" id="nav-about">About Us</a></li>
                    
                    <li class="pvc-nav-item has-mega-brand">
                        <a href="#" class="pvc-nav-link">Shop by Brand</a>
                        <div class="pvc-mega-menu">
                            <div class="pvc-mega-column">
                                <h4 class="pvc-mega-title">Top Brands</h4>
                                <ul class="pvc-mega-list">
                                    ${PVC_HEADER_CONFIG.brands.map(b => `<li><a href="${b.url}">${b.name}</a></li>`).join('')}
                                </ul>
                            </div>
                            </div>
                    </li>

                    <li class="pvc-nav-item has-mega-category">
                        <a href="#" class="pvc-nav-link">Shop by Categories</a>
                        <div class="pvc-mega-menu">
                            <div class="pvc-mega-column">
                                <h4 class="pvc-mega-title">Video Surveillance</h4>
                                <ul class="pvc-mega-list">
                                    <li><a href="category-hd-camera.html">HD Cameras</a></li>
                                    <li><a href="category-ip-camera.html">IP Cameras</a></li>
                                    <li><a href="category-wifi-camera.html">Wi-Fi Cameras</a></li>
                                </ul>
                            </div>
                            <div class="pvc-mega-column">
                                <h4 class="pvc-mega-title">Storage & Network</h4>
                                <ul class="pvc-mega-list">
                                    <li><a href="category-recorders.html">Recorders (NVR/DVR)</a></li>
                                    <li><a href="category-networking.html">Networking Switches</a></li>
                                </ul>
                            </div>
                            <div class="pvc-mega-column">
                                <h4 class="pvc-mega-title">Parts & More</h4>
                                <ul class="pvc-mega-list">
                                    <li><a href="category-accessories.html">Accessories</a></li>
                                    <li><a href="all-products.html">All Products</a></li>
                                </ul>
                            </div>
                        </div>
                    </li>

                    <li class="pvc-nav-item"><a href="all-products.html" class="pvc-nav-link" id="nav-new">New Products</a></li>
                    <li class="pvc-nav-item"><a href="services.html" class="pvc-nav-link" id="nav-services">Services</a></li>
                    <li class="pvc-nav-item"><a href="contact-us.html" class="pvc-nav-link" id="nav-contact">Contact Us</a></li>
                </ul>
            </nav>

            <div class="pvc-header-utils">
                <!-- Inline Expandable Search -->
                <div class="pvc-search-container">
                    <form class="pvc-search-form-inline" action="#" method="GET">
                        <input type="text" class="pvc-search-input-inline" placeholder="Search..." autocomplete="off">
                        <button type="submit" class="pvc-search-submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                    <button class="pvc-util-btn pvc-search-btn-toggle" aria-label="Search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>

                <a href="tel:${PVC_HEADER_CONFIG.phone}" class="pvc-util-btn pvc-phone-btn" aria-label="Call Now">
                    <i class="fa-solid fa-phone"></i>
                </a>
                <a href="cart.html" class="pvc-util-btn pvc-cart-btn" aria-label="Shopping Cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span class="pvc-cart-badge" id="pvc-cart-count">0</span>
                </a>
                <div class="pvc-mobile-toggle" id="pvc-mobile-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </header>

    <!-- Mobile Menu -->
    <div class="pvc-overlay" id="pvc-overlay"></div>
    <div class="pvc-mobile-menu" id="pvc-mobile-menu">
        <div class="pvc-mobile-close" id="pvc-mobile-close">
            <i class="fa-solid fa-xmark"></i>
        </div>
        <ul class="pvc-mobile-nav-list">
            <li class="pvc-mobile-nav-item"><a href="index.html" class="pvc-mobile-nav-link">Home</a></li>
            <li class="pvc-mobile-nav-item"><a href="about-us.html" class="pvc-mobile-nav-link">About Us</a></li>
            
            <li class="pvc-mobile-nav-item has-submenu">
                <div class="pvc-mobile-link-wrapper">
                    <a href="#" class="pvc-mobile-nav-link">Shop by Brand</a>
                    <i class="fa-solid fa-chevron-right pvc-mobile-toggle-btn"></i>
                </div>
                <div class="pvc-mobile-submenu">
                    ${PVC_HEADER_CONFIG.brands.map(b => `<a href="${b.url}" class="pvc-mobile-sub-link">${b.name}</a>`).join('')}
                </div>
            </li>

            <li class="pvc-mobile-nav-item has-submenu">
               <div class="pvc-mobile-link-wrapper">
                    <a href="#" class="pvc-mobile-nav-link">Shop by Categories</a>
                    <i class="fa-solid fa-chevron-right pvc-mobile-toggle-btn"></i>
                </div>
                <div class="pvc-mobile-submenu">
                    ${PVC_HEADER_CONFIG.categories.map(c => `<a href="${c.url}" class="pvc-mobile-sub-link">${c.name}</a>`).join('')}
                </div>
            </li>

            <li class="pvc-mobile-nav-item"><a href="all-products.html" class="pvc-mobile-nav-link">New Products</a></li>
            <li class="pvc-mobile-nav-item"><a href="services.html" class="pvc-mobile-nav-link">Services</a></li>
            <li class="pvc-mobile-nav-item"><a href="contact-us.html" class="pvc-mobile-nav-link">Contact Us</a></li>
        </ul>

        <div class="pvc-mobile-contact">
            <h4 class="pvc-mobile-contact-title">Quick Connect</h4>
            <div class="pvc-mobile-btns">
                <a href="tel:+919144555566" class="pvc-mobile-btn btn-call"><i class="fa-solid fa-phone"></i> Call Now</a>
                <a href="https://wa.me/919144555566" class="pvc-mobile-btn btn-whatsapp"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
            </div>
            <div class="pvc-mobile-numbers">
                <a href="tel:+919144555566" class="pvc-mobile-num">+91 91445 55566</a>
                <a href="tel:+918112456789" class="pvc-mobile-num">+91 81124 56789</a>
            </div>
        </div>
    </div>
    `;

    // Inject into body (or a specific target if needed)
    document.body.insertAdjacentHTML('afterbegin', headerHtml);

    // --- INTERACTION LOGIC ---

    const header = document.getElementById('pvc-global-header');
    const mobileToggle = document.getElementById('pvc-mobile-toggle');
    const mobileMenu = document.getElementById('pvc-mobile-menu');
    const mobileClose = document.getElementById('pvc-mobile-close'); // New Close Button
    const overlay = document.getElementById('pvc-overlay');
    const searchTrigger = document.querySelector('.pvc-search-trigger');
    const searchOverlay = document.getElementById('pvc-search-overlay');
    const searchClose = document.getElementById('pvc-search-close');

    // Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile Menu Toggle
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');

        // Reset scroll position when opening/closing
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.scrollTop = 0;
        }
    }

    mobileToggle.addEventListener('click', toggleMobileMenu);
    mobileClose.addEventListener('click', toggleMobileMenu); // Close event
    overlay.addEventListener('click', toggleMobileMenu);

    // Mobile Mega Menu Toggle
    document.querySelectorAll('.pvc-mobile-link-wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = wrapper.closest('.pvc-mobile-nav-item');
            const subMenu = parent.querySelector('.pvc-mobile-submenu');
            const icon = wrapper.querySelector('.pvc-mobile-toggle-btn');
            const linkText = wrapper.querySelector('.pvc-mobile-nav-link');

            parent.classList.toggle('active');

            if (parent.classList.contains('active')) {
                subMenu.style.maxHeight = subMenu.scrollHeight + "px";
                icon.style.transform = 'rotate(90deg)';
                linkText.style.background = 'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)';
                linkText.style.webkitBackgroundClip = 'text';
                linkText.style.webkitTextFillColor = 'transparent';
            } else {
                subMenu.style.maxHeight = null;
                icon.style.transform = 'rotate(0deg)';
                linkText.style.background = 'none';
                linkText.style.webkitTextFillColor = 'var(--pvc-white)';
                linkText.style.color = 'var(--pvc-white)';
            }
        });
    });

    // --- GLOBAL SEARCH SYSTEM ---

    const PVC_SEARCH_MAPPING = {
        // High Priority Static Pages
        pages: {
            "contact": "contact-us.html",
            "support": "contact-us.html",
            "phone": "contact-us.html",
            "call": "contact-us.html",
            "address": "contact-us.html",
            "location": "contact-us.html",
            "about": "about-us.html",
            "company": "about-us.html",
            "profile": "about-us.html",
            "service": "services.html",
            "installation": "services.html",
            "repair": "services.html",
            "amc": "services.html",
            "cart": "cart.html",
            "basket": "cart.html",
            "home": "index.html"
        },
        // Categories
        categories: [
            { keys: ["ip", "network", "wifi", "wireless", "ethernet"], url: "network-cameras.html" },
            { keys: ["turbo", "hd", "analog", "coaxial", "cctv"], url: "turbo-hd.html" },
            { keys: ["access", "biometric", "fingerprint", "attendance", "card"], url: "access-control.html" },
            { keys: ["intercom", "door", "bell", "videophone"], url: "video-intercom.html" },
            { keys: ["alarm", "instrusion", "sensor", "theft"], url: "alarm-systems.html" },
            { keys: ["display", "monitor", "screen", "wall"], url: "display-control.html" },
            { keys: ["thermal", "heat"], url: "thermal-products.html" },
            { keys: ["traffic", "anpr", "plate", "speed"], url: "intelligent-traffic.html" },
            { keys: ["audio", "speaker", "sound"], url: "audio-products.html" },
            { keys: ["soft", "vms", "licen"], url: "software.html" },
            { keys: ["cable", "switch", "router", "connector"], url: "all-products.html?cat=Accessories" }
        ],
        // Brands
        brands: [
            { keys: ["hikvision", "hik"], url: "all-products.html?cat=HIKVISION" },
            { keys: ["dahua"], url: "all-products.html?cat=DAHUA" },
            { keys: ["cp", "plus", "cpplus"], url: "all-products.html?cat=CP PLUS" },
            { keys: ["imou"], url: "all-products.html?cat=IMOU" },
            { keys: ["ezviz"], url: "all-products.html?cat=EZVIZ" },
            { keys: ["honeywell"], url: "all-products.html?cat=HONEYWELL" }
        ]
    };

    function handleGlobalSearch(query) {
        if (!query) return;

        const cleanQuery = query.toLowerCase().trim();

        // 1. Check Static Pages
        for (const [key, url] of Object.entries(PVC_SEARCH_MAPPING.pages)) {
            if (cleanQuery.includes(key)) {
                window.location.href = url;
                return;
            }
        }

        // 2. Check Brands
        for (const brand of PVC_SEARCH_MAPPING.brands) {
            if (brand.keys.some(k => cleanQuery.includes(k))) {
                window.location.href = brand.url;
                return;
            }
        }

        // 3. Check Categories
        for (const cat of PVC_SEARCH_MAPPING.categories) {
            if (cat.keys.some(k => cleanQuery.includes(k))) {
                window.location.href = cat.url;
                return;
            }
        }

        // 4. Fallback: Go to All Products with search query
        window.location.href = `all-products.html?search=${encodeURIComponent(cleanQuery)}`;
    }

    // Attach Search Listener to ALL search inputs (Header, Mobile, etc)
    const searchForms = document.querySelectorAll('.pvc-search-form');
    searchForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input');
            handleGlobalSearch(input.value);
        });
    });

    // Also handle Enter key on inputs directly just in case form submit is blocked
    document.querySelectorAll('.pvc-search-input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleGlobalSearch(input.value);
            }
        });
    });

    // --- SEARCH TOGGLE LOGIC ---
    const searchContainer = document.querySelector('.pvc-search-container');
    const searchBtnToggle = document.querySelector('.pvc-search-btn-toggle');
    const searchFormInline = document.querySelector('.pvc-search-form-inline');
    const searchInputInline = document.querySelector('.pvc-search-input-inline');

    // Toggle Search Bar
    searchBtnToggle.addEventListener('click', (e) => {
        // e.stopPropagation(); // Prevent closing immediately if we add document click listener later
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            setTimeout(() => searchInputInline.focus(), 100);
        }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target) && searchContainer.classList.contains('active')) {
            searchContainer.classList.remove('active');
        }
    });

    // Handle Search Submit
    searchFormInline.addEventListener('submit', (e) => {
        e.preventDefault();
        handleGlobalSearch(searchInputInline.value);
    });

    // Handle Active State (Desktop & Mobile)
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Desktop Active
    document.querySelectorAll('.pvc-nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Mobile Active
    document.querySelectorAll('.pvc-mobile-nav-link').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            // Highlight the link itself
            link.classList.add('active'); // You can style this class in CSS if needed, or inline style here

            // Also highlight parent item wrapper
            const parentItem = link.closest('.pvc-mobile-nav-item');
            if (parentItem) {
                parentItem.classList.add('active');

                // If it's a submenu link (though current selector targets top level mainly, let's cover all cases)
                // Since .pvc-mobile-nav-link is used for top level items in existing HTML structure.
                // We'll style .pvc-mobile-nav-item.active in CSS.
            }
        }
    });

    // Cart Count Sync (Mock or real from localStorage)
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.length;
        document.getElementById('pvc-cart-count').textContent = count;
        document.getElementById('pvc-cart-count').style.display = count > 0 ? 'flex' : 'none';
    }
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
}

// Ensure FontAwesome and Global CSS are loaded
if (!document.getElementById('fa-link')) {
    const fa = document.createElement('link');
    fa.id = 'fa-link';
    fa.rel = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fa);
}

const headerStyle = document.createElement('link');
headerStyle.rel = 'stylesheet';
headerStyle.href = 'assets/css/global_header.css';
document.head.appendChild(headerStyle);

// Init on DOM Content Loaded or immediately if already loaded
if (document.readyState === "complete" || document.readyState === "interactive") {
    initPvcHeader();
} else {
    document.addEventListener('DOMContentLoaded', initPvcHeader);
}
