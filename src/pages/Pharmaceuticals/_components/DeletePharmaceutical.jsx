import React from "react";
import { useQueryClient } from "react-query";
import ConfirmDialog from "../../../components/confirm/ConfirmDialog";
import { useDeletePharmaceutical } from "../../../hooks/usePharmaceutialApi";
import toast from "react-hot-toast";

const DeletePharmaceutical = ({ id, onClose }) => {
  const queryClient = useQueryClient();

  const { isLoading: deleteLoading, mutate } = useDeletePharmaceutical(id);

  const OnDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries("getPharmaceuticalList");
        toast.success("Xóa thành công!");
        onClose();
      },
    });
  };

  return (
    <ConfirmDialog
      content={"Bạn chắc chứ?"}
      onConfirmed={OnDelete}
      title={"Xóa công ty dược phẩm này"}
      onClose={onClose}
      isLoading={deleteLoading}
    />
  );
};

export default DeletePharmaceutical;
