import { Button, Form, Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import Dialog from "../../../components/dialog";
import {
  useCreatePackageCategory,
  useGetPackageCategoryById,
  useUpdatePackageCategory,
} from "../../../hooks/usePackageCategoryApi";
const AddPackageCategory = ({ onClose, id = null }) => {
  const queryClient = useQueryClient();

  // API: CREATE NATION
  const { mutate: createMutate, isLoading: createLoading } =
    useCreatePackageCategory();

  // API: UPDATE NATION
  const { mutate: updateMutate, isLoading: updateLoading } =
    useUpdatePackageCategory(id);

  // API: GET DETAIL NATION
  const { data: initData, isLoading: initLoading } =
    useGetPackageCategoryById(id);

  const [form] = Form.useForm();
  const [body, setBody] = useState({
    packageName: "",
    packageDescription: "",
    packageDuration: "",
    price: "",
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
          queryClient.invalidateQueries("getPackageCategoryList");
          toast.success("Cập nhật thành công!");
          onClose();
        },
      });
    } else {
      createMutate(body, {
        onSuccess: () => {
          queryClient.invalidateQueries("getPackageCategoryList");
          toast.success("Thêm thành công!");
          onClose();
        },
      });
    }
  };

  return (
    <Dialog onClose={onClose}>
      <h2 style={{ textAlign: "center" }}>
        {id ? "CHỈNH SỬA" : "THÊM"} DANH MỤC GÓI
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
        <Form.Item label="Tên" name="packageName">
          <Input
            onChange={(e) => setBody({ ...body, packageName: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Chi tiết" name="packageDescription">
          <Input
            onChange={(e) =>
              setBody({ ...body, packageDescription: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Thời hạn gói" name="packageDuration">
          <Input
            onChange={(e) =>
              setBody({ ...body, packageDuration: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Giá" name="price">
          <Input
            onChange={(e) => setBody({ ...body, price: e.target.value })}
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

export default AddPackageCategory;
