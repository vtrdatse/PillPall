import { Button, Col, Form, Input, Layout, Row, Typography } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import logo from '../assets/images/logo.png';
import { useLogin } from "../hooks/useAuthApi";
import { initAuthStateToStorage } from "../utils/local-storage";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const SignIn = () => {
  const { mutate, isLoading, error } = useLogin();
  const [data, setData] = useState({ email: "", password: "" });

  const navigate = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      toast.error('Vui lòng điền đầy đủ thông tin đăng nhập!');
      return;
    }

    mutate(data, {
      onSuccess: async (res) => {
        if (res?.data?.accessToken) {
          const token = res?.data?.accessToken;
          const expiresIn = res?.data?.expiresIn;
          const refreshToken = res?.data?.refreshToken;

          await initAuthStateToStorage(
            token,
            expiresIn,
            refreshToken,
            data.email
          );
          toast.success('Đăng nhập thành công!');
          navigate.push("/");
        }
      },
      onError: (e) => {
        toast.error('Đăng nhập thất bại! Vui lòng kiểm tra lại tài khoản!');
      },
    });
  };

  return (
    <Layout className="layout-default layout-signin">
      <Content className="signin">
        <Row justify="center">
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 6, offset: 0 }}
            md={{ span: 12 }}
          >
            <Title className="mb-15 text-center">Chào mừng đến với PillPal</Title>
            <div className="logo-container text-center">
              <img style={{ width: 150 }} src={logo} alt="Logo" className="logo" />
            </div>
            <Form layout="vertical" className="row-col">
              <Form.Item
                className="username"
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email!",
                  },
                  {
                    type: "email",
                    message: "Email không hợp lệ!",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Nhập email ..."
                  type="email"
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </Form.Item>

              <Form.Item
                className="username"
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                  {
                    min: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Nhập mật khẩu ..."
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", marginTop: "20px" }}
                onClick={onSubmit}
                loading={isLoading}
              >
                ĐĂNG NHẬP
              </Button>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default SignIn;
