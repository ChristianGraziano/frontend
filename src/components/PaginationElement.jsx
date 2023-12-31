import React, { useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const PaginationElement = () => {
  const [currentPage, setCurrentPage] = useState(8);
  const totalPages = 20;
  return (
    <ResponsivePagination
      current={currentPage}
      total={totalPages}
      onPageChange={setCurrentPage}
    />
  );
};

export default PaginationElement;
