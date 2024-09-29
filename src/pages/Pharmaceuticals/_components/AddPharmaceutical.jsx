import React, { useEffect, useMemo, useState } from "react";
import Dialog from "../../../components/dialog";
import { Button, Form, Input, Select } from "antd";
import {
  useCreatePharmaceutical,
  useGetPharmaceuticalById,
  useUpdatePharmaceutical,
} from "../../../hooks/usePharmaceutialApi";
import { useGetNationList } from "../../../hooks/useNationApi";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";

const AddPharmaceutical = ({ onClose, id }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  // API: GET NATION LIST
  const { data: nationData = [], isLoading: nationLoading } = useGetNationList({
    PageSize: 9999999,
  });

  // API: CREATE PHARMACEUTICAL COMPANY
  const { mutate: createMutate, isLoading: createLoading } =
    useCreatePharmaceutical();

  // API: GET DETAIL PHARMACEUTICAL COMPANY
  const { data: initData, isLoading: initLoading } =
    useGetPharmaceuticalById(id);

  // API: UPDATE PHARMACEUTICAL COMPANY
  const { mutate: updateMutate, isLoading: updateLoading } =
    useUpdatePharmaceutical(id);

  const nationOption = useMemo(() => {
    return nationData.map((nation) => ({
      value: nation.id,
      label: nation.nationName,
    }));
  }, [nationData]);

  useEffect(() => {
    if (initData && id) {
      form.setFieldsValue({
        companyName: initData.companyName,
        nationId: initData.nation.id,
      });
    }
  }, [initData, id, form]);

  const OnSubmit = (values) => {
    if (id) {
      updateMutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries("getPharmaceuticalList");
          toast.success("Cập nhật thành công!");
          onClose();
        },
      });
    } else {
      createMutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries("getPharmaceuticalList");
          toast.success("Thêm thành công!");
          onClose();
        },
      });
    }
  };

  return (
    <Dialog onClose={onClose}>
      <h2 style={{ textAlign: "center" }}>
        {id ? "CHỈNH SỬA" : "THÊM"} CÔNG TY DƯỢC PHẨM
      </h2>
      <Form
        form={form}
        onFinish={OnSubmit}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{
          textAlign: "center",
          margin: "20px",
          paddingLeft: "20px",
        }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Tên công ty"
          name="companyName"
          rules={[{ required: true, message: "Không bỏ trống!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Quốc gia"
          name="nationId"
          rules={[{ required: true, message: "Vui lòng chọn!" }]}
        >
          <Select style={{ width: "100%" }} options={nationOption} />
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

export default AddPharmaceutical;
