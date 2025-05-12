// uploadLaptopsToFirestore.js
// Script để upload dữ liệu laptop trực tiếp vào Firestore

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAFSVL94k5zXkrAy5oQKbO7rT6W5fPAk4M",
  authDomain: "laptop-review-all.firebaseapp.com",
  projectId: "laptop-review-all",
  storageBucket: "laptop-review-all.firebasestorage.app",
  messagingSenderId: "1044782876129",
  appId: "1:1044782876129:web:6e0891bf2753c5a3f63ea0"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mảng dữ liệu laptop
const laptops = [
  // MacBook Pro 14 inch (M3 Pro)
  {
    id: "macbook-pro-14-m3-pro",
    name: "MacBook Pro 14-inch (M3 Pro)",
    image: "/placeholder.svg?height=600&width=600",
    price: "$1,999",
    originalPrice: "$1,999",
    specs: {
      cpu: "Apple M3 Pro (12-core CPU)",
      gpu: "16-core GPU",
      ram: "18GB Unified Memory",
      storage: "512GB SSD",
      display: '14.2" Liquid Retina XDR, 120Hz ProMotion',
      battery: "70Wh, Up to 18 hours",
    },
    benchmarks: {
      gaming: 8.0,
      productivity: 9.5,
      content: 9.8,
      battery: 9.6,
      display: 9.9,
      build: 9.7,
      value: 7.6,
      overall: 9.3,
    },
    detailedSpecs: {
      case: {
        weight: "1.55 kg (3.42 lbs)",
        dimensions: "312.6 x 221.2 x 15.5 mm",
        screenToBodyRatio: "92%",
        material: "Aluminum",
        color: "Space Black",
        maxOpenAngle: "135°",
        cooling: "Active cooling with fan",
        noiseLevel: "30dB under load",
      },
      display: {
        size: '14.2"',
        type: "Mini-LED",
        refreshRate: "120Hz",
        resolution: "3024 x 1964",
        aspectRatio: "16:10",
        ppi: "254",
        brightness: "1600 nits peak, 1000 nits sustained",
        colorGamut: {
          sRGB: "100%",
          adobeRGB: "100%",
          dciP3: "100%",
        },
        responseTime: "1ms",
        touchscreen: false,
        hdr: true,
      },
    },
    pros: [
      "Exceptional performance for creative professionals",
      "Stunning mini-LED display with ProMotion",
      "Industry-leading battery life",
      "Excellent port selection including HDMI and SD card reader",
    ],
    cons: [
      "Expensive compared to Windows alternatives",
      "No touch screen option",
      "RAM and storage not user-upgradeable",
      "Limited gaming library compared to Windows",
    ],
  },
  // MacBook Air 13 inch (M3)
  {
    id: "macbook-air-13-m3",
    name: "MacBook Air 13-inch (M3)",
    image: "/placeholder.svg?height=600&width=600",
    price: "$1,099.00",
    originalPrice: "$1,199.00",
    specs: {
      cpu: "Apple M3 (8-core CPU)",
      gpu: "10-core GPU",
      ram: "16GB Unified Memory",
      storage: "256GB SSD",
      display: '13.6" Liquid Retina, 60Hz',
      battery: "52.6Wh, Up to 18 hours",
    },
    benchmarks: {
      gaming: 6.5,
      productivity: 8.7,
      content: 8.3,
      battery: 9.8,
      display: 8.6,
      build: 9.5,
      value: 8.7,
      overall: 8.6,
    },
  },
  // MacBook Pro 16 inch (M3 Max)
  {
    id: "macbook-pro-16-m3-max",
    name: "MacBook Pro 16-inch (M3 Max)",
    image: "/placeholder.svg?height=600&width=600",
    price: "$3,499.00",
    originalPrice: "$3,499.00",
    specs: {
      cpu: "Apple M3 Max (14-core CPU)",
      gpu: "30-core GPU",
      ram: "36GB Unified Memory",
      storage: "1TB SSD",
      display: '16.2" Liquid Retina XDR, 120Hz ProMotion',
      battery: "100Wh, Up to 22 hours",
    },
    benchmarks: {
      gaming: 8.5,
      productivity: 9.9,
      content: 10.0,
      battery: 9.7,
      display: 9.9,
      build: 9.8,
      value: 7.2,
      overall: 9.6,
    },
  },
  // MacBook Air 15 inch (M2)
  {
    id: "macbook-air-15-m2",
    name: "MacBook Air 15-inch (M2)",
    image: "/placeholder.svg?height=600&width=600",
    price: "$1,299.00",
    originalPrice: "$1,399.00",
    specs: {
      cpu: "Apple M2 (8-core CPU)",
      gpu: "10-core GPU",
      ram: "16GB Unified Memory",
      storage: "512GB SSD",
      display: '15.3" Liquid Retina, 60Hz',
      battery: "66.5Wh, Up to 18 hours",
    },
    benchmarks: {
      gaming: 6.2,
      productivity: 8.5,
      content: 8.0,
      battery: 9.5,
      display: 8.8,
      build: 9.4,
      value: 8.5,
      overall: 8.4,
    },
  },
  // Microsoft Surface Laptop Studio
  {
    id: "microsoft-surface-laptop-studio",
    name: "Microsoft Surface Laptop Studio",
    image: "/placeholder.svg?height=600&width=600",
    price: "$1,599.99",
    originalPrice: "$1,799.99",
    specs: {
      cpu: "Intel Core i7-11370H",
      gpu: "NVIDIA GeForce RTX 3050 Ti 4GB",
      ram: "16GB LPDDR4x 4266MHz",
      storage: "512GB NVMe SSD",
      display: '14.4" 2400 x 1600 PixelSense Flow Touch, 120Hz',
      battery: "58Wh, Up to 18 hours",
    },
    benchmarks: {
      gaming: 6.8,
      productivity: 8.3,
      content: 8.5,
      battery: 7.5,
      display: 9.3,
      build: 9.5,
      value: 7.2,
      overall: 8.1,
    },
  },
  // Acer Swift 5
  {
    id: "acer-swift-5",
    name: "Acer Swift 5",
    image: "/placeholder.svg?height=600&width=600",
    price: "$999.99",
    originalPrice: "$1,199.99",
    specs: {
      cpu: "Intel Core i7-1260P",
      gpu: "Intel Iris Xe Graphics",
      ram: "16GB LPDDR5 5200MHz",
      storage: "512GB NVMe SSD",
      display: '14" WQXGA (2560 x 1600) IPS Touch',
      battery: "59Wh, Up to 14 hours",
    },
    benchmarks: {
      gaming: 4.5,
      productivity: 8.5,
      content: 7.0,
      battery: 9.0,
      display: 8.7,
      build: 8.5,
      value: 8.2,
      overall: 7.6,
    },
  },
  // Lenovo IdeaPad 5 Pro 16
  {
    id: "lenovo-ideapad-5-pro-16",
    name: "Lenovo IdeaPad 5 Pro 16",
    image: "/placeholder.svg?height=600&width=600",
    price: "$899.99",
    originalPrice: "$1,099.99",
    specs: {
      cpu: "AMD Ryzen 7 5800H",
      gpu: "NVIDIA GeForce RTX 3050 4GB",
      ram: "16GB DDR4 3200MHz",
      storage: "512GB NVMe SSD",
      display: '16" 2.5K (2560 x 1600) IPS, 120Hz',
      battery: "75Wh, Up to 12 hours",
    },
    benchmarks: {
      gaming: 7.5,
      productivity: 8.2,
      content: 7.8,
      battery: 8.5,
      display: 8.0,
      build: 7.9,
      value: 9.2,
      overall: 8.3,
    },
  },
  // ASUS ROG Zephyrus G14
  {
    id: "asus-rog-zephyrus-g14",
    name: "ASUS ROG Zephyrus G14",
    image: "/placeholder.svg?height=600&width=600",
    price: "$1,299.99",
    originalPrice: "$1,499.99",
    specs: {
      cpu: "AMD Ryzen 9 5900HS",
      gpu: "NVIDIA GeForce RTX 3060 6GB",
      ram: "16GB DDR4 3200MHz",
      storage: "1TB NVMe SSD",
      display: '14" QHD (2560 x 1440) IPS, 120Hz',
      battery: "76Wh, Up to 10 hours",
    },
    benchmarks: {
      gaming: 8.7,
      productivity: 8.9,
      content: 8.5,
      battery: 8.0,
      display: 8.5,
      build: 9.0,
      value: 8.5,
      overall: 8.7,
    },
  },
  // Dell XPS 15
  {
    id: "dell-xps-15",
    name: "Dell XPS 15",
    image: "/placeholder.svg?height=600&width=600",
    price: "$1,799.99",
    originalPrice: "$1,999.99",
    specs: {
      cpu: "Intel Core i7-11800H",
      gpu: "NVIDIA GeForce RTX 3050 Ti 4GB",
      ram: "16GB DDR4 3200MHz",
      storage: "1TB NVMe SSD",
      display: '15.6" 4K (3840 x 2400) OLED Touch',
      battery: "86Wh, Up to 8 hours",
    },
    benchmarks: {
      gaming: 7.0,
      productivity: 9.0,
      content: 9.2,
      battery: 7.5,
      display: 9.5,
      build: 9.5,
      value: 7.8,
      overall: 8.6,
    },
  },
  // HP Spectre x360
  {
    id: "hp-spectre-x360",
    name: "HP Spectre x360 14",
    image: "/placeholder.svg?height=600&width=600",
    price: "$1,399.99",
    originalPrice: "$1,599.99",
    specs: {
      cpu: "Intel Core i7-1165G7",
      gpu: "Intel Iris Xe Graphics",
      ram: "16GB LPDDR4X 4266MHz",
      storage: "1TB NVMe SSD",
      display: '13.5" 3K2K (3000 x 2000) OLED Touch',
      battery: "66Wh, Up to 14 hours",
    },
    benchmarks: {
      gaming: 5.0,
      productivity: 8.5,
      content: 8.0,
      battery: 9.0,
      display: 9.5,
      build: 9.5,
      value: 8.0,
      overall: 8.2,
    },
  },
  // Acer Nitro 5
  {
    id: "acer-nitro-5",
    name: "Acer Nitro 5",
    image: "/placeholder.svg?height=600&width=600",
    price: "$999.99",
    originalPrice: "$1,099.99",
    specs: {
      cpu: "AMD Ryzen 7 5800H",
      gpu: "NVIDIA GeForce RTX 3060 6GB",
      ram: "16GB DDR4 3200MHz",
      storage: "512GB NVMe SSD",
      display: '15.6" FHD IPS 144Hz',
      battery: "57Wh, Up to 8 hours",
    },
    benchmarks: {
      gaming: 8.5,
      productivity: 7.8,
      content: 7.5,
      battery: 6.5,
      display: 7.8,
      build: 7.5,
      value: 9.0,
      overall: 7.8,
    },
  },
];

