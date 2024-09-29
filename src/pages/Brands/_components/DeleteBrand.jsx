import React from "react";
import ConfirmDialog from "../../../components/confirm/ConfirmDialog";
import { useQueryClient } from "react-query";
import { useDeleteBrand } from "../../../hooks/useBrandApi";
import toast from "react-hot-toast";

const DeleteBrand = ({ id, onClose }) => {
  const queryClient = useQueryClient();

  const { isLoading: deleteLoading, mutate } = useDeleteBrand(id);

  const OnDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries("getBrandList");
        toast.success("Xóa thành công!");
        onClose();
      },
    });
  };

  return (
    <ConfirmDialog
      content={"Bạn chắc chứ?"}
      onConfirmed={OnDelete}
      title={"Xóa thương hiệu này"}
      onClose={onClose}
      isLoading={deleteLoading}
    />
  );
};

export default DeleteBrand;
