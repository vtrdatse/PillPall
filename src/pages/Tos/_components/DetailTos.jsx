import React from "react";
import Dialog from "../../../components/dialog";
import { useGetTosById } from "../../../hooks/useTos";
import { Descriptions, Spin } from "antd";
import { dateTimeFormat } from "../../../utils/time";

const DetailTos = ({ id, onClose }) => {
  const { data, isLoading } = useGetTosById(id);
  const labelStyle = { fontWeight: 'bold', color: '#000' };
  const contentStyle = { color: '#555' };

  return (
    <Dialog onClose={onClose} style={{ margin: 500 }}>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <div style={{ padding: 20 }}>
          <Descriptions title="Điều khoản dịch vụ" bordered>
            <Descriptions.Item label="Tiêu đề" labelStyle={labelStyle} contentStyle={contentStyle} span={3}>
              {data?.title}
            </Descriptions.Item>
            <Descriptions.Item label="Nội dung" labelStyle={labelStyle} contentStyle={contentStyle} span={3}>
              {data?.content}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo" layout="vertical" labelStyle={labelStyle} contentStyle={contentStyle} span={{ xl: 2, xxl: 2 }}>
              {dateTimeFormat(data?.createdAt)}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật" layout="vertical" labelStyle={labelStyle} contentStyle={contentStyle} >
              {dateTimeFormat(data?.updatedAt)}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Dialog>
  );
};

export default DetailTos;
