import React from "react";
import Dialog from "../../../components/dialog";
import { useGetCategoryById } from "../../../hooks/useCategoryApi";

const DetailCategory = ({ id, onClose }) => {
  const { isLoading, data } = useGetCategoryById(id);

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
          <h3 style={{ fontSize: "24px" }}>CHI TIẾT DANH MỤC</h3>
          <p>Mã: {data?.categoryCode}</p>
          <p>Danh mục: {data?.categoryName}</p>
        </div>
      )}
    </Dialog>
  );
};

export default DetailCategory;
