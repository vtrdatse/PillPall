import React, { useMemo, useState } from "react";
import GradientButton from "../../components/button/GradientButton";
import CustomTable from "../../components/table";
import useDialog from "../../hooks/useDialog";
import { useGetDosageList } from "../../hooks/useDosageApi";
import AddDosage from "./_components/AddDosage";
import DeleteDosage from "./_components/DeleteDosage";
import DetailDosage from "./_components/DetailDosage";
import { Input } from "antd";

const columns = [
  {
    title: "Tên",
    dataIndex: "formName",
    key: "formName",
    sorter: (a, b) => a.formName.localeCompare(b.formName),
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

const Dosages = () => {
  // Api get dosage list
  const { data = [], isLoading } = useGetDosageList({ PageSize: 99999999 });

  // dialog state
  const { isShow: openDetail, toggleDialog: toggleDetail } = useDialog();
  const { isShow: openAddDialog, toggleDialog: toggleAddDialog } = useDialog();
  const { isShow: openDelete, toggleDialog: toggleDelete } = useDialog();
  const { isShow: openUpdate, toggleDialog: toggleUpdate } = useDialog();

  const [selectedDetail, setSelectedDetail] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Add state for search query

  // Filtered data based on search query
  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.formName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const dataSource = useMemo(() => {
    return filteredData.map((item) => ({
      ...item,
      edit: (
        <GradientButton
          label="Chỉnh sửa"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedDetail(item.id);
            toggleUpdate();
          }}
          type="warning"
        />
      ),
      delete: (
        <GradientButton
          label="Xóa"
          type="danger"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedDetail(item.id);
            toggleDelete();
          }}
        />
      ),
    }));
  }, [filteredData]);

  return (
    <div>
      <GradientButton
        label="Thêm liều lượng"
        onClick={toggleAddDialog}
        type={"primary"}
        style={{ marginBottom: "20px" }}
      />

      {/* Search Input */}
      <Input
        type="text"
        placeholder="Tìm kiếm dạng bào chế..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
      />

      <CustomTable
        data={dataSource}
        columns={columns}
        onRowClick={(row) => {
          setSelectedDetail(row.id);
          toggleDetail();
        }}
        isLoading={isLoading}
      />

      {openAddDialog && <AddDosage onClose={toggleAddDialog} />}
      {openDetail && (
        <DetailDosage
          id={selectedDetail}
          onClose={() => {
            setSelectedDetail(null);
            toggleDetail();
          }}
        />
      )}
      {openDelete && (
        <DeleteDosage
          id={selectedDetail}
          onClose={() => {
            toggleDelete();
            setSelectedDetail(null);
          }}
        />
      )}
      {openUpdate && <AddDosage onClose={toggleUpdate} id={selectedDetail} />}
    </div>
  );
};

export default Dosages;