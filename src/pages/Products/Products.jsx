import { LeftOutlined, LoadingOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Pagination, Row, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import GradientButton from "../../components/button/GradientButton";
import ProductCard from "../../components/Cards/ProductCard/ProductCard";
import Chip from "../../components/chip/Chip";
import Loading from "../../components/loading/Loading";
import { useGetCategoryList } from "../../hooks/useCategoryApi";
import useDebounce from "../../hooks/useDebounce";
import useDialog from "../../hooks/useDialog";
import {
  useGetListMedicine,
  useImportMedicine,
} from "../../hooks/useMedicineApi";
import { cleanObject } from "../../utils/clean-object";
import AddProduct from "./_components/AddProduct";
import "./style.css";
import { useQueryClient } from "react-query";

function Products() {
  const { isShow: openAddDialog, toggleDialog: toggleAddDialog } = useDialog();

  const [searchVal, setSearchVal] = useState("");
  const [debounceVal, setDebounceVal] = useState("");
  const [page, setPage] = useState(1);
  const debounceValue = useDebounce(searchVal, 1000);
  const [categoriesFilter, setCategoriesFilter] = useState("");
  const [file, setFile] = useState(null);
  const importMedicineMutation = useImportMedicine();
  const queryClient = useQueryClient();

  useEffect(() => {
    setDebounceVal(searchVal);
  }, [debounceValue]);

  useEffect(() => {
    setPage(1);
  }, [debounceVal]);

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };

  const { data = [], isLoading } = useGetListMedicine(
    cleanObject({
      MedicineName: debounceVal,
      Page: page,
      Category: categoriesFilter,
    })
  );

  // API: GET CATEGORIES
  const { data: categoriesData = [], isLoading: isLoadingCategories } =
    useGetCategoryList({
      PageSize: 9999,
    });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      toast.error("Vui lòng chọn một tập tin!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // Use the mutation function returned by useImportMedicine
    importMedicineMutation.mutate(formData, {
      onSuccess: (response) => {
        if (response.affectedRows === 0) {
          toast.error("Dữ liệu đã tồn tại, không thể tải lên tập tin!");
          return;
        } else {
          toast.success("Tải lên tập tin thành công!");
          queryClient.invalidateQueries('getListMedicine');
          queryClient.invalidateQueries('getCategoryList');
        }
      },
      onError: () => {
        toast.error("Tải lên tập tin thất bại!");
      },
    });
  };

  // State for category pagination
  const [categoryPage, setCategoryPage] = useState(0);
  const categoriesPerPage = 18; // Number of categories to show per "page"

  const handlePrevCategory = () => {
    setCategoryPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextCategory = () => {
    setCategoryPage((prev) =>
      Math.min(prev + 1, Math.floor(categoriesData.length / categoriesPerPage))
    );
  };

  const currentCategories = categoriesData.slice(
    categoryPage * categoriesPerPage,
    (categoryPage + 1) * categoriesPerPage
  );

  // Styles for the icons
  const iconStyle = {
    fontSize: "28px",
    cursor: "pointer",
    transition: "transform 0.2s ease", // Smooth transition effect
  };

  const hoverIconStyle = {
    ...iconStyle,
    transform: "scale(3)", // Increase size by 1.5 times on hover
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;

  return (
    <>
      <div
        className="flex"
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <div className="flex" style={{ gap: "10px", alignItems: "center" }}>
          <GradientButton label="Thêm thuốc 💊" onClick={toggleAddDialog} />
          <span style={{ fontWeight: "bold", fontSize: "20px" }}> | </span>
          <form onSubmit={handleSubmit}>
            <input id="upload-file" type="file" onChange={handleFileChange} />
            <button
              type="submit"
              style={{
                backgroundColor: "#3FA2F6",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              disabled={importMedicineMutation.isLoading}
            >
              {importMedicineMutation.isLoading ? <Spin indicator={antIcon} /> : 'Tải lên 📂'}
            </button>
          </form>
        </div>
        <Input
          value={searchVal}
          style={{ width: "30%" }}
          className="header-search"
          placeholder="Tìm thuốc... "
          prefix={<SearchOutlined />}
          onChange={handleChange}
        />
      </div>

      <div className="">
        {isLoadingCategories ? (
          <Loading isPageLoading />
        ) : (
          <div
            className="categories-wrapper flex"
            style={{ position: "relative", margin: "20px 0" }}
          >
            <LeftOutlined
              onClick={handlePrevCategory}
              style={{
                ...iconStyle,
                visibility: categoryPage > 0 ? "visible" : "hidden",
              }}
              onMouseEnter={(e) =>
              (e.currentTarget.style = Object.entries(hoverIconStyle)
                .map(([key, value]) => `${key}: ${value}`)
                .join("; "))
              }
              onMouseLeave={(e) =>
              (e.currentTarget.style = Object.entries(iconStyle)
                .map(([key, value]) => `${key}: ${value}`)
                .join("; "))
              }
            />
            <div
              className="categories-container flex"
              style={{
                display: "flex",
                gap: "5px",
                flexWrap: "wrap",
                justifyContent: "center",
                margin: "0 20px",
              }}
            >
              {currentCategories.map((category, index) => (
                <div key={index}>
                  <Chip
                    label={category.categoryName}
                    onClick={() =>
                      category.categoryName === categoriesFilter
                        ? setCategoriesFilter("")
                        : setCategoriesFilter(category.categoryName)
                    }
                    isChecked={categoriesFilter === category.categoryName}
                  />
                </div>
              ))}
            </div>
            <RightOutlined
              onClick={handleNextCategory}
              style={{
                ...iconStyle,
                visibility:
                  (categoryPage + 1) * categoriesPerPage <
                    categoriesData.length
                    ? "visible"
                    : "hidden",
              }}
              onMouseEnter={(e) =>
              (e.currentTarget.style = Object.entries(hoverIconStyle)
                .map(([key, value]) => `${key}: ${value}`)
                .join("; "))
              }
              onMouseLeave={(e) =>
              (e.currentTarget.style = Object.entries(iconStyle)
                .map(([key, value]) => `${key}: ${value}`)
                .join("; "))
              }
            />
          </div>
        )}

        {isLoading ? (
          <Loading isPageLoading />
        ) : (
          <div className="product-container">
            <Row gutter={[16, 16]}>
              {data && data.data && data.data.length ? (
                data.data.map((item, index) => (
                  <ProductCard key={index} data={item} />
                ))
              ) : (
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 25,
                    width: "100%",
                  }}
                >
                  Không có thuốc nào!
                </p>
              )}
            </Row>
          </div>
        )}
      </div>

      <div
        className="flex"
        style={{ justifyContent: "center", marginTop: "20px" }}
      >
        {data.pageCount && data.pageSize && (
          <Pagination
            key={"pagination " + page}
            align="center"
            total={data.totalCount}
            current={page}
            onChange={(e) => setPage(e)}
            size={data.pageSize}
            showSizeChanger={false}
          />
        )}
      </div>

      {openAddDialog && <AddProduct onClose={toggleAddDialog} />}
    </>
  );
}

export default Products;
