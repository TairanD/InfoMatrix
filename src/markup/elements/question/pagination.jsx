import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import QuestionCard from "./question-card";

// Reference: https://www.npmjs.com/package/react-paginate

/**
 * Show the paginated items and the page numbers
 * @param {int} itemPerPage
 * @param {Array} item_fetched - items passed in from the parent 
 * @param {String} itemType - identifier of the type of layout of the item
 */

function PaginatedItems({ itemsPerPage, item_fetched, itemType }) {

  // Create and assign value to 'items' useState variable
  const [items, setItems] = useState([]);
  useEffect(() => setItems(item_fetched), [item_fetched]);

  // Represents the starting index of the object presenting
  const [itemOffset, setItemOffset] = useState(0);
  // Represents the ending index
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  // Slice out the presented items
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      {/* The items */}
      <div className="row">
        {/* If the itemType is question */}
        {currentItems &&
          itemType === "question" &&
          currentItems.map((this_question) => (
            <QuestionCard this_question={this_question} />
          ))}
          
      </div>
      {/* The pagination buttons */}
      <div className="row">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination-container"
          pageClassName="pagination-page"
          activeClassName="pagination-active"
          previousClassName="pagination-previous"
          nextClassName="pagination-next"
        />
      </div>
    </>
  );
}

export default PaginatedItems;
