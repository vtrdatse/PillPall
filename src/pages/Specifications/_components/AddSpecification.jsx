import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import Dialog from "../../../components/dialog";
import {
  useCreateSpecification,
  useGetSpecificationById,
  useUpdateSpecification,
} from "../../../hooks/useSpecificationApi";
import toast from "react-hot-toast";
const AddSpecification = ({ onClose, id = null }) => {
  const queryClient = useQueryClient();

  // API: CREATE SPECIFICATION
  const { mutate: createMutate, isLoading: createLoading } =
    useCreateSpecification();

  // API: UPDATE SPECIFICATION
  const { mutate: updateMutate, isLoading: updateLoading } =
    useUpdateSpecification(id);

  // API: GET DETAIL SPECIFICATION
  const { data: initData, isLoading: initLoading } =
    useGetSpecificationById(id);

  const [form] = Form.useForm();
  const [body, setBody] = useState({
    typeName: "",
    // detail: "",
  });

  useEffect(() => {
    if (id && initData) {
      setBody(initData);
      form.setFieldsValue(initData); // Explicitly set form values
    }
  }, [id, initData]);

  const OnSubmit = () => {
    if (id) {
      updateMutate(body, {
        onSuccess: () => {
          queryClient.invalidateQueries("getSpecificationList");
          toast.success("Cập nhật thành công!");
          onClose();
        },
      });
    } else {
      createMutate(body, {
        onSuccess: () => {
          queryClient.invalidateQueries("getSpecificationList");
          toast.success("Thêm thành công!");
          onClose();
        },
      });
    }
  };

  return (
    <Dialog onClose={onClose}>
      <h2 style={{ textAlign: "center" }}>
        {id ? "CHỈNH SỬA" : "THÊM"} QUY CÁCH ĐÓNG GÓI
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
        <Form.Item label="Tên quy cách đóng gói" name="typeName">
          <Input
            onChange={(e) => setBody({ ...body, typeName: e.target.value })}
          />
        </Form.Item>

        {/* <Form.Item label="Ghi chú" name="detail">
          <Input
            onChange={(e) => setBody({ ...body, detail: e.target.value })}
          />
        </Form.Item> */}

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

export default AddSpecification;
