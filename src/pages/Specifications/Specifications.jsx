import React, { useMemo, useState } from "react";
import { Input } from "antd"; // Importing Input from Ant Design
import GradientButton from "../../components/button/GradientButton";
import CustomTable from "../../components/table";
import useDialog from "../../hooks/useDialog";
import { useGetSpecificationList } from "../../hooks/useSpecificationApi";
import AddSpecification from "./_components/AddSpecification";
import DeleteSpecification from "./_components/DeleteSpecification";
import DetailSpecification from "./_components/DetailSpecification";

const columns = [
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "",
    dataIndex: "edit",
    key: "edit",
    width: 100,
  },
  {
    title: "",
    dataIndex: "delete",
    key: "delete",
    width: 100,
  },
];

const Specifications = () => {
  // API get specification list
  const { data = [], isLoading } = useGetSpecificationList({
    PageSize: 99999999,
  });

  // Dialog state
  const { isShow: openDetail, toggleDialog: toggleDetail } = useDialog();
  const { isShow: openAddDialog, toggleDialog: toggleAddDialog } = useDialog();
  const { isShow: openDelete, toggleDialog: toggleDelete } = useDialog();
  const { isShow: openUpdate, toggleDialog: toggleUpdate } = useDialog();

  const [selectedSpecification, setSelectedSpecification] = useState(null);
  const [searchText, setSearchText] = useState("");

  const dataSource = useMemo(() => {
    return data
      .filter((item) =>
        item.typeName.toLowerCase().includes(searchText.toLowerCase())
      )
      .map((item) => {
        return {
          id: item.id,
          name: item.typeName,
          description: item.detail,
          edit: (
            <GradientButton
              label={"Chỉnh sửa"}
              type={"warning"}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSpecification(item.id);
                toggleUpdate();
              }}
            />
          ),
          delete: (
            <GradientButton
              label={"Xóa"}
              type={"danger"}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSpecification(item.id);
                toggleDelete();
              }}
            />
          ),
        };
      });
  }, [data, searchText]);

  return (
    <div>
      <GradientButton
        label={"Thêm đặc tính"}
        onClick={toggleAddDialog}
        style={{ marginBottom: "20px" }}
      />
      <Input
        placeholder="Tìm kiếm quy cách đóng gói..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
      />
      <CustomTable
        columns={columns}
        data={dataSource}
        isLoading={isLoading}
        onRowClick={(r) => {
          setSelectedSpecification(r.id);
          toggleDetail();
        }}
      />
      {openAddDialog && <AddSpecification onClose={toggleAddDialog} />}
      {openDetail && (
        <DetailSpecification
          id={selectedSpecification}
          onClose={() => {
            setSelectedSpecification(null);
            toggleDetail();
          }}
        />
      )}
      {openUpdate && (
        <AddSpecification
          id={selectedSpecification}
          onClose={() => {
            setSelectedSpecification(null);
            toggleUpdate();
          }}
        />
      )}
      {openDelete && (
        <DeleteSpecification
          id={selectedSpecification}
          onClose={() => {
            toggleDelete();
            setSelectedSpecification(null);
          }}
        />
      )}
    </div>
  );
};

export default Specifications;