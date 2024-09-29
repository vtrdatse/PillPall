import React from "react";

const CustomInput = ({
  type = "text",
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  defaultValue,
}) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          marginBottom: ".5rem",
          color: "#6B7280",
          fontSize: "14px",
        }}
      >
        {label}
      </label>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        id={id}
        name={name}
        defaultValue={defaultValue}
        style={{
          padding: "0.5rem",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #D1D5DB",
          width: "100%",
        }}
      />
    </div>
  );
};

export default CustomInput;