// Hàm nhập dữ liệu laptop
async function uploadLaptopData() {
  try {
    console.log('Bắt đầu upload dữ liệu laptop...');
    
    if (!laptops || laptops.length === 0) {
      console.error("Không có dữ liệu laptop để upload");
      return false;
    }
    
    console.log(`Có ${laptops.length} laptop để upload vào Firestore.`);
    
    const laptopsCollectionRef = collection(db, "laptops");
    let successCount = 0;
    
    for (const laptop of laptops) {
      // Lưu cả slug là id gốc
      const slug = laptop.id;
      
      await addDoc(laptopsCollectionRef, {
        ...laptop,
        slug: slug,
        createdAt: Timestamp.fromDate(new Date())
      });
      
      successCount++;
      console.log(`Đã thêm laptop: ${laptop.name}`);
    }
    
    console.log(`Đã upload ${successCount}/${laptops.length} laptop thành công!`);
    return true;
  } catch (error) {
    console.error("Lỗi khi upload dữ liệu laptop:", error);
    return false;
  }
}

// Chạy hàm upload dữ liệu
uploadLaptopData()
  .then(result => {
    if (result) {
      console.log('Hoàn tất quá trình upload dữ liệu laptop.');
    } else {
      console.error('Upload dữ liệu laptop không thành công.');
    }
    process.exit(0);
  })
  .catch(error => {
    console.error('Lỗi:', error);
    process.exit(1);
  }); 