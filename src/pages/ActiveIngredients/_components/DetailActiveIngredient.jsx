import React from "react";
import Dialog from "../../../components/dialog";
import { useGetActiveIngredientById } from "../../../hooks/useActiveIngredientApi";
import { Descriptions } from "antd";

const DetailActiveIngredient = ({ id, onClose }) => {
  const { isLoading, data } = useGetActiveIngredientById(id);

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
          <Descriptions title="CHI TIẾT THÀNH PHẦN HOẠT CHẤT" bordered>
            <Descriptions.Item label="Mã" contentStyle={contentStyle} labelStyle={labelStyle}>
              {data?.ingredientCode}
            </Descriptions.Item>
            <Descriptions.Item label="Tên hoạt chất" contentStyle={contentStyle} labelStyle={labelStyle}>
              {data?.ingredientName}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Dialog>
  );
};

export default DetailActiveIngredient;
