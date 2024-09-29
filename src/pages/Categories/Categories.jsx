import React, { useMemo, useState } from "react";
import GradientButton from "../../components/button/GradientButton";
import CustomTable from "../../components/table";
import { useGetCategoryList } from "../../hooks/useCategoryApi";
import useDialog from "../../hooks/useDialog";
import AddCategory from "./_components/AddCategory";
import DeleteCategory from "./_components/DeleteCategory";
import DetailCategory from "./_components/DetailCategory";
import { Input } from "antd";

const columns = [
  {
    title: "Mã",
    dataIndex: "categoryCode",
    key: "categoryCode",
    sorter: (a, b) => a.categoryCode.localeCompare(b.categoryCode),
  },
  {
    title: "Tên danh mục",
    dataIndex: "categoryName",
    key: "categoryName",
    sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
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

const Categories = () => {
  const [selectedDetail, setSelectedDetail] = useState(null);
  const { data = [], isLoading } = useGetCategoryList({ PageSize: 99999999 });
  const [searchText, setSearchText] = useState("");

  // dialog state
  const { isShow: openDetail, toggleDialog: toggleDetail } = useDialog();
  const { isShow: openAddDialog, toggleDialog: toggleAddDialog } = useDialog();
  const { isShow: openDelete, toggleDialog: toggleDelete } = useDialog();
  const { isShow: openUpdate, toggleDialog: toggleUpdate } = useDialog();

  const dataSource = useMemo(() => {
    return data
      .filter((item) =>
        item.categoryCode.toLowerCase().includes(searchText.toLowerCase()) ||
        item.categoryName.toLowerCase().includes(searchText.toLowerCase())
      )
      .map((item) => ({
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
  }, [data, searchText]);

  return (
    <div>
      <GradientButton
        label="Thêm danh mục"
        onClick={toggleAddDialog}
        style={{ marginBottom: "20px" }}
      />
      <Input
        placeholder="Tìm kiếm danh mục..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <CustomTable
        columns={columns}
        data={dataSource}
        onRowClick={(r) => {
          setSelectedDetail(r.id);
          toggleDetail();
        }}
        isLoading={isLoading}
      />
      {openAddDialog && <AddCategory onClose={toggleAddDialog} />}
      {openDetail && (
        <DetailCategory
          id={selectedDetail}
          onClose={() => {
            setSelectedDetail(null);
            toggleDetail();
          }}
        />
      )}
      {openUpdate && (
        <AddCategory
          id={selectedDetail}
          onClose={() => {
            toggleUpdate();
            setSelectedDetail(null);
          }}
        />
      )}
      {openDelete && (
        <DeleteCategory
          id={selectedDetail}
          onClose={() => {
            toggleDelete();
            setSelectedDetail(null);
          }}
        />
      )}
    </div>
  );
};

export default Categories;