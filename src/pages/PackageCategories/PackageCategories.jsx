import React, { useMemo, useState } from "react";
import GradientButton from "../../components/button/GradientButton";
import CustomTable from "../../components/table";
import useDialog from "../../hooks/useDialog";
import { useGetPackageCategoryList } from "../../hooks/usePackageCategoryApi";
import AddPackageCategory from "./_components/AddPackageCategory";
import DeletePackageCategory from "./_components/DeletePackageCategory";
import PackageCategoryDetail from "./_components/PackageCategoryDetail";
import { dateTimeFormat } from "../../utils/time";
import { vndFormat } from "../../utils/price-vnd";
import { Input } from "antd";

const columns = [
  {
    title: "Tên gói",
    dataIndex: "packageName",
    key: "packageName",
    sorter: (a, b) => a.packageName.localeCompare(b.packageName),
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
    sorter: (a, b) => a.price.localeCompare(b.price),
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updatedAt",
    key: "updatedAt",
    sorter: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
  },
  {
    title: "",
    dataIndex: "edit",
    key: "edit",
  },
  {
    title: "",
    dataIndex: "delete",
    key: "delete",
  },
];

const PackageCategories = () => {
  const [selected, setSelected] = useState(null);
  const [searchText, setSearchText] = useState("");
  const { isShow: showDetail, toggleDialog: toggleDetail } = useDialog();
  const { isShow: showUpdate, toggleDialog: toggleUpdate } = useDialog();
  const { isShow: showDelete, toggleDialog: toggleDelete } = useDialog();

  const { data = [], isLoading } = useGetPackageCategoryList();

  const dataSource = useMemo(() => {
    return data
      .filter((item) =>
        item.packageName.toLowerCase().includes(searchText.toLowerCase())
      )
      .map((i) => ({
        ...i,
        price: vndFormat(i.price),
        createdAt: dateTimeFormat(i.createdAt),
        updatedAt: dateTimeFormat(i.updatedAt),
        edit: (
          <GradientButton
            label={"Chỉnh sửa"}
            type="warning"
            onClick={(e) => {
              e.stopPropagation();
              setSelected(i.id);
              toggleUpdate();
            }}
          />
        ),
        delete: (
          <GradientButton
            type={"danger"}
            label={"Xóa"}
            onClick={(e) => {
              e.stopPropagation();
              toggleDelete();
              setSelected(i.id);
            }}
          />
        ),
      }));
  }, [data, searchText]);

  return (
    <>
      <GradientButton
        label={"Thêm danh mục gói"}
        onClick={toggleUpdate}
        style={{ marginBottom: "20px" }}
      />
      <Input
        placeholder="Tìm kiếm gói..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <CustomTable
        columns={columns}
        data={dataSource}
        isLoading={isLoading}
        onRowClick={(r) => {
          setSelected(r.id);
          toggleDetail();
        }}
      />

      {showDetail && selected && (
        <PackageCategoryDetail
          id={selected}
          onClose={() => {
            toggleDetail();
            setSelected(null);
          }}
        />
      )}

      {showUpdate && <AddPackageCategory onClose={toggleUpdate} />}

      {showUpdate && selected && (
        <AddPackageCategory
          onClose={() => {
            toggleUpdate();
            setSelected(null);
          }}
          id={selected}
        />
      )}

      {showDelete && selected && (
        <DeletePackageCategory
          id={selected}
          onClose={() => {
            toggleDelete();
            setSelected(null);
          }}
        />
      )}
    </>
  );
};

export default PackageCategories;