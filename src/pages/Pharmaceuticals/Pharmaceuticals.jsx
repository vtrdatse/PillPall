import React, { useMemo, useState } from "react";
import GradientButton from "../../components/button/GradientButton";
import CustomTable from "../../components/table";
import useDialog from "../../hooks/useDialog";
import { useGetPharmaceuticalList } from "../../hooks/usePharmaceutialApi";
import AddPharmaceutical from "./_components/AddPharmaceutical";
import DeletePharmaceutical from "./_components/DeletePharmaceutical";
import DetailPharmaceutical from "./_components/DetailPharmaceutical";
import { Input } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const columns = [
  {
    title: "Tên công ty",
    dataIndex: "companyName",
    key: "companyName",
    sorter: (a, b) => a.companyName.localeCompare(b.companyName),
  },
  {
    title: "Quốc gia",
    dataIndex: "nation",
    key: "nation",
    sorter: (a, b) => a.nation.localeCompare(b.nation),
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

const Pharmaceuticals = () => {
  const [selectedPharmaceutical, setSelectedPharmaceutical] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Add state for search query
  const history = useHistory();

  // Api get pharmaceutical list
  const { data = [], isLoading } = useGetPharmaceuticalList({
    PageSize: 99999999,
  });

  // dialog state
  const { isShow: openDetail, toggleDialog: toggleDetail } = useDialog();
  const { isShow: openAddDialog, toggleDialog: toggleAddDialog } = useDialog();
  const { isShow: openDelete, toggleDialog: toggleDelete } = useDialog();
  const { isShow: openUpdate, toggleDialog: toggleUpdate } = useDialog();

  // Filtered data based on search query
  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nation.nationName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const dataSource = useMemo(() => {
    return filteredData.map((item) => ({
      ...item,
      nation: item.nation.nationName,
      edit: (
        <GradientButton
          label={"Chỉnh sửa"}
          type={"warning"}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedPharmaceutical(item.id);
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
            setSelectedPharmaceutical(item.id);
            toggleDelete();
          }}
        />
      ),
    }));
  }, [filteredData]);

  return (
    <div>
      <GradientButton
        label={"Thêm công ty dược phẩm"}
        onClick={toggleAddDialog}
        style={{ marginBottom: "20px" }}
      />

      {/* Search Input */}
      <Input
        type="text"
        placeholder="Tìm kiếm công ty dược phẩm..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
      />

      <CustomTable
        columns={columns}
        data={dataSource}
        isLoading={isLoading}
        onRowClick={(r) => {
          history.push(`/pharmaceuticals/${r.id}`);
        }}
      />

      {openDetail && (
        <DetailPharmaceutical
          id={selectedPharmaceutical}
          onClose={() => {
            setSelectedPharmaceutical(null);
            toggleDetail();
          }}
        />
      )}
      {openAddDialog && <AddPharmaceutical onClose={toggleAddDialog} />}
      {openUpdate && (
        <AddPharmaceutical
          id={selectedPharmaceutical}
          onClose={() => {
            toggleUpdate();
            setSelectedPharmaceutical(null);
          }}
        />
      )}
      {openDelete && (
        <DeletePharmaceutical
          id={selectedPharmaceutical}
          onClose={() => {
            toggleDelete();
            setSelectedPharmaceutical(null);
          }}
        />
      )}
    </div>
  );
};

export default Pharmaceuticals;