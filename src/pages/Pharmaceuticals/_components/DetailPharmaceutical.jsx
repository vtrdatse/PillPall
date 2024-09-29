import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Pagination, Row, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import ProductCard from "../../../components/Cards/ProductCard/ProductCard";
import Chip from "../../../components/chip/Chip";
import { useGetListMedicine } from "../../../hooks/useMedicineApi";
import { useGetPharmaceuticalById } from "../../../hooks/usePharmaceutialApi";
import { cleanObject } from "../../../utils/clean-object";
import { useGetCategoryList } from "../../../hooks/useCategoryApi";
import useDebounce from "../../../hooks/useDebounce";
const { Title } = Typography;

const DetailPharmaceutical = () => {
  const { id } = useParams();
  const [categoriesFilter, setCategoriesFilter] = useState("");
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const debounceValue = useDebounce(searchVal, 1000);
  const [debounceVal, setDebounceVal] = useState("");
  const { isLoading: loading, data: Pharmaceutical } = useGetPharmaceuticalById(id);

  useEffect(() => {
    setDebounceVal(searchVal);
  }, [debounceValue]);

  useEffect(() => {
    setPage(1);
  }, [debounceVal]);

  const { data: categoriesData = [], isLoading: isLoadingCategories } =
    useGetCategoryList({
      PageSize: 9999,
    });

  const { data: medicines = [], isLoading: isLoadingMedicines } = useGetListMedicine(
    cleanObject({
      PharmaceuticalCompany: Pharmaceutical?.companyName,
      Category: categoriesFilter,
      Page: page,
      IncludeCategories: true,
      IncludeSpecifications: true,
      IncludePharmaceuticalCompanies: true,
      IncludeDosageForms: true,
      IncludeActiveIngredients: true,
      IncludeBrands: true,
    })
  );

  // console.log(medicines.data.map((item) => item.categoriescategoryName));

  const [categoryPage, setCategoryPage] = useState(0);
  const categoriesPerPage = 15; // Number of categories to show per "page"

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


  if (loading || isLoadingMedicines || isLoadingCategories)
    return (
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );

  const iconStyle = {
    fontSize: "28px",
    cursor: "pointer",
    transition: "transform 0.2s ease", // Smooth transition effect
  };

  const hoverIconStyle = {
    ...iconStyle,
    transform: "scale(3)", // Increase size by 1.5 times on hover
  };

  return (
    <div>
      <Title
        level={2}
        style={{
          textAlign: "center",
          backgroundColor: "#77a942",
          color: "#fff",
          padding: "10px 0",
        }}
      >
        Thuốc của công ty {Pharmaceutical?.companyName}
      </Title>

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

      <div className="product-container">
        <Row gutter={[16, 16]}>
          {medicines && medicines.data && medicines.data.length ? (
            medicines.data.map((item, index) => (
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

      <div
        className="flex"
        style={{ justifyContent: "center", marginTop: "20px" }}
      >
        {medicines.pageCount && medicines.pageSize && (
          <Pagination
            key={"pagination " + page}
            align="center"
            total={medicines.totalCount}
            current={page}
            onChange={(e) => setPage(e)}
            size={medicines.pageSize}
            showSizeChanger={false}
          />
        )}
      </div>
    </div>
  );
};

export default DetailPharmaceutical;
