/* ===============================
   GLOBAL STATE
================================ */

let activeCategory = "all";

let activeFilters = {
    camera_type: [],
    resolution: [],
    power_type: [],
    channel: []
};

let minPrice = 0;
let maxPrice = 50000;

const FILTER_FIELD_MAP = {
    camera_type: "type",
    resolution: "res",
    power_type: "power",
    channel: "channels"
};

/* ===============================
   FIELD MAP (VERY IMPORTANT)
================================ */

const FIELD_MAP = {
    camera_type: "type",
    resolution: "res",
    power_type: "power",
    channel: "channels"
};

/* ===============================
   INIT
================================ */

document.addEventListener("DOMContentLoaded", () => {
    renderCategoryTabs();
    setupEventListeners();
    applyFilters();
});

/* ===============================
   EVENT LISTENERS
================================ */

function setupEventListeners() {

    // expand collapse
    document.querySelectorAll(".filter-group-header").forEach(header => {
        header.addEventListener("click", () => {
            header.parentElement.classList.toggle("collapsed");
        });
    });

    // checkbox filters
    document.querySelectorAll(".filter-options input[type='checkbox']").forEach(cb => {
        cb.addEventListener("change", e => {
            const group = e.target.dataset.group;
            const value = e.target.value;

            if (!activeFilters[group]) return;

            if (e.target.checked) {
                if (!activeFilters[group].includes(value)) {
                    activeFilters[group].push(value);
                }
            } else {
                activeFilters[group] =
                    activeFilters[group].filter(v => v !== value);
            }

            applyFilters();
        });
    });

    // price filter
    document.getElementById("price-min")?.addEventListener("change", () => {
        minPrice = parseInt(document.getElementById("price-min").value) || 0;
        applyFilters();
    });

    document.getElementById("price-max")?.addEventListener("change", () => {
        maxPrice = parseInt(document.getElementById("price-max").value) || 50000;
        applyFilters();
    });
}

/* ===============================
   CATEGORY TABS
================================ */

function renderCategoryTabs() {
    const grid = document.getElementById("category-grid");
    if (!grid) return;

    grid.innerHTML = velvuData.categories.map(cat => `
        <div class="velvu-cat-card ${cat.id === activeCategory ? "active" : ""}"
             onclick="selectCategoryTab('${cat.id}')">
            <i class="${cat.icon}"></i>
            <span>${cat.name}</span>
        </div>
    `).join("");
}

function selectCategoryTab(id) {
    activeCategory = id;

    Object.keys(activeFilters).forEach(k => activeFilters[k] = []);

    document.querySelectorAll(".filter-options input").forEach(cb => {
        cb.checked = false;
        cb.disabled = false;
        cb.closest("label").style.opacity = "1";
    });

    updateCategoryTabsUI();
    applyFilters();
    closeMobileFilters();
}

function updateCategoryTabsUI() {
    document.querySelectorAll(".velvu-cat-card").forEach(card => {
        card.classList.remove("active");
        if (card.getAttribute("onclick").includes(activeCategory)) {
            card.classList.add("active");
        }
    });
}

/* ===============================
   FILTER ENGINE (CORE FIX)
================================ */

function applyFilters() {

    // show only Velvu products
    let filtered = velvuData.products.filter(p => p.brand === "Velvu");

    // category tab filter
    if (activeCategory !== "all") {
        filtered = filtered.filter(p => p.category === activeCategory);
    }

    // sidebar filters
    Object.keys(activeFilters).forEach(key => {
        const selectedValues = activeFilters[key];
        if (selectedValues.length === 0) return;

        const productField = FILTER_FIELD_MAP[key];

        filtered = filtered.filter(p => {
            const productValue = p[productField];
            if (!productValue) return false;

            if (Array.isArray(productValue)) {
                return selectedValues.some(v => productValue.includes(v));
            }

            return selectedValues.includes(String(productValue));
        });
    });

    // price filter
    filtered = filtered.filter(
        p => p.price >= minPrice && p.price <= maxPrice
    );

    renderBreadcrumbs();
    renderProductGrid(filtered);
    updateFilterGroupVisibility(filtered);
    updateDynamicCounts();
}

/* ===============================
   MOBILE NAVIGATION
================================ */

