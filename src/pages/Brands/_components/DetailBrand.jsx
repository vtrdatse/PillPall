import React from "react";
import Dialog from "../../../components/dialog";
import { useGetBrandById } from "../../../hooks/useBrandApi";
import { Descriptions } from "antd";

const DetailBrand = ({ id, onClose }) => {
  const { isLoading, data } = useGetBrandById(id);
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
          <Descriptions title="CHI TIẾT THƯƠNG HIỆU" bordered>
            <Descriptions.Item label="Mã thương hiệu" contentStyle={contentStyle} labelStyle={labelStyle}>
              {data?.brandCode}
            </Descriptions.Item>
            <Descriptions.Item label="Tên thương hiệu" contentStyle={contentStyle} labelStyle={labelStyle}>
              {data?.brandName}
            </Descriptions.Item>
            <Descriptions.Item label="URL " contentStyle={contentStyle} labelStyle={labelStyle}>
              {data?.brandUrl}
            </Descriptions.Item>
            <Descriptions.Item label="Logo" contentStyle={contentStyle} labelStyle={labelStyle}>
              <img
                src={data?.brandLogo}
                style={{ width: 150, margin: '20px 0px' }}
                alt="Brand Logo"
              />
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Dialog>
  );
};

export default DetailBrand;
