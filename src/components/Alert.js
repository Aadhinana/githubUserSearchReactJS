import React from "react";

const Alert = (alert) => {
  return (
    <div className={`alert alert-${alert.type}`}>
      <p>{alert.msg || "Please Enter Something!"}</p>
    </div>
  );
};

export default Alert;
