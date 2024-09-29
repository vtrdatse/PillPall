import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import Dialog from "../../../components/dialog";
import {
  useCreateBrand,
  useGetBrandById,
  useUpdateBrand,
} from "../../../hooks/useBrandApi";

const AddBranch = ({ onClose, id = null }) => {
  const queryClient = useQueryClient();
  const [body, setBody] = useState({
    brandUrl: "",
    brandLogo: "",
    brandName: "",
  });
  const [form] = Form.useForm();

  // API: CREATE BRAND
  const { mutate, isLoading } = useCreateBrand();

  // API: UPDATE BRAND
  const { mutate: updateMutate, isLoading: updateLoading } = useUpdateBrand(id);

  // API: GET BRAND
  const { data: initData, isLoading: initLoading } = useGetBrandById(id);

  useEffect(() => {
    if (id && initData) {
      setBody(initData);
      form.setFieldsValue(initData); // Explicitly set form values
    }
  }, [id, initData]);

  const onCreate = () => {
    if (id) {
      updateMutate(body, {
        onSuccess: () => {
          queryClient.invalidateQueries("getBrandList");
          toast.success("Cập nhật thành công!");
          onClose();
        },
      });
    } else {
      mutate(body, {
        onSuccess: () => {
          queryClient.invalidateQueries("getBrandList");
          toast.success("Thêm thành công!");
          onClose();
        },
      });
    }
  };

  return (
    <Dialog onClose={onClose}>
      <h2 style={{ textAlign: "center" }}>
        {id ? "CHỈNH SỬA" : "THÊM"} THƯƠNG HIỆU
      </h2>
      {initLoading ? (
        <p>Đang tải...</p>
      ) : (
        <Form
          form={form}
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
          <Form.Item label="Tên" name="brandName">
            <Input
              value={body.brandName}
              onChange={(e) => setBody({ ...body, brandName: e.target.value })}
            />
          </Form.Item>

          <Form.Item label="Link" name="brandUrl">
            <Input
              value={body.brandUrl}
              onChange={(e) => setBody({ ...body, brandUrl: e.target.value })}
            />
          </Form.Item>

          <Form.Item label="Logo" name="brandLogo">
            <Input
              value={body.brandLogo}
              onChange={(e) => setBody({ ...body, brandLogo: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 7,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading || updateLoading}
            >
              {id ? "Cập nhật" : "Thêm"}
            </Button>
          </Form.Item>
        </Form>
      )}
    </Dialog>
  );
};

export default AddBranch;
