import React from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import ConfirmDialog from "../../../components/confirm/ConfirmDialog";
import { useDeleteMedicine } from "../../../hooks/useMedicineApi";

const DeleteMedicine = ({ id, onClose }) => {
  const queryClient = useQueryClient();
  const { isLoading: deleteLoading, mutate } = useDeleteMedicine(id);
  const OnDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries("getListMedicine");
        toast.success("Xóa thành công!");
        onClose();
      },
    });
  };
  return (
    <ConfirmDialog
      content={"Bạn chắc chứ?"}
      onConfirmed={OnDelete}
      title={"Xóa thuốc này"}
      onClose={onClose}
      isLoading={deleteLoading}
    />
  );
};

export default DeleteMedicine;
