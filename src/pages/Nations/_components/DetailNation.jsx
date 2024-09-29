import React from "react";
import Dialog from "../../../components/dialog";
import { useGetNationById } from "../../../hooks/useNationApi";

const DetailNation = ({ id, onClose }) => {
  const { isLoading, data } = useGetNationById(id);

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
          <h3 style={{ fontSize: "24px" }}>CHI TIẾT QUỐC GIA</h3>
          <p>Mã: {data?.nationCode}</p>
          <p>Quốc gia: {data?.nationName}</p>
        </div>
      )}
    </Dialog>
  );
};

export default DetailNation;