function toggleMobileFilter() {
    document.getElementById("refine-search")?.classList.add("active");
    document.querySelector(".velvu-sidebar-overlay")?.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeMobileFilters() {
    document.getElementById("refine-search")?.classList.remove("active");
    document.querySelector(".velvu-sidebar-overlay")?.classList.remove("active");
    document.body.style.overflow = "";
}

/* ===============================
   BREADCRUMB
================================ */

function renderBreadcrumbs() {
    const bc = document.querySelector("#dynamic-breadcrumb ol");
    if (!bc) return;

    let html = `
        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
        <li class="breadcrumb-item">
            <a href="velvu.html" onclick="clearAllFilters();return false;">Velvu</a>
        </li>
    `;

    if (activeCategory !== "all") {
        const name = velvuData.categories.find(c => c.id === activeCategory)?.name;
        html += `<li class="breadcrumb-item active">${name}</li>`;
    }

    bc.innerHTML = html;
}

/* ===============================
   CLEAR ALL (FULL RESET)
================================ */

function clearAllFilters() {

    activeCategory = "all";

    Object.keys(activeFilters).forEach(k => activeFilters[k] = []);

    minPrice = 0;
    maxPrice = 50000;

    document.querySelectorAll(".filter-options input").forEach(cb => {
        cb.checked = false;
        cb.disabled = false;
        cb.closest("label").style.opacity = "1";
    });

    document.getElementById("price-min").value = 0;
    document.getElementById("price-max").value = 50000;

    updateCategoryTabsUI();
    applyFilters();
}

/* ===============================
   RENDERING ENGINE (PRODUCT GRID)
================================ */

function renderProductGrid(products) {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-box-open"></i>
                <h3>No products found</h3>
                <p class="text-muted">Adjust your filters to discover other products.</p>
                <button class="hik-btn-main mt-3" onclick="clearAllFilters()">Clear All Filters</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = products.map((p, idx) => `
        <div class="product-item fade-up" style="animation-delay: ${idx * 0.05}s">
            <div class="product-img">
                <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="product-spec">${p.specs}</p>
                
                <div class="product-actions-row">
                    <button onclick="openProductModal(${p.id})" class="btn-grid-view-more">VIEW MORE</button>
                    
                    <div class="add-btn-container" id="add-container-${p.id}">
                        <button class="btn-swiggy-add" id="btn-add-${p.id}" onclick="handleSwiggyAdd(${p.id})">ADD</button>
                        
                        <div class="qty-selector-swiggy" id="qty-swiggy-${p.id}">
                            <button onclick="changeSwiggyQty(${p.id}, -1)">-</button>
                            <span id="qty-val-${p.id}">1</span>
                            <button onclick="changeSwiggyQty(${p.id}, 1)">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
}

/* ===============================
   SWIGGY STYLE QTY HANDLERS
================================ */

function handleSwiggyAdd(productId) {
    const addBtn = document.getElementById(`btn-add-${productId}`);
    const qtySelector = document.getElementById(`qty-swiggy-${productId}`);
    const qtyVal = document.getElementById(`qty-val-${productId}`);

    // Toggle UI
    addBtn.style.display = "none";
    qtySelector.style.display = "flex";
    qtyVal.textContent = "1";

    // Add to cart
    const product = velvuData.products.find(p => p.id === productId);
    if (product) {
        window.addToCart(product, 1);
    }
}

function changeSwiggyQty(productId, delta) {
    const qtyVal = document.getElementById(`qty-val-${productId}`);
    const addBtn = document.getElementById(`btn-add-${productId}`);
    const qtySelector = document.getElementById(`qty-swiggy-${productId}`);

    let current = parseInt(qtyVal.textContent);
    let next = current + delta;

    if (next < 1) {
        // Switch back to ADD button
        qtySelector.style.display = "none";
        addBtn.style.display = "block";

        // Remove from cart or logic (using updateCartItemQuantity to 0 handles it)
        const product = velvuData.products.find(p => p.id === productId);
        if (product) {
            window.updateCartItemQuantity(`VEL-${product.id}`, 0);
        }
        return;
    }

    qtyVal.textContent = next;

    // Update cart
    const product = velvuData.products.find(p => p.id === productId);
    if (product) {
        window.updateCartItemQuantity(`VEL-${product.id}`, next);
    }
}

// Toast/Notification Helper
function showToast(message, type = "info") {
    if (window.showAddToCartNotification) {
        window.showAddToCartNotification(message);
    } else {
        alert(message);
    }
}


// Compat for Modal
function handleAddToCart(productId) {
    const qtySpan = document.getElementById(`modal-qty-${productId}`);
    const quantity = parseInt(qtySpan ? qtySpan.textContent : 1);
    const product = velvuData.products.find(p => p.id === productId);
    if (product) window.addToCart(product, quantity);
}

function changeModalQty(productId, delta) {
    const qtySpan = document.getElementById(`modal-qty-${productId}`);
    let next = parseInt(qtySpan.textContent) + delta;
    if (next < 1) return;
    qtySpan.textContent = next;
}

function openProductModal(productId) {
    const product = velvuData.products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById("product-modal");
    const content = document.getElementById("modal-content");

    // Clear and build content
    content.innerHTML = `
        <div class="modal-p-body">
            <div class="modal-p-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="modal-p-details">
                <h2>${product.name}</h2>
                <div class="modal-subtitle">PVC SECURITY SOLUTIONS</div>
                
                <h3 class="desc-title">Description</h3>
                <ul>
                    <li><strong>Model:</strong> VEL-${product.id}</li>
                    <li><strong>Resolution:</strong> ${product.res || "High Definition"}</li>
                    <li><strong>Category:</strong> ${product.category.toUpperCase()}</li>
                    <li><strong>Specifications:</strong> ${product.specs}</li>
                    <li>Smart Dual Night Vision Support</li>
                    <li>Metal Body Construction (Heavy Duty)</li>
                    <li>In-Built Audio Recording Support</li>
                    <li>1 Year Replacement + 1 Year Repair Warranty</li>
                    <li>MAKE IN INDIA Product</li>
                </ul>

                <hr class="my-4">

                <div class="modal-actions">
                    <div class="qty-selector big">
                        <button class="qty-btn" onclick="changeModalQty(${product.id}, -1)">-</button>
                        <span id="modal-qty-${product.id}" class="qty-input">1</span>
                        <button class="qty-btn" onclick="changeModalQty(${product.id}, 1)">+</button>
                    </div>
                    <button onclick="handleAddToCart(${product.id})" class="btn-add-cart full">ADD TO CART <i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeProductModal() {
    const modal = document.getElementById("product-modal");
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Restore scroll
}

/* ===============================
   DYNAMIC COUNTS & VISIBILITY
================================ */

function updateDynamicCounts() {
    document.querySelectorAll(".filter-options label").forEach(label => {
        const checkbox = label.querySelector("input");
        const countSpan = label.querySelector(".count");
        if (!checkbox || !countSpan) return;

        const group = checkbox.dataset.group;
        const val = checkbox.value;
        const productField = FILTER_FIELD_MAP[group];

        let dataset = velvuData.products.filter(p => p.brand === "Velvu");
        if (activeCategory !== "all") {
            dataset = dataset.filter(p => p.category === activeCategory);
        }

        const count = dataset.filter(p => {
            const pVal = p[productField];
            return Array.isArray(pVal) ? pVal.includes(val) : String(pVal) === val;
        }).length;

        countSpan.textContent = count;

        if (count === 0) {
            label.style.opacity = "0.4";
            checkbox.disabled = true;
        } else {
            label.style.opacity = "1";
            checkbox.disabled = false;
        }
    });
}

function updateFilterGroupVisibility(results) {
    const categoriesInResult = [...new Set(results.map(p => p.category))];
    const isCamera = categoriesInResult.some(c => c.includes("camera"));
    const isRecorder = categoriesInResult.includes("recorder");

    const camTypeGroup = document.getElementById("group-camera_type");
    const resGroup = document.getElementById("group-resolution");
    const channelGroup = document.getElementById("group-channel");

    if (camTypeGroup) camTypeGroup.style.display = isCamera ? "block" : "none";
    if (resGroup) resGroup.style.display = isCamera ? "block" : "none";
    if (channelGroup) channelGroup.style.display = isRecorder ? "block" : "none";
}
