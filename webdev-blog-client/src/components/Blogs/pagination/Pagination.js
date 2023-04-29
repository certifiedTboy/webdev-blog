import React from "react";
import "./pagination.css";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  // create array of numbers from number of n pages
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  // next page click handler
  const nextPage = (event) => {
    event.preventDefault();
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  //previous page click handler
  const prevPage = (event) => {
    event.preventDefault();
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="row">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="pagination-wrap">
              <ul>
                <li>
                  <a href="#" onClick={prevPage}>
                    Prev
                  </a>
                </li>

                {pageNumbers.map((pgNum) => {
                  return (
                    <li key={pgNum}>
                      <a>{pgNum}</a>
                    </li>
                  );
                })}

                <li>
                  <a href="#" onClick={nextPage}>
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
