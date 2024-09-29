import React from "react";
import { useQueryClient } from "react-query";
import ConfirmDialog from "../../../components/confirm/ConfirmDialog";
import { useDeleteDosage } from "../../../hooks/useDosageApi";
import toast from "react-hot-toast";

const DeleteDosage = ({ id, onClose }) => {
  const queryClient = useQueryClient();
  const { isLoading: deleteLoading, mutate } = useDeleteDosage(id);

  const OnDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        toast.success("Xóa thành công!");
        queryClient.invalidateQueries("getDosageList");
        onClose();
      },
    });
  };

  return (
    <ConfirmDialog
      content={"Bạn chắc chứ?"}
      onConfirmed={OnDelete}
      title={"Xóa dạng bào chế này"}
      onClose={onClose}
      isLoading={deleteLoading}
    />
  );
};

export default DeleteDosage;
