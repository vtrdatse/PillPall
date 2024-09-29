import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import Dialog from "../../../components/dialog";
import {
  useCreateTos,
  useGetTosById,
  useUpdateTos,
} from "../../../hooks/useTos";

const AddTos = ({ onClose, id = null }) => {
  const queryClient = useQueryClient();

  // API: CREATE Tos
  const { mutate: createMutate, isLoading: createLoading } = useCreateTos();

  // API: UPDATE Tos
  const { mutate: updateMutate, isLoading: updateLoading } = useUpdateTos(id);

  // API: GET DETAIL Tos
  const { data: initData, isLoading: initLoading } = useGetTosById(id);

  const [form] = Form.useForm();
  const [body, setBody] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (id && initData) {
      setBody(initData);
      form.setFieldsValue(initData);
    }
  }, [id, initData]);

  const OnSubmit = () => {
    if (id) {
      updateMutate(body, {
        onSuccess: () => {
          queryClient.invalidateQueries("getTosList");
          toast.success("Cập nhật thành công!");
          onClose();
        },
      });
    } else {
      createMutate(body, {
        onSuccess: () => {
          queryClient.invalidateQueries("getTosList");
          toast.success("Thêm thành công!");
          onClose();
        },
      });
    }
  };

  return (
    <Dialog onClose={onClose}>
      <h2 style={{ textAlign: "center" }}>
        {id ? "CHỈNH SỬA" : "THÊM"} ĐIỀU KHOẢN DỊCH VỤ
      </h2>
      <Form
        form={form}
        onFinish={OnSubmit}
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
        <Form.Item
          label={
            <span style={{ fontWeight: "bold", color: "#333" }}>Tiêu đề</span>
          }
          name="title"
        >
          <Input
            onChange={(e) => setBody({ ...body, title: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label={
            <span style={{ fontWeight: "bold", color: "#333" }}>Nội dung</span>
          }
          name="content"
        >
          <Input.TextArea rows={8}
            onChange={(e) => setBody({ ...body, content: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 7,
          }}
        >
          <Button type="primary" htmlType="submit">
            {id ? "Cập nhật" : "Thêm"}
          </Button>
        </Form.Item>
      </Form>
    </Dialog>
  );
};

export default AddTos;
