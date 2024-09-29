import { Card, Col } from "antd";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import useDialog from "../../../hooks/useDialog";
import AddProduct from "../../../pages/Products/_components/AddProduct";
import DeleteMedicine from "../../../pages/Products/_components/DeleteNation";
import GradientButton from "../../button/GradientButton";
import "./style.css";
const { Meta } = Card;

const ProductCard = ({ data: product }) => {
  const navigate = useHistory();

  const navigateToProductDetail = () => {
    navigate.push("/products/" + product.id);
  };

  const { isShow, toggleDialog } = useDialog();
  const { isShow: openEdit, toggleDialog: toggleEdit } = useDialog();

  return (
    <Col span={6} style={{ cursor: "pointer" }}>
      <Card hoverable cover={<img src={product.image} />}>
        <div onClick={navigateToProductDetail}>
          <Meta
            title={product.medicineName}
            description={
              <>
                <div className="product-info">
                  {/* <span className="volume">
                    {product.specification?.typeName}
                  </span>
                  <span className="skin-type">
                    {product.specification?.detail}
                  </span> */}
                </div>
                {product.activeIngredients.map((act) => (
                  <div className="product-origin" key={act.id}>
                    <span className="origin">{act.ingredientInformation}</span>
                  </div>
                ))}
              </>
            }
          />
        </div>
        <div className="flex justify-center" style={{ gap: "10px" }}>
          <GradientButton type={"warning"} label={"Chỉnh sửa"} onClick={toggleEdit} />
          <GradientButton
            label={"Xóa"}
            type={"danger"}
            onClick={toggleDialog}
          />
        </div>
      </Card>
      {isShow && <DeleteMedicine id={product.id} onClose={toggleDialog} />}
      {openEdit && <AddProduct id={product.id} onClose={toggleEdit} />}
    </Col>
  );
};

export default ProductCard;
