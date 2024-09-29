import {
  Card,
  Col,
  Descriptions,
  Row,
  Spin,
  Typography,
  Button,
  notification,
} from "antd";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetMedicine, useDeleteMedicineFromBrand } from "../../hooks/useMedicineApi";
import { vndFormat } from "../../utils/price-vnd";
import { dateTimeFormat } from "../../utils/time";
import "./style.css";

const { Title } = Typography;

function ProductDetail() {
  const { id } = useParams();
  const { data, isLoading } = useGetMedicine(id);
  const { mutate: deleteBrand } = useDeleteMedicineFromBrand();
  
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    if (data) {
      setBrands(data.medicineInBrands);
    }
  }, [data]);

  const handleDeleteBrand = (medicineId, brandId) => {
    deleteBrand({ medicineId, brandId }, {
      onSuccess: () => {
        notification.success({
          message: 'Xóa thành công',
          description: 'Thương hiệu đã được xóa khỏi thuốc.',
        });

        // Cập nhật state để loại bỏ thương hiệu đã xóa
        setBrands(prevBrands => prevBrands.filter(brand => brand.brand.id !== brandId));
      },
      onError: (error) => {
        notification.error({
          message: 'Lỗi',
          description: 'Có lỗi xảy ra khi xóa thương hiệu.',
        });
        console.error("Error deleting brand:", error);
      },
    });
  };
  
  if (isLoading)
    return (
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );

  return (
    <div className="product-details-container">
      <Title
        level={2}
        style={{
          textAlign: "center",
          backgroundColor: "#77a942",
          color: "#fff",
          padding: "10px 0",
        }}
      >
        {data.medicineName}
      </Title>

      <Row gutter={[16, 16]} justify="center" style={{ margin: "20px 0" }}>
        <Col span={8}>
          <Card hoverable cover={<img src={data.image} />} />
        </Col>
        <Col span={16}>
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="Tên Thuốc">
              {data.medicineName}
            </Descriptions.Item>
            <Descriptions.Item label="Danh mục">
              {data.categories.map((v) => v.categoryName).join(", ")}
            </Descriptions.Item>
            <Descriptions.Item label="Hoạt Chất">
              {data.activeIngredients.map((v) => v.ingredientName).join(", ")}
            </Descriptions.Item>
            <Descriptions.Item label="Dạng Bào Chế">
              {data.dosageForms.map((v) => v.formName).join(", ")}
            </Descriptions.Item>
            <Descriptions.Item label="Quy cách đóng gói">
              {data.specification.typeName} {data.specification.detail}
            </Descriptions.Item>
            <Descriptions.Item label="Công ty Sản Xuất">
              {data.pharmaceuticalCompanies.map((v) => v.companyName).join(", ")}
            </Descriptions.Item>
            <Descriptions.Item label="Quốc gia">
              {data.pharmaceuticalCompanies.map((v) => v.nation.nationName).join(", ")}
            </Descriptions.Item>
            <Descriptions.Item label="Số đăng ký">
              {data.registrationNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Thuốc kê đơn">
              {data.requirePrescript ? "Có" : "Không"}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      <Title
        level={2}
        style={{
          textAlign: "center",
          backgroundColor: "#77a942",
          color: "#fff",
          padding: "10px 0",
          marginTop: "100px",
        }}
      >
        Giá bán kê khai {data.medicineName}
      </Title>
      {brands.length === 0 ? (
        <p>Không có thương hiệu nào.</p>
      ) : (
        brands.map((v) => (
          <PharmacyCard
            key={v.brand.brandCode}
            brandName={v.brand.brandName}
            brandImage={v.brand.brandLogo}
            medicineUrl={v.medicineUrl}
            brandCode={v.brand.brandCode}
            price={v.price}
            priceUnit={v.priceUnit}
            updatedAt={v.updatedAt}
            onDelete={() => handleDeleteBrand(data.id, v.brand.id)} // Truyền cả medicineId và brandId
          />
        ))
      )}
    </div>
  );
}

export default ProductDetail;

const PharmacyCard = ({
  brandName,
  brandImage,
  medicineUrl,
  brandCode,
  price,
  priceUnit,
  updatedAt,
  onDelete,
}) => {
  return (
    <Card>
      <Row justify="space-between" align="middle">
        <Col span={24}>
          <div
            style={{
              backgroundColor: "#99a2cf",
              padding: "5px",
              textAlign: "center",
            }}
          >
            <span style={{ color: "white" }}>{brandName}</span>
          </div>
        </Col>
        <Col span={24} style={{ textAlign: "center", marginTop: "10px" }}>
          <img src={brandImage} width={"100px"} />
        </Col>
        <Col span={24} style={{ textAlign: "center", marginTop: "10px" }}>
          <div>{brandName}</div>
        </Col>
        <Col span={8} style={{ textAlign: "center", marginTop: "10px" }}>
          <div>{brandCode}</div>
        </Col>
        <Col span={8} style={{ textAlign: "center", marginTop: "10px" }}>
          <div>
            <a href={medicineUrl}>{medicineUrl}</a>
          </div>
        </Col>
        <Col span={8} style={{ textAlign: "right", marginTop: "10px" }}>
          <div style={{ fontWeight: "bold", fontSize: "20px" }}>
            {price === 0 && priceUnit === "N/A" ? (
              "Thuốc cần tư vấn"
            ) : (
              <>
                {vndFormat(price)} / {(priceUnit === "VND" ? "Viên" : priceUnit) || "Viên"}
              </>
            )}
          </div>
        </Col>

        <Col span={24} style={{ textAlign: "center", marginTop: "10px" }}>
          <div style={{ color: "gray" }}>
            Cập nhật: {dateTimeFormat(updatedAt)}
          </div>
        </Col>
        <Col span={24} style={{ textAlign: "center", marginTop: "10px" }}>
          <Button onClick={onDelete} type="danger">Xóa</Button>
        </Col>
      </Row>
    </Card>
  );
};
