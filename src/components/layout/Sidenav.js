import { Menu } from "antd";
import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import logo from "../../assets/images/logo.png";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const navigate = useHistory();

  const onLogout = () => {
    window.localStorage.clear();
    navigate.push("/sign-in");
  };

  const token = localStorage.getItem("token") || "";
  let decode = {};

  try {
    decode = jwtDecode(token);
  } catch (error) {
    console.error("Invalid token specified:", error.message);
  }

  const { isAdmin, isManager } = useMemo(() => {
    let isAdmin = false;
    let isManager = false;
    if (decode && decode.role) {
      isAdmin = decode.role === "Admin";
      isManager = decode.role === "Manager";
    }

    return { isAdmin, isManager };
  }, [decode]);
  return (
    <>
      <img src={logo} alt="" />
      <Menu theme="light" mode="inline">
        {isAdmin && (
          <>
            <div className="brand">
              <span>Quản trị viên</span>
            </div>
            <hr />
            <Redirect to="/dashboard" />
            <Menu.Item key="1">
              <NavLink to="/dashboard">
                <i class="fi fi-rr-dashboard-monitor"></i>
                <span className="label">Bảng điều khiển</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/managers">
                <i class="fi fi-rr-user-add"></i>
                <span className="label">Người quản lý</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="Customers">
              <NavLink to="/customers">
                <i class="fi fi-rr-users-alt"></i>
                <span className="label">Khách hàng</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="tos">
              <NavLink to="/tos">
                <i class="fi fi-rr-to-do"></i>
                <span className="label">Điều khoản dịch vụ</span>
              </NavLink>
            </Menu.Item>
          </>
        )}
        {isManager && (
          <>
            <div className="brand">
              <span>Quản lý</span>
            </div>
            <hr />
            <Redirect to="/products" />
            <Menu.Item key="products">
              <NavLink to="/products">
                <i class="fi fi-rr-capsules"></i>
                <span className="label">Thuốc</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="categories">
              <NavLink to="/categories">
                <i class="fi fi-rr-category-alt"></i>
                <span className="label">Danh mục</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="dosages">
              <NavLink to="/dosages">
                <i class="fi fi-rr-eye-dropper-half"></i>
                <span className="label">Dạng bào chế</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="pharmaceuticals">
              <NavLink to="/pharmaceuticals">
                <i class="fi fi-rr-building"></i>
                <span className="label">Công ty dược phẩm</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="specifications">
              <NavLink to="/specifications">
                <i class="fi fi-rr-box-alt"></i>
                <span className="label">Quy cách đóng gói</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="active-ingredient">
              <NavLink to="/active-ingredient">
                <i class="fi fi-rr-recipe-book"></i>
                <span className="label">Thành phần hoạt chất</span>
              </NavLink>
            </Menu.Item>
            {/* <Menu.Item key="nation">
              <NavLink to="/nation">
                <i class="fi fi-rr-flag"></i>
                <span className="label">Quốc gia</span>
              </NavLink>
            </Menu.Item> */}
            <Menu.Item key="brands">
              <NavLink to="/brands">
                <i class="fi fi-rr-brand"></i>
                <span className="label">Thương hiệu</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="package-category">
              <NavLink to="/package-category">
                <i class="fi fi-rr-selling"></i>
                <span className="label">Quản lý gói</span>
              </NavLink>
            </Menu.Item>
          </>
        )}
        {/* <Menu.Item className="menu-item-header" key="5">
          MỤC NGƯỜI DÙNG
        </Menu.Item> */}
        {/* <Menu.Item key="6">
          <NavLink to="/profile">
            <i class="fi fi-rr-portrait"></i>
            <span className="label">Tài khoản 👤</span>
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="7">
          <div onClick={onLogout} style={{ padding: "12px 11px" }}>
            <i class="fi fi-rr-sign-out-alt"></i>
            <span className="label">Đăng xuất 🔰</span>
          </div>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
