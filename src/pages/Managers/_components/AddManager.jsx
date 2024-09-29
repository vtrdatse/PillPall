import { Button, Form, Input } from "antd";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import Dialog from "../../../components/dialog";
import { useCreateManager } from "../../../hooks/useManagerApi";
import { useState } from "react";

const AddManager = ({ onClose }) => {
  const queryClient = useQueryClient();
  const [body, setBody] = useState({
    email: "",
    password: "",
    phoneNumber: "",
  });

  // API: CREATE BRAND
  const { mutate, isLoading } = useCreateManager();

  const onCreate = () => {
    mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries("getManagerList");
        toast.success("Thêm thành công!");
        onClose();
      },
      onError: (e) => {
        let allErrs = [];
        for (let key in e.response.data.errors) {
          if (e.response.data.errors.hasOwnProperty(key)) {
            allErrs = allErrs.concat(e.response.data.errors[key]);
          }
        }
        allErrs.map((msg) => toast.error(msg));
      },
    });
  };

  return (
    <Dialog onClose={onClose}>
      <h2 style={{ textAlign: "center" }}>THÊM QUẢN LÝ</h2>
      <Form
        onFinish={onCreate}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          textAlign: "center",
          margin: "20px",
          paddingLeft: "20px",
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item label="Email" name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email!",
            },
            {
              type: "email",
              message: "Email không hợp lệ!",
            }
          ]}
          hasFeedback
        >
          <Input
            placeholder="Nhập email"
            value={body.email}
            onChange={(e) => setBody({ ...body, email: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Mật khẩu" name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
            {
              min: 6,
              message: "Mật khẩu phải có ít nhất 6 ký tự!",
            },
            {
              pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/,
              message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt, một chữ số và một chữ cái viết hoa!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="Nhập mật khẩu"
            value={body.password}
            onChange={(e) => setBody({ ...body, password: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại!",
            },
            {
              pattern: /^[0-9]{10}$/,
              message: "Số điện thoại phải chứa 10 chữ số!",
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder="Nhập số điện thoại"
            value={body.phoneNumber}
            onChange={(e) => setBody({ ...body, phoneNumber: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 7,
          }}
        >
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </Dialog>
  );
};

export default AddManager;
