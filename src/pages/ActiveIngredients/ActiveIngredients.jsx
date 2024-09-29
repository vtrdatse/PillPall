import React, { useMemo, useState } from "react";
import GradientButton from "../../components/button/GradientButton";
import CustomTable from "../../components/table";
import { useGetActiveIngredientList } from "../../hooks/useActiveIngredientApi";
import useDialog from "../../hooks/useDialog";
import AddActiveIngredient from "./_components/AddActiveIngredient";
import DeleteActiveIngredient from "./_components/DeleteActiveIngredient";
import DetailActiveIngredient from "./_components/DetailActiveIngredient";
import { Input } from "antd";

const columns = [
  {
    title: "Mã",
    dataIndex: "ingredientCode",
    key: "ingredientCode",
    sorter: (a, b) => a.ingredientCode.localeCompare(b.ingredientCode),
  },
  {
    title: "Tên hoạt chất",
    dataIndex: "ingredientName",
    key: "ingredientName",
    sorter: (a, b) => a.ingredientName.localeCompare(b.ingredientName),
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

const ActiveIngredients = () => {
  const [detailSelected, setDetailSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Add state for search query

  // API get list
  const { isLoading, data = [] } = useGetActiveIngredientList({
    PageSize: 99999999,
  });

  // Dialog state
  const { isShow: openDetail, toggleDialog: toggleDetail } = useDialog();
  const { isShow: openAddDialog, toggleDialog: toggleAddDialog } = useDialog();
  const { isShow: openDelete, toggleDialog: toggleDelete } = useDialog();
  const { isShow: openUpdate, toggleDialog: toggleUpdate } = useDialog();

  // Filtered data based on search query
  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.ingredientCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredientName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const dataSource = useMemo(() => {
    return filteredData.map((item) => ({
      ...item,
      edit: (
        <GradientButton
          label={"Chỉnh sửa"}
          onClick={(e) => {
            e.stopPropagation();
            setDetailSelected(item.id);
            toggleUpdate();
          }}
          type={"warning"}
        />
      ),
      delete: (
        <GradientButton
          label={"Xóa"}
          onClick={(e) => {
            e.stopPropagation();
            setDetailSelected(item.id);
            toggleDelete();
          }}
          type={"danger"}
        />
      ),
    }));
  }, [filteredData]);

  return (
    <div>
      <GradientButton
        label={"Thêm thành phần hoạt chất"}
        onClick={toggleAddDialog}
        style={{ marginBottom: "20px" }}
      />

      {/* Search Input */}
      <Input
        type="text"
        placeholder="Tìm kiếm hoạt chất..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
      />

      <CustomTable
        columns={columns}
        data={dataSource}
        onRowClick={(r) => {
          setDetailSelected(r.id);
          toggleDetail();
        }}
        isLoading={isLoading}
      />

      {openAddDialog && <AddActiveIngredient onClose={toggleAddDialog} />}
      {openDetail && (
        <DetailActiveIngredient
          id={detailSelected}
          onClose={() => {
            setDetailSelected(null);
            toggleDetail();
          }}
        />
      )}
      {openUpdate && (
        <AddActiveIngredient
          onClose={() => {
            toggleUpdate();
            setDetailSelected(null);
          }}
          id={detailSelected}
        />
      )}
      {openDelete && (
        <DeleteActiveIngredient
          id={detailSelected}
          onClose={() => {
            toggleDelete();
            setDetailSelected(null);
          }}
        />
      )}
    </div>
  );
};

export default ActiveIngredients;