import React from "react";
import { useQueryClient } from "react-query";
import { useDeleteSpecification } from "../../../hooks/useSpecificationApi";
import ConfirmDialog from "../../../components/confirm/ConfirmDialog";
import toast from "react-hot-toast";

const DeleteSpecification = ({ id, onClose }) => {
  const queryClient = useQueryClient();
  const { isLoading: deleteLoading, mutate } = useDeleteSpecification(id);
  const OnDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries("getSpecificationList");
        toast.success("Xóa thành công!");
        onClose();
      },
    });
  };

  return (
    <ConfirmDialog
      content={"Bạn chắc chứ?"}
      onConfirmed={OnDelete}
      title={"Xóa quy cách đóng gói này"}
      onClose={onClose}
      isLoading={deleteLoading}
    />
  );
};

export default DeleteSpecification;
