### CÁCH HOẠT ĐỘNG:


Tích hợp API:
Firebase/Firestore SDK cung cấp một giao diện API để tương tác với cơ sở dữ liệu Firestore. Khi các component gọi các hàm như newsService.getLatest() hoặc articleService.getById(), chúng đang thực hiện các lệnh gọi API đến máy chủ của Firebase.

Truy vấn dữ liệu thời gian thực:
Khi các component được tải, yêu cầu API bất đồng bộ sẽ được gửi đến Firestore để lấy dữ liệu mới nhất về tin tức và bài viết. Quá trình này diễn ra thông qua Firebase SDK – công cụ đã xử lý mọi giao tiếp API ở phía sau.

Xử lý dữ liệu phía client:
Sau khi nhận dữ liệu từ API, các component của bạn sẽ xử lý và hiển thị dữ liệu đó theo yêu cầu của giao diện người dùng (UI).




### CÁCH SEED DATABASE (NẾU CHƯA CÓ QUYỀN TRUY CẬP VÀO FIRESTORE HIỆN TẠI)

Cách 1: Kêu Hào add vào project Firebase

Cách 2: chạy lệnh để seed Database. Từng bước như sau:

- Set up 1 Firebase projects mới
- Add vào collection 2 Documents trống là "news" và "articles" (lúc đầu tạo Firebase có thể bắt buộc mặc định phải tạo 1 document rỗng. Cái này không ảnh hưởng gì hết, code vẫn chạy bình thường)
- Cập nhật phần Rules trong Firestore để file initFirestore.js có thể ghi dữ liệu vào database:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Temporary rule to allow seeding
    match /{document=**} {
      allow read, write: if true;  // Allows unrestricted access for seeding
    }
  }
}

```

- Sau đó mở terminal và chạy lệnh: "node initFirestore.js"


### ADD API FIREBASE:
Thêm 1 file .env.example để add API key trong firebase nhằm mục đích bảo mật API để không bị kẻ xấu tấn công. 

