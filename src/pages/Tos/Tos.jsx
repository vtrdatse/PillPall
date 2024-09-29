import React, { useMemo, useState } from "react";
import GradientButton from "../../components/button/GradientButton";
import CustomTable from "../../components/table";
import useDialog from "../../hooks/useDialog";
import { useGetTosList } from "../../hooks/useTos";
import AddTos from "./_components/AddTos";
import DeleteTos from "./_components/DeleteTos";
import DetailTos from "./_components/DetailTos";
import { dateTimeFormat } from "../../utils/time";
import { EyeOutlined } from "@ant-design/icons";
const columns = [
    {
        title: "Tiêu đề",
        dataIndex: "title",
        key: "title",
        sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
        title: "Nội dung",
        dataIndex: "content",
        key: "content",
        sorter: (a, b) => a.content.localeCompare(b.content),
        ellipsis: true,
    },
    {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
        width: 250,
    },
    {
        title: "Xem chi tiết",
        dataIndex: "seeDetail",
        key: "seeDetail",
        width: 120,
    },
    {
        title: "",
        dataIndex: "edit",
        key: "edit",
        width: 120,
    },
    {
        title: "",
        dataIndex: "delete",
        key: "delete",
        width: 120,
    },
];
const Tos = () => {
    // api get list
    const { data = [], isLoading } = useGetTosList();


    const [detailSelected, setDetailSelected] = useState(null);

    // dialog state
    const { isShow: openDetail, toggleDialog: toggleDetail } = useDialog();
    const { isShow: openAddDialog, toggleDialog: toggleAddDialog } = useDialog();
    const { isShow: openDelete, toggleDialog: toggleDelete } = useDialog();
    const { isShow: openUpdate, toggleDialog: toggleUpdate } = useDialog();
    const [selected, setSelected] = useState(null);
    const { isShow: isDetailVisible, toggleDialog: toggleSeeDetail } = useDialog();

    const dataSource = useMemo(() => {
        return data.map((item) => ({
            ...item,
            createdAt: dateTimeFormat(item.createdAt),
            updatedAt: dateTimeFormat(item.updatedAt),
            seeDetail: (
                <EyeOutlined
                    style={{ fontSize: "20px", color: "#1890ff" }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected(item.id);
                        toggleSeeDetail();
                    }}
                />
            ),
            seeDetail: (
                <EyeOutlined
                    style={{ fontSize: "20px", color: "#1890ff" }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected(item.id);
                        toggleSeeDetail();
                    }}
                />
            ),
            edit: (
                <GradientButton
                    type={"warning"}
                    label={"Chỉnh sửa"}
                    onClick={(e) => {
                        e.stopPropagation();
                        setDetailSelected(item.id);
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
                        setDetailSelected(item.id);
                        toggleDelete();
                    }}
                />
            ),
        }));
    }, [data]);

    return (
        <div>
            <GradientButton
                label="Thêm điều khoản dịch vụ"
                onClick={toggleAddDialog}
                type="primary"
                style={{ marginBottom: "10px" }}
            />
            <CustomTable
                columns={columns}
                data={dataSource}
                isLoading={isLoading}
                onRowClick={(r) => {
                    setDetailSelected(r.id);
                    toggleDetail();
                }}
            />
            {openAddDialog && <AddTos onClose={toggleAddDialog} />}
            {isDetailVisible && (
                <DetailTos
                    id={selected}
                    onClose={() => {
                        toggleSeeDetail();
                        setSelected(null);
                    }}
                />
            )}
            {openUpdate && (
                <AddTos
                    id={detailSelected}
                    onClose={() => {
                        setDetailSelected(null);
                        toggleUpdate();
                    }}
                />
            )}
            {openDelete && (
                <DeleteTos
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

export default Tos;
