import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import Dialog from "../../../components/dialog";
import {
  useCreateActiveIngredient,
  useGetActiveIngredientById,
  useUpdateActiveIngredient,
} from "../../../hooks/useActiveIngredientApi";
import toast from "react-hot-toast";

const AddActiveIngredient = ({ onClose, id = null }) => {
  const queryClient = useQueryClient();
  const [body, setBody] = useState({
    ingredientName: "",
    ingredientInformation: "",
  });
  const [form] = Form.useForm();

  // API: CREATE ACTIVE INGREDIENT
  const { mutate, isLoading } = useCreateActiveIngredient();

  // API: UPDATE ACTIVE INGREDIENT
  const { mutate: updateMutate, isLoading: updateLoading } =
    useUpdateActiveIngredient(id);

  // API: GET ACTIVE INGREDIENT
  const { data: initData, isLoading: initLoading } =
    useGetActiveIngredientById(id);

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
          queryClient.invalidateQueries("getActiveIngredientList");
          toast.success("Cập nhật thành công!");
          onClose();
        },
      });
    } else {
      mutate(body, {
        onSuccess: () => {
          queryClient.invalidateQueries("getActiveIngredientList");
          toast.success("Thêm thành công!");
          onClose();
        },
      });
    }
  };

  return (
    <Dialog onClose={onClose}>
      <h2 style={{ textAlign: "center" }}>
        {id ? "CHỈNH SỬA" : "THÊM"} THÀNH PHẦN HOẠT CHẤT
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
          <Form.Item label="Tên" name="ingredientName">
            <Input
              onChange={(e) =>
                setBody({ ...body, ingredientName: e.target.value })
              }
            />
          </Form.Item>

          {/* <Form.Item label="Thông tin" name="ingredientInformation">
            <Input
              onChange={(e) =>
                setBody({ ...body, ingredientInformation: e.target.value })
              }
            />
          </Form.Item> */}
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 7,
            }}
          >
            <Button type="primary" htmlType="submit" loading={isLoading || updateLoading}>
              {id ? "Cập nhật" : "Thêm"}
            </Button>
          </Form.Item>
        </Form>
      )}
    </Dialog>
  );
};

export default AddActiveIngredient;
