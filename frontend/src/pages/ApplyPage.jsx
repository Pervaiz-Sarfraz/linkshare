import React from "react";
import { useParams } from "react-router-dom";
import ApplyForm from "../comp/ApplyForm";

const ApplyPage = () => {
  const { id } = useParams(); 

  return (
    <div>
      <h2>Apply for Job ID: {id}</h2>
      <ApplyForm jobId={id} />
    </div>
  );
};

export default ApplyPage;
