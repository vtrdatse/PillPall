import React from "react";
import Dialog from "../../../components/dialog";
import { useGetSpecificationById } from "../../../hooks/useSpecificationApi";

const DetailSpecification = ({ id, onClose }) => {
  const { isLoading, data } = useGetSpecificationById(id);

  return (
    <Dialog onClose={onClose}>
      {isLoading ? (
        <p>Đang tải...</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ fontSize: "24px" }}>CHI TIẾT QUY CÁCH ĐÓNG GÓI</h3>

          <p>Quy cách đóng gói: {data?.typeName}</p>
          <p>Ghi chú: {data?.detail}</p>
        </div>
      )}
    </Dialog>
  );
};

export default DetailSpecification;
