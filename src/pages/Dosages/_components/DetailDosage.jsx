import React from "react";
import Dialog from "../../../components/dialog";
import { useGetDosageById } from "../../../hooks/useDosageApi";

const DetailDosage = ({ id, onClose }) => {
  const { isLoading, data } = useGetDosageById(id);

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
          <h3 style={{ fontSize: "24px" }}>Chi tiết Dạng bào chế</h3>
          <p>Tên Liều lượng: {data?.formName}</p>
        </div>
      )}
    </Dialog>
  );
};

export default DetailDosage;
