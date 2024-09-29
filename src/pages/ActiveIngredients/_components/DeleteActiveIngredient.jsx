import React from "react";
import { useQueryClient } from "react-query";
import { useDeleteActiveIngredient } from "../../../hooks/useActiveIngredientApi";
import ConfirmDialog from "../../../components/confirm/ConfirmDialog";
import toast from "react-hot-toast";

const DeleteActiveIngredient = ({ id, onClose }) => {
  const queryClient = useQueryClient();

  const { isLoading: deleteLoading, mutate } = useDeleteActiveIngredient(id);

  const OnDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries("getActiveIngredientList");
        toast.success("Xóa thành công!");
        onClose();
      },
    });
  };

  return (
    <ConfirmDialog
      content={"Bạn chắc chứ?"}
      onConfirmed={OnDelete}
      title={"Xóa thành phần hoạt chất này"}
      onClose={onClose}
      isLoading={deleteLoading}
    />
  );
};

export default DeleteActiveIngredient;
