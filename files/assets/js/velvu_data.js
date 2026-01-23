const velvuData = {
    brand: "Velvu",
    subtitle: "Complete CCTV & Security Solutions",
    description: "Velvu offers a comprehensive range of security solutions including advanced cameras, recorders, networking hardware, durable cables, and professional power solutions engineered for reliability.",
    categories: [
        { id: "all", name: "All Products", icon: "fa-solid fa-grid-2" },
        { id: "recorder", name: "Recorder", icon: "fa-solid fa-server" },
        { id: "hd-camera", name: "HD Camera", icon: "fa-solid fa-video" },
        { id: "ip-camera", name: "IP Camera", icon: "fa-solid fa-network-wired" },
        { id: "wifi-camera", name: "Wi-Fi Camera", icon: "fa-solid fa-wifi" },
        { id: "ptz-camera", name: "PTZ Camera", icon: "fa-solid fa-camera-rotate" },
        { id: "solar-camera", name: "4G / Solar Camera", icon: "fa-solid fa-solar-panel" },
        { id: "poe-switch", name: "PoE Switch", icon: "fa-solid fa-ethernet" },
        { id: "networking", name: "Networking", icon: "fa-solid fa-router" },
        { id: "power", name: "SMPS & Power", icon: "fa-solid fa-bolt" },
        { id: "cables", name: "Cables", icon: "fa-solid fa-link" },
        { id: "rack", name: "Rack", icon: "fa-solid fa-box-archive" },
        { id: "accessories", name: "Accessories", icon: "fa-solid fa-microchip" }
    ],
    products: [
        // === VELVU Recorders ===
        { id: 119, name: "Velvu 10CH NVR 4K", brand: "Velvu", category: "recorder", type: "NVR", res: "4K", channels: "10", power: "DC", environment: "Indoor", price: 8500, specs: "10 Channel, 4K Support", image: "assets/img/products/acuseek-nvr.png" },
        { id: 1194, name: "Velvu 16CH NVR Pro", brand: "Velvu", category: "recorder", type: "NVR", res: "4K", channels: "16", power: "DC", environment: "Indoor", price: 12000, specs: "16 Channel, H.265+", image: "assets/img/products/acuseek-nvr.png" },
        { id: 1195, name: "Velvu 36CH NVR Elite", brand: "Velvu", category: "recorder", type: "NVR", res: "8K", channels: "36", power: "AC", environment: "Indoor", price: 25000, specs: "36 Channel, Enterprise Grade", image: "assets/img/products/acuseek-nvr.png" },

        // === VELVU IP Cameras ===
        { id: 100, name: "Velvu 6MP IP Colour Bullet", brand: "Velvu", category: "ip-camera", type: "Bullet", res: "6MP", features: ["Audio", "Color Night Vision", "AI Detection"], environment: "Outdoor", power: "PoE", price: 4500, specs: "6MP, Full Color Night Vision", image: "assets/img/products/network-products-update.png" },
        { id: 101, name: "Velvu 6MP IP Colour Dome", brand: "Velvu", category: "ip-camera", type: "Dome", res: "6MP", features: ["Two-Way Talk", "Color Night Vision"], environment: "Indoor", power: "PoE", price: 4200, specs: "6MP, Internal Mic, Full Color", image: "assets/img/products/network-products-update.png" },
        { id: 102, name: "Velvu 8MP IP Colour Bullet", brand: "Velvu", category: "ip-camera", type: "Bullet", res: "8MP", features: ["Audio", "AI Detection", "Face Detection"], environment: "Outdoor", power: "PoE", price: 7500, specs: "8MP, 4K Ultra HD, AI Detection", image: "assets/img/products/network-products-update.png" },
        { id: 161, name: "Velvu 2MP IP Dome (AZSQUARE)", brand: "Velvu", category: "ip-camera", type: "Dome", res: "2MP", environment: "Indoor", power: "PoE", price: 2900, specs: "Classic IP Dome, 20M IR", image: "assets/img/products/network-products-update.png" },

        // === VELVU HD Cameras ===
        { id: 250, name: "Velvu 2MP HD Bullet", brand: "Velvu", category: "hd-camera", type: "Bullet", res: "2MP", environment: "Outdoor", power: "DC", price: 1800, specs: "2MP, Smart IR, 30M Range", image: "assets/img/products/turbo-hd-update.png" },
        { id: 251, name: "Velvu 5MP HD Dome", brand: "Velvu", category: "hd-camera", type: "Dome", res: "5MP", features: ["Audio"], environment: "Indoor", power: "DC", price: 2400, specs: "5MP, Color+Audio Supported", image: "assets/img/products/turbo-hd-update.png" },

        // === VELVU Wi-Fi Cameras ===
        { id: 1116, name: "Velvu Smart Mini PTZ Wi-Fi", brand: "Velvu", category: "wifi-camera", type: "PTZ", res: "3MP", features: ["Two-Way Talk", "AI Detection"], environment: "Indoor", power: "DC", price: 3200, specs: "3MP, 2-Way Audio, Auto Tracking", image: "assets/img/products/video-intercom-update.png" },
        { id: 1120, name: "Velvu Wi-Fi Bullet Pro", brand: "Velvu", category: "wifi-camera", type: "Bullet", res: "3MP", features: ["Audio", "IR Night Vision"], environment: "Outdoor", power: "DC", price: 3500, specs: "3MP, Outdoor, Dual Light", image: "assets/img/products/video-intercom-update.png" },

        // === VELVU 4G / Solar ===
        { id: 1118, name: "Velvu 4G Solar Bullet", brand: "Velvu", category: "solar-camera", type: "Bullet", res: "3MP", environment: "Outdoor", power: "Solar", price: 8500, specs: "3MP, Built-in Battery, 4G Sim", image: "assets/img/products/cable-free.png" },
        { id: 1131, name: "Velvu 4G Solar 10X Zoom PTZ", brand: "Velvu", category: "solar-camera", type: "PTZ", res: "4MP", features: ["Two-Way Talk", "Color Night Vision"], environment: "Outdoor", power: "Solar", price: 14500, specs: "Dual Lens, 10X Zoom, Solar Integrated", image: "assets/img/products/cable-free.png" },
        { id: 51, name: "Velvu 4G Solar 10X (OKAM)", brand: "Velvu", category: "solar-camera", type: "PTZ", res: "4MP", features: ["AI Detection"], environment: "Outdoor", power: "Solar", price: 12500, specs: "4G Connectivity, Solar Ready", image: "assets/img/products/cable-free.png" },

        // === VELVU Networking & PoE ===
        { id: 134, name: "Velvu 8+2 PoE Switch", brand: "Velvu", category: "poe-switch", type: "PoE Switch", netType: "PoE Switch", environment: "Indoor", power: "AC", price: 3500, specs: "8 Port PoE, 2 Uplink, Giga", image: "assets/img/products/networking-update.png" },
        { id: 139, name: "Velvu 8Port PoE Full Giga", brand: "Velvu", category: "poe-switch", type: "Gigabit Switch", netType: "Gigabit Switch", environment: "Indoor", power: "AC", price: 5500, specs: "Managed, High Power Budget", image: "assets/img/products/networking-update.png" },
        { id: 129, name: "Velvu 4Port PoE", brand: "Velvu", category: "poe-switch", type: "PoE Switch", netType: "PoE Switch", price: 2200, specs: "4x 10/100 PoE Ports", image: "assets/img/products/networking-update.png" },

        // === VELVU Cables & Power ===
        { id: 151, name: "Velvu Gold 3+1 Outdoor Cable", brand: "Velvu", category: "cables", cableType: "3+1 CCTV Cable", price: 2800, specs: "Pure Copper, 90Mtrs, Weatherproof", image: "assets/img/products/Premises Distribution System.jpeg" },
        { id: 121, name: "Velvu 12V 5Amps SMPS", brand: "Velvu", category: "power", type: "Adapter", price: 1200, specs: "Centralized Power Supply, Metal Box", image: "assets/img/products/Accessories.jpeg" },
        { id: 122, name: "Velvu 16CH SMPS", brand: "Velvu", category: "power", price: 2800, specs: "16 Channel Heavy Duty Power", image: "assets/img/products/Accessories.jpeg" },

        // === VELVU Racks & Accessories ===
        { id: 34, name: "Velvu 2U Mini Rack", brand: "Velvu", category: "rack", price: 1500, specs: "Compact Design, Ventilated", image: "assets/img/products/led-displays-update.png" },
        { id: 39, name: "Velvu 2U Voltaic Rack", brand: "Velvu", category: "rack", price: 1800, specs: "Heavy Gauge Metal, Front Glass", image: "assets/img/products/led-displays-update.png" },
        { id: 850, name: "Velvu BNC Connector", brand: "Velvu", category: "accessories", accType: "BNC Connector", price: 45, specs: "Pure Copper, Screw Type", image: "assets/img/products/Accessories.jpeg" },
        { id: 552, name: "Velvu HDMI 5M 4K Cable", brand: "Velvu", category: "accessories", accType: "HDMI Cable", price: 850, specs: "4K Support, Gold Plated", image: "assets/img/products/Accessories.jpeg" },

        // === OTHER BRANDS (For Global Filtering Demo) ===
        { id: 603, name: "Hikvision 16CH 2MP DVR", brand: "Hikvision", category: "recorder", type: "DVR", res: "2MP", channels: "16", price: 6500, specs: "Turbo HD DVR, 1080p Support", image: "assets/img/products/acuseek-nvr.png" },
        { id: 246, name: "CP Plus 2MP IR Bullet", brand: "CP Plus", category: "hd-camera", type: "Bullet", res: "2MP", price: 1500, specs: "Classic Indigo Series", image: "assets/img/products/turbo-hd-update.png" },
        { id: 1088, name: "TP-Link 2MP IP Bullet", brand: "TP-Link", category: "ip-camera", type: "Bullet", res: "2MP", power: "PoE", price: 3200, specs: "Vigi Series Smart Detection", image: "assets/img/products/network-products-update.png" },
        { id: 340, name: "Dahua 2MP IR Bullet Audio", brand: "Dahua", category: "hd-camera", type: "Bullet", features: ["Audio"], res: "2MP", price: 1950, specs: "Built-in Mic, 20M IR", image: "assets/img/products/turbo-hd-update.png" }
    ]
};
