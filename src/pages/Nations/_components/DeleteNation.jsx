import React from "react";
import { useQueryClient } from "react-query";
import { useDeleteNation } from "../../../hooks/useNationApi";
import ConfirmDialog from "../../../components/confirm/ConfirmDialog";
import toast from "react-hot-toast";

const DeleteNation = ({ id, onClose }) => {
  const queryClient = useQueryClient();
  const { isLoading: deleteLoading, mutate } = useDeleteNation(id);
  const OnDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries("getNationList");
        toast.success("Xóa thành công!");
        onClose();
      },
    });
  };
  return (
    <ConfirmDialog
      content={"Bạn chắc chứ?"}
      onConfirmed={OnDelete}
      title={"Xóa quốc gia này"}
      onClose={onClose}
      isLoading={deleteLoading}
    />
  );
};

export default DeleteNation;
