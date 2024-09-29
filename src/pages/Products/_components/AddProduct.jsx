import { Button, Checkbox, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import Dialog from "../../../components/dialog";
import MultiActive from "../../../components/pages/products/MultiActive";
import MultiCategories from "../../../components/pages/products/MultiCategories";
import MultiDosages from "../../../components/pages/products/MultiDosages";
import MultiPharmaceutical from "../../../components/pages/products/MultiPhrmacutial";
import {
  useAddMedicineToBrandWithPrice,
  useCreateMedicine,
  useEditMedicineToBrandWithPrice,
  useGetMedicine,
  useUpdateMedicine,
} from "../../../hooks/useMedicineApi";
import { useGetSpecificationList } from "../../../hooks/useSpecificationApi";
import GradientButton from "../../../components/button/GradientButton";
import MultiBrand from "../../../components/pages/products/MultiBrand";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/Config";

const CustomSelect = ({ list = [], selected, onChange }) => {
  return (
    <div
      className="flex items-center"
      style={{ alignItems: "center", gap: "10px", paddingBottom: "10px" }}
    >
      <p
        style={{
          margin: "0",
          padding: "0",
          width: "200px",
          textAlign: "left",
          fontSize: "18px",
        }}
      >
        Quy cách đóng gói
      </p>
      <select
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #d9d9d9",
          color: "gray",
          borderRadius: "5px",
        }}
        onChange={(e) => onChange(e.target.value)}
        value={selected}
      >
        {list.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const AddProduct = ({ onClose, id = null }) => {
  // upload image

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const storageRef = ref(storage, `products/${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setBody({ ...body, image: downloadURL });
      setUploading(false);
    } catch (error) {
      console.error("Lỗi khi tải ảnh lên:", error);
      toast.error("Tải ảnh lên thất bại");
      setUploading(false);
    }
  };

  const [form] = Form.useForm();

  // API: Get medicine
  const { data: initData, isLoading: initLoading } = useGetMedicine(id);

  // API: Update medicine
  const { mutate: updateMutate, isLoading: updateLoading } =
    useUpdateMedicine(id);

  // API: Create medicine
  const { mutate: createMutate, isLoading: createLoading } =
    useCreateMedicine();

  // API: Add Medicine to Brand with Price
  const {
    mutate: addMedicineToBrandWithPriceMutate,
    isLoading: addMedicineToBrandWithPriceLoading,
  } = useAddMedicineToBrandWithPrice();

  // API: edit Medicine to brand with price
  const {
    mutate: editMedicineToBrandWithPriceMutate,
    isLoading: editMedicineToBrandWithPriceLoading,
  } = useEditMedicineToBrandWithPrice();

  const queryClient = useQueryClient();

  // Branch with price
  const [branchWithPrice, setBranchWithPrice] = useState([]);
  const [priceUnit, setPriceUnit] = useState("Viên");
  
  const [body, setBody] = useState({
    medicineName: "",
    requirePrescript: false,
    image: "",
    specificationId: null,
    categories: [],
    pharmaceuticalCompanies: [],
    dosageForms: [],
    activeIngredients: [],
    registrationNumber: "",
  });

  useEffect(() => {
    if (initData) {
      const formattedData = {
        ...initData,
        specificationId: initData.specification.id,
      };
      setBody((prev) => ({
        ...prev,
        ...formattedData,
      }));
      form.setFieldsValue(formattedData);

      setBranchWithPrice(
        initData.medicineInBrands.map((item) => ({
          price: item.price,
          brandId: item.brand.id,
          medicineUrl: item.medicineUrl,
        }))
      );
    }
  }, [initData, form]);

  const { data: specificationList = [] } = useGetSpecificationList({
    PageSize: 9999999,
  });

  const onSubmit = () => {
    const payload = {
      ...body,
      categories: body.categories.map((item) => item.id),
      dosageForms: body.dosageForms.map((item) => item.id),
      activeIngredients: body.activeIngredients.map((item) => item.id),
      pharmaceuticalCompanies: body.pharmaceuticalCompanies.map(
        (item) => item.id
      ),
      medicineInBrands: branchWithPrice.map(item => ({
        ...item,
        priceUnit: item.priceUnit || "VND" // Thêm priceUnit mặc định là VND
      }))
    };
  
    if (id) {
      // Gọi hàm cập nhật
      updateMutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries("getListMedicine");
          toast.success("Cập nhật thành công!");
          onClose();
        },
        onError: (error) => {
          if (error.response?.data?.errors?.RegistrationNumber) {
            toast.error("Số đăng ký thuốc đã tồn tại.");
          } else {
            toast.error("Có lỗi xảy ra, vui lòng thử lại.");
          }
        },
      });
    } else {
      // Gọi hàm tạo mới
      createMutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries("getListMedicine");
          toast.success("Thêm thành công!");
          onClose();
        },
        onError: (error) => {
          if (error.response?.data?.errors?.RegistrationNumber) {
            toast.error("Số đăng ký thuốc đã tồn tại.");
          } else {
            toast.error("Có lỗi xảy ra, vui lòng thử lại.");
          }
        },
      });
    }
  };
  

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".ant-col.ant-col-16.ant-form-item-control"
    );
    elements.forEach((element) => {
      element.classList.remove("ant-col-16");
    });
  }, []);

  return (
    <Dialog onClose={onClose}>
      <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
        {id ? "CẬP NHẬT " : "THÊM "}THUỐC
      </h2>
      <Form
        form={form}
        onFinish={onSubmit}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ textAlign: "center", margin: "20px", paddingLeft: "20px" }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          name="medicineName"
          rules={[{ required: true, message: "Chưa nhập ô này" }]}
        >
          <div className="flex">
            <p style={{ fontSize: "18px", width: "200px", textAlign: "left" }}>
              Tên thuốc:
            </p>
            <Input
              style={{ width: "100%" }}
              value={body.medicineName}
              onChange={(e) =>
                setBody({ ...body, medicineName: e.target.value })
              }
            />
          </div>
        </Form.Item>

        <Form.Item
          name="registrationNumber"
          rules={[{ required: true, message: "Chưa nhập ô này" }]}
        >
          <div className="flex">
            <p style={{ fontSize: "18px", width: "200px", textAlign: "left" }}>
              Số Đăng Ký
            </p>
            <Input
              style={{ width: "100%" }}
              value={body.registrationNumber}
              onChange={(e) =>
                setBody({ ...body, registrationNumber: e.target.value })
              }
            />
          </div>
        </Form.Item>

        {/* <Form.Item name="image"
        rules={[
          { required: true, message: "Chưa nhập ô này" }
        ]}>
          <div className="flex">
            <p style={{ fontSize: "18px", width: "200px", textAlign: "left" }}>
              Hình ảnh:
            </p>
            <Input
              value={body.image}
              onChange={(e) => setBody({ ...body, image: e.target.value })}
            />
          </div>
        </Form.Item> */}

        <Form.Item
          name="image"
          rules={[{ required: true, message: "Vui lòng chọn một hình ảnh" }]}
        >
          <div className="flex">
            <p style={{ fontSize: "18px", width: "200px", textAlign: "left" }}>
              Hình ảnh:
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            {uploading && <span>Đang tải lên...</span>}
            {body.image && (
              <img
                src={body.image}
                alt="Preview"
                style={{ width: "100px", marginLeft: "10px" }}
              />
            )}
          </div>
        </Form.Item>

        {id ? (
          <CustomSelect
            list={specificationList.map((i) => ({
              label: i.typeName,
              value: i.id,
            }))}
            selected={body.specificationId}
            onChange={(value) => setBody({ ...body, specificationId: value })}
          />
        ) : (
          <Form.Item name="specificationId">
            <div className="flex">
              <p
                style={{ fontSize: "18px", width: "200px", textAlign: "left" }}
              >
                Quy cách đóng gói{" "}
              </p>
              <Select
                labelInValue
                value={
                  body.specificationId
                    ? {
                        label: specificationList.find(
                          (spec) => spec.id === body.specificationId
                        )?.typeName,
                        value: body.specificationId,
                      }
                    : undefined
                }
                style={{ width: "100%" }}
                options={specificationList.map((i) => ({
                  label: i.typeName,
                  value: i.id,
                }))}
                onChange={(value) => {
                  setBody({ ...body, specificationId: value.value });
                  form.setFieldsValue({ specificationId: value });
                }}
                placeholder="Quy cách đóng gói"
              />
            </div>
          </Form.Item>
        )}

        <MultiCategories
          list={body.categories}
          onChange={(data) => setBody({ ...body, categories: data })}
        />

        <MultiPharmaceutical
          list={body.pharmaceuticalCompanies}
          onChange={(data) =>
            setBody({ ...body, pharmaceuticalCompanies: data })
          }
        />

        <MultiDosages
          list={body.dosageForms}
          onChange={(data) => setBody({ ...body, dosageForms: data })}
        />

        <MultiActive
          list={body.activeIngredients}
          onChange={(data) => setBody({ ...body, activeIngredients: data })}
        />

        <MultiBrand list={branchWithPrice || []} setList={setBranchWithPrice} />

        <Form.Item
          name="requirePrescript"
          valuePropName="checked"
          style={{ marginLeft: 18 }}
        >
          <Checkbox
            onChange={(e) =>
              setBody({ ...body, requirePrescript: e.target.checked })
            }
            checked={body.requirePrescript}
          >
            Thuốc Yêu Cầu Kê Đơn
          </Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 7 }}>
          <GradientButton
            action={"submit"}
            type={"primary"}
            label={
              createLoading || updateLoading ? "Đang tải..." : "CẬP NHẬT ➕"
            }
          />
        </Form.Item>
      </Form>
    </Dialog>
  );
};

export default AddProduct;
