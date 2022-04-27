import React from "react";

const Alerta = ({ children }) => {
  return (
    <div className="text-xs text-center my-4 bg-red-200 text-red-900 font-bold p-2 uppercase rounded-md">
      {children}
    </div>
  );
};

export default Alerta;
