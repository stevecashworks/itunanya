
import inputs from "../../data/inputs";
import { useState } from "react";
import ButtonSpinner from "../spinner/spinner";

import MessageModal from "../modal/modal";
import { useNavigate } from "react-router-dom";

const ServerBtn = ({ formdata, errors, setErrors }) => {
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const handleClick = () => {
    console.log("clicked");
    setLoading(true);
    console.log(loading);
    if (!loading) {
      fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setLoading(false);
            console.log(data);
            localStorage.setItem("connectify_token", data.data);
            navigate("/");
          } else {
            setErrors([...errors, data.message]);
          }
        });
    }
  };

  return (
    <>
      <button
        disabled={loading}
        style={{ boxSizing: "border-box", cursor: "pointer" }}
        onClick={handleClick}
      >
        Finish{loading && <ButtonSpinner />}
      </button>
    </>
  );
};

export default ServerBtn;
