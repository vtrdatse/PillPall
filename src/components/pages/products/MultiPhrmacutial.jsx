import { Input } from "antd";
import { useEffect, useState } from "react";
import useDialog from "../../../hooks/useDialog";
import Chip from "../../chip/Chip";
import Dialog from "../../dialog";
import { useGetPharmaceuticalList } from "../../../hooks/usePharmaceutialApi";

const MultiPharmaceutical = ({ onChange, list }) => {
  const { isShow, toggleDialog } = useDialog();

  return (
    <>
      <div
        className="flex"
        style={{
          margin: "15px 0px",
          width: "100%",
          alignItems: "start",
          borderBottom: "0.5px solid #d6d6d6",
          paddingBottom: "15px",
        }}
      >
        <div
          className="flex"
          style={{
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
            width: "200px",
          }}
        >
          <p
            style={{
              margin: "0",
              padding: "0",
              fontSize: "18px",
              textAlign: "left",
            }}
          >
            Công ty
          </p>
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/5253/5253658.png"
              alt="edit_button"
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
              onClick={toggleDialog}
            />
          </div>
        </div>
        <div className="flex" style={{ flexWrap: "wrap", width: "full" }}>
          {list.map((i) => (
            <Chip key={i.id} label={i.companyName} />
          ))}
        </div>
      </div>

      {isShow && (
        <Add onClose={toggleDialog} selectedList={list} onChange={onChange} />
      )}
    </>
  );
};

export default MultiPharmaceutical;

const Add = ({ onClose, selectedList, onChange }) => {
  const { data = [], isLoading } = useGetPharmaceuticalList({
    PageSize: 9999999,
  });
  const [filteredList, setFilteredList] = useState(data);

  useEffect(() => {
    setFilteredList(data);
  }, [data]);

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilteredList(
      !value
        ? data
        : data.filter((item) =>
            item.companyName.toLowerCase().includes(value.toLowerCase())
          )
    );
  };

  const [selected, setSelected] = useState(selectedList);

  useEffect(() => {
    setSelected(selectedList);
  }, [selectedList]);

  const handleClose = () => {
    onChange(selected);
    onClose();
  };

  const handleChipClick = (item) => {
    setSelected([item]); // Chỉ cho phép chọn một công ty duy nhất
  };

  return (
    <Dialog onClose={handleClose} open>
      {isLoading && <p>Đang tải...</p>}
      {data && (
        <>
          <h4>Công ty</h4>
          <Input
            style={{ width: "50%", margin: "10px 0" }}
            onChange={handleFilter}
            placeholder="🔎 Tìm kiếm..."
          />
          <div className="flex" style={{ flexWrap: "wrap" }}>
            {filteredList.map((item) => (
              <Chip
                key={item.id}
                label={item.companyName}
                isChecked={selected.some((selected) => selected.id === item.id)}
                onClick={() => handleChipClick(item)}
              />
            ))}
          </div>
        </>
      )}
    </Dialog>
  );
};
