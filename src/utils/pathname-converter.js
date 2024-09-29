export const pathEnToVi = (path) => {
  switch (path) {
    case "dosages":
      return "Dạng bào chế";
    case "dashboard":
      return "Bảng điều khiển";
    case "products":
      return "Thuốc";
    case "pharmaceuticals":
      return "Công ty dược phẩm";
    case "specifications":
      return "Quy cách đóng gói";
    case "brands":
      return "Thương hiệu";
    case "active-ingredient":
      return "Thành phần hoạt chất";
    case "nation":
      return "Quốc gia";
    case "categories":
      return "Danh mục";
    case "package-category":
      return "Quản lí gói";
    case "tos":
      return "Điều khoản dịch vụ";
    case "customers":
      return "Danh sách khách hàng";
    case "managers":
      return "Danh sách người quản lý";
    default:
      return "";
  }
};
