import React from "react";

const useGetToken = () => {
  const userInfo = localStorage.getItem("userInfo");
  const token = userInfo ? JSON.parse(userInfo).token : null;
  return { token };
};

export default useGetToken;
