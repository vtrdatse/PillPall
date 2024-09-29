import React from "react";
import { useQueryClient } from "react-query";
import { useDeleteCategory } from "../../../hooks/useCategoryApi";
import ConfirmDialog from "../../../components/confirm/ConfirmDialog";
import toast from "react-hot-toast";

const DeleteCategory = ({ id, onClose }) => {
  const queryClient = useQueryClient();
  const { isLoading: deleteLoading, mutate } = useDeleteCategory(id);
  const OnDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries("getCategoryList");
        toast.success("Xóa thành công!");
        onClose();
      },
    });
  };
  return (
    <ConfirmDialog
      content={"Bạn chắc chứ?"}
      onConfirmed={OnDelete}
      title={"Xóa danh mục này"}
      onClose={onClose}
      isLoading={deleteLoading}
    />
  );
};

export default DeleteCategory;
