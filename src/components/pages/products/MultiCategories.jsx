import { Input } from "antd";
import { useEffect, useState } from "react";
import { useGetCategoryList } from "../../../hooks/useCategoryApi";
import useDialog from "../../../hooks/useDialog";
import Chip from "../../chip/Chip";
import Dialog from "../../dialog";

const MultiCategories = ({ onChange, list }) => {
  const { isShow, toggleDialog } = useDialog();

  return (
    <>
      <div
        className="flex"
        style={{
          margin: "15px 0px",
          width: "100%",
          borderBottom: "0.5px solid #d6d6d6",
          paddingBottom: "15px",
          alignItems: "start",
        }}
      >
        <div
          className="flex"
          style={{
            alignItems: "center",
            gap: "10px",
            width: "200px",
            marginTop: "10px",
          }}
        >
          <p style={{ margin: "0", padding: "0", fontSize: "18px" }}>
            Danh mục
          </p>
          <div
            onClick={toggleDialog}
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/5253/5253658.png"
              alt="edit_button"
            />
          </div>
        </div>
        <div className="flex" style={{ flexWrap: "wrap", width: "full" }}>
          {list.map((i) => (
            <Chip key={i.id} label={i.categoryName} />
          ))}
        </div>
      </div>

      {isShow && (
        <Add onClose={toggleDialog} selectedList={list} onChange={onChange} />
      )}
    </>
  );
};

export default MultiCategories;

const Add = ({ onClose, selectedList, onChange }) => {
  const { data = [], isLoading } = useGetCategoryList({ PageSize: 9999999 });
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
            item.categoryName.toLowerCase().includes(value.toLowerCase())
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
    setSelected((prevSelected) => {
      if (prevSelected.some((selected) => selected.id === item.id)) {
        return prevSelected.filter((selected) => selected.id !== item.id);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  return (
    <Dialog onClose={handleClose} open>
      {isLoading && <p>Đang tải...</p>}
      {data && (
        <>
          <h4>Danh mục</h4>
          <Input
            style={{ width: "50%", margin: "10px 0" }}
            onChange={handleFilter}
            placeholder="🔎 Tìm kiếm..."
          />
          <div className="flex" style={{ flexWrap: "wrap" }}>
            {filteredList.map((item) => (
              <Chip
                key={item.id}
                label={item.categoryName}
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
