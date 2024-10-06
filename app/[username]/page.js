import React from "react";

const Username = ({ params }) => {
  console.log({ params });
  return (
    <>
      <div className = "text-white" >{params.username}</div>
    </>
  );
};

export default Username;
