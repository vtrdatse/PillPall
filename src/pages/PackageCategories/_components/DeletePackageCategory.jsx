import React from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import ConfirmDialog from "../../../components/confirm/ConfirmDialog";
import { useDeletePackageCategory } from "../../../hooks/usePackageCategoryApi";

const DeletePackageCategory = ({ id, onClose }) => {
  const queryClient = useQueryClient();
  const { isLoading: deleteLoading, mutate } = useDeletePackageCategory(id);
  const OnDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries("getPackageCategoryList");
        toast.success("Xóa thành công!");
        onClose();
      },
    });
  };
  return (
    <ConfirmDialog
      content={"Bạn chắc chứ?"}
      onConfirmed={OnDelete}
      title={"Xóa gói này!"}
      onClose={onClose}
      isLoading={deleteLoading}
    />
  );
};

export default DeletePackageCategory;
