import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import Dialog from "../../../components/dialog";
import {
  useCreateNation,
  useGetNationById,
  useUpdateNation,
} from "../../../hooks/useNationApi";
const AddNation = ({ onClose, id = null }) => {
  const queryClient = useQueryClient();

  // API: CREATE NATION
  const { mutate: createMutate, isLoading: createLoading } = useCreateNation();

  // API: UPDATE NATION
  const { mutate: updateMutate, isLoading: updateLoading } =
    useUpdateNation(id);

  // API: GET DETAIL NATION
  const { data: initData, isLoading: initLoading } = useGetNationById(id);

  const [form] = Form.useForm();
  const [body, setBody] = useState({
    nationCode: "",
    nationName: "",
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
          queryClient.invalidateQueries("getNationList");
          toast.success("Cập nhật thành công!");
          onClose();
        },
      });
    } else {
      createMutate(body, {
        onSuccess: () => {
          queryClient.invalidateQueries("getNationList");
          toast.success("Thêm thành công!");
          onClose();
        },
      });
    }
  };

  return (
    <Dialog onClose={onClose}>
      <h2 style={{ textAlign: "center" }}>
        {id ? "CHỈNH SỬA" : "THÊM"} QUỐC GIA
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
        {/* <Form.Item label="Mã" name="nationCode" style={{ width: "100%" }}>
          <Input
            onChange={(e) => setBody({ ...body, nationCode: e.target.value })}
            style={{ width: "100%" }}
          />
        </Form.Item> */}
        <Form.Item label="Tên quốc gia" name="nationName">
          <Input
            onChange={(e) => setBody({ ...body, nationName: e.target.value })}
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

export default AddNation;
