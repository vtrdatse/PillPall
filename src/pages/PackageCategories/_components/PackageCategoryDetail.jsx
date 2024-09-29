import React from "react";
import Dialog from "../../../components/dialog";
import { useGetPackageCategoryById } from "../../../hooks/usePackageCategoryApi";
import { dateTimeFormat } from "../../../utils/time";
import { vndFormat } from "../../../utils/price-vnd";
import { Descriptions } from "antd";

const PackageCategoryDetail = ({ id, onClose }) => {
  const { isLoading, data } = useGetPackageCategoryById(id);
  const labelStyle = { fontWeight: 'bold', color: '#000' };
  const contentStyle = { color: '#555' };

  return (
    <Dialog onClose={onClose}>
      {isLoading ? (
        <p>Đang tải...</p>
      ) : (
        <div
          style={{
            padding: 20,
          }}
        >
          <Descriptions title="CHI TIẾT DANH MỤC GÓI" bordered>
            <Descriptions.Item label="Tên gói" contentStyle={contentStyle} labelStyle={labelStyle}>
              {data?.packageName}
            </Descriptions.Item>
            <Descriptions.Item label="Chi tiết" contentStyle={contentStyle} labelStyle={labelStyle}>
              {data?.packageDescription}
            </Descriptions.Item>
            <Descriptions.Item label="Thời hạn gói" contentStyle={contentStyle} labelStyle={labelStyle}>
              {data?.packageDuration} ngày
            </Descriptions.Item>
            <Descriptions.Item label="Giá" contentStyle={contentStyle} labelStyle={labelStyle}>
              {vndFormat(data?.price)}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo" contentStyle={contentStyle} labelStyle={labelStyle}>
              {dateTimeFormat(data?.createdAt)}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật" contentStyle={contentStyle} labelStyle={labelStyle}>
              {dateTimeFormat(data?.updatedAt)}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Dialog>
  );
};

export default PackageCategoryDetail;
