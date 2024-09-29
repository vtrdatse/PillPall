import React from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import ConfirmDialog from "../../../components/confirm/ConfirmDialog";
import { useDeleteTos } from "../../../hooks/useTos";

const DeleteTos = ({ id, onClose }) => {
  const queryClient = useQueryClient();
  const { isLoading: deleteLoading, mutate } = useDeleteTos(id);
  const OnDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries("getTosList");
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

export default DeleteTos;
