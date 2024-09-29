import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import Dialog from "../../../components/dialog";
import {
  useCreateDosage,
  useGetDosageById,
  useUpdateDosage,
} from "../../../hooks/useDosageApi";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";
const AddDosage = ({ onClose, id }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [body, setBody] = useState({ formName: "" });

  // API: CREATE DOSAGE FORM
  const { mutate: createMutate, isLoading: createLoading } = useCreateDosage();

  // API: UPDATE DOSAGE FORM
  const { mutate: updateMutate, isLoading: updateLoading } =
    useUpdateDosage(id);

  // API: GET DETAIL OF DOSAGE FORM
  const { data: initData, isLoading: initLoading } = useGetDosageById(id);

  useEffect(() => {
    if (initData && id) {
      setBody(initData);
      form.setFieldsValue(initData);
    }
  }, [initData, id]);

  const OnSubmit = () => {
    if (id) {
      updateMutate(body, {
        onSuccess: () => {
          queryClient.invalidateQueries("getDosageList");
          toast.success("Cập nhật thành công!");
          onClose();
        },
      });
    } else {
      createMutate(body, {
        onSuccess: () => {
          queryClient.invalidateQueries("getDosageList");
          toast.success("Thêm thành công!");
          onClose();
        },
      });
    }
  };

  return (
    <Dialog onClose={onClose}>
      <h2 style={{ textAlign: "center" }}>
        {id ? "CHỈNH SỬA" : "THÊM"} DẠNG BÀO CHẾ
      </h2>
      {initLoading ? (
        <p>Đang tải...</p>
      ) : (
        <Form
          onFinish={OnSubmit}
          form={form}
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
          <Form.Item label="Tên" name="formName">
            <Input
              onChange={(e) => setBody({ ...body, formName: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 7,
            }}
          >
            <Button type="primary" htmlType="submit" loading={createLoading || updateLoading}>
              {id ? "Cập nhật" : "Thêm"}
            </Button>
          </Form.Item>
        </Form>
      )}
    </Dialog>
  );
};

export default AddDosage;
