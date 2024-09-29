# PillPall
Dự án Quản lý Thuốc (Pharmacy Management System)
Giới thiệu
Dự án này là một hệ thống quản lý thuốc, giúp quản lý thông tin về các loại thuốc, thương hiệu, danh mục, hoạt chất, công ty sản xuất, quốc gia, và các đặc điểm khác của thuốc. Hệ thống cho phép thêm, cập nhật, và xóa thuốc cũng như các thông tin liên quan.

Các tính năng chính
Quản lý thông tin thuốc: Người dùng có thể thêm, sửa, và xóa thuốc trong hệ thống.
Quản lý thương hiệu: Liên kết các thương hiệu với các loại thuốc và quản lý giá cả theo đơn vị giá (Viên, Vỉ, Hộp, Tuýp, Chai).
Chức năng tìm kiếm: Cho phép người dùng tìm kiếm nhanh các thông tin liên quan đến thuốc, hoạt chất, và thương hiệu.
Phân loại: Thuốc được phân loại theo danh mục, quốc gia sản xuất, và công ty sản xuất.
Hệ thống API: Sử dụng API để lấy thông tin thuốc, thêm mới, cập nhật và xóa dữ liệu từ hệ thống backend.
Cấu trúc hệ thống
Dự án bao gồm các phần chính sau:

Frontend: Sử dụng ReactJS cho giao diện người dùng.
Các thành phần chính:
MultiBrand.jsx: Thành phần quản lý danh sách thương hiệu, giá cả, và đơn vị giá.
ProductDetail.jsx: Thành phần hiển thị chi tiết thuốc và danh sách thương hiệu kèm giá.
AddProduct.js: Thành phần để thêm và cập nhật thông tin thuốc.
ProductCard.jsx: Thành phần hiển thị thẻ thuốc kèm thông tin cơ bản và các hành động như chỉnh sửa hoặc xóa.
Backend: API được xây dựng để xử lý yêu cầu CRUD liên quan đến thuốc và thương hiệu.
Các API chính:
POST /api/medicines/full: Thêm một loại thuốc mới kèm thông tin đầy đủ.
PUT /api/medicines/full/{medicineId}: Cập nhật thông tin đầy đủ của một loại thuốc.
DELETE /api/medicines/{medicineId}/brands/{brandId}: Xóa một thương hiệu ra khỏi một loại thuốc.
Công nghệ sử dụng
Frontend:
ReactJS
Ant Design: Sử dụng cho các thành phần UI
React Query: Quản lý API request và caching
Backend:
API để giao tiếp giữa frontend và database
Spring Boot: Xử lý backend, database, và các thao tác API
Công cụ khác:
Visual Studio Code: IDE phát triển
Git: Quản lý mã nguồn, đẩy code lên nhánh develop trên GitHub
Chức năng bổ sung
Thao tác xóa: Xóa thương hiệu thuốc bằng cách nhấn vào nút 'Xóa' trong danh sách thương hiệu.
Xử lý thông báo: Hiển thị thông báo khi thêm, cập nhật hoặc xóa dữ liệu thành công hoặc thất bại.
Định dạng giá: Tùy chỉnh hiển thị đơn vị giá và thông báo "Thuốc cần tư vấn" nếu giá trị không xác định.
Hướng dẫn cài đặt
Clone repository về máy:

bash
Sao chép mã
git clone <repository-url>
cd project-directory
Cài đặt các dependencies:

bash
Sao chép mã
npm install
Chạy dự án:

bash
Sao chép mã
npm start
Đóng góp
Nếu bạn muốn đóng góp vào dự án, hãy mở một pull request hoặc liên hệ với tôi.