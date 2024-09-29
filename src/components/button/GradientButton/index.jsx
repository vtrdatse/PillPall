import React, { useMemo } from "react";
import "./style.css";
import { Button } from "antd";

const GradientButton = ({
  type = "warning" | "danger" | "primary",
  label,
  onClick,
  style,
  action,
}) => {
  const gradientClass = useMemo(() => {
    switch (type) {
      case "warning":
        return "gradient-warning";
      case "danger":
        return "gradient-danger";
      case "primary":
      default:
        return "gradient-primary";
    }
  }, [type]);

  return (
    <Button
      htmlType={action}
      type="primary"
      className={gradientClass}
      style={{ ...style }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default GradientButton;
