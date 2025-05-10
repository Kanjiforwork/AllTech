// seedLaptopsToFirestore.js
// Script để nhập dữ liệu laptop từ mock_data vào Firestore

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');
const path = require('path');
const fs = require('fs');

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

// Hàm tạo slug từ tên laptop (nếu không có sẵn id)
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');
}

// Hàm đọc dữ liệu laptop từ file data.ts
async function getLaptopData() {
  try {
    // Đọc nội dung file data.ts
    const dataFilePath = path.join(__dirname, 'mock_data', 'data.ts');
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    
    // Trích xuất mảng laptop từ nội dung file
    const laptopsArrayString = fileContent.replace('export const laptops =', '')
      .replace(/^\s*\[/, '[') // Loại bỏ khoảng trắng trước dấu [
      .trim();
    
    // Sử dụng eval để chuyển đổi chuỗi thành mảng JavaScript
    // Lưu ý: Eval không an toàn trong môi trường production, nhưng đây chỉ là script nội bộ
    const laptops = eval(laptopsArrayString);
    
    console.log(`Đã tìm thấy ${laptops.length} laptop trong data.ts`);
    return laptops;
  } catch (error) {
    console.error('Lỗi khi đọc dữ liệu laptop:', error);
    return [];
  }
}

// Hàm nhập dữ liệu laptop
async function seedLaptopData() {
  try {
    console.log('Bắt đầu nhập dữ liệu laptop...');
    
    const laptops = await getLaptopData();
    
    if (!laptops || laptops.length === 0) {
      console.error("Không có dữ liệu laptop để nhập");
      return false;
    }
    
    console.log(`Tìm thấy ${laptops.length} laptop để nhập vào Firestore.`);
    
    const laptopsCollectionRef = collection(db, "laptops");
    let successCount = 0;
    
    for (const laptop of laptops) {
      // Nếu laptop không có id, tạo slug từ tên laptop
      if (!laptop.id) {
        laptop.id = createSlug(laptop.name);
      }
      
      // Lưu cả slug là id gốc từ mock data
      const slug = laptop.id;
      
      await addDoc(laptopsCollectionRef, {
        ...laptop,
        slug: slug, // Thêm trường slug để dễ tìm kiếm
        createdAt: Timestamp.fromDate(new Date())
      });
      
      successCount++;
      console.log(`Đã thêm laptop: ${laptop.name}`);
    }
    
    console.log(`Đã nhập ${successCount}/${laptops.length} laptop thành công!`);
    return true;
  } catch (error) {
    console.error("Lỗi khi nhập dữ liệu laptop:", error);
    return false;
  }
}

// Chạy hàm nhập dữ liệu
seedLaptopData()
  .then(result => {
    if (result) {
      console.log('Hoàn tất quá trình nhập dữ liệu laptop.');
    } else {
      console.error('Nhập dữ liệu laptop không thành công.');
    }
    process.exit(0);
  })
  .catch(error => {
    console.error('Lỗi:', error);
    process.exit(1);
  }); 