import React from "react";
import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";

const ReactToastify = () => {
  const showToast = () => {
    toast.success("Job applied successfully!", { autoClose: 3000 });
  };

  return (
    <div className="toastify-container">
      <button className="toastify-button" onClick={showToast}>
        Apply for Job
      </button>
      <ToastContainer />
    </div>
  );
};

export default ReactToastify;
