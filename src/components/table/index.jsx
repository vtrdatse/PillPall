import { Spin, Table } from "antd";
import React from "react";
import "./style.css";

const CustomTable = ({ data, columns, onRowClick, isLoading }) => {
  return (
    <Table
      className="custom-table"
      dataSource={data}
      columns={columns}
      loading={{ indicator: <Spin />, spinning: isLoading }}
      onRow={(row) => ({
        onClick: onRowClick ? () => onRowClick(row) : () => {},
      })}
    />
  );
};

export default CustomTable;
