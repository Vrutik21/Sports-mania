import React, { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./BackToTop.css";

const BackToTop = () => {
  const [topBtn, setTopBtn] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setTopBtn(true);
    } else {
      setTopBtn(false);
    }
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {topBtn === true && (
        <button className="to-top" onClick={scrollUp}>
          <KeyboardArrowUpIcon />
        </button>
      )}
    </>
  );
};

export default BackToTop;
