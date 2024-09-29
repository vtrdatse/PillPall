import React, { useMemo } from "react";
import { useGetManagerList } from "../../hooks/useManagerApi";
import CustomTable from "../../components/table";
import GradientButton from "../../components/button/GradientButton";
import { dateTimeFormat } from "../../utils/time";
import useDialog from "../../hooks/useDialog";
import AddManager from "./_components/AddManager";

const columns = [
  {
    title : "ID",
    dataIndex : "id",
    key : "id",
  },
  {
    title: "Username",
    dataIndex: "userName",
    key: "userName",
    sorter: (a, b) => a.userName.localeCompare(b.userName),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
  },
];
const Managers = () => {
  const { isShow, toggleDialog } = useDialog();
  const { data = [], isLoading } = useGetManagerList();

  const isLocked = (lockoutEnd) => {
    if (!lockoutEnd) return "-";
    if (new Date(lockoutEnd) < new Date()) return "X";
    return "X";
  };

  const dataSource = useMemo(() => {
    return data.map((item) => {
      return {
        ...item,
        lockoutEnd: dateTimeFormat(item.lockoutEnd),
        lockoutEnabled: isLocked(item.lockoutEnd),
      };
    });
  }, [data]);
  return (
    <>
      <GradientButton
        label={"Thêm quản lý"}
        onClick={toggleDialog}
        style={{ marginBottom: "10px" }}
      />
      <CustomTable columns={columns} data={dataSource} isLoading={isLoading} />

      {isShow && <AddManager onClose={toggleDialog} />}
    </>
  );
};

export default Managers;
