import { Descriptions, Spin } from "antd";
import React from "react";
import Dialog from "../../../components/dialog";
import { useGetCustomerById } from "../../../hooks/useCustomerApi";
import { dateTimeFormat } from "../../../utils/time";


const DetailCustomer = ({ id, onClose }) => {
  const { isLoading, data } = useGetCustomerById(id);
  const labelStyle = { fontWeight: 'bold', color: '#000' };
  const contentStyle = { color: '#555' };

  return (
    <Dialog onClose={onClose}>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <div style={{ padding: 20 }}>
          <Descriptions title="Thông tin khách hàng" bordered>
            <Descriptions.Item label="Mã khách hàng" labelStyle={labelStyle} contentStyle={contentStyle}>
              {data?.customerCode}
            </Descriptions.Item>
            <Descriptions.Item label="Username" labelStyle={labelStyle} contentStyle={contentStyle}>
              {data?.applicationUser.userName}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại" labelStyle={labelStyle} contentStyle={contentStyle}>
              {data?.applicationUser.phoneNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Email" labelStyle={labelStyle} contentStyle={contentStyle}>
              {data?.applicationUser.email}
            </Descriptions.Item>
            <Descriptions.Item label="Sinh nhật" labelStyle={labelStyle} contentStyle={contentStyle}>
              {dateTimeFormat(data?.dob)}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ" labelStyle={labelStyle} contentStyle={contentStyle}>
              {data?.address}
            </Descriptions.Item>
            <Descriptions.Item label="Gói đăng ký" labelStyle={labelStyle} contentStyle={contentStyle} span={3}>
              {data?.customerPackage}
            </Descriptions.Item>
            <Descriptions.Item label="Sáng" labelStyle={labelStyle} contentStyle={contentStyle}>
              {data?.breakfastTime}
            </Descriptions.Item>
            <Descriptions.Item label="Trưa" labelStyle={labelStyle} contentStyle={contentStyle}>
              {data?.lunchTime}
            </Descriptions.Item>
            <Descriptions.Item label="Chiều" labelStyle={labelStyle} contentStyle={contentStyle}>
              {data?.afternoonTime}
            </Descriptions.Item>
            <Descriptions.Item label="Tối" labelStyle={labelStyle} contentStyle={contentStyle}>
              {data?.dinnerTime}
            </Descriptions.Item>
            <Descriptions.Item label="Hẹn báo trước" labelStyle={labelStyle} contentStyle={contentStyle}>
              {data?.mealTimeOffset} phút
            </Descriptions.Item>
            <Descriptions.Item label="Số lần khóa" labelStyle={labelStyle} contentStyle={contentStyle}>
              {data?.lockoutCount}
            </Descriptions.Item>
            <Descriptions.Item label="Lần cuối khóa" labelStyle={labelStyle} contentStyle={contentStyle}>
              {dateTimeFormat(data?.applicationUser.lockoutEnd !== undefined && data?.applicationUser.lockoutEnd !== null ? data.applicationUser.lockoutEnd : "N/A")}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Dialog>
  );
};

export default DetailCustomer;
